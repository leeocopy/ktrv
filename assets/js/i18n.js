/**
 * Kech Travel Game - Multilingual Human-Quality Translation Engine
 * Supported Languages:
 *   - English (en): Luxury Moroccan Travel Copywriting
 *   - French (fr): Français Élégant - Style Conciergerie Privée & Agence de Luxe
 *   - Arabic (ar): العربية الفصحى الراقية - وكالة أسفار وسياحة خاصة بالمغرب
 *   - Hebrew (he): עברית מקצועית ורהוטה - תיירות וסיורי יוקרה במרוקו
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'kechtg_lang';

  // Crisp High-Resolution SVG Flags
  const FLAGS = {
    en: `<svg class="lang-flag-svg" width="20" height="15" viewBox="0 0 640 480" style="border-radius:2px;box-shadow:0 0 1px rgba(0,0,0,0.5);display:block;"><path fill="#012169" d="M0 0h640v480H0z"/><path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/><path fill="#C8102E" d="m424 281 216 159v40L369 281h55zm-104 20 6 30L84 480H0l220-164 100-15zm104-122 216-160V0L370 179h54zM84 0 0 62v-2l220 164 104-15L104 0H84z"/><path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/><path fill="#C8102E" d="M272 0v480h96V0h-96zM0 192v96h640V192H0z"/></svg>`,
    fr: `<svg class="lang-flag-svg" width="20" height="15" viewBox="0 0 640 480" style="border-radius:2px;box-shadow:0 0 1px rgba(0,0,0,0.5);display:block;"><path fill="#002654" d="M0 0h213.3v480H0z"/><path fill="#FFF" d="M213.3 0h213.4v480H213.3z"/><path fill="#CE1126" d="M426.7 0H640v480H426.7z"/></svg>`,
    ar: `<svg class="lang-flag-svg" width="20" height="15" viewBox="0 0 640 480" style="border-radius:2px;box-shadow:0 0 1px rgba(0,0,0,0.5);display:block;"><path fill="#c1272d" d="M0 0h640v480H0z"/><path fill="none" stroke="#006233" stroke-width="12" d="m320 160 58.8 181-153.9-111.9h190.2L261.2 341z"/></svg>`,
    he: `<svg class="lang-flag-svg" width="20" height="15" viewBox="0 0 640 480" style="border-radius:2px;box-shadow:0 0 1px rgba(0,0,0,0.5);display:block;"><path fill="#fff" d="M0 0h640v480H0z"/><path fill="#0038b8" d="M0 60h640v60H0zm0 300h640v60H0z"/><path fill="none" stroke="#0038b8" stroke-width="12" d="m320 170 86.6 150H233.4zm0 140 86.6-150H233.4z"/></svg>`
  };

  const LANGUAGES = [
    { code: 'en', name: 'English', native: 'English', dir: 'ltr' },
    { code: 'fr', name: 'Français', native: 'Français', dir: 'ltr' },
    { code: 'ar', name: 'العربية', native: 'العربية', dir: 'rtl' },
    { code: 'he', name: 'עברית', native: 'עברית', dir: 'rtl' }
  ];

  const COACHES_DATA = [
  // 0: Merzouga
  {
    title: {
      en: "3-Day Merzouga Sahara Luxury Expedition",
      fr: "Expédition Luxe 3 Jours au Sahara de Merzouga",
      ar: "رحلة 3 أيام إلى صحراء مرزوكة مع مخيم فاخر",
      he: "משלחת יוקרה ל-3 ימים במדבר מרזוגה"
    },
    sub: {
      en: "Desert Safari & Luxury Berber Camp",
      fr: "Safari Désert & Bivouac Berbère de Prestige",
      ar: "سفاري الصحراء ومخيم بربري فاخر",
      he: "ספארי מדברי ומאהל ברברי יוקרתי"
    },
    loc: {
      en: "Merzouga Sahara & Erg Chebbi",
      fr: "Sahara de Merzouga & Erg Chebbi",
      ar: "صحراء مرزوكة وكثبان عرق الشبي",
      he: "מדבר מרזוגה ודיונות ארג צ'בי"
    },
    desc: {
      en: "Our #1 most requested expedition. Cross the High Atlas Mountains via Tizi n Tichka, explore Ksar Ait Ben Haddou, and ride camels into the sunset dunes of Erg Chebbi for an unforgettable night in a luxury tent under starry skies.",
      fr: "Notre expédition n°1 la plus plébiscitée. Traversez le Haut Atlas par le col du Tizi n'Tichka, explorez le Ksar d'Aït Ben Haddou et partez à dos de dromadaire au coucher du soleil dans les dunes de l'Erg Chebbi pour une nuit magique sous une tente nomade de grand luxe.",
      ar: "رحلتنا الأكثر طلباً وإعجاباً. اعبروا جبال الأطلس الكبير عبر ممر تيزي نتيشكا، واكتشفوا قصر آيت بن حدو، ثم امتطوا الجمال وسط كثبان عرق الشبي الذهبية عند الغروب لقضاء ليلة أسطورية في خيمة ملكية فاخرة تحت السماء المرصعة بالنجوم.",
      he: "המסע המבוקש והאהוב ביותר שלנו. חצו את הרי האטלס הגבוה דרך מעבר טיזי נ'טישקה, חקרו את קסאר אייט בן חדו ההיסטורי, ורכבו על גמלים אל עבר שקיעת הזהב בדיונות ארג צ'בי, ללילה בלתי נשכח באוהל יוקרה מפואר תחת שמי כוכבים."
    },
    duration: {
      en: "3 Days / 2 Nights",
      fr: "3 Jours / 2 Nuits",
      ar: "3 أيام / ليلتان",
      he: "3 ימים / 2 לילות"
    },
    rating: {
      en: "4.98 ★ (380+ Reviews)",
      fr: "4.98 ★ (380+ avis)",
      ar: "4.98 ★ (أكثر من 380 تقييم)",
      he: "4.98 ★ (380+ חוות דעת)"
    }
  },
  // 1: Agafay
  {
    title: {
      en: "Agafay Desert Sunset Dinner & Quad Safari",
      fr: "Dîner au Coucher du Soleil & Safari Quad à Agafay",
      ar: "عشاء غروب الشمس في صحراء أكافاي مع سفاري كواد",
      he: "ארוחת ערב בשקיעה וספארי טרקטורונים במדבר אגאפאי"
    },
    sub: {
      en: "Sunset Adventure & Candlelit Dinner",
      fr: "Aventure au Crépuscule & Dîner aux Chandelles",
      ar: "مغامرة عند الغروب وعشاء على أضواء الشموع",
      he: "הרפתקת שקיעה וארוחת ערב רומנטית לאור נרות"
    },
    loc: {
      en: "Agafay Desert, Marrakech",
      fr: "Désert d'Agafay, Marrakech",
      ar: "صحراء أكافاي، مراكش",
      he: "מדבר אגאפאי, מרקש"
    },
    desc: {
      en: "The ultimate desert evening just 45 minutes from Marrakech. Experience thrilling quad biking over rolling stone dunes, a gentle sunset camel ride, and a gourmet 4-course Moroccan dinner accompanied by live gnawa music around a roaring campfire.",
      fr: "La soirée désert ultime à seulement 45 minutes de Marrakech. Vivez les sensations fortes du quad sur les collines minérales, une balade paisible à dos de dromadaire au crépuscule et un dîner gastronomique marocain en 4 services au son de la musique gnaoua autour d'un grand feu de camp.",
      ar: "الأمسية الصحراوية المثالية على بعد 45 دقيقة فقط من مراكش. استمتعوا بقيادة الكواد المثيرة فوق التلال الحجرية الساحرة، وجولة هادئة على ظهور الجمال وقت الغروب، تليها وجبة مغربية فاخرة من 4 أطباق على ألحان كناوة الحية حول نار المخيم الدافئة.",
      he: "ערב מדברי מושלם במרחק 45 דקות בלבד ממרקש. חווית נהיגת טרקטורונים מלאת אדרנלין על גבעות האבן, רכיבה שלווה על גמלים בשקיעה, וארוחת גורמה מרוקאית בת 4 מנות לצלילי מוזיקת גנאווה חיה סביב המדורה."
    },
    duration: {
      en: "Half-Day / Sunset",
      fr: "Demi-journée / Coucher du soleil",
      ar: "نصف يوم / وقت الغروب",
      he: "חצי יום / שעת השקיעה"
    },
    rating: {
      en: "4.96 ★ (290+ Reviews)",
      fr: "4.96 ★ (290+ avis)",
      ar: "4.96 ★ (أكثر من 290 تقييم)",
      he: "4.96 ★ (290+ חוות דעת)"
    }
  },
  // 2: Chefchaouen
  {
    title: {
      en: "Chefchaouen The Blue Pearl Day Escape",
      fr: "Chefchaouen : Escapade d'une Journée dans la Perle Bleue",
      ar: "شفشاون: رحلة يوم كامل إلى الجوهرة الزرقاء",
      he: "שפשאוון: יום טיול לפנינה הכחולה"
    },
    sub: {
      en: "Cultural Heritage & Photography",
      fr: "Patrimoine Culturel & Photographie",
      ar: "تراث ثقافي وفنون التصوير",
      he: "מורשת תרבותית וצילום פנורמי"
    },
    loc: {
      en: "Chefchaouen, Rif Mountains",
      fr: "Chefchaouen, Montagnes du Rif",
      ar: "شفشاون، جبال الريف",
      he: "שפשאוון, הרי הריף"
    },
    desc: {
      en: "Step into a world of enchanting shades of blue. Wander through peaceful car-free medina alleys, photograph iconic doorways, visit artisan leather & textile ateliers, and hike to the Spanish Mosque for panoramic mountain sunset vistas.",
      fr: "Entrez dans un monde féérique aux mille nuances de bleu. Flânez dans les ruelles piétonnes et sereines de la médina, photographiez les portes andalouses légendaires, visitez les ateliers d'artisans du cuir et montez à la Mosquée Espagnole pour un panorama spectaculaire au coucher du soleil.",
      ar: "انغمسوا في عالم ساحر بدرجات اللون الأزرق. تجولوا في أزقة المدينة العتيقة الهادئة والخالية من السيارات، التقطوا صوراً للأبواب الأندلسية التاريخية، زوروا ورشات الجلد والنسيج التقليدية، واصعدوا نحو المسجد الإسباني لمشاهدة بانوراما الغروب الأخاذة.",
      he: "היכנסו אל עולם קסום של גווני כחול מרגיעים. שוטטו בסמטאות המדינה הציוריות ללא כלי רכב, צלמו שערים עתיקים ואותנטיים, בקרו בסדנאות אומני עור וטקסטיל מסורתיות, ועלו אל המסגד הספרדי לתצפית שקיעה פנורמית מעוצרת נשימה."
    },
    duration: {
      en: "Full-Day Private Trip",
      fr: "Circuit Privé Journée Entière",
      ar: "رحلة خاصة ليوم كامل",
      he: "טיול פרטי ליום שלם"
    },
    rating: {
      en: "4.95 ★ (220+ Reviews)",
      fr: "4.95 ★ (220+ avis)",
      ar: "4.95 ★ (أكثر من 220 تقييم)",
      he: "4.95 ★ (220+ חוות דעת)"
    }
  },
  // 3: High Atlas & Ourika
  {
    title: {
      en: "High Atlas Mountains & Ourika Valley Trek",
      fr: "Haut Atlas & Randonnée dans la Vallée de l'Ourika",
      ar: "جبال الأطلس الكبير ومسار وادي أوريكا الخلاب",
      he: "הרי האטלס הגבוה ומסלול עמק אוריקה"
    },
    sub: {
      en: "Scenic Peaks & Berber Culture",
      fr: "Sommets Majestueux & Culture Berbère",
      ar: "قمم ساحرة وثقافة بربرية أصيلة",
      he: "פסגות מרהיבות ותרבות ברברית שורשית"
    },
    loc: {
      en: "High Atlas & Setti Fatma",
      fr: "Haut Atlas & Setti Fatma",
      ar: "الأطلس الكبير وستي فاطمة",
      he: "האטלס הגבוה וסטי פאטמה"
    },
    desc: {
      en: "Escape the city into pristine mountain valleys. Visit authentic Berber stone houses, enjoy fresh organic mint tea with local families, and hike with our mountain guide to the famous cascading waterfalls of Setti Fatma before a riverside tagine lunch.",
      fr: "Échappez-vous de la ville pour explorer des vallées montagneuses préservées. Poussez la porte de maisons berbères en pisé, dégustez un thé à la menthe bio avec des familles locales et marchez vers les cascades de Setti Fatma avant un déjeuner tajine savoureux au bord de l'eau.",
      ar: "اهربوا من صخب المدينة إلى سكون الوديان الجبلية العذراء. زوروا منازل بربرية حجرية تقليدية، وتذوقوا الشاي بالنعناع مع العائلات المحلية، ثم انطلقوا في مسار مشي رفقة مرشدنا الجبلي نحو شلالات ستي فاطمة قبل الاستمتاع بغداء طاجين شهي على ضفاف الوادي.",
      he: "בריחה מושלמת מהעיר אל עמקים הרריים פראיים. בקרו בבתי אבן ברבריים מסורתיים, שתו תה נענע טרי עם משפחות מקומיות, וצאו למסלול הליכה עם מדריך הרים מוסמך למפלי סטי פאטמה השוצפים לפני ארוחת טאג'ין אותנטית לצד הנחל."
    },
    duration: {
      en: "1 Day Excursion",
      fr: "Excursion d'une Journée",
      ar: "جولة يوم كامل",
      he: "טיול של יום אחד"
    },
    rating: {
      en: "4.93 ★ (195+ Reviews)",
      fr: "4.93 ★ (أكثر من 195 تقييم)",
      ar: "4.93 ★ (أكثر من 195 تقييم)",
      he: "4.93 ★ (195+ חוות דעת)"
    }
  },
  // 4: Essaouira
  {
    title: {
      en: "Essaouira Atlantic Coastal & Medina Retreat",
      fr: "Essaouira : Brise Atlantique, Port Historique & Médina",
      ar: "الصويرة: نسيم الأطلسي، الميناء التاريخي والمدينة العتيقة",
      he: "אסוואירה: בריזה אטלנטית, הנמל והמדינה העתיקה"
    },
    sub: {
      en: "Atlantic Breeze & Argan Forests",
      fr: "Air Marin & Forêts d'Arganiers",
      ar: "هواء المحيط وغابات الأركان",
      he: "רוחות אוקיינוס ויערות ארגן"
    },
    loc: {
      en: "Essaouira Mogador",
      fr: "Essaouira Mogador",
      ar: "الصويرة موغادور",
      he: "אסוואירה מוגדור"
    },
    desc: {
      en: "Discover the relaxed coastal charm of 18th-century Mogador. Stroll along historic Portuguese ramparts, taste freshly grilled seafood straight from the fishing harbor, shop Thuya woodcrafts, and spot tree-climbing goats in the argan groves.",
      fr: "Succombez au charme maritime décontracté de Mogador. Baladez-vous sur les remparts portugais face aux vagues, savourez des poissons grillés ultra-frais sur le port, découvrez les artisans marqueteurs de bois de thuya et observez les fameuses chèvres sur les arganiers.",
      ar: "اكتشفوا سحر موغادور الهادئ وأسوارها التاريخية التي تعود للقرن الثامن عشر. تجولوا على المدافع والأسوار البرتغالية، تذوقوا أشهى الأسماك المشوية الطازجة مباشرة من ميناء الصيد التقليدي، وتسوقوا خشب العرعار النادر وشاهدوا ماعز الأركان الشهير.",
      he: "גלו את קסמה החופי והשליו של מוגדור מן המאה ה-18. טיילו לאורך החומות הפורטוגזיות, טעמו דגים ופירות ים טריים הנצלים ישירות בנמל הדייגים הציורי, רכשו גילופי עץ תויה ייחודיים וחזו בעזים המטפסות על עצי הארגן."
    },
    duration: {
      en: "1 Day Coastal Tour",
      fr: "Circuit Côtier d'une Journée",
      ar: "جولة ساحلية ليوم كامل",
      he: "סיור חופי של יום אחד"
    },
    rating: {
      en: "4.97 ★ (270+ Reviews)",
      fr: "4.97 ★ (270+ avis)",
      ar: "4.97 ★ (أكثر من 270 تقييم)",
      he: "4.97 ★ (270+ חוות דעת)"
    }
  },
  // 5: Imperial Cities
  {
    title: {
      en: "Imperial Cities Tour: Fes, Meknes & Rabat",
      fr: "Villes Impériales : Fès, Meknès, Volubilis & Rabat",
      ar: "جولة المدن الإمبراطورية: فاس، مكناس، وليلي والرباط",
      he: "סיור הערים המלכותיות: פאס, מקנס, ווליביליס ורבאט"
    },
    sub: {
      en: "Royal Dynasties & Ancient Architecture",
      fr: "Dynasties Royales & Architecture Séculaire",
      ar: "سلالات ملكية وعمارة تاريخية أندلسية",
      he: "שושלות מלכותיות וארכיטקטורה עתיקה"
    },
    loc: {
      en: "Fes, Meknes, Volubilis & Rabat",
      fr: "Fès, Meknès, Volubilis & Rabat",
      ar: "فاس، مكناس، وليلي والرباط",
      he: "פאס, מקנס, ווליביליס ורבאט"
    },
    desc: {
      en: "A royal journey across Morocco spiritual capitals. Explore the 1,200-year-old labyrinth of Fes el-Bali, visit the Roman ruins of Volubilis, admire Bab Mansour in Meknes, and discover Hassan Tower in Rabat with dedicated private chauffeur luxury.",
      fr: "Un périple royal à travers les capitales spirituelles du Maroc. Explorez le labyrinthe millénaire de Fès el-Bali, visitez les ruines romaines de Volubilis, admirez la majestueuse porte Bab Mansour à Meknès et la Tour Hassan à Rabat en voiture privée haut de gamme.",
      ar: "رحلة ملكية استثنائية عبر العواصم الروحية للمغرب. استكشفوا أزقة فاس البالي الضاربة في عمق التاريخ منذ 1200 سنة، زوروا الآثار الرومانية الشامخة في وليلي، تأملوا باب المنصور الفخم في مكناس، وتعرفوا على صومعة حسان بالرباط بأعلى درجات الراحة وسائق خاص.",
      he: "מסע מלכותי בבירותיה הרוחניות וההיסטוריות של מרוקו. חקרו את סבך סמטאותיה העתיקות של פאס אל-באלי בת 1,200 השנים, בקרו בעתיקות הרומיות המרשימות של ווליביליס, התפעלו משער באב מנסור במקנס, וגלו את מגדל חסאן ברבאט בליווי נהג פרטי יוקרתי."
    },
    duration: {
      en: "4 Days / 3 Nights",
      fr: "4 Jours / 3 Nuits",
      ar: "4 أيام / 3 ليالٍ",
      he: "4 ימים / 3 לילות"
    },
    rating: {
      en: "4.99 ★ (340+ Reviews)",
      fr: "4.99 ★ (340+ avis)",
      ar: "4.99 ★ (أكثر من 340 تقييم)",
      he: "4.99 ★ (340+ חוות דעת)"
    }
  },
  // 6: Ouzoud Waterfalls
  {
    title: {
      en: "Ouzoud Waterfalls Scenic Canyon Day Excursion",
      fr: "Cascades d'Ouzoud : Excursion d'une Journée dans le Canyon",
      ar: "شلالات أوزود وجولة في الوادي الأطلسي الساحر",
      he: "מפלי אוזוד: יום טיול לקניון המרהיב"
    },
    sub: {
      en: "Natural Wonders & Wildlife",
      fr: "Merveilles Naturelles & Faune Sauvage",
      ar: "عجائب طبيعية وحياة برية جبلية",
      he: "פלאי טבע וחיות בר מקומיות"
    },
    loc: {
      en: "Ouzoud, Middle Atlas",
      fr: "Ouzoud, Moyen Atlas",
      ar: "شلالات أوزود، الأطلس المتوسط",
      he: "אוזוד, האטלס התיכון"
    },
    desc: {
      en: "Be awed by North Africa highest waterfalls plunging 110 meters into dramatic red limestone canyons. Ride traditional wooden boats right up to the roaring cascades, encounter friendly wild Barbary monkeys, and relax in scenic olive grove cafes.",
      fr: "Émerveillez-vous devant les plus hautes cascades d'Afrique du Nord plongeant de 110 mètres dans un canyon d'argile rouge. Embarquez sur de petits bateaux en bois au pied des embruns, saluez les singes magots sauvages et détendez-vous dans les cafés des oliveraies.",
      ar: "انبهروا بأعلى شلالات في شمال إفريقيا بارتفاع 110 أمتار تتدفق نحو مضائق الحجر الجيري الأحمر. اركبوا القوارب الخشبية التقليدية بالقرب من هدير الشلال، التقوا بقردة المكاك البربرية اللطيفة، واستمتعوا بالراحة في مقاهي بساتين الزيتون الهادئة.",
      he: "התפעלו מהמפלים הגבוהים ביותר בצפון אפריקה הצונחים מגובה 110 מטרים אל קניון אבן גיר אדומה עוצר נשימה. שוטו בסירות עץ מסורתיות סמוך למפלים השוצפים, פגשו קופי מקוק ברבריים ידידותיים, ותיהנו מבתי קפה אותנטיים בין מטעי הזיתים."
    },
    duration: {
      en: "1 Day Excursion",
      fr: "Excursion d'une Journée",
      ar: "جولة يوم كامل",
      he: "טיול של יום אחד"
    },
    rating: {
      en: "4.91 ★ (180+ Reviews)",
      fr: "4.91 ★ (180+ avis)",
      ar: "4.91 ★ (أكثر من 180 تقييم)",
      he: "4.91 ★ (180+ חוות דעת)"
    }
  },
  // 7: Ait Ben Haddou
  {
    title: {
      en: "Ait Ben Haddou & Ouarzazate Cinematic Odyssey",
      fr: "Aït Ben Haddou & Ouarzazate : Odyssée Cinématographique",
      ar: "آيت بن حدو وورزازات: ملحمة القلاع والسينما العالمية",
      he: "אייט בן חדו ווארזאזאת: מסע קולנועי בין מבצרים"
    },
    sub: {
      en: "UNESCO Kasbahs & Film Studios",
      fr: "Kasbahs UNESCO & Studios de Cinéma",
      ar: "قصبات التراث العالمي واستوديوهات السينما",
      he: "קסבות אונסק\"ו ואולפני קולנוע בינלאומיים"
    },
    loc: {
      en: "Ouarzazate & Kasbah Trail",
      fr: "Ouarzazate & Route des Kasbahs",
      ar: "ورزازات وطريق القصبات التاريخية",
      he: "וארזאזאת ודרך הקסבות"
    },
    desc: {
      en: "Traverse the dramatic Tizi n Tichka mountain pass to the fortified mudbrick village of Ksar Ait Ben Haddou (UNESCO). Walk filming locations for Gladiator and Lawrence of Arabia, visit Atlas Film Studios, and tour historic Kasbah Taourirt.",
      fr: "Franchissez les panoramas grandioses du Tizi n'Tichka vers le mythique Ksar fortifié d'Aït Ben Haddou (classé UNESCO). Arpentez les décors réels de Gladiator et Lawrence d'Arabie, visitez les célèbres Studios Atlas et l'imposante Kasbah de Taourirt.",
      ar: "اعبروا ممر تيزي نتيشكا المهيب نحو قرية قصر آيت بن حدو الطينية المحصنة (المصنفة ضمن تراث اليونسكو). تجولوا في مواقع تصوير فيلم Gladiator وLawrence of Arabia، وزوروا استوديوهات أطلس العالمية وقصبة تاوريرت التاريخية في هوليوود إفريقيا.",
      he: "חצו את מעבר טיזי נ'טישקה המרשים אל עבר כפר הבוץ המבוצר קסאר אייט בן חדו (אתר מורשת עולמית של אונסק\"ו). טיילו באתרי הצילום של הסרטים 'גלדיאטור' ו'לורנס איש ערב', בקרו באולפני הסרטים 'אטלס' ובקסבת טאורירת ההיסטורית."
    },
    duration: {
      en: "1 Day Mountain Tour",
      fr: "Circuit Montagne d'une Journée",
      ar: "جولة جبلية ليوم كامل",
      he: "סיור הררי של יום אחד"
    },
    rating: {
      en: "4.94 ★ (230+ Reviews)",
      fr: "4.94 ★ (230+ avis)",
      ar: "4.94 ★ (أكثر من 230 تقييم)",
      he: "4.94 ★ (230+ חוות דעת)"
    }
  },
  // 8: Marrakech Secret Medina
  {
    title: {
      en: "Marrakech Secret Medina & Palaces VIP Walk",
      fr: "Trésors Cachés de la Médina & Palais Secrets VIP",
      ar: "أسرار مدينة مراكش العتيقة وقصورها التاريخية VIP",
      he: "סודות המדינה והארמונות המלכותיים של מרקש VIP"
    },
    sub: {
      en: "Historical Palaces & Artisan Souks",
      fr: "Palais Royaux & Souks Artisanaux d'Exception",
      ar: "قصور تاريخية وأسواق الصناع التقليديين",
      he: "ארמונות היסטוריים ושווקי אומנים ססגוניים"
    },
    loc: {
      en: "Marrakech Old Medina",
      fr: "Médina Historique de Marrakech",
      ar: "مدينة مراكش العتيقة",
      he: "העיר העתיקה של מרקש"
    },
    desc: {
      en: "Experience Marrakech through the eyes of an insider. Marvel at the intricate zellij tiling of Bahia Palace, the Saadian Tombs, and Ben Youssef Medersa. Stroll secret alleyways, hidden botanical riad gardens, and curated spice & brass workshops.",
      fr: "Vivez Marrakech de l'intérieur comme un invité privilégié. Admirez les zelliges raffinés du Palais Bahia, les Tombeaux Saadiens et la Médersa Ben Youssef. Perdez-vous dans les derbs confidentiels, jardins botaniques secrets et ateliers de dinanderie et d'épices rares.",
      ar: "اكتشفوا مراكش الحقيقية بعيون العارفين بأسرارها. تأملوا إبداع الزليج المغربي في قصر الباهية وقبور السعديين ومدرسة ابن يوسف. تجولوا في الدروب والرياضات السرية الخفية، واكتشفوا ورشات النحاس والتوابل العطرية مع مرشد خبير.",
      he: "חוו את מרקש האמיתית דרך עיני מומחה מקומי. התפעלו מעבודות הזליז' המרהיבות בארמון באהיה, בקברי הסעדים ובמדרסת בן יוסף. שוטטו בסמטאות נסתרות, גנים בוטניים פנימיים בריאדים סודיים, וסדנאות תבלינים ונחושת מובחרות."
    },
    duration: {
      en: "Full-Day Walking Tour",
      fr: "Visite Guidée à Pied Journée Entière",
      ar: "جولة راجلة ليوم كامل",
      he: "סיור רגלי מודרך ליום שלם"
    },
    rating: {
      en: "4.98 ★ (420+ Reviews)",
      fr: "4.98 ★ (420+ avis)",
      ar: "4.98 ★ (أكثر من 420 تقييم)",
      he: "4.98 ★ (420+ חוות דעת)"
    }
  },
  // 9: Dades & Todra
  {
    title: {
      en: "Dades Valley & Todra Gorges Canyon Explorer",
      fr: "Vallée du Dadès & Gorges du Todra : Exploration des Canyons",
      ar: "وادي دادس ومضايق تودغى: استكشاف أعماق الأخاديد الصخرية",
      he: "עמק הדאדס ומצוקי טודרה: מסע בקניונים המדבריים"
    },
    sub: {
      en: "Dramatic Canyons & Oases",
      fr: "Canyons Spectaculaires & Oasis Verdoyantes",
      ar: "أخاديد صخرية عملاقة وواحات نخيل",
      he: "קניונים דרמטיים ונאות מדבר ירוקות"
    },
    loc: {
      en: "Tinghir & Dades Gorges",
      fr: "Tinghir & Gorges du Dadès",
      ar: "تنغير ومضايق دادس",
      he: "טינגיר ומצוקי הדאדס"
    },
    desc: {
      en: "Drive the breathtaking switchbacks of Tisdrine pass and walk between soaring 300-meter vertical canyon walls at Todra Gorge. Discover lush date-palm oases, ancient earthen fortresses, and local Berber weaving cooperatives.",
      fr: "Empruntez les lacets spectaculaires de Tisdrine et marchez au pied des parois rocheuses vertigineuses de 300 mètres des Gorges du Todra. Découvrez des palmeraies luxuriantes, de fières forteresses de terre et des coopératives de tissage berbère.",
      ar: "سافروا عبر منعرجات تيسدرين الجبلية الخاطفة للأنفاس، وتجولوا بين الجدران الصخرية الشاهقة بارتفاع 300 متر في مضايق تودغى. اكتشفوا واحات النخيل الخصبة، والقلاع الطينية الأثرية، وجمعيات النسيج البربري الأصيل.",
      he: "סעו בפיתולי הדרך עוצרי הנשימה של מעבר טיסדרין ולכו בין מצוקי ענק אנכיים בגובה 300 מטרים בקניון טודרה. גלו נאות תמרים שופעות, מבצרי טיט עתיקים וקואופרטיבים אותנטיים של נשות השטיחים הברבריות."
    },
    duration: {
      en: "2 Days / 1 Night",
      fr: "2 Jours / 1 Nuit",
      ar: "يومان / ليلة واحدة",
      he: "יומיים / לילה אחד"
    },
    rating: {
      en: "4.92 ★ (165+ Reviews)",
      fr: "4.92 ★ (165+ avis)",
      ar: "4.92 ★ (أكثر من 165 تقييم)",
      he: "4.92 ★ (165+ חוות דעת)"
    }
  },
  // 10: Zagora
  {
    title: {
      en: "Zagora 2-Day Desert Safari & Draa Valley",
      fr: "Safari Désert 2 Jours à Zagora & Vallée du Draa",
      ar: "رحلة يومين إلى صحراء زاكورة ووادي درعة",
      he: "ספארי מדברי יומיים לזאגורה ועמק הדרע"
    },
    sub: {
      en: "Palm Groves & Nomad Sunset",
      fr: "Palmeraies Infinies & Crépuscule Nomade",
      ar: "واحات النخيل وغروب شمس البدو",
      he: "מטעי דקלים ושקיעה נוודית אותנטית"
    },
    loc: {
      en: "Zagora & Draa Valley",
      fr: "Zagora & Vallée du Draa",
      ar: "زاكورة ووادي درعة",
      he: "זאגורה ועמק הדרע"
    },
    desc: {
      en: "The ideal quick desert safari. Travel through the longest river valley in Morocco with over 2 million date palms, ride camels into the golden dunes of Zagora at dusk, and sleep beneath a canopy of Sahara stars around traditional nomad music.",
      fr: "Le safari express idéal pour goûter au désert. Longez la plus longue vallée du Maroc abritant plus de 2 millions de palmiers dattiers, partez à dos de dromadaire au coucher du soleil dans les dunes de Zagora et dormez sous un ciel étoilé au rythme des chants sahariens.",
      ar: "السفاري الصحراوي السريع والمثالي. اعبروا أطول وادٍ نهري في المغرب بأكثر من مليوني نخلة، امتطوا الجمال نحو كثبان زاكورة الذهبية عند الغسق، وناموا تحت سماء الصحراء الساحرة على أوتار الموسيقى البدوية الأصيلة.",
      he: "הספארי המדברי המהיר והמושלם. סעו לאורך עמק הנהר הארוך ביותר במרוקו המונה מעל 2 מיליון עצי תמר, רכבו על גמלים אל דיונות הזהב של זאגורה בין ערביים, ושנו תחת שמי מדבר זרועי כוכבים לצלילי מוזיקה נוודית."
    },
    duration: {
      en: "2 Days / 1 Night",
      fr: "2 Jours / 1 Nuit",
      ar: "يومان / ليلة واحدة",
      he: "יומיים / לילה אחד"
    },
    rating: {
      en: "4.91 ★ (210+ Reviews)",
      fr: "4.91 ★ (210+ avis)",
      ar: "4.91 ★ (أكثر من 210 تقييم)",
      he: "4.91 ★ (210+ חוות דעת)"
    }
  },
  // 11: Hot Air Balloon
  {
    title: {
      en: "Hot Air Balloon Sunrise Over Atlas Mountains",
      fr: "Vol en Montgolfière au Lever du Soleil sur l'Atlas",
      ar: "منطاد الهواء الساخن عند الشروق فوق جبال الأطلس",
      he: "טיסה בכדור פורח בזריחה מעל הרי האטלס"
    },
    sub: {
      en: "Sunrise Aerial Flight & Berber Breakfast",
      fr: "Vol Panoramique à l'Aube & Petit-Déjeuner Berbère",
      ar: "تحليق جوي مع الفجر وفطور بربري قايدال فاخر",
      he: "טיסה אווירית בזריחה וארוחת בוקר ברברית מפנקת"
    },
    loc: {
      en: "Marrakech Countryside",
      fr: "Campagne de Marrakech & Vue Atlas",
      ar: "ضواحي مراكش وجبال الأطلس",
      he: "מרחבי הטבע סביב מרקש"
    },
    desc: {
      en: "Float gracefully at dawn above peaceful Berber villages and desert foothills with the morning sun illuminating the snow-capped High Atlas range. Complete with a champagne-style celebration, gourmet Caidal tent Berber breakfast, and flight certificate.",
      fr: "Flottez tout en douceur au lever du jour au-dessus des villages berbères et des plaines arides, alors que le soleil embrase les sommets enneigés du Haut Atlas. Couronnez ce vol inoubliable par une coupe festive, un petit-déjeuner berbère raffiné sous tente caïdale et votre certificat de vol.",
      ar: "حلقوا بخفة وهدوء مع شروق الشمس فوق القرى البربرية والتلال الصحراوية بينما تضيء أشعة الصباح قمم الأطلس الشامخة المكسوة بالثلوج. تجربة استثنائية تختتم باحتفال راقٍ، وفطور بربري أصيل داخل خيمة قايدية فخمة، وشهادة طيران تذكارية.",
      he: "רחפו ברוגע ובשלווה עם עלות השחר מעל כפרים ברבריים ונופי מדבר קסומים, כאשר קרני השמש הראשונות מאירות את פסגות האטלס המושלגות. החוויה כוללת חגיגת שמפניה קלאסית, ארוחת בוקר ברברית מלכותית באוהל קאידאל אותנטי ותעודת טיסה אישית."
    },
    duration: {
      en: "Early Morning Tour",
      fr: "Vol Matinal à l'Aurore",
      ar: "جولة الصباح الباكر",
      he: "סיור בוקר מוקדם"
    },
    rating: {
      en: "4.99 ★ (330+ Reviews)",
      fr: "4.99 ★ (330+ avis)",
      ar: "4.99 ★ (أكثر من 330 تقييم)",
      he: "4.99 ★ (330+ חוות דעת)"
    }
  }
];

const VALUES_DATA = [
  {
    title: {
      en: "Honesty",
      fr: "Honnêteté",
      ar: "الصدق والشفافية",
      he: "כנות ויושרה"
    },
    desc: {
      en: "Having the courage to be transparent in our feelings and what we do",
      fr: "Le courage d'une transparence absolue dans nos relations et dans tout ce que nous accomplissons.",
      ar: "الشجاعة في الوضوح والنزاهة الكاملة في كل ما نقدمه ونعد به مسافرينا.",
      he: "האומץ לפעול בשקיפות מלאה, אמינות ונאמנות בכל שירות שאנו מעניקים."
    }
  },
  {
    title: {
      en: "Self-responsibility",
      fr: "Responsabilité",
      ar: "المسؤولية الذاتية",
      he: "אחריות אישית"
    },
    desc: {
      en: "Taking responsibility for our situation in life and not engaging in the blame game",
      fr: "Prendre la pleine responsabilité de la qualité de votre voyage sans jamais faire de compromis.",
      ar: "تحمل المسؤولية الكاملة عن جودة تجاربكم وضمان راحتكم في أدق التفاصيل.",
      he: "לקיחת אחריות מלאה על חוויית הטיול ודאגה לכל פרט ופרט במסירות."
    }
  },
  {
    title: {
      en: "Kindness",
      fr: "Bienveillance",
      ar: "اللطف وحفاوة الاستقبال",
      he: "אדיבות וחום אנושי"
    },
    desc: {
      en: "Show compassion, empathy, and patience to enhance comfort and joy in life.",
      fr: "Cultiver l'empathie, la patience et la chaleureuse hospitalité marocaine pour illuminer chaque instant.",
      ar: "كرم الضيافة المغربية الأصيلة، وحسن الاستماع والصبر لإدخال السرور على قلوبكم.",
      he: "הפגנת אמפתיה, סבלנות ואירוח מרוקאי חם כדי להעניק שלווה ושמחה לכל מטייל."
    }
  },
  {
    title: {
      en: "Dedication",
      fr: "Dévouement",
      ar: "التفاني والشغف",
      he: "מסירות ומחויבות"
    },
    desc: {
      en: "Taking on the challenge of the journey and focus upon the vision we want to manifest",
      fr: "Relever chaque défi avec passion pour faire de votre séjour une réussite mémorable.",
      ar: "التركيز المطلق على تحقيق رؤية رحلتكم بأعلى معايير الإتقان والجودة.",
      he: "התמקדות מלאה בהגשמת חלום המסע שלכם בסטנדרטים הגבוהים ביותר."
    }
  },
  {
    title: {
      en: "Service",
      fr: "Sens du Service",
      ar: "الخدمة الراقية",
      he: "תודעת שירות עילאית"
    },
    desc: {
      en: "Placing our gifts and talents at the services of increasing the loving consciousness of the world",
      fr: "Mettre tout notre savoir-faire et nos talents au service de votre bien-être et de votre émerveillement.",
      ar: "تسخير خبراتنا الميدانية وشبكة علاقاتنا لخدمة راحتكم وسعادتكم.",
      he: "העמדת כל כישורינו, הידע והקשרים שלנו לשירותכם כדי להעניק חוויה בלתי נשכחת."
    }
  },
  {
    title: {
      en: "Beauty",
      fr: "Beauté",
      ar: "عشق الجمال الأصيل",
      he: "אהבת היופי והאותנטיות"
    },
    desc: {
      en: "Expressing openly the core essence that inhabits each one of us",
      fr: "Révéler la splendeur intemporelle des paysages et du patrimoine culturel marocain.",
      ar: "إبراز السحر الطبيعي والثقافي الخالد للمملكة المغربية في أبهى صوره.",
      he: "חשיפת הקסם העמוק, האסתטיקה המרהיבה והתרבות השורשית של מרוקו."
    }
  },
  {
    title: {
      en: "Human Wellbeing",
      fr: "Bien-être Humain",
      ar: "رفاهية وسعادة الإنسان",
      he: "רווחת האדם ושלוות הנפש"
    },
    desc: {
      en: "In the end, we are all in the business of human wellbeing",
      fr: "Au bout du compte, notre mission essentielle est de nourrir votre sérénité et votre joie de vivre.",
      ar: "هدفنا الأسمى هو أن تعودوا بذكريات دافئة وراحة نفسية عميقة تغذي الروح.",
      he: "בסופו של דבר, המטרה שלנו היא שתשובו עם זיכרונות יקרים, שלווה ושמחת חיים."
    }
  },
  {
    title: {
      en: "Travel & track progress",
      fr: "Voyager & se Ressourcer",
      ar: "رحلات تصنع الذكريات",
      he: "מסעות שנשארים בלב"
    },
    desc: {
      en: "Use VITA Journal to reflect and rebook.",
      fr: "Créer des souvenirs impérissables qui vous inspirent et vous invitent à revenir encore et encore.",
      ar: "تجارب ملهمة تبقى حية في ذاكرتكم وتدعوكم للعودة دائماً لاكتشاف المزيد.",
      he: "חוויות מעשירות שמלוות אתכם שנים קדימה ומזמינות אתכם לחזור שוב ושוב."
    }
  }
];


  // Featured Tours Data for Index & Best-Trips
  const INDEX_TOURS = [
    {
      title: {
        en: "3-Day Merzouga Luxury Desert Tour & Camel Trek",
        fr: "Circuit 3 Jours Désert Merzouga Luxe & Dromadaire",
        ar: "رحلة 3 أيام إلى صحراء مرزوكة الفاخرة وركوب الجمال",
        he: "מסע 3 ימים למדבר סהרה מרזוגה היוקרתי ורכיבה על גמלים"
      },
      tag: {
        en: "Merzouga Sahara Desert Luxury Tour",
        fr: "Safari Désert Merzouga & Bivouac de Luxe",
        ar: "سفاري صحراء مرزوكة ومخيم بربري فاخر",
        he: "ספארי יוקרה במדבר מרזוגה ומאהל מפואר"
      },
      duration: {
        en: "3 Days / 2 Nights",
        fr: "3 Jours / 2 Nuits",
        ar: "3 أيام / ليلتان",
        he: "3 ימים / 2 לילות"
      },
      vehicle: {
        en: "Private Luxury SUV / Minivan",
        fr: "Véhicule Privé VIP (1-6+ pers.)",
        ar: "مركبة خاصة VIP (1-6+ أشخاص)",
        he: "רכב VIP פרטי (1-6+ נוסעים)"
      },
      clients: {
        en: "Trusted by 190+ clients worldwide",
        fr: "Plébiscité par +190 voyageurs",
        ar: "نال ثقة أكثر من 190 مسافراً",
        he: "מומלץ על ידי 190+ מטיילים"
      }
    },
    {
      title: {
        en: "High Atlas Mountains, 3 Valleys & Imlil Day Trip",
        fr: "Haut Atlas, 3 Vallées & Village d'Imlil en Privé",
        ar: "جبال الأطلس الكبير، الوديان الثلاثة وإمليل في جولة خاصة",
        he: "הרי האטלס הגבוה, שלושת העמקים וכפר אימליל בסיור פרטי"
      },
      tag: {
        en: "High Atlas Mountains & 3 Valleys",
        fr: "Montagnes du Haut Atlas & 3 Vallées",
        ar: "جبال الأطلس والوديان الثلاثة الساحرة",
        he: "הרי האטלס הגבוה ושלושת העמקים"
      },
      duration: {
        en: "Full Day Private Excursion",
        fr: "Excursion Privée d'une Journée",
        ar: "يوم كامل في جولة خاصة",
        he: "סיור יום פרטי מלא"
      },
      vehicle: {
        en: "Private Chauffeur & Local Guide",
        fr: "Chauffeur Privé & Guide Local Dédié",
        ar: "سائق خاص ومرشد محلي محترف",
        he: "נהג פרטי ומדריך מקומי צמוד"
      },
      clients: {
        en: "Trusted by 125+ clients worldwide",
        fr: "Plébiscité par +125 voyageurs",
        ar: "نال ثقة أكثر من 125 مسافراً",
        he: "מומלץ על ידי 125+ מטיילים"
      }
    },
    {
      title: {
        en: "Agafay Desert Sunset Dinner, Quad & Camel Safari",
        fr: "Désert d'Agafay : Coucher de Soleil, Dîner Spectacle, Quad & Dromadaires",
        ar: "عشاء غروب الشمس في صحراء أگافاي، كواد وركوب الجمال",
        he: "ארוחת ערב בשקיעה במדבר אגאפיי, טרקטורונים ורכיבה על גמלים"
      },
      tag: {
        en: "Agafay Desert Sunset & Quad Adventure",
        fr: "Aventure Coucher de Soleil & Dîner Agafay",
        ar: "مغامرة غروب الشمس وعشاء صحراوي بأگافاي",
        he: "הרפתקת שקיעה וארוחת ערב באגאפיי"
      },
      duration: {
        en: "Half Day Sunset & Dinner",
        fr: "Après-midi & Soirée Dîner Spectacle",
        ar: "نصف يوم: غروب ساحر وعشاء تقليدي",
        he: "אחר הצהריים, שקיעה וארוחת ערב חגיגית"
      },
      vehicle: {
        en: "Quad, Buggy & Camel Experience",
        fr: "Balade en Quad, Buggy & Dromadaire",
        ar: "جولة كواد، باغي وركوب الجمال",
        he: "טרקטורונים, באגי ורכיבה על גמלים"
      },
      clients: {
        en: "Trusted by 312+ clients worldwide",
        fr: "Plébiscité par +312 voyageurs",
        ar: "نال ثقة أكثر من 312 مسافراً",
        he: "מומלץ על ידי 312+ מטיילים"
      }
    },
    {
      title: {
        en: "Marrakech to Essaouira Atlantic Coast Private Tour",
        fr: "Excursion Privée d'une Journée : Marrakech à Essaouira",
        ar: "جولة خاصة من مراكش إلى شواطئ الصويرة الأطلسية",
        he: "סיור פרטי יומי ממרקש לעיר החוף הקסומה אסווירה"
      },
      tag: {
        en: "Essaouira Mogador Private Day Trip",
        fr: "Essaouira Mogador : Côte Atlantique & Médina",
        ar: "الصويرة موغادور: سحر الساحل والمدينة العتيقة",
        he: "אסווירה מוגאדור: חוף אטלנטי ומדינה היסטורית"
      },
      duration: {
        en: "Full Day Coastal Escape",
        fr: "Journée Complète au Bord de l'Océan",
        ar: "يوم كامل على شواطئ الأطلسي",
        he: "יום טיול שלם לחופי האוקיינוס"
      },
      vehicle: {
        en: "Private VIP Transport & Sightseeing",
        fr: "Visite Médina, Port & Coopérative d'Argan",
        ar: "زيارة الميناء، المدينة العتيقة وتعاونيات الأركان",
        he: "ביקור בנמל, במדינה העתיקה ובמפעלי הארגאן"
      },
      clients: {
        en: "Trusted by 412+ clients worldwide",
        fr: "Plébiscité par +412 voyageurs",
        ar: "نال ثقة أكثر من 412 مسافراً",
        he: "מומלץ על ידי 412+ מטיילים"
      }
    },
    {
      title: {
        en: "Hot Air Balloon Sunrise & Traditional Berber Breakfast",
        fr: "Vol en Montgolfière au Lever du Soleil & Petit-Déjeuner Berbère",
        ar: "شروق الشمس بالمنطاد الهوائي وفطور بربري تقليدي",
        he: "כדור פורח בזריחה מעל מרקש וארוחת בוקר ברברית מסורתית"
      },
      tag: {
        en: "Marrakech Sky Adventure",
        fr: "Aventure Aérienne au-dessus de Marrakech",
        ar: "مغامرة في سماء مراكش",
        he: "הרפתקה בשמי מרקש"
      },
      duration: {
        en: "Sunrise Flight & Berber Breakfast",
        fr: "Vol au Lever du Soleil & Petit-Déjeuner",
        ar: "طيران عند الشروق مع فطور أصيل",
        he: "טיסת זריחה מרהיבה וארוחת בוקר"
      },
      vehicle: {
        en: "VIP Hotel Transfers Included",
        fr: "Transferts VIP Hôtel Inclus",
        ar: "شامل النقل الخاص VIP من الفندق",
        he: "כולל הסעות VIP הלוך ושוב מהמלון"
      },
      clients: {
        en: "Trusted by 112+ clients worldwide",
        fr: "Plébiscité par +112 voyageurs",
        ar: "نال ثقة أكثر من 112 مسافراً",
        he: "מומלץ על ידי 112+ מטיילים"
      }
    },
    {
      title: {
        en: "7-Day Grand Morocco Imperial Cities & Sahara Expedition",
        fr: "Grand Circuit 7 Jours : Villes Impériales & Sahara Marocain",
        ar: "الرحلة الكبرى 7 أيام: المدن العتيقة والصحراء المغربية",
        he: "המסע הגדול 7 ימים: ערי המלוכה ומדבר הסהרה במרוקו"
      },
      tag: {
        en: "Grand Morocco Cultural & Desert Circuit",
        fr: "Marrakech, Fès, Merzouga & Chefchaouen",
        ar: "مراكش، فاس، مرزوكة وشفشاون",
        he: "מרקש, פאס, מרזוגה ושפשאוון"
      },
      duration: {
        en: "7 Days / 6 Nights Complete Circuit",
        fr: "Circuit Complet 7 Jours / 6 Nuits",
        ar: "7 أيام / 6 ليالٍ برنامج متكامل",
        he: "7 ימים / 6 לילות מסלול שלם"
      },
      vehicle: {
        en: "Private VIP Minivan & Dedicated Driver",
        fr: "Départs Quotidiens Toute l'Année",
        ar: "رحلات يومية خاصة على مدار السنة",
        he: "יציאות יומיות לאורך כל השנה"
      },
      clients: {
        en: "Trusted by 287+ clients worldwide",
        fr: "Plébiscité par +287 voyageurs",
        ar: "نال ثقة أكثر من 287 مسافراً",
        he: "מומלץ על ידי 287+ מטיילים"
      }
    }
  ];

  // Best Trips Page Tours
  const BEST_TRIPS_TOURS = [
    {
      title: {
        en: "3-Day Merzouga Sahara Luxury Expedition",
        fr: "Expédition 3 Jours au Sahara de Merzouga en Bivouac de Luxe",
        ar: "رحلة 3 أيام إلى صحراء مرزوكة مع إقامة بمخيم فاخر",
        he: "מסע 3 ימים למדבר סהרה מרזוגה במאהל יוקרה"
      },
      tag: {
        en: "Desert Safari & Luxury Berber Camp",
        fr: "Safari Désert & Bivouac Berbère de Charme",
        ar: "سفاري الصحراء ومخيم بربري ساحر",
        he: "ספארי מדברי ומאהל ברברי יוקרתי"
      },
      location: {
        en: "Merzouga Sahara & Erg Chebbi",
        fr: "Sahara de Merzouga & Dunes de l'Erg Chebbi",
        ar: "صحراء مرزوكة وكثبان عرق الشبي الذهبية",
        he: "מדבר מרזוגה ודיונות ארג צ'בי"
      },
      duration: {
        en: "3 Days / 2 Nights",
        fr: "3 Jours / 2 Nuits",
        ar: "3 أيام / ليلتان",
        he: "3 ימים / 2 לילות"
      },
      reviews: {
        en: "(380+ Reviews)",
        fr: "(+380 avis vérifiés)",
        ar: "(+380 تقييم معتمد)",
        he: "(380+ חוות דעת)"
      }
    },
    {
      title: {
        en: "Agafay Desert Sunset Dinner & Quad Safari",
        fr: "Désert d'Agafay : Coucher de Soleil, Dîner aux Chandelles & Quad",
        ar: "عشاء غروب الشمس في صحراء أگافاي، كواد وركوب الجمال",
        he: "ארוחת ערב בשקיעה במדבר אגאפיי וספארי טרקטורונים"
      },
      tag: {
        en: "Sunset Adventure & Candlelit Dinner",
        fr: "Aventure au Crépuscule & Dîner aux Chandelles",
        ar: "مغامرة عند الغروب وعشاء على ضوء الشموع",
        he: "הרפתקת שקיעה וארוחת ערב לאור נרות"
      },
      location: {
        en: "Agafay Desert, Marrakech",
        fr: "Désert d'Agafay, Marrakech",
        ar: "صحراء أگافاي، مراكش",
        he: "מדבר אגאפיי, מרקש"
      },
      duration: {
        en: "Half-Day / Sunset",
        fr: "Demi-Journée / Coucher de Soleil",
        ar: "نصف يوم / غروب الشمس",
        he: "חצי יום / שקיעה"
      },
      reviews: {
        en: "(290+ Reviews)",
        fr: "(+290 avis vérifiés)",
        ar: "(+290 تقييم معتمد)",
        he: "(290+ חוות דעת)"
      }
    },
    {
      title: {
        en: "Chefchaouen The Blue Pearl Day Escape",
        fr: "Chefchaouen : Escapade Privée d'une Journée dans la Perle Bleue",
        ar: "شفشاون: جولة يوم كامل في الجوهرة الزرقاء",
        he: "שפשאוון: בריחה יומית לפנינה הכחולה"
      },
      tag: {
        en: "Cultural Heritage & Photography",
        fr: "Patrimoine Culturel & Photographie",
        ar: "تراث ثقافي وتصوير فوتوغرافي",
        he: "מורשת תרבותית וצילום"
      },
      location: {
        en: "Chefchaouen, Rif Mountains",
        fr: "Chefchaouen, Montagnes du Rif",
        ar: "شفشاون، جبال الريف",
        he: "שפשאוון, הרי הריף"
      },
      duration: {
        en: "Full-Day Private Trip",
        fr: "Journée Complète en Privé",
        ar: "يوم كامل في جولة خاصة",
        he: "סיור יום פרטי מלא"
      },
      reviews: {
        en: "(220+ Reviews)",
        fr: "(+220 avis vérifiés)",
        ar: "(+220 تقييم معتمد)",
        he: "(220+ חוות דעת)"
      }
    },
    {
      title: {
        en: "High Atlas Mountains & Ourika Valley Trek",
        fr: "Haut Atlas & Randonnée dans la Vallée de l'Ourika",
        ar: "جبال الأطلس الكبير ومسار وادي أوريكا الساحر",
        he: "הרי האטלס הגבוה וטרק בעמק אוריקה"
      },
      tag: {
        en: "Scenic Peaks & Berber Culture",
        fr: "Panoramas Grandioses & Culture Berbère",
        ar: "قمم خلابة وثقافة بربرية أصيلة",
        he: "פסגות נוף ותרבות ברברית"
      },
      location: {
        en: "High Atlas & Setti Fatma",
        fr: "Haut Atlas & Setti Fatma",
        ar: "الأطلس الكبير وستي فاطمة",
        he: "האטלס הגבוה וסטי פאטמה"
      },
      duration: {
        en: "1 Day Excursion",
        fr: "Excursion d'une Journée",
        ar: "رحلة يوم كامل",
        he: "טיול יום שלם"
      },
      reviews: {
        en: "(195+ Reviews)",
        fr: "(+195 avis vérifiés)",
        ar: "(+195 تقييم معتمد)",
        he: "(195+ חוות דעת)"
      }
    },
    {
      title: {
        en: "Essaouira Atlantic Coastal & Medina Retreat",
        fr: "Essaouira : Brise Atlantique, Port Historique & Médina",
        ar: "الصويرة: نسيم الأطلسي، الميناء التاريخي والمدينة العتيقة",
        he: "אסווירה: חוף אטלנטי, נמל היסטורי ומדינה קסומה"
      },
      tag: {
        en: "Atlantic Breeze & Argan Forests",
        fr: "Air Marin & Forêts d'Arganiers",
        ar: "هواء المحيط وغابات الأركان",
        he: "בריזת אוקיינוס ויערות ארגאן"
      },
      location: {
        en: "Essaouira Mogador",
        fr: "Essaouira Mogador",
        ar: "الصويرة موغادور",
        he: "אסווירה מוגאדור"
      },
      duration: {
        en: "Full-Day Private Escape",
        fr: "Escapade Privée d'une Journée",
        ar: "يوم استكشافي خاص",
        he: "בריחה יומית פרטית"
      },
      reviews: {
        en: "(310+ Reviews)",
        fr: "(+310 avis vérifiés)",
        ar: "(+310 تقييم معتمد)",
        he: "(310+ חוות דעת)"
      }
    },
    {
      title: {
        en: "Ouzoud Waterfalls & Berber Countryside Excursion",
        fr: "Cascades d'Ouzoud & Immersion dans les Campagnes Berbères",
        ar: "شلالات أوزود وجولة في الطبيعة البربرية الساحرة",
        he: "מפלי אוזוד והרפתקה בנופים הברבריים"
      },
      tag: {
        en: "Cascades & Barbary Macaques",
        fr: "Grandes Cascades & Macaques de Barbarie",
        ar: "شلالات متدفقة وقرود المكاك اللطيفة",
        he: "מפלים מרהיבים וקופי מקוק"
      },
      location: {
        en: "Ouzoud, Middle Atlas",
        fr: "Ouzoud, Moyen Atlas",
        ar: "أوزود، الأطلس المتوسط",
        he: "אוזוד, האטלס התיכון"
      },
      duration: {
        en: "Full-Day Adventure",
        fr: "Journée Aventure Complète",
        ar: "مغامرة يوم كامل",
        he: "הרפתקת יום מלא"
      },
      reviews: {
        en: "(160+ Reviews)",
        fr: "(+160 avis vérifiés)",
        ar: "(+160 تقييم معتمد)",
        he: "(160+ חוות דעת)"
      }
    }
  ];

  // Global String Dictionary for TreeWalker
  const HUMAN_STRINGS = {

    "We've vetted retreats in": {"fr":"Nous avons sélectionné des séjours dans","ar":"لقد صممنا ورافقنا رحلات في","he":"בחרנו בקפידה מסלולים וחוויות ב"},
    "more than 100 countries": {"fr":"plus de 100 destinations d'exception","ar":"أكثر من 100 وجهة ومسار سياحي","he":"יותר מ-100 יעדים מרהיבים"},
    "See for yourself": {"fr":"Voyez par vous-même","ar":"اكتشفوا بأنفسكم","he":"ראו בעצמכם"},
    "Introvert Retreats": {"fr":"Voyages Sérénité & Calme","ar":"رحلات الهدوء والاستجمام","he":"מסעות שלווה ורוגע"},
    "/ 78+ Countries": {"fr":"/ 78+ Régions","ar":"/ أكثر من 78 منطقة","he":"/ 78+ יעדים"},
    "Yoga Retreats": {"fr":"Retraites Yoga & Bien-être","ar":"رحلات اليوغا وتجديد النشاط","he":"סדנאות יוגה ובריאות"},
    "/ 89+ Countries": {"fr":"/ 89+ Régions","ar":"/ أكثر من 89 منطقة","he":"/ 89+ יעדים"},
    "Detox": {"fr":"Séjours Détox & Énergie","ar":"رحلات الديتوكس والطبيعة","he":"חופשות ניקוי רעלים"},
    "/ 56+ Countries": {"fr":"/ 56+ Régions","ar":"/ أكثر من 56 منطقة","he":"/ 56+ יעדים"},
    "Total countries": {"fr":"Destinations & Régions","ar":"وجهة ومنطقة سياحية","he":"יעדים ואזורים"},
    "travelled": {"fr":"explorées","ar":"تم استكشافها","he":"שנחקרו במרוקו"},
    "Total retreats": {"fr":"Voyageurs & Hôtes","ar":"مسافر وسائح","he":"מטיילים מאושרים"},
    "attended": {"fr":"accompagnés","ar":"رافقناهم بكل فخر","he":"שליווינו במסע"},
    "Private Group (1-6+)": {"fr":"Groupe Privé (1 à 6+ pers)","ar":"مجموعة خاصة (1 إلى 6+ أفراد)","he":"קבוצה פרטית (1-6+ נוסעים)"},
    "Private Chauffeur & Guide": {"fr":"Chauffeur & Guide Privés","ar":"سائق ومرشد خاص معتمد","he":"נהג פרטי ומדריך צמוד"},
    "Quad, Buggy & Camel Ride": {"fr":"Quad, Buggy & Balade à Dromadaire","ar":"كواد، باجي وركوب الجمال بالصحراء","he":"טרקטורונים, באגי ורכיבה על גמלים"},
    "(7 days, 6 nights)": {"fr":"(7 jours, 6 nuits)","ar":"(7 أيام، 6 ليالٍ)","he":"(7 ימים, 6 לילות)"},
    "(15 days, 14 nights)": {"fr":"(15 jours, 14 nuits)","ar":"(15 يوماً، 14 ليلة)","he":"(15 ימים, 14 לילות)"},
    "(8 days, 7 nights)": {"fr":"(8 jours, 7 nuits)","ar":"(8 أيام، 7 ليالٍ)","he":"(8 ימים, 7 לילות)"},
    "from $320": {"fr":"dès 320 $","ar":"ابتداءً من 320 $","he":"החל מ-320 $"},
    "Solo": {"fr":"Individuel / Solo","ar":"سفر فردي مخصص","he":"למטיילים יחידים"},
    "Feb 15 - 21, 2026": {"fr":"15 - 21 Fév 2026","ar":"15 - 21 فبراير 2026","he":"15 - 21 בפברואר 2026"},
    "Jan 15 - 21, 2026": {"fr":"15 - 21 Jan 2026","ar":"15 - 21 يناير 2026","he":"15 - 21 בינואר 2026"},
    "March 06 - 20, 2026": {"fr":"06 - 20 Mars 2026","ar":"06 - 20 مارس 2026","he":"06 - 20 במרץ 2026"},
    "April 12 - 20, 2026": {"fr":"12 - 20 Avr 2026","ar":"12 - 20 أبريل 2026","he":"12 - 20 באפריל 2026"},
    "Feb 06 - 14, 2026": {"fr":"06 - 14 Fév 2026","ar":"06 - 14 فبراير 2026","he":"06 - 14 בפברואר 2026"},
    "Jan | Feb | Mar | Apr | May": {"fr":"Jan | Fév | Mar | Avr | Mai","ar":"يناير | فبراير | مارس | أبريل | مايو","he":"ינואר | פברואר | מרץ | אפריל | מאי"},
    "Combine": {"fr":"Créez","ar":"صمّم","he":"הרכיבו"},
    "Retreat": {"fr":"Votre Séjour","ar":"رحلتك","he":"את המסע"},
    "Your Way": {"fr":"À Votre Façon","ar":"على مقاسك","he":"בדרך שלכם"},
    "Design Your Journey": {"fr":"Concevoir Mon Voyage","ar":"صمم رحلتك الخاصة الآن","he":"עיצוב המסע שלי"},
    "From every corner of the globe, travelers choose Kech Travel Game to experience authentic Morocco. Bespoke private tours, luxury desert safaris, and memories to last a lifetime.": {"fr":"Des quatre coins du monde, les voyageurs choisissent Kech Travel Game pour vivre une expérience marocaine authentique. Circuits privés sur mesure, safaris de luxe dans le désert et souvenirs impérissables.","ar":"من جميع بقاع العالم، يختار المسافرون Kech Travel Game لعيش تجربة مغربية أصيلة لا مثيل لها. جولات خاصة على المقاس، سفاري صحراوي فاخر، وذكريات محفورة في القلب مدى الحياة.","he":"מכל קצוות תבל, מטיילים בוחרים ב-Kech Travel Game כדי לחוות את מרוקו האותנטית. סיורים פרטיים בהתאמה אישית, ספארי מדברי יוקרתי וזיכרונות לכל החיים."},
    "What's your name?": {"fr":"Quel est votre nom ?","ar":"ما هو اسمك الكريم؟","he":"מה שמך?"},
    "Enter your email": {"fr":"Entrez votre email","ar":"أدخل بريدك الإلكتروني","he":"הזן את הדוא\"ל שלך"},
    "How can we help you?": {"fr":"Comment pouvons-nous vous aider ?","ar":"كيف يمكننا مساعدتك والتخطيط لرحلتك؟","he":"איך נוכל לעזור לך?"},
    "Thank you! Your submission has been received!": {"fr":"Merci ! Votre demande a été reçue avec succès. Notre équipe vous répondra rapidement.","ar":"شكراً لك! تم استلام رسالتك بنجاح. سيتواصل معك فريقنا في أقرب وقت.","he":"תודה רבה! הודעתך התקבלה בהצלחה. הצוות שלנו יחזור אליך בהקדם."},
    "Oops! Something went wrong while submitting the form.": {"fr":"Oups ! Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous contacter via WhatsApp.","ar":"عذراً! حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى أو مراسلتنا عبر واتساب.","he":"אופס! אירעה שגיאה בעת שליחת הטופס. אנא נסו שוב או פנו אלינו בוואטסאפ."},
    "Thank you!": {"fr":"Merci !","ar":"شكراً جزيلاً !","he":"תודה רבה !"},
    "Your form has been successfully submitted.": {"fr":"Votre demande a été envoyée avec succès.","ar":"تم إرسال نموذجك بنجاح تام.","he":"פנייתך נשלחה בהצלחה רבה."},
    "Please check your email our manager will contact you shortly.": {"fr":"Vérifiez vos emails, notre conseiller vous contactera sous peu.","ar":"يرجى تفقد بريدك الإلكتروني، سيتواصل معك مستشار السفر قريباً.","he":"אנא בדקו את תיבת הדוא\"ל שלכם, נציגנו יחזור אליכם בהקדם."},
    "Go Home": {"fr":"Retour à l'Accueil","ar":"العودة للرئيسية","he":"חזרה לדף הבית"},
    "Home": {"fr":"Accueil","ar":"الرئيسية","he":"דף הבית"},
    "About Retreats": {"fr":"À Propos du Circuit","ar":"عن الرحلة","he":"אודות המסע"},
    "Full Program": {"fr":"Programme Complet","ar":"برنامج الرحلة","he":"תוכנית המסע"},
    "Food": {"fr":"Restauration","ar":"الوجبات المغربية","he":"אוכל וארוחות"},
    "Team": {"fr":"Notre Équipe","ar":"فريق العمل","he":"הצוות שלנו"},
    "Location": {"fr":"Localisation & Trajet","ar":"المسار والمواقع","he":"מיקום ומסלול"},
    "What's Included In This Package": {"fr":"Ce Qui Est Inclus Dans Cette Offre","ar":"ما تشمله هذه الباقة الحصرية","he":"מה כלול בחבילה זו"},
    "What Makes This Retreat Special": {"fr":"Ce Qui Rend Cette Aventure Unique","ar":"ما يجعل هذه الرحلة مميزة","he":"מה מייחד את המסע הזה"},
    "Check-in:": {"fr":"Arrivée :","ar":"تسجيل الوصول:","he":"צ'ק-אין:"},
    "Check-out:": {"fr":"Départ :","ar":"المغادرة:","he":"צ'ק-אאוט:"},
    "6 nights accommodation": {"fr":"6 nuits d'hébergement en Riads & Camps de luxe","ar":"إقامة 6 ليالٍ في رياض ومخيمات صحراوية فاخرة","he":"6 לילות לינה בריאדים ומאהלי יוקרה"},
    "7 nights accommodation": {"fr":"7 nuits d'hébergement d'exception","ar":"إقامة 7 ليالٍ فاخرة مع إفطار مغربي أصيل","he":"7 לילות לינה יוקרתית כולל ארוחת בוקר"},
    "14 Nights Accommodation": {"fr":"14 nuits d'hébergement haut de gamme","ar":"إقامة 14 ليلة فاخرة عبر المدن والصحراء","he":"14 לילות לינה מובחרת ברחבי מרוקו"},
    "3 Nights Accommodation": {"fr":"3 nuits d'hébergement de charme","ar":"إقامة 3 ليالٍ في رياض ومخيم فاخر","he":"3 לילות לינה בריאדים ומאהל יוקרתי"},
    "7 daily delicious and nutritious meals": {"fr":"Repas traditionnels marocains complets chaque jour","ar":"وجبات مغربية يومية لذيذة وصحية ومحضرة بعناية","he":"ארוחות מרוקאיות אותנטיות ובריאות מדי יום"},
    "3 daily delicious and nutritious meals": {"fr":"3 repas gourmands et équilibrés par jour","ar":"3 وجبات يومية شهية من أشهى المأكولات المغربية","he":"3 ארוחות גורמה מרוקאיות עשירות מדי יום"},
    "15 daily delicious and nutritious meals": {"fr":"Pension complète avec spécialités locales raffinées","ar":"إقامة كاملة مع أشهى الأطباق والمأكولات المحلية","he":"אירוח מלא הכולל ארוחות מרוקאיות משובחות"},
    "Water, tea, coffee served throughout the day": {"fr":"Thé à la menthe traditionnel, eau minérale et café à volonté","ar":"شاي مغربي أصيل، مياه معدنية وقهوة طوال اليوم","he":"תה מרוקאי מסורתי, מים מינרליים וקפה חופשי לאורך כל היום"},
    "Daily meditation classes": {"fr":"Moments d'éveil et de contemplation au lever/coucher de soleil","ar":"جلسات تأمل واسترخاء عند شروق وغروب الشمس في الكثبان الرملية","he":"רגעי שלווה והתבוננות בזריחה ובשקיעה בדיונות המדבר"},
    "Specialized workshops": {"fr":"Ateliers découverte de la culture, cuisine et artisanat marocain","ar":"ورشات ثقافية لاكتشاف أسرار الطبخ والتراث والحرف المغربية","he":"סדנאות תרבות להכרת רזי המטבח והמורשת המרוקאית"},
    "Wifi connection": {"fr":"Accès Wi-Fi haut débit inclus","ar":"خدمة إنترنت واي فاي متوفرة","he":"אינטרנט אלחוטי מהיר כלול"},
    "Pre and post retreat support from our team": {"fr":"Accompagnement et conciergerie privée 24/7 avant et pendant le séjour","ar":"دعم واستشارة ومرافقة كونسيرج 24/7 قبل وأثناء رحلتكم","he":"ליווי וקונסיירג' אישי 24/7 לפני ובמהלך כל הטיול"},
    "©All Rights Reserved. Kech Travel Game, 2026": {"fr":"© Tous Droits Réservés. Kech Travel Game, 2026","ar":"© جميع الحقوق محفوظة. Kech Travel Game، 2026","he":"© כל הזכויות שמורות. Kech Travel Game, 2026"},
    "Made by": {"fr":"Conçu avec passion par","ar":"صُمم بكل فخر بواسطة","he":"עוצב באהבה ע\"י"},
    // Nav
    "Tours & Trips": { fr: "Circuits & Voyages", ar: "الجولات والرحلات", he: "סיורים וטיולים" },
    "Best Trips": { fr: "Meilleurs Voyages", ar: "أفضل الرحلات", he: "הטיולים המומלצים" },
    "Contact Us": { fr: "Contactez-nous", ar: "تواصل معنا", he: "צור קשר" },
    "Explore": { fr: "Explorer", ar: "اكتشف", he: "גלה עוד" },
    "Book Your Trip": { fr: "Réserver Votre Voyage", ar: "احجز رحلتك", he: "הזמן את הטיול שלך" },
    "Explore Retreat": { fr: "Découvrir le Circuit", ar: "استكشف الرحلة", he: "פרטי הסיور" },
    "Explore Trips": { fr: "Découvrir les Circuits", ar: "استكشف الرحلات", he: "גלה את הטיולים" },

    // Sections
    "About Us": { fr: "À Propos de Nous", ar: "من نحن", he: "עלינו" },
    "Featured": { fr: "En Vedette", ar: "أبرز الرحلات", he: "נבחרים" },
    "Featured Tours & Trips": { fr: "Circuits & Voyages en Vedette", ar: "أبرز الجولات والرحلات الخاصة", he: "סיורים וטיולים נבחרים" },
    "Customize Your Trip": { fr: "Personnalisez Votre Séjour", ar: "صمم رحلتك حسب رغبتك", he: "הרכיבו את המסע שלכם" },
    "How Kech Travel Game Works": { fr: "Comment Fonctionne Kech Travel Game", ar: "كيف نعمل في Kech Travel Game", he: "איך זה עובד ב-Kech Travel Game" },
    "Worldwide Community": { fr: "Communauté Internationale", ar: "مجتمع مسافرينا حول العالم", he: "קהילת המטיילים הבינלאומית שלנו" },
    "Welcoming Travelers from All Over the World": { fr: "Des Voyageurs Venus du Monde Entier", ar: "نستقبل بحفاوة زوارنا من كافة أنحاء العالم", he: "מקבלים בברכה מטיילים מכל קצוות תבל" },
    "Testimonials": { fr: "Témoignages", ar: "آراء وانطباعات", he: "המלצות וחוויות" },
    "Stories From Our Travelers": { fr: "Les Récits de Nos Voyageurs", ar: "قصص وتجارب من مسافرينا", he: "סיפורים מהשטח של מטיילינו" },
    "Real experiences from travelers who explored Morocco with our private chauffeurs and bespoke itineraries.": {
      fr: "Découvrez les retours authentiques de voyageurs ayant exploré le Maroc avec nos chauffeurs privés et nos circuits sur mesure.",
      ar: "تجارب واقعية لمسافرين استكشفوا روعة المغرب برفقة سائقينا المحترفين وبرامجنا المصممة على المقاس.",
      he: "חוויות אמיתיות ומרגשות ממטיילים שסיירו במרוקו עם הנהגים הפרטיים והמסלולים המותאמים שלנו."
    },

    // Combine
    "Riads & Luxury Camps": { fr: "Riads & Bivouacs de Luxe", ar: "رياض ومخيمات صحراوية فاخرة", he: "ריאדים ומאהלי יוקרה במדבר" },
    "VIP Private Driver": { fr: "Chauffeur Privé VIP", ar: "سائق خاص ومركبات VIP", he: "נהג פרטי צמוד ברכבי VIP" },
    "Desert & Quad Activities": { fr: "Activités Désert & Quad", ar: "أنشطة الصحراء وركوب الكواد", he: "פעילויות מדבר, טרקטורונים וגמלים" },
    "Choose Your": { fr: "Choisissez Votre", ar: "اختر مسار", he: "בחרו את" },
    "Tour": { fr: "Circuit", ar: "رحلتك", he: "הטיול" },
    "Select Luxury": { fr: "Sélectionnez Votre", ar: "حدد إقامتك", he: "בחרו לינה" },
    "Riad & Camp": { fr: "Riad & Camp", ar: "بالرياض والمخيم", he: "בריאד ובמאהל" },
    "Add Transfers &": { fr: "Ajoutez Transferts &", ar: "أضف النقل و", he: "הוסיפו הסעות ו" },
    "Extras": { fr: "Activités", ar: "الأنشطة الإضافية", he: "אטרקציות" },
    "Secure": { fr: "Confirmation", ar: "تأكيد فوري", he: "אישור והזמנה" },
    "Payment": { fr: "Sécurisée", ar: "وآمن", he: "מאובטחת" },

    // How Works
    "Bespoke travel made simple, seamless, and luxurious from start to finish.": {
      fr: "Le voyage sur mesure rendu simple, fluide et raffiné de bout en bout.",
      ar: "تنظيم أسفاركم المصممة بكل بساطة، سلاسة ورفاهية من البداية إلى النهاية.",
      he: "טיול בהתאמה אישית — פשוט, נוח ויוקרתי מהרגע הראשון ועד סוף המסע."
    },
    "Share your": { fr: "Partagez vos", ar: "شاركنا", he: "שתפו אותנו" },
    "wishes": { fr: "envies", ar: "رغباتك وتطلعاتك", he: "בחלומות שלכם" },
    "Receive your": { fr: "Recevez votre", ar: "احصل على", he: "קבלו תוכנית" },
    "custom plan": { fr: "plan sur mesure", ar: "برنامجك المخصص", he: "מסע מותאמת אישית" },
    "Travel with": { fr: "Voyagez avec", ar: "سافر براحة مع", he: "טיילו בראש שקט עם" },
    "private driver": { fr: "chauffeur privé", ar: "سائقك الخاص", he: "נהג פרטי צמוד" },
    "Enjoy authentic": { fr: "Vivez le Maroc", ar: "عش سحر", he: "חוו את מרוקו" },
    "Morocco": { fr: "authentique", ar: "المغرب الحقيقي", he: "האותנטית" },

    // Best Trips Page
    "Best Trips & Excursions": { fr: "Meilleurs Circuits & Excursions", ar: "أفضل الجولات والرحلات الخاصة", he: "הטיולים והאטרקציות המומלצים" },
    "Our Best Curated Moroccan Trips": { fr: "Nos Plus Beaux Circuits d'Exception au Maroc", ar: "أفضل رحلاتنا وجولاتنا الخاصة في المغرب", he: "המסעות המובחרים ביותר שלנו במרוקו" },
    "Duration:": { fr: "Durée :", ar: "المدة:", he: "משך:" },
    "Rating:": { fr: "Note :", ar: "التقييم:", he: "דירוג:" },

    // Contacts
    "Plan Your Moroccan Journey": { fr: "Planifiez Votre Voyage d'Exception au Maroc", ar: "خطط لرحلتك الاستثنائية في المغرب", he: "תכננו את המסע המושלם שלכם במרוקו" },
    "Contact the Kech Travel Game team today!": { fr: "Contactez l'équipe Kech Travel Game dès aujourd'hui !", ar: "تواصل مع فريق Kech Travel Game اليوم !", he: "צרו קשר עם צוות Kech Travel Game עוד היום !" },
    "Email Us": { fr: "Envoyez-nous un Email", ar: "راسلنا عبر الإيميل", he: "שלחו אימייל" },
    "Email": { fr: "Email", ar: "البريد الإلكتروني", he: "דוא\"ל" },
    "Name": { fr: "Votre Nom Complet", ar: "الاسم الكامل", he: "שם מלא" },
    "Send Message": { fr: "Envoyer le Message", ar: "إرسال الرسالة", he: "שלח הודעה" },
    "Submit": { fr: "Envoyer", ar: "إرسال", he: "שלח" },
    "Message": { fr: "Message / Détails de votre projet", ar: "رسالتك / تفاصيل الرحلة المطلوبة", he: "הודעה / פרטי הטיול המבוקש" },

    // Footer & Banner
    "Terms and Conditions": { fr: "Conditions Générales", ar: "الشروط والأحكام", he: "תנאי שימוש" },
    "Privacy Policy": { fr: "Politique de Confidentialité", ar: "سياسة الخصوصية", he: "מדיניות פרטיות" },
    "Quick Links": { fr: "Liens Rapides", ar: "روابط سريعة", he: "קישורים מהירים" },
    "Follow Us": { fr: "Suivez-nous", ar: "تابعنا على", he: "עקבו אחרינו" },
    "Decline": { fr: "Refuser", ar: "رفض", he: "דחייה" },
    "Accept": { fr: "Accepter", ar: "موافق", he: "אישור" },
    "All rights reserved.": { fr: "Tous droits réservés.", ar: "جميع الحقوق محفوظة.", he: "כל הזכויות שמורות." }
  };

  // Helper to normalize string for comparison
  function cleanStr(s) {
    return (s || '')
      .replace(/&amp;/g, '&')
      .replace(/&#x27;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  // Build Reverse Lookup Map
  const REVERSE_LOOKUP = new Map();
  for (const [enKey, transObj] of Object.entries(HUMAN_STRINGS)) {
    REVERSE_LOOKUP.set(cleanStr(enKey), enKey);
    for (const [langCode, val] of Object.entries(transObj)) {
      if (val && typeof val === 'string') {
        REVERSE_LOOKUP.set(cleanStr(val), enKey);
      }
    }
  }

  // Inject Styles
  function injectStyles() {
    if (document.getElementById('kechtg-i18n-styles')) return;

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Heebo:wght@400;500;700;800&display=swap';
    document.head.appendChild(fontLink);

    const style = document.createElement('style');
    style.id = 'kechtg-i18n-styles';
    style.textContent = `
      .lang-switcher-wrap {
        position: relative;
        display: inline-flex;
        align-items: center;
        margin: 0 0.45rem;
        z-index: 1000;
        font-family: inherit;
      }
      .lang-switcher-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(251, 246, 240, 0.95);
        border: 1px solid rgba(12, 73, 66, 0.22);
        color: #0C4942;
        padding: 0.38rem 0.8rem;
        border-radius: 9999px;
        font-size: 0.825rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
        outline: none;
      }
      .lang-switcher-btn:hover,
      .lang-switcher-wrap.is-open .lang-switcher-btn {
        background: #ffffff;
        border-color: #FBA13A;
        color: #0C4942;
        box-shadow: 0 4px 14px rgba(251, 161, 58, 0.28);
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
        min-width: 160px;
        padding: 0.45rem;
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
        gap: 0.7rem;
        padding: 0.55rem 0.8rem;
        border-radius: 8px;
        background: transparent;
        border: none;
        color: #0C4942;
        font-size: 0.875rem;
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

      .mobile-lang-wrap {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justifyContent: center;
        gap: 0.55rem;
        padding: 0.9rem 0;
        margin: 0.5rem 0;
        border-top: 1px solid rgba(12, 73, 66, 0.12);
        border-bottom: 1px solid rgba(12, 73, 66, 0.12);
        width: 100%;
        box-sizing: border-box;
      }
      .mobile-lang-btn {
        display: flex;
        align-items: center;
        justifyContent: flex-start;
        gap: 0.75rem;
        padding: 0.7rem 1rem;
        width: 100%;
        box-sizing: border-box;
        border-radius: 8px;
        background: rgba(12, 73, 66, 0.05);
        border: 1px solid rgba(12, 73, 66, 0.15);
        color: #0C4942;
        font-size: 0.95rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .mobile-lang-btn.is-active {
        background: #0C4942;
        color: #ffffff;
        border-color: #0C4942;
      }

      /* RTL Support */
      html[dir="rtl"] {
        direction: rtl;
        text-align: right;
      }
      html[lang="ar"],
      html[lang="ar"] body,
      html[lang="ar"], html[lang="ar"] * {
        font-family: 'Cairo', system-ui, -apple-system, 'Segoe UI', Tahoma, Arial, sans-serif !important;
        letter-spacing: normal !important;
        word-spacing: normal !important;
      }
      html[lang="ar"] .body-xl, html[lang="ar"] .head__description .body-xl, html[lang="ar"] [data-anim*="desc"] {
        letter-spacing: normal !important;
        font-family: 'Cairo', sans-serif !important;
        line-height: 1.7 !important;
      }
      html[lang="ar"] .header-logo__arthein,
      html[lang="ar"] .hero-brand-arthein,
      html[lang="he"] .header-logo__arthein,
      html[lang="he"] .hero-brand-arthein {
        font-family: 'Arthein', cursive !important;
        direction: ltr !important;
        display: inline-block !important;
      }
      html[lang="he"],
      html[lang="he"] body,
      html[lang="he"] h1, html[lang="he"] h2, html[lang="he"] h3, html[lang="he"] h4, html[lang="he"] h5, html[lang="he"] h6,
      html[lang="he"] p, html[lang="he"] a, html[lang="he"] span, html[lang="he"] button, html[lang="he"] li,
      html[lang="he"] input, html[lang="he"] textarea {
        font-family: 'Heebo', 'Inter', system-ui, -apple-system, sans-serif !important;
        letter-spacing: normal !important;
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
      html[dir="rtl"] .featured-item__properties {
        text-align: right !important;
      }
      @media (max-width: 767px) {
        #kechtg-lang-switcher .lang-code {
          display: none;
        }
        #kechtg-lang-switcher .lang-switcher-btn {
          padding: 0.35rem 0.55rem;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function protectBrandNames() {
    document.documentElement.setAttribute('translate', 'no');
    document.documentElement.classList.add('notranslate');
    if (document.body) {
      document.body.setAttribute('translate', 'no');
      document.body.classList.add('notranslate');
    }
    if (!document.querySelector('meta[name="google"][content="notranslate"]')) {
      const meta = document.createElement('meta');
      meta.name = 'google';
      meta.content = 'notranslate';
      document.head.appendChild(meta);
    }
    const brandSelectors = [
      '.header-logo',
      '.header-logo__arthein',
      '.hero-brand-arthein',
      '.hero-brand-lockup',
      '.footer-logo',
      '.lang-switcher-wrap',
      '.gallery-heading-title',
      '.gallery-heading-desc',
      '#gallery-3d-root'
    ];
    brandSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.classList.add('kechtg-keep');
        el.classList.add('notranslate');
        el.setAttribute('translate', 'no');
      });
    });
  }

  // Recursive DOM translation (handles SplitText-wrapped headings, "+" prefixed links, text nodes)
  const I18N_SKIP = '.kechtg-keep, .lang-switcher-wrap, .mobile-lang-wrap, script, style, noscript, svg, video, #reels-radial-root, #testimonials-root, #gallery-3d-root, #flag-globe-root';

  function lookupTranslation(raw, targetLang) {
    let text = (raw || '').replace(/\s+/g, ' ').trim();
    if (!text) return null;
    let hasPlus = false;
    if (text.startsWith('+')) {
      hasPlus = true;
      text = text.substring(1).trim();
    }
    const key = cleanStr(text);
    if (!REVERSE_LOOKUP.has(key)) return null;
    const enKey = REVERSE_LOOKUP.get(key);
    const trans = HUMAN_STRINGS[enKey];
    if (!trans) return null;
    return { text: targetLang === 'en' ? enKey : (trans[targetLang] || enKey), hasPlus };
  }

  function translateElement(el, targetLang) {
    if (!el || el.nodeType !== 1) return;
    if (el.matches(I18N_SKIP)) return;

    if (el.placeholder) {
      const p = lookupTranslation(el.placeholder, targetLang);
      if (p) el.placeholder = p.text;
    }
    if (el.tagName === 'INPUT' && (el.type === 'submit' || el.type === 'button') && el.value) {
      const v = lookupTranslation(el.value, targetLang);
      if (v) el.value = v.text;
    }

    // Whole-element match (covers SplitText char/word wrappers)
    if (el !== document.body && el.textContent && el.textContent.length < 300 && !el.querySelector('img, input, textarea, select, button, a, ' + I18N_SKIP)) {
      const r = lookupTranslation(el.textContent, targetLang);
      if (r) {
        if (r.hasPlus) {
          const sp = el.querySelector('span');
          const plusHtml = (sp && sp.textContent.trim() === '+') ? sp.outerHTML : '<span class="color-white-40 mobile-visible-inline">+</span>';
          el.innerHTML = plusHtml + r.text;
        } else {
          el.textContent = r.text;
        }
        if (el.hasAttribute('aria-label')) el.removeAttribute('aria-label');
        return;
      }
    }

    Array.from(el.childNodes).forEach(child => {
      if (child.nodeType === 3) {
        const raw = child.textContent;
        if (!raw.trim()) return;
        const r = lookupTranslation(raw, targetLang);
        if (r && !r.hasPlus) {
          const lead = raw.match(/^\s*/)[0];
          const trail = raw.match(/\s*$/)[0];
          child.textContent = lead + r.text + trail;
        }
      } else if (child.nodeType === 1) {
        translateElement(child, targetLang);
      }
    });
  }

  function applyTreeWalkerTranslations(targetLang) {
    translateElement(document.body, targetLang);
    // keep <title> in sync too
  }

  // Precision Overrides for Exact Section & Card Matching
  function applyPrecisionOverrides(targetLang) {
    const isEn = targetLang === 'en';
    const isFr = targetLang === 'fr';
    const isAr = targetLang === 'ar';
    const isHe = targetLang === 'he';

    // 1. Navbar & Header Links (deterministic by href)
    document.querySelectorAll('.header-nav__link, .mobile-menu .header-nav__link').forEach(link => {
      const href = (link.getAttribute('href') || '').toLowerCase();
      if (href.includes('best-trips') || href.includes('coaches')) {
        link.innerHTML = `<span class="color-white-40 mobile-visible-inline">+</span>${
          isFr ? "Meilleurs Voyages" : isAr ? "أفضل الرحلات" : isHe ? "הטיולים המומלצים" : "Best Trips"
        }`;
      } else if (href.includes('contacts')) {
        link.innerHTML = `<span class="color-white-40 mobile-visible-inline">+</span>${
          isFr ? "Contactez-nous" : isAr ? "تواصل معنا" : isHe ? "צור קשר" : "Contact Us"
        }`;
      } else if (href.includes('retreats') || href === '#retreats') {
        link.innerHTML = `<span class="color-white-40 mobile-visible-inline">+</span>${
          isFr ? "Circuits & Voyages" : isAr ? "الجولات والرحلات" : isHe ? "סיורים וטיולים" : "Tours & Trips"
        }`;
      }
    });

    // 2. Buttons
    document.querySelectorAll('.header__accent .button-sm, .hero-main-btn-wrap a:first-child .button-sm').forEach(el => {
      el.textContent = isFr ? "Explorer" : isAr ? "اكتشف" : isHe ? "גלה עוד" : "Explore";
    });

    document.querySelectorAll('.header__button .color-brand-green, [data-wf--button-primary--variant] .color-brand-green, .hero-main-btn-wrap .color-brand-green').forEach(el => {
      el.textContent = isFr ? "Réserver Votre Voyage" : isAr ? "احجز رحلتك" : isHe ? "הזמן את הטיול שלך" : "Book Your Trip";
    });

    // 3. Hero Subtitle
    const heroSub = document.querySelector('.hero-main-subtitle');
    if (heroSub) {
      if (isFr) {
        heroSub.innerHTML = `Votre chauffeur privé et créateur de voyages d'exception au Maroc.<br/>Circuits sur mesure, safaris dans le désert et aventures inoubliables.`;
      } else if (isAr) {
        heroSub.innerHTML = `سائقكم الخاص ومنظم رحلاتكم الفاخرة في المغرب.<br/>جولات مخصصة، سفاري صحراوي ساحر ومغامرات أصيلة لا تُنسى.`;
      } else if (isHe) {
        heroSub.innerHTML = `הנהג הפרטי ומארגן הסיורים היוקרתיים שלכם במרוקו.<br/>מסלולים בהתאמה אישית, ספארי מדברי מרהיב והרפתקאות בלתי נשכחות.`;
      } else {
        heroSub.innerHTML = `Your private driver & tour organizer in Morocco.<br/>Custom trips, desert safaris & unforgettable adventures.`;
      }
    }

    // 4. Featured Section Header Title & Subtitle
    const featuredTitle = document.querySelector('#retreats [data-animation="featured-headline"], #retreats .head__description .h2');
    if (featuredTitle) {
      featuredTitle.textContent = isFr ? "Circuits & Voyages en Vedette" :
                                  isAr ? "أبرز الجولات والرحلات الخاصة" :
                                  isHe ? "סיורים וטיולים נבחרים" :
                                  "Featured Tours & Trips";
    }
    const featuredBadge = document.querySelector('#retreats .head__title .body-md');
    if (featuredBadge) {
      featuredBadge.textContent = isFr ? "En Vedette" :
                                  isAr ? "أبرز الرحلات" :
                                  isHe ? "נבחרים" :
                                  "Featured";
    }
    const featuredSub = document.querySelector('#retreats .column-6 .featured-section__head .body-md, #retreats .column-6 .body-md');
    if (featuredSub) {
      if (isFr) {
        featuredSub.textContent = "Explorez des destinations uniques, des activités exclusives et des expéditions guidées dans le désert, conçues pour vous inspirer.";
      } else if (isAr) {
        featuredSub.textContent = "اكتشفوا وجهات ساحرة، رحلات استكشافية خاصة، وسفاري صحراوي بإشراف نخبة من السائقين والمرشدين المحليين لراحتكم وسعادتكم.";
      } else if (isHe) {
        featuredSub.textContent = "גלו יעדים ייחודיים, פעילויות מרתקות ומסעות מדבר מודרכים שנועדו להעניק לכם השראה וזיכרונות בלתי נשכחים.";
      } else {
        featuredSub.textContent = "Discover unique locations, engaging activities, and expert-led workshops designed to inspire and refresh your spirit.";
      }
    }

    // 5. Featured Cards Precision Mapping on Index
    const featuredItems = document.querySelectorAll('#retreats .featured-item');
    featuredItems.forEach((card, idx) => {
      const data = INDEX_TOURS[idx];
      if (!data) return;

      // Title
      const titleEl = card.querySelector('[data-animation="featured-item-head"], .h4');
      if (titleEl) {
        titleEl.textContent = data.title[targetLang] || data.title.en;
      }

      // Cost -> Contact link for price & trip details
      const costLink = card.querySelector('.featured-item__cost .featured-cost-link');
      if (costLink) {
        costLink.textContent = isFr ? "Contactez-nous pour le tarif et les détails" :
                               isAr ? "تواصل معنا لمعرفة السعر وتفاصيل الرحلة" :
                               isHe ? "צרו קשר לקבלת מחיר ופרטי המסע" :
                               "Contact us for price & trip details";
      }

      // Properties (Tag, Duration, Vehicle, Clients)
      const props = card.querySelectorAll('.featured-item-property');
      if (props[0]) {
        const t0 = props[0].querySelector('.title-xs');
        if (t0) t0.textContent = data.tag[targetLang] || data.tag.en;
      }
      if (props[1]) {
        const t1 = props[1].querySelector('.title-xs');
        if (t1) t1.textContent = data.duration[targetLang] || data.duration.en;
      }
      if (props[2]) {
        const t2 = props[2].querySelector('.title-xs');
        if (t2) t2.textContent = data.vehicle[targetLang] || data.vehicle.en;
      }
      if (props[3]) {
        const t3 = props[3].querySelector('.title-xs');
        if (t3) t3.textContent = data.clients[targetLang] || data.clients.en;
      }

      // Button
      const btnEl = card.querySelector('.featured-item__button .button-sm');
      if (btnEl) {
        btnEl.textContent = isFr ? "Contactez-nous" : isAr ? "تواصل معنا" : isHe ? "צור קשר" : "Contact Us";
      }
    });

    // 6. Best Trips Page Cards Mapping
    const bestCards = document.querySelectorAll('.coaches-person');
    bestCards.forEach((card, idx) => {
      const data = BEST_TRIPS_TOURS[idx];
      if (!data) return;

      const titleEl = card.querySelector('.coaches-person__head .body-lg');
      if (titleEl) {
        titleEl.textContent = data.title[targetLang] || data.title.en;
      }

      const tagEl = card.querySelector('.coaches-person__head .body-sm');
      if (tagEl) {
        tagEl.textContent = data.tag[targetLang] || data.tag.en;
      }

      const locEl = card.querySelector('.coaches-person-info__location .body-sm');
      if (locEl) {
        locEl.textContent = data.location[targetLang] || data.location.en;
      }

      // Duration & Rating in info box
      const infoItems = card.querySelectorAll('.coaches-person-info__item');
      if (infoItems[0]) {
        const dVal = infoItems[0].querySelector('.body-sm');
        if (dVal) dVal.textContent = data.duration[targetLang] || data.duration.en;
      }
      if (infoItems[1]) {
        const rVal = infoItems[1].querySelector('.body-sm');
        if (rVal) rVal.textContent = `4.9${8 - idx} ★ ${data.reviews[targetLang] || data.reviews.en}`;
      }
    });

    // 7. About Us Section
    const aboutHead = document.querySelector('[data-anim="about-head-description"]');
    if (aboutHead) {
      if (isFr) {
        aboutHead.innerHTML = `Bien plus que des voyages :<br/>des expériences qui éveillent l'âme`;
      } else if (isAr) {
        aboutHead.innerHTML = `ليست مجرد رحلات، بل تجارب<br/>تغذي الروح وتلهم الحواس`;
      } else if (isHe) {
        aboutHead.innerHTML = `לא סתם טיולים — חוויות<br/>המעשירות את הגוף והנפש`;
      } else {
        aboutHead.innerHTML = `Not just trips experiences that <br/>nurture body and soul`;
      }
    }

    const aboutPara = document.querySelector('[data-animation="about-head"]');
    if (aboutPara) {
      if (isFr) {
        aboutPara.textContent = "Kech Travel Game est une agence de voyage privée d'exception au Maroc, combinant le confort absolu d'un chauffeur privé VIP et l'exclusivité d'un service de conciergerie locale. Découvrez des itinéraires sur mesure, séjournez dans des camps sahariens de luxe et des riads féeriques, et voyagez en toute sérénité.";
      } else if (isAr) {
        aboutPara.textContent = "كيتش ترافل جيم (Kech Travel Game) هي وكالة أسفار خاصة رائدة في المغرب، تجمع بين راحة السائق الخاص الفاخر وأرقى خدمات الكونسيرج السياحي. نبتكر لكم مسارات مخصصة، وإقامات ساحرة في أرقى مخيمات الصحراء والرياض التاريخية، لتعيشوا سحر المغرب بأعلى درجات الرفاهية والأمان.";
      } else if (isHe) {
        aboutPara.textContent = "קיץ' טרוול גיים (Kech Travel Game) היא סוכנות בוטיק יוקרתית לסיורים פרטיים במרוקו, המשלבת את הנוחות המרבית של נהג צמוד ורכבי פאר עם שירות קונסיירג' מקומי אישי. אנו מעצבים מסלולים מותאמים אישית, לינה במאהלי מדבר יוקרתיים ובריאדים קסומים, ומבטיחים חווית טיול מושלמת ובטוחה.";
      } else {
        aboutPara.textContent = "Kech Travel Game is a premium wellness travel marketplace that blends the ease of booking with the feel of an editorial magazine. Discover curated programs, match them with exceptional stays, and book seamlessly.";
      }
    }

    // 8. Combine Section (Customize Your Trip)
    const combineDesc = document.querySelector('[data-animation="combine-description"]');
    if (combineDesc) {
      if (isFr) {
        combineDesc.innerHTML = `Combinez hébergements d'exception, chauffeur privé VIP <br/>et activités sahariennes en un voyage fluide <br/>avec conciergerie locale dédiée 24h/7.`;
      } else if (isAr) {
        combineDesc.innerHTML = `اجمع بين الإقامة الفاخرة، السائق الخاص المحترف <br/>وأنشطة الصحراء في رحلة متكاملة ومريحة <br/>مع خدمة كونسيرج محلي خاص على مدار الساعة طوال أيام الأسبوع.`;
      } else if (isHe) {
        combineDesc.innerHTML = `שלבו לינה יוקרתית, נהג פרטי צמוד <br/>ואטרקציות מדבר במסע מושלם אחד <br/>בליווי צמוד של שירות קונסיירג' מקומי אישי 24/7.`;
      } else {
        combineDesc.innerHTML = `Combine your stay, private chauffeur, <br/>and desert activities into one seamless <br/>journey with 24/7 dedicated local concierge <br/>support.`;
      }
    }

    // 9. How Works 4 Steps (index.html uses [data-animation="how-works-item-title-*"] & description-*)
    const stepsData = [
      {
        en: { title: "Share your wishes", desc: "Tell us your dates, group size, and dream destinations in Morocco." },
        fr: { title: "Partagez vos envies", desc: "Indiquez-nous vos dates, la taille de votre groupe et vos destinations de rêve au Maroc." },
        ar: { title: "شاركنا رغباتك وتطلعاتك", desc: "أخبرنا بتواريخ سفرك، عدد أفراد مجموعتك والوجهات التي تحلم بزيارتها في المغرب." },
        he: { title: "שתפו אותנו בחלומות שלכם", desc: "ספרו לנו על התאריכים הרצויים, גודל הקבוצה והיעדים שתרצו לגלות במרוקו." }
      },
      {
        en: { title: "Receive your custom plan", desc: "We craft a 100% tailor-made itinerary with transparent pricing." },
        fr: { title: "Recevez votre programme", desc: "Nous concevons un itinéraire 100% sur mesure avec des tarifs clairs et transparents." },
        ar: { title: "احصل على برنامجك المخصص", desc: "نصمم لك برنامجاً مصمماً 100% على مقاسك بأسعار واضحة وشفافة وبدون مفاجآت." },
        he: { title: "קבלו תוכנית מסע אישית", desc: "אנו בונים עבורכם מסלול אישי מושלם עם שקיפות מלאה במחירים." }
      },
      {
        en: { title: "Travel with private driver", desc: "Enjoy modern luxury vehicles and professional local chauffeurs." },
        fr: { title: "Voyagez avec chauffeur privé", desc: "Profitez de véhicules récents tout confort et de chauffeurs professionnels locaux." },
        ar: { title: "سافر براحة مع سائقك الخاص", desc: "استمتع بأسطول مركبات حديث ومريح وسائقين محليين ذوي خبرة وأخلاق عالية." },
        he: { title: "טיילו בראש שקט עם נהג פרטי", desc: "תהנו מרכבי פאר מרווחים וחדשים ומנהגים מקצועיים, אמינים ואדיבים." }
      },
      {
        en: { title: "Enjoy authentic Morocco", desc: "From hidden gems to VIP spots, we take care of everything." },
        fr: { title: "Savourez le Maroc authentique", desc: "Des trésors cachés aux adresses d'exception, nous nous occupons de tout." },
        ar: { title: "عش سحر المغرب الحقيقي", desc: "من المعالم الساحرة إلى الجواهر الخفية، نحن نتكفل بجميع التفاصيل لراحتكم." },
        he: { title: "חוו את מרוקו האותנטית", desc: "מפנינים נסתרות ועד לנקודות היפות ביותר — אנחנו דואגים להכל." }
      }
    ];

    document.querySelectorAll('.how-works-section .how-works-item').forEach((item, idx) => {
      const step = stepsData[idx];
      if (step) {
        const langStep = step[targetLang] || step.en;
        const titleEl = item.querySelector('[data-animation^="how-works-item-title-"], .title-l');
        const descEl = item.querySelector('[data-animation^="how-works-item-description-"], .color-white-50');
        if (titleEl) titleEl.textContent = langStep.title;
        if (descEl) descEl.textContent = langStep.desc;
      }
    });

    // Combine Step labels ("Step")
    document.querySelectorAll('.combine-step__subtitle .title-xs').forEach(el => {
      el.textContent = isFr ? "Étape" : isAr ? "الخطوة" : isHe ? "שלב" : "Step";
    });

    // 10. 3D Photography Showcase
    const gallerySection = document.querySelector('.gallery-3d-section') || document.getElementById('gallery-3d-root');
    if (gallerySection) {
      const gTitle = gallerySection.querySelector('.gallery-heading-title, h2');
      if (gTitle) {
        gTitle.textContent = isAr ? "المملكة المغربية" :
                             isFr ? "Le Royaume du Maroc" :
                             isHe ? "ממלכת מרוקו" :
                             "The Kingdom of Morocco";
      }
      const gSub = gallerySection.querySelector('.gallery-heading-desc, p');
      if (gSub) {
        gSub.textContent = isAr ? "استكشف روعة المناظر الطبيعية الساحرة، والرحلات الخاصة، ولحظات الأصالة في المملكة المغربية." :
                           isFr ? "Explorez des paysages spectaculaires, des expéditions privées et des moments d'exception à travers le Maroc." :
                           isHe ? "גלו נופים מרהיבים, מסעות פרטיים ורגעים אותנטיים בלתי נשכחים ברחבי מרוקו." :
                           "Scroll or drag to navigate through authentic Moroccan landscapes, private expeditions & timeless moments.";
      }
    }

    // 11. Reels Radial Showcase
    const reelsSection = document.getElementById('reels-section');
    if (reelsSection) {
      const rTitle = reelsSection.querySelector('h2');
      if (rTitle) {
        rTitle.textContent = isFr ? "Nos Plus Beaux Moments de Voyage en Vidéo" :
                             isAr ? "شاهدوا قصص رحلاتنا الواقعية" :
                             isHe ? "צפו בסיפורי המסע שלנו בתנועה" :
                             "Watch Our Travel Stories in Motion";
      }
      const rSub = reelsSection.querySelector('p');
      if (rSub) {
        rSub.textContent = isFr ? "Instants authentiques, bivouacs sahariens et sourires capturés sur le vif lors de nos circuits privés." :
                           isAr ? "لحظات ساحرة، سفاري صحراوي وابتسامات حقيقية لمسافرينا تم التقاطها مباشرة من جولاتنا الخاصة." :
                           isHe ? "רגעים אותנטיים, ספארי במדבר וחיוכים אמיתיים של מטיילינו, שצולמו ישירות מהסיורים הפרטיים." :
                           "Authentic moments, desert safaris & genuine traveler smiles captured live on our private tours.";
      }
    }

    // 12. Best Trips Page: Hero, 12 Cards & Values Section
    const isCoachesPage = window.location.pathname.includes('best-trips') || window.location.pathname.includes('coaches') || document.querySelector('.coaches-section');
    if (isCoachesPage) {
      // 12.1 Headline & Subtitle
      const bestBadge = document.querySelector('.head__title .body-md, [data-anim*="coaches-page-title"] .body-md');
      if (bestBadge) {
        bestBadge.textContent = isFr ? "Circuits d'Exception & Excursions Privées" :
                                isAr ? "أفضل الجولات والرحلات الخاصة" :
                                isHe ? "הסיורים והמסעות המובחרים" :
                                "Best Trips & Excursions";
      }

      const bestMainTitle = document.querySelector('[data-anim*="coaches"][class*="h2"], [data-anim*="headline"][class*="h2"], .head__description .h2, .head__description h1, .intro .h1');
      if (bestMainTitle) {
        bestMainTitle.textContent = isFr ? "Nos Plus Beaux Circuits d'Exception au Maroc" :
                                    isAr ? "أفضل رحلاتنا وجولاتنا الخاصة في المغرب" :
                                    isHe ? "המסעות המובחרים ביותר שלנו במרוקו" :
                                    "Our Best Curated Moroccan Trips";
      }

      const bestSub = document.querySelector('[data-anim*="coaches"][class*="body-xl"], [data-anim*="desc"][class*="body-xl"], .head__description .body-xl, .intro .body-xl');
      if (bestSub) {
        bestSub.style.letterSpacing = 'normal';
        bestSub.removeAttribute('aria-label');
        bestSub.removeAttribute('aria-hidden');
        bestSub.innerHTML = isFr ? "Découvrez nos voyages privés les plus plébiscités, nos safaris dans le désert et nos immersions culturelles au Maroc. Itinéraires soignés, confort VIP et authenticité garantie." :
                            isAr ? "اكتشفوا أكثر جولاتنا الخاصة طلباً وإعجاباً، وسفاري الصحراء الساحرة والرحلات الثقافية في المغرب. برامج مصممة بعناية فائقة، راحة وفخامة مع سائق خاص، وتجارب أصيلة نبتكرها بشغف." :
                            isHe ? "גלו את המסעות הפרטיים האהובים והמבוקשים ביותר, ספארי מדברי מרהיב וסיורי תרבות עשירים במרוקו. מסלולים מעוצבים בקפידה, נוחות מקסימלית עם נהג צמוד וחוויות אותנטיות." :
                            "Discover our most celebrated private journeys, desert safaris, and cultural expeditions across Morocco.<br/>Hand-tailored itineraries, luxury chauffeur comfort, and authentic experiences crafted with passion.";
      }

      // 12.2 All 12 Coaches Cards (Visual overlay + Info drawer)
      const coachCards = document.querySelectorAll('.coaches .coaches-person');
      coachCards.forEach((card, idx) => {
        const itemData = COACHES_DATA[idx];
        if (!itemData) return;

        // Visual Head (over photo)
        const vHead = card.querySelector('.coaches-person__head');
        if (vHead) {
          const vTitle = vHead.querySelector('.body-lg');
          const vSub = vHead.querySelector('.body-sm');
          if (vTitle) vTitle.textContent = itemData.title[targetLang] || itemData.title.en;
          if (vSub) vSub.textContent = itemData.sub[targetLang] || itemData.sub.en;
        }

        // Info Drawer
        const info = card.querySelector('.coaches-person-info');
        if (info) {
          const locEl = info.querySelector('.coaches-person-info__location .body-sm');
          if (locEl) locEl.textContent = itemData.loc[targetLang] || itemData.loc.en;

          const headline = info.querySelector('.coaches-person-info__headline');
          if (headline) {
            const hTitle = headline.querySelector('.body-lg');
            const hSub = headline.querySelector('.body-sm');
            if (hTitle) hTitle.textContent = itemData.title[targetLang] || itemData.title.en;
            if (hSub) hSub.textContent = itemData.sub[targetLang] || itemData.sub.en;
          }

          const descEl = info.querySelector('.coaches-person-info__body .color-white-60');
          if (descEl) descEl.textContent = itemData.desc[targetLang] || itemData.desc.en;

          // Footer labels & values (Duration, Rating)
          const footerItems = info.querySelectorAll('.coaches-person-info__item');
          if (footerItems[0]) {
            const lbl = footerItems[0].querySelector('.body-sm');
            const val = footerItems[0].querySelector('.coaches-person-info__item-icon .body-sm');
            if (lbl) lbl.textContent = isFr ? "Durée :" : isAr ? "المدة:" : isHe ? "משך הפעילות:" : "Duration:";
            if (val) val.textContent = itemData.duration[targetLang] || itemData.duration.en;
          }
          if (footerItems[1]) {
            const lbl = footerItems[1].querySelector('.body-sm');
            const val = footerItems[1].querySelector('.coaches-person-info__item-icon .body-sm');
            if (lbl) lbl.textContent = isFr ? "Avis voyageurs :" : isAr ? "التقييم:" : isHe ? "דירוג מטיילים:" : "Rating:";
            if (val) val.textContent = itemData.rating[targetLang] || itemData.rating.en;
          }
        }
      });

      // 12.3 Our Values Section
      const howWorksSection = document.querySelector('.how-works-section');
      if (howWorksSection) {
        const vHeadTitle = howWorksSection.querySelector('[data-animation="how-works-headline"], .h2');
        if (vHeadTitle) {
          vHeadTitle.textContent = isFr ? "Nos Valeurs & Engagements" :
                                   isAr ? "قيمنا ومبادئنا الراسخة" :
                                   isHe ? "ערכי הליבה והחזון שלנו" :
                                   "Our values";
        }
        const vHeadDesc = howWorksSection.querySelector('[data-animation="how-works-description"], .head__description .body-md, .featured-section__head .body-md');
        if (vHeadDesc) {
          vHeadDesc.innerHTML = isFr ? "En tant qu'agence passionnée, notre vocation est d'être un maillon essentiel du bonheur de nos voyageurs. Pour donner vie à cette vision, nous incarnons chaque jour ces principes fondamentaux :" :
                                isAr ? "كفريق وشغف، استلهمنا رسالتنا لنكون حلقة وصل تصنع البهجة والذكريات الجميلة في حياة مسافرينا. ولتجسيد هذه الرؤية على أرض الواقع، نلتزم يومياً بتطبيق هذه المبادئ:" :
                                isHe ? "כחברה, אנו שואבים השראה להיות חוליה מקשרת בשרשרת האושר והשמחה בעולם. כדי להגשים השראה זו בכל מסע ומסע, אנו פועלים לאורם של ערכים אלו:" :
                                "As a company we’ve been inspired to be a link in the chain of <br/>happiness in the world. In order to manifest that inspiration, <br/>we strive to embody these";
        }

        const valueItems = howWorksSection.querySelectorAll('.how-works-item');
        valueItems.forEach((valItem, idx) => {
          const valData = VALUES_DATA[idx % 8];
          if (!valData) return;
          const vTitle = valItem.querySelector('.how-works-item__body .body-md:not(.color-white-50)');
          const vText = valItem.querySelector('.how-works-item__body .color-white-50');
          if (vTitle) vTitle.textContent = valData.title[targetLang] || valData.title.en;
          if (vText) vText.textContent = valData.desc[targetLang] || valData.desc.en;
        });
      }
    }

    // 13. Cookie Banner
    const cookieEl = document.querySelector('.cookie');
    if (cookieEl) {
      const cookieText = cookieEl.querySelector('.cookie__text .body-md-regular');
      if (cookieText) {
        if (isFr) {
          cookieText.innerHTML = 'En cliquant sur « Accepter », vous consentez à l\'utilisation de cookies pour améliorer votre navigation et nos services. Consultez notre <a href="privacy-policy.html" class="link"><span class="color-white">Politique de Confidentialité</span></a>.';
        } else if (isAr) {
          cookieText.innerHTML = 'بالنقر فوق «قبول»، فإنك توافق على استخدام ملفات تعريف الارتباط لتحسين تجربة التصفح وتطوير خدماتنا. راجع <a href="privacy-policy.html" class="link"><span class="color-white">سياسة الخصوصية</span></a> الخاصة بنا.';
        } else if (isHe) {
          cookieText.innerHTML = 'בלחיצה על \'אישור\', הינך מסכים לשימוש בקובצי עוגיות לשיפור הגלישה והשירותים. עיין ב<a href="privacy-policy.html" class="link"><span class="color-white">מדיניות הפרטיות</span></a>.';
        } else {
          cookieText.innerHTML = 'By clicking “Accept”, you agree to the storing of cookies on your device to enhance site navigation, analyze site <br/>usage, and assist in our marketing efforts. View our <a href="privacy-policy.html" class="link"><span class="color-white">Privacy Policy</span></a> for more information.';
        }
      }
      const declineBtn = cookieEl.querySelector('.btn-secondary .button-sm');
      if (declineBtn) {
        declineBtn.textContent = isFr ? "Refuser" : isAr ? "رفض" : isHe ? "דחה" : "Decline";
      }
      const acceptBtn = cookieEl.querySelector('.btn-primary .button-sm');
      if (acceptBtn) {
        acceptBtn.textContent = isFr ? "Accepter" : isAr ? "قبول" : isHe ? "אישור" : "Accept";
      }
    }
  
    // 14. Statistic Ticker Section (Index)
    const statBadge = document.querySelector('.statistic-section .head__title .body-md');
    if (statBadge) {
      statBadge.textContent = isFr ? "Circuits & Voyages" :
                              isAr ? "الجولات والرحلات" :
                              isHe ? "סיורים וטיולים" :
                              "Tours & Trips";
    }
    const statH2 = document.querySelector('[data-anim="statistic-h2"]');
    if (statH2) {
      if (isFr) {
        statH2.innerHTML = "Des voyages et séjours sélectionnés<br/>dans plus de 100 destinations d'exception.<br/>Découvrez par vous-même";
      } else if (isAr) {
        statH2.innerHTML = "جولات ومسارات استثنائية معتمدة<br/>في أكثر من 100 وجهة ومنطقة ساحرة<br/>اكتشفوا بأنفسكم";
      } else if (isHe) {
        statH2.innerHTML = "מסלולים וחוויות מובחרות<br/>ביותר מ-100 יעדים מרהיבים<br/>ראו בעצמכם";
      } else {
        statH2.innerHTML = "We've vetted retreats in <br/>more than 100 countries <br/>See for yourself";
      }
    }

    const statItems = [
      {
        title: { en: "Introvert Retreats", fr: "Voyages Sérénité & Calme", ar: "رحلات الهدوء والاستجمام", he: "מסעות שלווה ורוגע" },
        sub: { en: "/ 78+ Countries", fr: "/ 78+ Régions", ar: "/ أكثر من 78 منطقة", he: "/ 78+ יעדים" }
      },
      {
        title: { en: "Yoga Retreats", fr: "Retraites Yoga & Bien-être", ar: "رحلات اليوغا وتجديد النشاط", he: "סדנאות יוגה ובריאות" },
        sub: { en: "/ 89+ Countries", fr: "/ 89+ Régions", ar: "/ أكثر من 89 منطقة", he: "/ 89+ יעדים" }
      },
      {
        title: { en: "Detox", fr: "Séjours Détox & Énergie", ar: "رحلات الديتوكس والطبيعة", he: "חופשות ניקוי רעלים" },
        sub: { en: "/ 56+ Countries", fr: "/ 56+ Régions", ar: "/ أكثر من 56 منطقة", he: "/ 56+ יעדים" }
      }
    ];
    document.querySelectorAll('.statistic-item').forEach((item, idx) => {
      const data = statItems[idx];
      if (!data) return;
      const t = item.querySelector('[data-anim="statistic-item-title"]');
      const s = item.querySelector('[data-anim="statistic-item-subtitle"]');
      if (t) t.textContent = data.title[targetLang] || data.title.en;
      if (s) s.textContent = data.sub[targetLang] || data.sub.en;
    });

    // 15. About Counters (Index)
    const cnt1 = document.querySelector('[data-animation="about-item-description-1"]');
    if (cnt1) {
      cnt1.innerHTML = isFr ? "Destinations & Régions<br/>explorées" :
                       isAr ? "وجهة ومنطقة سياحية<br/>تم استكشافها" :
                       isHe ? "יעדים ואזורים<br/>שנחקרו במרוקו" :
                       "Total countries <br/>travelled";
    }
    const cnt2 = document.querySelector('[data-animation="about-item-description-2"]');
    if (cnt2) {
      cnt2.innerHTML = isFr ? "Voyageurs & Hôtes<br/>accompagnés" :
                       isAr ? "مسافر وسائح رافقناهم<br/>بكل فخر وسعادة" :
                       isHe ? "מטיילים מאושרים<br/>שליווינו במסע" :
                       "Total retreats <br/>attended";
    }

    // 16. Globe / Destination Section
    const globeSection = document.querySelector('.globe-section');
    if (globeSection) {
      const gBadge = globeSection.querySelector('.head .body-md');
      if (gBadge) {
        gBadge.textContent = isFr ? "COMMUNAUTÉ INTERNATIONALE" :
                             isAr ? "مجتمع مسافرينا حول العالم" :
                             isHe ? "קהילת מטיילים בינלאומית" :
                             "WORLDWIDE COMMUNITY";
      }
      const gTitle = globeSection.querySelector('h2.h2');
      if (gTitle) {
        gTitle.innerHTML = isFr ? "Des Voyageurs Venus<br/>du Monde Entier" :
                           isAr ? "نستقبل بحفاوة زوارنا<br/>من كافة أنحاء العالم" :
                           isHe ? "מקבלים בברכה מטיילים<br/>מכל קצוות תבל" :
                           "Welcoming Travelers<br/>from All Over the World";
      }
      const gDesc = globeSection.querySelector('.head .body-xl, .head > .body-md:last-child');
      if (gDesc) {
        gDesc.textContent = isFr ? "Des quatre coins du monde, les voyageurs choisissent Kech Travel Game pour des circuits privés sur mesure et des safaris de luxe au Maroc." :
                            isAr ? "من كل بقاع العالم، يختار المسافرون Kech Travel Game لجولات خاصة على المقاس وسفاري صحراوي فاخر في المغرب." :
                            isHe ? "מכל קצוות תבל, מטיילים בוחרים ב-Kech Travel Game לסיורים פרטיים בהתאמה אישית וספארי מדברי יוקרתי במרוקו." :
                            "From every corner of the globe, travelers choose Kech Travel Game for bespoke private tours, luxury desert safaris, and unforgettable Moroccan memories.";
      }
    }

    // 17. Testimonials Section Header
    const testiSection = document.querySelector('.testimonials-section');
    if (testiSection) {
      const tBadge = testiSection.querySelector('.head .body-md, span.text-xs, span.uppercase');
      if (tBadge) {
        tBadge.textContent = isFr ? "Témoignages & Avis" :
                             isAr ? "آراء وتقييمات ضيوفنا" :
                             isHe ? "המלצות וחוות דעת" :
                             "Testimonials";
      }
      const tTitle = testiSection.querySelector('h2');
      if (tTitle) {
        tTitle.textContent = isFr ? "Les Récits de Nos Voyageurs" :
                             isAr ? "قصص وتجارب مسافرينا" :
                             isHe ? "הסיפורים של המטיילים שלנו" :
                             "Stories From Our Travelers";
      }
      const tDesc = testiSection.querySelector('.head .body-xl, p');
      if (tDesc) {
        tDesc.textContent = isFr ? "Des expériences réelles de voyageurs ayant exploré le Maroc avec nos chauffeurs privés et nos circuits sur mesure." :
                            isAr ? "تجارب واقعية لمسافرين استكشفوا روعة وسحر المغرب برفقة سائقينا الخاصين ومساراتنا السياحية المصممة بعناية." :
                            isHe ? "חוויות אמיתיות של מטיילים שגילו את מרוקו עם הנהגים הפרטיים והמסלולים המותאמים אישית שלנו." :
                            "Real experiences from travelers who explored Morocco with our private chauffeurs and bespoke itineraries.";
      }
    }

    // 18. Customize Section (Combine Section)
    const combineSection = document.querySelector('.combine-section');
    if (combineSection) {
      const cBadge = combineSection.querySelector('.head__title .body-md');
      if (cBadge) {
        cBadge.textContent = isFr ? "Circuits Sur Mesure" :
                             isAr ? "رحلات مصممة حسب رغبتكم" :
                             isHe ? "טיולים בהתאמה אישית" :
                             "Customize Your Trip";
      }
      const cTitle = combineSection.querySelector('[data-animation="combine-headline"], .h2');
      if (cTitle) {
        cTitle.innerHTML = isFr ? "Créez Votre Voyage <br/>À Votre Façon" :
                           isAr ? "صمّم رحلتك المثالية <br/>على مقاسك واختيارك" :
                           isHe ? "הרכיבו את המסע המושלם <br/>בדיוק בדרך שלכם" :
                           "Combine <br/>Retreat <br/>Your Way";
      }
      const cBtn = combineSection.querySelector('.combine-form__button .button-sm, .combine-section .btn-primary .button-sm');
      if (cBtn) {
        cBtn.textContent = isFr ? "Concevoir Mon Voyage" :
                           isAr ? "صمم رحلتك الخاصة الآن" :
                           isHe ? "עיצוב המסע שלי" :
                           "Design Your Journey";
      }
    }

    // 19. Contacts Page
    const isContactPage = window.location.pathname.includes('contacts') || document.querySelector('.contacts-section') || document.querySelector('.contact-us-form');
    if (isContactPage) {
      const cHeadBadge = document.querySelector('[data-anim="contacts-head"] .body-md, .contact-us__head .head__title .body-md');
      if (cHeadBadge) {
        cHeadBadge.textContent = isFr ? "Contactez-nous" :
                                 isAr ? "تواصل معنا" :
                                 isHe ? "צור קשר" :
                                 "Contact Us";
      }

      const cHeadTitle = document.querySelector('[data-anim*="contacts-title"], .contact-us__content .h2, .contact-us__head .h2');
      if (cHeadTitle) {
        cHeadTitle.textContent = isFr ? "Planifiez Votre Voyage d'Exception" :
                                 isAr ? "خطط لرحلتك الاستثنائية في المغرب" :
                                 isHe ? "תכננו את המסע המושלם שלכם במרוקו" :
                                 "Plan Your Moroccan Journey";
      }
      const cHeadSub = document.querySelector('[data-anim*="contacts-description"], .contact-us__content .body-lg, .contact-us__head .body-lg');
      if (cHeadSub) {
        cHeadSub.textContent = isFr ? "Contactez l'équipe Kech Travel Game dès aujourd'hui !" :
                               isAr ? "تواصل مع فريق عمل Kech Travel Game اليوم !" :
                               isHe ? "צרו קשר עם צוות Kech Travel Game עוד היום !" :
                               "Contact the Kech Travel Game team today!";
      }

      const emailPill = document.querySelector('a.contact-direct-pill[href^="mailto:"]');
      if (emailPill) {
        const svg = emailPill.querySelector('svg');
        const svgHtml = svg ? svg.outerHTML : '';
        const txt = isFr ? "Envoyez un Email" : isAr ? "راسلنا عبر الإيميل" : isHe ? "שלחו אימייל" : "Email Us";
        emailPill.innerHTML = svgHtml + ' ' + txt;
      }

      // Form labels & placeholders
      const nameInput = document.querySelector('input[name="name"]');
      if (nameInput) {
        nameInput.placeholder = isFr ? "Votre nom complet" :
                                isAr ? "ما هو اسمك الكريم؟" :
                                isHe ? "מה שמך?" :
                                "What's your name?";
        const nameLabel = nameInput.closest('.inp-group') ? nameInput.closest('.inp-group').querySelector('label') : null;
        if (nameLabel) nameLabel.textContent = isFr ? "Nom Complet" : isAr ? "الاسم الكامل" : isHe ? "שם מלא" : "Name";
      }

      const phoneInput = document.querySelector('input[name="phone"]');
      if (phoneInput) {
        phoneInput.placeholder = isFr ? "+33 6 00 00 00 00 / WhatsApp" :
                                 isAr ? "رقم الهاتف أو الواتساب (مع رمز الدولة)" :
                                 isHe ? "מספר טלפון / וואטסאפ" :
                                 "+212 600-000000 / WhatsApp";
        const phoneLabel = phoneInput.closest('.inp-group') ? phoneInput.closest('.inp-group').querySelector('label') : null;
        if (phoneLabel) phoneLabel.textContent = isFr ? "Téléphone / WhatsApp" : isAr ? "رقم الهاتف / واتساب" : isHe ? "טלפון / וואטסאפ" : "Phone / WhatsApp";
      }

      const tripInput = document.querySelector('input[name="trip_details"]');
      if (tripInput) {
        tripInput.placeholder = isFr ? "Ex : Mai 2026 • 2 Voyageurs" :
                                isAr ? "مثال: مايو 2026 • شخصان" :
                                isHe ? "לדוגמה: מאי 2026 • 2 נוסעים" :
                                "e.g. May 2026 • 2 Travelers";
        const tripLabel = tripInput.closest('.inp-group') ? tripInput.closest('.inp-group').querySelector('label') : null;
        if (tripLabel) tripLabel.textContent = isFr ? "Dates & Voyageurs" : isAr ? "التاريخ وعدد المسافرين" : isHe ? "תאריכים ומספר נוסעים" : "Dates & Travelers";
      }

      const emailInput = document.querySelector('input[name="email"]');
      if (emailInput) {
        emailInput.placeholder = isFr ? "Entrez votre email" :
                                 isAr ? "أدخل بريدك الإلكتروني" :
                                 isHe ? 'הזן את הדוא"ל שלך' :
                                 "Enter your email";
        const emailLabel = emailInput.closest('.inp-group') ? emailInput.closest('.inp-group').querySelector('label') : null;
        if (emailLabel) emailLabel.textContent = isFr ? "Email" : isAr ? "البريد الإلكتروني" : isHe ? 'דוא"ל' : "Email";
      }

      const msgInput = document.querySelector('textarea[name="message"]');
      if (msgInput) {
        msgInput.placeholder = isFr ? "Parlez-nous de vos envies, dates et nombre de voyageurs..." :
                               isAr ? "أخبرنا عن رغباتك، تواريخ سفرك، وعدد المسافرين..." :
                               isHe ? "ספרו לנו על התאריכים הרצויים, מספר הנוסעים והחלומות שלכם..." :
                               "How can we help you?";
        const msgLabel = msgInput.closest('.inp-group') ? msgInput.closest('.inp-group').querySelector('label') : null;
        if (msgLabel) msgLabel.textContent = isFr ? "Votre Message" : isAr ? "تفاصيل رحلتك" : isHe ? "ההודעה שלך" : "Message";
      }

      const submitBtn = document.querySelector('.contact-us-form .btn-primary .button-sm, form[data-anim="contacts-form"] .button-sm');
      if (submitBtn) {
        submitBtn.textContent = isFr ? "Envoyer le Message" :
                                isAr ? "إرسال الرسالة" :
                                isHe ? "שלח הודעה" :
                                "Send Message";
      }

      const successBox = document.querySelector('.w-form-done');
      if (successBox) {
        successBox.innerHTML = isFr ? "Merci ! Votre demande a été reçue avec succès. Notre équipe vous répondra rapidement." :
                               isAr ? "شكراً لك! تم استلام رسالتك بنجاح. سيتواصل معك فريقنا في أقرب وقت ممكن." :
                               isHe ? "תודה רבה! הודעתך התקבלה בהצלחה. הצוות שלנו יחזור אליך בהקדם." :
                               "Thank you! Your submission has been received!";
      }
    }

    // 20. Retreat Detail Pages (Subnav, Inclusions & Details)
    const isRetreatDetailPage = document.querySelector('.retreat-section') || document.querySelector('.program-nav') || document.querySelector('.package-includes') || window.location.pathname.includes('retreat') || window.location.pathname.includes('7-day') || window.location.pathname.includes('8-day') || window.location.pathname.includes('morocco-holiday') || window.location.pathname.includes('photography');
    if (isRetreatDetailPage) {
      document.querySelectorAll('.program-nav a, .nav-sub a, .anchor-link').forEach(link => {
        const txt = link.textContent.trim();
        if (txt === 'Home') link.textContent = isFr ? "Accueil" : isAr ? "الرئيسية" : isHe ? "ראשי" : "Home";
        if (txt.includes('About')) link.textContent = isFr ? "À Propos du Circuit" : isAr ? "عن الرحلة" : isHe ? "אודות המסע" : "About Retreats";
        if (txt.includes('Program')) link.textContent = isFr ? "Programme Complet" : isAr ? "برنامج الرحلة" : isHe ? "תוכנית המסע" : "Full Program";
        if (txt.includes('Food')) link.textContent = isFr ? "Restauration" : isAr ? "الوجبات المغربية" : isHe ? "אוכל וארוחות" : "Food";
        if (txt.includes('Team')) link.textContent = isFr ? "Notre Équipe" : isAr ? "فريق العمل" : isHe ? "הצוות שלנו" : "Team";
        if (txt.includes('Location')) link.textContent = isFr ? "Itinéraire & Lieux" : isAr ? "المسار والمواقع" : isHe ? "מיקום ומסלול" : "Location";
      });

      document.querySelectorAll('.package-includes__head .h3, .retreat-block-head, .h3').forEach(h => {
        if (h.textContent.includes("Included In This Package") || h.textContent.includes("Ce qui est inclus") || h.textContent.includes("ما تشمله") || h.textContent.includes("מה כלול")) {
          h.textContent = isFr ? "Ce Qui Est Inclus Dans Cette Offre" :
                          isAr ? "ما تشمله هذه الباقة الحصرية" :
                          isHe ? "מה כלול בחבילה זו" :
                          "What's Included In This Package";
        }
        if (h.textContent.includes("Makes This Retreat Special") || h.textContent.includes("unique") || h.textContent.includes("مميزة") || h.textContent.includes("מייחד")) {
          h.textContent = isFr ? "Ce Qui Rend Cette Expérience Unique" :
                          isAr ? "ما يميز هذه التجربة الاستثنائية" :
                          isHe ? "מה מייחד את המסע המופלא הזה" :
                          "What Makes This Retreat Special";
        }
      });
    }

    // 21. Footer Links, Credits & Copyright
    document.querySelectorAll('.footer-top__link a, .footer-bottom__link a').forEach(link => {
      const href = (link.getAttribute('href') || '').toLowerCase();
      if (href.includes('best-trips') || href.includes('coaches')) {
        link.style.display = 'inline-flex';
        link.style.alignItems = 'center';
        link.style.gap = '6px';
        link.style.whiteSpace = 'nowrap';
        link.innerHTML = `<span class="color-white-40">+</span>${
          isFr ? "Meilleurs Voyages" : isAr ? "أفضل الرحلات" : isHe ? "הטיולים המומלצים" : "Best Trips"
        }`;
      } else if (href.includes('contacts')) {
        link.style.display = 'inline-flex';
        link.style.alignItems = 'center';
        link.style.gap = '6px';
        link.style.whiteSpace = 'nowrap';
        link.innerHTML = `<span class="color-white-40">+</span>${
          isFr ? "Contactez-nous" : isAr ? "تواصل معنا" : isHe ? "צור קשר" : "Contact Us"
        }`;
      } else if (href.includes('terms')) {
        link.textContent = isFr ? "Conditions Générales" : isAr ? "الشروط والأحكام" : isHe ? "תנאי שימוש" : "Terms and Conditions";
      } else if (href.includes('privacy')) {
        link.textContent = isFr ? "Politique de Confidentialité" : isAr ? "سياسة الخصوصية" : isHe ? "מדיניות פרטיות" : "Privacy Policy";
      }
    });

    document.querySelectorAll('.footer__copy, .footer__copyright, .footer-bottom').forEach(f => {
      f.querySelectorAll('.button-sm, .body-sm, .body-xs, span, p').forEach(el => {
        const txt = el.textContent.trim();
        if (txt.includes('All Rights Reserved') || txt.includes('Tous droits réservés') || txt.includes('جميع الحقوق محفوظة') || txt.includes('כל הזכויות שמורות')) {
          el.textContent = isFr ? "© Tous Droits Réservés. Kech Travel Game, 2026" :
                           isAr ? "© جميع الحقوق محفوظة. Kech Travel Game، 2026" :
                           isHe ? "© כל הזכויות שמורות. Kech Travel Game, 2026" :
                           "©All Rights Reserved. Kech Travel Game, 2026";
        } else if (txt === 'Made by' || txt === 'Conçu avec passion par' || txt === 'صُمم بكل فخر بواسطة' || txt.includes('עוצב')) {
          el.textContent = isFr ? "Conçu avec passion par" : isAr ? "صُمم بكل فخر بواسطة" : isHe ? "עוצב באהבה ע\"י" : "Made by";
        }
      });
    });

    // 22. Dynamic Document Title
    const curPath = window.location.pathname;
    if (curPath.includes('best-trips') || curPath.includes('coaches')) {
      document.title = isFr ? "Meilleurs Circuits & Voyages Privés - Kech Travel Game" :
                       isAr ? "أفضل الرحلات والجولات الخاصة في المغرب - Kech Travel Game" :
                       isHe ? "הסיורים והטיולים המומלצים במרוקו - Kech Travel Game" :
                       "Best Trips - Kech Travel Game";
    } else if (curPath.includes('contacts')) {
      document.title = isFr ? "Contactez-nous - Kech Travel Game Maroc" :
                       isAr ? "تواصل معنا - Kech Travel Game المغرب" :
                       isHe ? "צור קשר - Kech Travel Game מרוקו" :
                       "Contact Us - Kech Travel Game Morocco";
    } else if (curPath === '/' || curPath.endsWith('index.html') || curPath === '') {
      document.title = isFr ? "Kech Travel Game - Chauffeur Privé & Circuits Sur Mesure au Maroc" :
                       isAr ? "Kech Travel Game - سائق خاص وجولات سياحية فاخرة في المغرب" :
                       isHe ? "Kech Travel Game - נהג פרטי וסיורים מותאמים אישית במרוקו" :
                       "Kech Travel Game - Morocco Private Driver & Tailor-Made Tours";
    }
  
  }

  // Set Language Action Handler
  function setLanguage(code) {
    const lang = LANGUAGES.find(l => l.code === code) || LANGUAGES[0];
    localStorage.setItem(STORAGE_KEY, lang.code);

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
    applyTreeWalkerTranslations(lang.code);
    applyPrecisionOverrides(lang.code);

    try {
      window.dispatchEvent(new CustomEvent('kechtg:lang', { detail: lang.code }));
    } catch(e) {}
  }

  // Update switcher dropdown button state
  function updateSwitcherUI(lang) {
    document.querySelectorAll('.lang-switcher-wrap').forEach(wrap => {
      const flagBox = wrap.querySelector('.lang-flag-box');
      const codeSpan = wrap.querySelector('.lang-code');
      if (flagBox) flagBox.innerHTML = FLAGS[lang.code] || FLAGS.en;
      if (codeSpan) codeSpan.textContent = lang.code.toUpperCase();

      wrap.querySelectorAll('.lang-dropdown-item').forEach(item => {
        if (item.getAttribute('data-lang') === lang.code) {
          item.classList.add('is-active');
        } else {
          item.classList.remove('is-active');
        }
      });
    });

    document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === lang.code) {
        btn.classList.add('is-active');
      } else {
        btn.classList.remove('is-active');
      }
    });
  }

  // Build Desktop Switcher Dropdown
  function createDesktopSwitcher(currentLang) {
    const wrap = document.createElement('div');
    wrap.className = 'lang-switcher-wrap notranslate';
    wrap.id = 'kechtg-lang-switcher';

    wrap.innerHTML = `
      <button type="button" class="lang-switcher-btn" aria-haspopup="true" aria-expanded="false" title="Language / Langue / اللغة / שפה">
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
        setLanguage(code);
      });
    });

    document.addEventListener('click', () => {
      wrap.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    });

    return wrap;
  }

  // Build Mobile Drawer Switcher
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
        setLanguage(code);
      });
    });

    return wrap;
  }

  function getInitialLanguage() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang && LANGUAGES.some(l => l.code === urlLang)) {
        localStorage.setItem(STORAGE_KEY, urlLang);
        return urlLang;
      }
    } catch (e) {}
    return localStorage.getItem(STORAGE_KEY) || 'en';
  }

  // Mount Switchers in Navbar
  function mountSwitchers() {
    const currentCode = getInitialLanguage();
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

    setLanguage(currentCode);
  }

  function init() {
    window.__setLanguage = setLanguage;
    protectBrandNames();
    injectStyles();
    mountSwitchers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
