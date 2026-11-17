const fs = require('fs');
const content = fs.readFileSync('temp_hero_video_request.txt', 'utf8');
const marker1 = 'hero-video.tsx';
const idx1 = content.indexOf(marker1);
const marker2 = 'demo.tsx';
const idx2 = content.indexOf(marker2);

if (idx1 !== -1 && idx2 !== -1) {
  let code = content.substring(idx1 + marker1.length, idx2).trim();
  // Change motion/react to framer-motion if needed or keep motion/react
  fs.writeFileSync('components/ui/hero-video.tsx', code);
  console.log('Saved hero-video.tsx, length:', code.length);
} else {
  console.error('Markers not found', idx1, idx2);
}
