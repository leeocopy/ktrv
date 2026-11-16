/**
 * Kech Travel Game - Multilingual i18n Engine
 * Supported Languages:
 *   - English (en) - Default LTR
 *   - French (fr)  - Français LTR
 *   - Arabic (ar)  - العربية RTL
 *   - Hebrew (he)  - עברית RTL
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'kechtg_lang';

  // SVG Flags for crisp display on all devices
  const FLAGS = {
    en: `<svg class="lang-flag-svg" width="20" height="15" viewBox="0 0 640 480" style="border-radius:2px;box-shadow:0 0 1px rgba(0,0,0,0.5);display:block;"><path fill="#012169" d="M0 0h640v480H0z"/><path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/><path fill="#C8102E" d="m424 281 216 159v40L369 281h55zm-104 20 6 30L84 480H0l220-164 100-15zm104-122 216-160V0L370 179h54zM84 0 0 62v-2l220 164 104-15L104 0H84z"/><path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/><path fill="#C8102E" d="M272 0v480h96V0h-96zM0 192v96h640V192H0z"/></svg>`,
    fr: `<svg class="lang-flag-svg" width="20" height="15" viewBox="0 0 640 480" style="border-radius:2px;box-shadow:0 0 1px rgba(0,0,0,0.5);display:block;"><path fill="#002654" d="M0 0h213.3v480H0z"/><path fill="#FFF" d="M213.3 0h213.4v480H213.3z"/><path fill="#CE1126" d="M426.7 0H640v480H426.7z"/></svg>`,
    ar: `<svg class="lang-flag-svg" width="20" height="15" viewBox="0 0 640 480" style="border-radius:2px;box-shadow:0 0 1px rgba(0,0,0,0.5);display:block;"><path fill="#c1272d" d="M0 0h640v480H0z"/><path fill="none" stroke="#006233" stroke-width="12" d="m320 160 58.8 181-153.9-111.9h190.2L261.2 341z"/></svg>`,
    he: `<svg class="lang-flag-svg" width="20" height="15" viewBox="0 0 640 480" style="border-radius:2px;box-shadow:0 0 1px rgba(0,0,0,0.5);display:block;"><path fill="#fff" d="M0 0h640v480H0z"/><path fill="#0038b8" d="M0 60h640v60H0zm0 300h640v60H0z"/><path fill="none" stroke="#0038b8" stroke-width="12" d="m320 170 86.6 150H233.4zm0 140 86.6-150H233.4z"/></svg>`
  };

  const LANGUAGES = [
    { code: 'en', name: 'English', native: 'English', dir: 'ltr', gtCode: 'en' },
    { code: 'fr', name: 'Français', native: 'Français', dir: 'ltr', gtCode: 'fr' },
    { code: 'ar', name: 'العربية', native: 'العربية', dir: 'rtl', gtCode: 'ar' },
    { code: 'he', name: 'עברית', native: 'עברית', dir: 'rtl', gtCode: 'iw' }
  ];

  // High-priority dictionary for prominent UI components
  const DICTIONARY = {
    en: {
      nav_tours: "Tours & Trips",
      nav_best: "Best Trips",
      nav_contact: "Contact Us",
      nav_explore: "Explore",
      nav_book: "Book Your Trip",
      hero_subtitle: "Experience authentic Morocco through tailor-made desert expeditions, high Atlas treks, cultural workshops, and soul-rejuvenating wellness retreats.",
      featured_title: "Featured Tours & Trips",
      featured_sub: "Handpicked retreats and authentic adventures across Morocco and beyond.",
      gallery_title: "Through The Moroccan Lens",
      gallery_sub: "Experience the vibrant colors and timeless landscapes of Morocco in 3D",
      reels_title: "Watch Our Travel Stories in Motion",
      reels_sub: "Authentic moments, desert safaris & genuine traveler smiles captured live on our private tours.",
      reels_scroll: "SCROLL TO SPIN THE REELS",
      view_details: "View Details",
      book_now: "Book Now",
      footer_rights: "All rights reserved.",
      footer_quick: "Quick Links"
    },
    fr: {
      nav_tours: "Circuits & Voyages",
      nav_best: "Meilleurs Voyages",
      nav_contact: "Contactez-nous",
      nav_explore: "Explorer",
      nav_book: "Réserver Votre Voyage",
      hero_subtitle: "Découvrez le Maroc authentique à travers des expéditions sur mesure dans le désert, des treks dans le Haut Atlas et des retraites inoubliables.",
      featured_title: "Circuits & Voyages en Vedette",
      featured_sub: "Des retraites sélectionnées et des aventures authentiques à travers le Maroc et au-delà.",
      gallery_title: "À Travers l'Objectif Marocain",
      gallery_sub: "Découvrez les couleurs vibrantes et les paysages intemporels du Maroc en 3D",
      reels_title: "Regardez Nos Histoires de Voyage en Mouvement",
      reels_sub: "Moments authentiques, safaris dans le désert et sourires capturés en direct lors de nos circuits privés.",
      reels_scroll: "DÉFILEZ POUR FAIRE TOURNER LES VIDÉOS",
      view_details: "Voir les Détails",
      book_now: "Réserver Maintenant",
      footer_rights: "Tous droits réservés.",
      footer_quick: "Liens Rapides"
    },
    ar: {
      nav_tours: "الجولات والرحلات",
      nav_best: "أفضل الرحلات",
      nav_contact: "اتصل بنا",
      nav_explore: "اكتشف",
      nav_book: "احجز رحلتك",
      hero_subtitle: "عش تجربة المغرب الحقيقية من خلال رحلات صحراوية مخصصة، ومسارات جبال الأطلس، وورشات ثقافية وخلوات استرخاء لا تُنسى.",
      featured_title: "أبرز الجولات والرحلات",
      featured_sub: "خلوات مختارة ومغامرات أصيلة في جميع أنحاء المغرب وخارجه.",
      gallery_title: "من خلال العدسة المغربية",
      gallery_sub: "عش سحر الألوان والمناظر الخلابة للمغرب بتقنية الأبعاد الثلاثية",
      reels_title: "شاهد قصص رحلاتنا الواقعية",
      reels_sub: "لحظات أصيلة، سفاري صحراوي وابتسامات حقيقية لمسافرينا مباشرة من جولاتنا الخاصة.",
      reels_scroll: "مرر لتصفح الفيديوهات",
      view_details: "عرض التفاصيل",
      book_now: "احجز الآن",
      footer_rights: "جميع الحقوق محفوظة.",
      footer_quick: "روابط سريعة"
    },
    he: {
      nav_tours: "סיורים וטיולים",
      nav_best: "הטיולים המומלצים",
      nav_contact: "צור קשר",
      nav_explore: "גלה עוד",
      nav_book: "הזמן את הטיול שלך",
      hero_subtitle: "חוו את מרוקו האותנטית דרך מסעות מדבר מותאמים אישית, טרקים בהרי האטלס, סדנאות תרבות וחופשות רוגע מרפאות.",
      featured_title: "סיורים וטיולים נבחרים",
      featured_sub: "חופשות מובחרות והרפתקאות אותנטיות ברחבי מרוקו ומעבר לה.",
      gallery_title: "דרך העדשה המרוקאית",
      gallery_sub: "חוו את הצבעים התוססים והנופים הנצחיים של מרוקו בתלת מימד",
      reels_title: "צפו בסיפורי המסע שלנו בתנועה",
      reels_sub: "רגעים אותנטיים, ספארי מדברי וחיוכים אמיתיים של מטיילים מסיורינו הפרטיים.",
      reels_scroll: "גלול כדי לסובב את הסרטונים",
      view_details: "פרטים נוספים",
      book_now: "הזמן עכשיו",
      footer_rights: "כל הזכויות שמורות.",
      footer_quick: "קישורים מהירים"
    }
  };

  // Prevent Google Translate from translating brand names
  function protectBrandNames() {
    const brandSelectors = [
      '.header-logo',
      '.header-logo__arthein',
      '.hero-brand-arthein',
      '.hero-brand-lockup',
      '.footer-logo',
      '.lang-switcher-wrap'
    ];
    brandSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.classList.add('notranslate');
        el.setAttribute('translate', 'no');
      });
    });
  }

  // Inject Styles & Fonts
  function injectStyles() {
    if (document.getElementById('kechtg-i18n-styles')) return;

    // Load Cairo (Arabic) & Heebo (Hebrew)
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Heebo:wght@400;500;700;800&display=swap';
    document.head.appendChild(fontLink);

    const style = document.createElement('style');
    style.id = 'kechtg-i18n-styles';
    style.textContent = `
      /* === LUXURY LANGUAGE SWITCHER === */
      .lang-switcher-wrap {
        position: relative;
        display: inline-flex;
        align-items: center;
        margin: 0 0.4rem;
        z-index: 1000;
        font-family: inherit;
      }
      .lang-switcher-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        background: rgba(251, 246, 240, 0.95);
        border: 1px solid rgba(12, 73, 66, 0.25);
        color: #0C4942;
        padding: 0.35rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.825rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.25s ease;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
        outline: none;
      }
      .lang-switcher-btn:hover,
      .lang-switcher-wrap.is-open .lang-switcher-btn {
        background: #ffffff;
        border-color: #FBA13A;
        color: #0C4942;
        box-shadow: 0 3px 12px rgba(251, 161, 58, 0.25);
        transform: translateY(-1px);
      }
      .lang-switcher-btn .lang-flag-box {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .lang-switcher-btn .lang-chevron {
        transition: transform 0.25s ease;
        stroke: #0C4942;
      }
      .lang-switcher-wrap.is-open .lang-chevron {
        transform: rotate(180deg);
      }
      .lang-dropdown-menu {
        position: absolute;
        top: calc(100% + 8px);
        right: 0;
        background: #FBF6F0;
        border: 1px solid rgba(12, 73, 66, 0.18);
        border-radius: 12px;
        box-shadow: 0 12px 32px rgba(12, 73, 66, 0.15);
        min-width: 155px;
        padding: 0.4rem;
        display: none;
        flex-direction: column;
        gap: 0.25rem;
        z-index: 999999;
        backdrop-filter: blur(16px);
        animation: langFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .lang-switcher-wrap.is-open .lang-dropdown-menu {
        display: flex;
      }
      @keyframes langFadeIn {
        from { opacity: 0; transform: translateY(-6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .lang-dropdown-item {
        display: flex;
        align-items: center;
        gap: 0.65rem;
        padding: 0.5rem 0.75rem;
        border-radius: 8px;
        background: transparent;
        border: none;
        color: #0C4942;
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        text-align: left;
        width: 100%;
        transition: all 0.2s ease;
      }
      .lang-dropdown-item:hover {
        background: rgba(12, 73, 66, 0.08);
        color: #0C4942;
      }
      .lang-dropdown-item.is-active {
        background: #0C4942;
        color: #ffffff;
      }
      .lang-dropdown-item .item-flag {
        display: flex;
        align-items: center;
      }
      .lang-dropdown-item .item-name {
        flex: 1;
      }

      /* Mobile drawer switcher */
      .mobile-lang-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.85rem 0;
        margin: 0.5rem 0;
        border-top: 1px solid rgba(12, 73, 66, 0.12);
        border-bottom: 1px solid rgba(12, 73, 66, 0.12);
        width: 100%;
      }
      .mobile-lang-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.45rem 0.75rem;
        border-radius: 8px;
        background: rgba(12, 73, 66, 0.05);
        border: 1px solid rgba(12, 73, 66, 0.15);
        color: #0C4942;
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .mobile-lang-btn.is-active {
        background: #0C4942;
        color: #ffffff;
        border-color: #0C4942;
      }

      /* === PERMANENTLY SUPPRESS GOOGLE TOP BANNER & FRAMES === */
      .goog-te-banner-frame.skiptranslate,
      .goog-te-banner-frame,
      iframe.goog-te-banner-frame,
      iframe.skiptranslate,
      .skiptranslate iframe,
      .goog-te-balloon-frame,
      #goog-gt-tt,
      .goog-te-spinner-pos,
      .VIpgJd-ZVi9od-ORHb-Oxf5Fd,
      .VIpgJd-ZVi9od-aZ2wEe-wOHMyf,
      .VIpgJd-ZVi9od-aZ2wEe-wOHMyf-ti6hGc,
      .VIpgJd-yAWneB-hVyOBc-bN97Pc,
      .goog-te-gadget-icon,
      [class*="VIpgJd"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        height: 0 !important;
        width: 0 !important;
        pointer-events: none !important;
      }
      body {
        top: 0px !important;
        position: static !important;
      }
      .goog-tooltip, .goog-tooltip:hover {
        display: none !important;
      }
      .goog-text-highlight {
        background-color: transparent !important;
        border: none !important;
        box-shadow: none !important;
      }
      #google_translate_element {
        display: none !important;
      }

      /* === RTL STYLES (Arabic & Hebrew) === */
      html[dir="rtl"] {
        direction: rtl;
        text-align: right;
      }
      html[lang="ar"],
      html[lang="ar"] body,
      html[lang="ar"] h1, html[lang="ar"] h2, html[lang="ar"] h3, html[lang="ar"] h4, html[lang="ar"] h5, html[lang="ar"] h6,
      html[lang="ar"] p, html[lang="ar"] a, html[lang="ar"] span, html[lang="ar"] button, html[lang="ar"] li {
        font-family: 'Cairo', system-ui, -apple-system, 'Segoe UI', Tahoma, Arial, sans-serif !important;
      }
      /* Always keep Arthein cursive for the brand logo */
      html[lang="ar"] .header-logo__arthein,
      html[lang="ar"] .hero-brand-arthein,
      html[lang="he"] .header-logo__arthein,
      html[lang="he"] .hero-brand-arthein {
        font-family: 'Arthein', cursive !important;
      }
      html[lang="he"],
      html[lang="he"] body,
      html[lang="he"] h1, html[lang="he"] h2, html[lang="he"] h3, html[lang="he"] h4, html[lang="he"] h5, html[lang="he"] h6,
      html[lang="he"] p, html[lang="he"] a, html[lang="he"] span, html[lang="he"] button, html[lang="he"] li {
        font-family: 'Heebo', 'Inter', system-ui, -apple-system, sans-serif !important;
      }
      html[dir="rtl"] .lang-dropdown-menu {
        right: auto !important;
        left: 0 !important;
      }
      html[dir="rtl"] .lang-dropdown-item {
        text-align: right !important;
      }
      html[dir="rtl"] .header__r {
        margin-right: auto !important;
        margin-left: 0 !important;
      }
      html[dir="rtl"] .header-nav {
        flex-direction: row !important;
      }
      html[dir="rtl"] .btn-icon svg {
        transform: scaleX(-1);
      }
      html[dir="rtl"] .footer-nav__col,
      html[dir="rtl"] .about-item,
      html[dir="rtl"] .combine__item {
        text-align: right !important;
      }
    `;
    document.head.appendChild(style);

    // Watchdog to guarantee body never gets pushed down by Google Translate
    setInterval(() => {
      if (document.body && document.body.style.top && document.body.style.top !== '0px') {
        document.body.style.top = '0px';
      }
      const banner = document.querySelector('.goog-te-banner-frame');
      if (banner) banner.style.display = 'none';
    }, 250);
  }

  // Set Google Translate cookie
  function setGoogleTranslateCookie(gtCode) {
    const value = '/en/' + gtCode;
    const host = window.location.hostname;
    document.cookie = `googtrans=${value}; path=/;`;
    if (host) {
      document.cookie = `googtrans=${value}; path=/; domain=${host};`;
      if (host.includes('.')) {
        document.cookie = `googtrans=${value}; path=/; domain=.${host};`;
      }
    }
  }

  // Apply instant UI translations
  function applyInstantDictionary(langCode) {
    const dict = DICTIONARY[langCode] || DICTIONARY.en;

    // Navbar links
    const navLinks = document.querySelectorAll('.header-nav__link');
    navLinks.forEach(link => {
      const text = link.textContent.trim();
      if (text.includes('Tours') || text.includes('Circuits') || text.includes('الجولات') || text.includes('סיורים')) {
        link.innerHTML = `<span class="color-white-40 mobile-visible-inline">+</span>${dict.nav_tours}`;
        link.classList.add('notranslate');
      } else if (text.includes('Best Trips') || text.includes('Meilleurs') || text.includes('أفضل') || text.includes('המומלצים')) {
        link.innerHTML = `<span class="color-white-40 mobile-visible-inline">+</span>${dict.nav_best}`;
        link.classList.add('notranslate');
      } else if (text.includes('Contact') || text.includes('اتصل') || text.includes('צור קשר')) {
        link.innerHTML = `<span class="color-white-40 mobile-visible-inline">+</span>${dict.nav_contact}`;
        link.classList.add('notranslate');
      }
    });

    // Explore buttons
    const exploreBtns = document.querySelectorAll('.header__accent .button-sm, .hero-main-btn-wrap a:first-child .button-sm');
    exploreBtns.forEach(el => {
      if (el) {
        el.textContent = dict.nav_explore;
        el.classList.add('notranslate');
      }
    });

    // Book trip buttons
    const bookBtns = document.querySelectorAll('.header__button .color-brand-green, [data-wf--button-primary--variant] .color-brand-green');
    bookBtns.forEach(el => {
      if (el) {
        el.textContent = dict.nav_book;
        el.classList.add('notranslate');
      }
    });

    // Hero subtitle
    const heroSub = document.querySelector('.hero-main-subtitle');
    if (heroSub) {
      heroSub.textContent = dict.hero_subtitle;
    }

    // Featured section title
    const featuredTitle = document.querySelector('#retreats .h2, #retreats h2');
    if (featuredTitle) {
      featuredTitle.textContent = dict.featured_title;
    }

    // 3D Gallery title
    const galleryTitle = document.querySelector('.gallery-3d-section h2');
    if (galleryTitle) {
      galleryTitle.textContent = dict.gallery_title;
    }
    const gallerySub = document.querySelector('.gallery-3d-section p');
    if (gallerySub) {
      gallerySub.textContent = dict.gallery_sub;
    }

    // Reels title
    const reelsTitle = document.querySelector('#reels-section h2');
    if (reelsTitle) {
      reelsTitle.textContent = dict.reels_title;
    }
    const reelsSub = document.querySelector('#reels-section p');
    if (reelsSub) {
      reelsSub.textContent = dict.reels_sub;
    }
  }

  // Change Language
  function setLanguage(code, triggerGT = true) {
    const lang = LANGUAGES.find(l => l.code === code) || LANGUAGES[0];
    localStorage.setItem(STORAGE_KEY, lang.code);

    // Direction and language attributes
    document.documentElement.setAttribute('lang', lang.code);
    document.documentElement.setAttribute('dir', lang.dir);
    if (lang.dir === 'rtl') {
      document.documentElement.classList.add('lang-rtl');
      document.body && document.body.classList.add('lang-rtl');
    } else {
      document.documentElement.classList.remove('lang-rtl');
      document.body && document.body.classList.remove('lang-rtl');
    }

    protectBrandNames();
    updateSwitcherUI(lang);
    applyInstantDictionary(lang.code);

    // Trigger Google Translate
    setGoogleTranslateCookie(lang.gtCode);

    if (triggerGT) {
      const gtCombo = document.querySelector('.goog-te-combo');
      if (gtCombo) {
        gtCombo.value = lang.gtCode;
        gtCombo.dispatchEvent(new Event('change'));
      } else if (window.google && window.google.translate) {
        window.location.reload();
      }
    }
  }

  // Update switcher UI state
  function updateSwitcherUI(lang) {
    const wrappers = document.querySelectorAll('.lang-switcher-wrap');
    wrappers.forEach(wrap => {
      const flagBox = wrap.querySelector('.lang-flag-box');
      const codeSpan = wrap.querySelector('.lang-code');
      if (flagBox) flagBox.innerHTML = FLAGS[lang.code] || FLAGS.en;
      if (codeSpan) codeSpan.textContent = lang.code.toUpperCase();

      const items = wrap.querySelectorAll('.lang-dropdown-item');
      items.forEach(item => {
        if (item.getAttribute('data-lang') === lang.code) {
          item.classList.add('is-active');
        } else {
          item.classList.remove('is-active');
        }
      });
    });

    const mobileBtns = document.querySelectorAll('.mobile-lang-btn');
    mobileBtns.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang.code) {
        btn.classList.add('is-active');
      } else {
        btn.classList.remove('is-active');
      }
    });
  }

  // Create Desktop Switcher
  function createDesktopSwitcher(currentLang) {
    const wrap = document.createElement('div');
    wrap.className = 'lang-switcher-wrap notranslate';
    wrap.id = 'kechtg-lang-switcher';

    wrap.innerHTML = `
      <button type="button" class="lang-switcher-btn" aria-haspopup="true" aria-expanded="false" title="Language / Langue / اللغة">
        <span class="lang-flag-box">${FLAGS[currentLang.code]}</span>
        <span class="lang-code">${currentLang.code.toUpperCase()}</span>
        <svg class="lang-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="lang-dropdown-menu" role="menu">
        ${LANGUAGES.map(l => `
          <button type="button" class="lang-dropdown-item ${l.code === currentLang.code ? 'is-active' : ''}" data-lang="${l.code}">
            <span class="item-flag">${FLAGS[l.code]}</span>
            <span class="item-name">${l.native}</span>
          </button>
        `).join('')}
      </div>
    `;

    const btn = wrap.querySelector('.lang-switcher-btn');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      wrap.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', wrap.classList.contains('is-open'));
    });

    wrap.querySelectorAll('.lang-dropdown-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const code = item.getAttribute('data-lang');
        wrap.classList.remove('is-open');
        setLanguage(code, true);
      });
    });

    document.addEventListener('click', () => {
      wrap.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    });

    return wrap;
  }

  // Create Mobile Drawer Switcher
  function createMobileSwitcher(currentLang) {
    const wrap = document.createElement('div');
    wrap.className = 'mobile-lang-wrap notranslate';
    wrap.innerHTML = LANGUAGES.map(l => `
      <button type="button" class="mobile-lang-btn ${l.code === currentLang.code ? 'is-active' : ''}" data-lang="${l.code}">
        <span>${FLAGS[l.code]}</span>
        <span>${l.native}</span>
      </button>
    `).join('');

    wrap.querySelectorAll('.mobile-lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const code = btn.getAttribute('data-lang');
        setLanguage(code, true);
      });
    });

    return wrap;
  }

  // Mount Switchers
  function mountSwitchers() {
    const currentCode = localStorage.getItem(STORAGE_KEY) || 'en';
    const currentLang = LANGUAGES.find(l => l.code === currentCode) || LANGUAGES[0];

    // Mount on Desktop Header
    const headerR = document.querySelector('.header__r');
    if (headerR && !document.getElementById('kechtg-lang-switcher')) {
      const desktopSwitcher = createDesktopSwitcher(currentLang);
      const accent = headerR.querySelector('.header__accent');
      if (accent) {
        headerR.insertBefore(desktopSwitcher, accent);
      } else {
        headerR.appendChild(desktopSwitcher);
      }
    }

    // Mount on Mobile Menu
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu && !mobileMenu.querySelector('.mobile-lang-wrap')) {
      const mobileSwitcher = createMobileSwitcher(currentLang);
      const nav = mobileMenu.querySelector('.header-nav');
      if (nav && nav.nextSibling) {
        mobileMenu.insertBefore(mobileSwitcher, nav.nextSibling);
      } else {
        mobileMenu.appendChild(mobileSwitcher);
      }
    }

    setLanguage(currentCode, false);
  }

  // Mount Google Translate Element in Background
  function initGoogleTranslate() {
    if (!document.getElementById('google_translate_element')) {
      const gtDiv = document.createElement('div');
      gtDiv.id = 'google_translate_element';
      gtDiv.style.display = 'none';
      document.body.appendChild(gtDiv);
    }

    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,fr,ar,iw',
        autoDisplay: false
      }, 'google_translate_element');

      setTimeout(() => {
        const savedLang = localStorage.getItem(STORAGE_KEY) || 'en';
        const lang = LANGUAGES.find(l => l.code === savedLang);
        if (lang && lang.gtCode !== 'en') {
          const select = document.querySelector('.goog-te-combo');
          if (select && select.value !== lang.gtCode) {
            select.value = lang.gtCode;
            select.dispatchEvent(new Event('change'));
          }
        }
      }, 500);
    };

    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }
  }

  function init() {
    protectBrandNames();
    injectStyles();
    mountSwitchers();
    initGoogleTranslate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
