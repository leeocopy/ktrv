import os
import re
import urllib.parse
import urllib.request
import ssl
import sys

BASE_URL = "https://vita-travel.webflow.io"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
}

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

PAGES = [
    "/",
    "/retreat",
    "/coaches",
    "/contacts",
    "/privacy-policy",
    "/terms-and-conditions",
    "/7-day-mystic-mountain-retreat-in-romania",
    "/7-day-solo-travelers-retreat-fun-in-bali",
    "/8-day-juice-detox-retreat-in-portugal",
    "/morocco-holiday-desert-moon",
    "/photography-retreat-tour-in-magical-morocco",
]

def fetch_url(url):
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=20) as resp:
            return resp.read()
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def sanitize_filename(url):
    parsed = urllib.parse.urlparse(url)
    path = parsed.path
    if not path or path == "/":
        return "index"
    name = path.strip("/").replace("/", "_")
    return name

print("Starting mirror process...")
os.makedirs("assets/images", exist_ok=True)
os.makedirs("assets/css", exist_ok=True)
os.makedirs("assets/js", exist_ok=True)
os.makedirs("assets/fonts", exist_ok=True)

downloaded_assets = {} # url -> local_path
page_htmls = {} # path -> html content

# 1. Download all HTML pages
for page_path in PAGES:
    full_url = urllib.parse.urljoin(BASE_URL, page_path)
    print(f"Downloading page: {full_url}")
    content = fetch_url(full_url)
    if content:
        page_htmls[page_path] = content.decode("utf-8", errors="ignore")

# Find any additional internal links
additional_pages = set()
for page_path, html in page_htmls.items():
    links = re.findall(r'href=[\"\'](/[^\"\'#?]+)[\"\']', html)
    for l in links:
        if l not in page_htmls and not any(l.endswith(ext) for ext in ['.css', '.js', '.png', '.jpg', '.svg', '.webp', '.ico', '.xml', '.txt']):
            additional_pages.add(l)

for p in additional_pages:
    full_url = urllib.parse.urljoin(BASE_URL, p)
    print(f"Downloading additional page: {full_url}")
    content = fetch_url(full_url)
    if content:
        page_htmls[p] = content.decode("utf-8", errors="ignore")

print(f"Total pages downloaded: {len(page_htmls)}")

# 2. Extract all asset URLs
asset_urls = set()

url_regex = re.compile(r'(?:href|src|data-src|srcset)=[\"\']([^\"\']+)[\"\']', re.IGNORECASE)
css_url_regex = re.compile(r'url\([\'\"]?([^\'\")]+)[\'\"]?\)', re.IGNORECASE)

for page_path, html in page_htmls.items():
    # from tag attributes
    matches = url_regex.findall(html)
    for m in matches:
        # handle srcset (can have multiple urls separated by comma)
        parts = m.split(',')
        for part in parts:
            clean = part.strip().split(' ')[0].strip()
            if clean and not clean.startswith('data:') and not clean.startswith('mailto:') and not clean.startswith('tel:') and not clean.startswith('#'):
                asset_urls.add(clean)
    
    # from inline style or style tags
    css_matches = css_url_regex.findall(html)
    for c in css_matches:
        c = c.strip()
        if c and not c.startswith('data:'):
            asset_urls.add(c)

print(f"Extracted {len(asset_urls)} raw candidate asset URLs")

# Helper to categorize asset
def get_asset_info(url):
    clean_url = url.split('?')[0].split('#')[0]
    ext = os.path.splitext(clean_url)[1].lower()
    
    parsed = urllib.parse.urlparse(clean_url)
    basename = os.path.basename(parsed.path)
    if not basename:
        basename = "asset"
    
    # shorten or clean filename
    basename = re.sub(r'[^a-zA-Z0-9_\-\.]', '_', basename)
    
    if ext in ['.css']:
        subfolder = "assets/css"
    elif ext in ['.js']:
        subfolder = "assets/js"
    elif ext in ['.woff', '.woff2', '.ttf', '.eot', '.otf']:
        subfolder = "assets/fonts"
    elif ext in ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico', '.avif']:
        subfolder = "assets/images"
    else:
        return None # likely an HTML page or external link
    
    return subfolder, basename

# 3. Download assets
for raw_url in list(asset_urls):
    # resolve full URL
    if raw_url.startswith('//'):
        full_url = 'https:' + raw_url
    elif raw_url.startswith('/'):
        full_url = urllib.parse.urljoin(BASE_URL, raw_url)
    elif raw_url.startswith('http://') or raw_url.startswith('https://'):
        full_url = raw_url
    else:
        full_url = urllib.parse.urljoin(BASE_URL, raw_url)
    
    info = get_asset_info(full_url)
    if not info:
        continue
    
    subfolder, basename = info
    local_path = os.path.join(subfolder, basename)
    
    # Avoid collisions
    counter = 1
    root_base, ext = os.path.splitext(basename)
    while local_path in downloaded_assets.values() and downloaded_assets.get(raw_url) != local_path:
        local_path = os.path.join(subfolder, f"{root_base}_{counter}{ext}")
        counter += 1
    
    if raw_url not in downloaded_assets:
        print(f"Downloading asset: {full_url} -> {local_path}")
        data = fetch_url(full_url)
        if data:
            os.makedirs(os.path.dirname(local_path), exist_ok=True)
            with open(local_path, "wb") as f:
                f.write(data)
            downloaded_assets[raw_url] = local_path
            # Also map full_url if different
            downloaded_assets[full_url] = local_path
            
            # If it's a CSS file, parse for nested assets (fonts, background images)
            if local_path.endswith('.css'):
                css_text = data.decode("utf-8", errors="ignore")
                nested_urls = css_url_regex.findall(css_text)
                for nu in nested_urls:
                    nu = nu.strip('\'"')
                    if nu and not nu.startswith('data:'):
                        n_full_url = urllib.parse.urljoin(full_url, nu)
                        n_info = get_asset_info(n_full_url)
                        if n_info:
                            n_sub, n_base = n_info
                            n_local = os.path.join(n_sub, n_base)
                            if nu not in downloaded_assets:
                                print(f"  Downloading CSS nested asset: {n_full_url} -> {n_local}")
                                n_data = fetch_url(n_full_url)
                                if n_data:
                                    os.makedirs(os.path.dirname(n_local), exist_ok=True)
                                    with open(n_local, "wb") as nf:
                                        nf.write(n_data)
                                    downloaded_assets[nu] = n_local
                                    downloaded_assets[n_full_url] = n_local

# Also ensure we check css files and rewrite nested urls
print("Rewriting downloaded CSS files...")
for raw_url, local_path in list(downloaded_assets.items()):
    if local_path.endswith('.css') and os.path.exists(local_path):
        with open(local_path, 'r', encoding='utf-8', errors='ignore') as f:
            css_content = f.read()
        
        # calculate relative path from css file to asset
        # e.g. from assets/css to assets/images -> ../images/
        for a_url, a_loc in downloaded_assets.items():
            if a_url in css_content:
                rel = os.path.relpath(a_loc, os.path.dirname(local_path))
                css_content = css_content.replace(a_url, rel)
        
        with open(local_path, 'w', encoding='utf-8') as f:
            f.write(css_content)

# Map page paths to clean html filenames
page_filename_map = {}
for p in page_htmls:
    if p == "/" or p == "":
        fname = "index.html"
    else:
        clean_name = p.strip("/").replace("/", "_")
        fname = f"{clean_name}.html"
    page_filename_map[p] = fname

# 4. Save and rewrite HTML pages
print("Rewriting and saving HTML pages...")
for page_path, html in page_htmls.items():
    current_fname = page_filename_map[page_path]
    current_dir = os.path.dirname(current_fname)
    
    # 4a. Replace internal links
    for p, fname in page_filename_map.items():
        # exact match href="/about" -> href="about.html"
        html = re.sub(rf'href=[\"\']{re.escape(p)}[\"\']', f'href="{fname}"', html)
        html = re.sub(rf'href=[\"\']{re.escape(p)}/([\?#])', rf'href="{fname}\1', html)
        html = re.sub(rf'href=[\"\']{re.escape(p)}(#[^\"\']+)[\"\']', rf'href="{fname}\1"', html)
        # handle full url matching
        full_p = urllib.parse.urljoin(BASE_URL, p)
        html = re.sub(rf'href=[\"\']{re.escape(full_p)}[\"\']', f'href="{fname}"', html)
        html = re.sub(rf'href=[\"\']{re.escape(full_p)}(#[^\"\']+)[\"\']', rf'href="{fname}\1"', html)

    # 4b. Replace downloaded assets
    # Sort by length descending to replace longer URLs first
    sorted_assets = sorted(downloaded_assets.items(), key=lambda x: len(x[0]), reverse=True)
    for raw_u, loc in sorted_assets:
        if raw_u in html:
            html = html.replace(raw_u, loc)

    # Also handle root relative /#retreats -> index.html#retreats
    html = html.replace('href="/#retreats"', 'href="index.html#retreats"')
    html = html.replace('href="/#"', 'href="index.html#"')

    with open(current_fname, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Saved {current_fname}")

print("\nMirroring completed successfully!")

