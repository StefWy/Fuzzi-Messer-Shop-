import { Product } from '../types';

import heroChefKnife from '../assets/images/hero_damascus_chefknife_1791981974182.jpg';
import bushcraftKnife from '../assets/images/category_outdoor_bushcraft_1791981974692.jpg';
import whetstoneKit from '../assets/images/product_whetstone_sharpener_1791981975301.jpg';
import forgeCraft from '../assets/images/craftsman_forge_blade_1791981975202.jpg';
import santokuOlive from '../assets/images/santoku_olive_knife_1791981999215.jpg';
import nakiriDamast from '../assets/images/damascus_nakiri_knife_1791982000390.jpg';
import whittlingSloyd from '../assets/images/whittling_carving_knife_1791982001188.jpg';
import magneticBlock from '../assets/images/magnetic_knife_block_1791982000753.jpg';
import steakKnivesSet from '../assets/images/steak_knife_set_1791983781995.jpg';
import breadKnifeSerrated from '../assets/images/bread_knife_serrated_1791983783317.jpg';
import filletFishingKnife from '../assets/images/fillet_fishing_knife_1791983784372.jpg';
import classicPocketKnife from '../assets/images/classic_folding_pocket_knife_1791983785130.jpg';

export const PRODUCTS: Product[] = [
  // 1. KÜCHE: Chefkochmesser
  {
    id: 'chef-damast-67',
    slug: 'meister-damast-kochmesser-20cm',
    name: 'Meister-Kochmesser 67 Lagen Damast 20cm',
    subtitle: 'Japanischer VG-10 Kern · 61 HRC · Geöltes Walnussholz',
    category: 'kuechenmesser',
    categoryLabel: 'Küchenmesser',
    subcategoryLabel: 'Kochmesser & Allrounder',
    price: 189.00,
    originalPrice: 229.00,
    inStock: true,
    stockCount: 4,
    isBestseller: true,
    image: heroChefKnife,
    description: 'Das Flaggschiff der gehobenen Küche. 67 Lagen gefalteter Damaszenerstahl umschließen einen hochreinen VG-10 Kohlenstoffstahl-Kern mit rasiermesserscharfem Handabzug.',
    longDescription: 'Erleben Sie Schneidvergnügen in einer neuen Dimension. Die 20 cm Klinge gleitet mühelos durch Fleisch, Fisch und festes Wurzelgemüse, ohne Fasern oder Zellstrukturen zu quetschen. Der ergonomische Griff aus edlem Walnussholz liegt perfekt ausbalanciert in der Hand und ermüdet auch nach stundenlangem Präzisionskochen nicht.',
    features: [
      '67 Lagen Damaststahl mit VG-10 Schneidlage',
      'Ultrafeiner Handabzug im 15° Schleifwinkel je Seite',
      'Ergonomischer Walnuss-Vollholzgriff mit Mosaik-Niet',
      'Inklusive gefütterter Magnetschatulle aus Buchenholz',
      'Lebenslange Schärfe- & Materialgarantie'
    ],
    specs: {
      bladeSteel: 'VG-10 Damaszenerstahl (67 Lagen)',
      hardnessHRC: 61,
      bladeLengthCm: 20.5,
      totalLengthCm: 33.5,
      bladeThicknessMm: 2.1,
      handleMaterial: 'Kaukasischer Nussbaum, geölt',
      grindType: 'Beidseitiger V-Schliff (Honbazuke)',
      grindAngle: '15° je Seite (30° Gesamtwinkel)',
      weightG: 198,
      origin: 'Seki / Manufaktur Endabzug Deutschland'
    },
    reviews: [
      {
        id: 'rev-1',
        author: 'Florian W. (Chef de Partie)',
        rating: 5,
        date: '02.10.2026',
        title: 'Ein Traum an Klingenbalance & Schärfe',
        comment: 'Ich arbeite täglich 10 Stunden in der gehobenen Gastronomie. Dieses Messer gleitet durch reife Fleischtomaten ohne den geringsten Druck. Hält die Schnitthaltigkeit seit Wochen bravourös.',
        verifiedBuyer: true
      }
    ],
    rating: 4.9,
    reviewCount: 38,
    frequentlyBoughtWithId: 'whetstone-1000-6000',
    frequentlyBoughtDiscount: 15
  },

  // 2. KÜCHE: Santoku
  {
    id: 'santoku-tsuchime-olive',
    slug: 'santoku-tsuchime-olivenholz-18cm',
    name: 'Santoku KlingenWerk Tsuchime 18cm',
    subtitle: 'Hammerschlag-Finish · Anti-Haft · Italienisches Olivenholz',
    category: 'kuechenmesser',
    categoryLabel: 'Küchenmesser',
    subcategoryLabel: 'Santokumesser',
    price: 159.00,
    originalPrice: 179.00,
    inStock: true,
    stockCount: 7,
    isBestseller: true,
    image: santokuOlive,
    description: 'Das klassische „Messer der drei Tugenden“ (Fleisch, Fisch, Gemüse). Durch das kunstvolle Hammerschlag-Finish bildet sich beim Schneiden ein Luftpolster, sodass Scheiben sofort abfallen.',
    longDescription: 'Das Santoku verbindet die Vielseitigkeit eines Chefmessers mit der Agilität einer kürzeren, breiten Klinge. Die Tsuchime-Hammerschlagstruktur verhindert das Anhaften stärkehaltiger Gemüsesorten wie Kartoffeln oder Gurken.',
    features: [
      'Authentisches Tsuchime Hammerschlag-Finish gegen Anhaften',
      'Ausgewogene Balance direkt am Kropf',
      'Nachhaltig gewonnenes Olivenholz mit natürlicher Maserung',
      'Extreme Schärfe für feinste Julienne und Wiegeschnitt'
    ],
    specs: {
      bladeSteel: '10Cr15CoMoV Edelstahl (hochfest)',
      hardnessHRC: 60,
      bladeLengthCm: 18.0,
      totalLengthCm: 31.0,
      bladeThicknessMm: 2.0,
      handleMaterial: 'Kalabrisches Olivenholz',
      grindType: 'Symmetrischer Feinschliff',
      grindAngle: '14° je Seite',
      weightG: 185,
      origin: 'Solinger Handabzug'
    },
    reviews: [
      {
        id: 'rev-3',
        author: 'Sandra K.',
        rating: 5,
        date: '05.10.2026',
        title: 'Macht Kochen zur Meditation',
        comment: 'Das Messer schneidet nicht, es gleitet. Zwiebeln schneiden ohne Weinen, da keine Saftzellen zerquetscht werden!',
        verifiedBuyer: true
      }
    ],
    rating: 4.9,
    reviewCount: 27,
    frequentlyBoughtWithId: 'magnetic-oak-block',
    frequentlyBoughtDiscount: 10
  },

  // 3. KÜCHE: Brotmesser mit aggressivem Wellenschliff
  {
    id: 'bread-knife-serrated-solingen',
    slug: 'meister-brotmesser-wellenschliff-23cm',
    name: 'KlingenWerk Bäcker-Brotmesser 23cm',
    subtitle: 'Aggressiver Wellenschliff · Deutscher Edelstahl · Dunkler Hartholzgriff',
    category: 'kuechenmesser',
    categoryLabel: 'Küchenmesser',
    subcategoryLabel: 'Brot- & Backmesser',
    price: 89.00,
    originalPrice: 109.00,
    inStock: true,
    stockCount: 11,
    isBestseller: true,
    image: breadKnifeSerrated,
    description: 'Zerteilt selbst die härteste Sauerteig-Kruste ohne Reißen oder Zerdrücken der Krume. Präzisionsgeschliffene Wellenberge gleiten mühelos durch Brot und Braten.',
    longDescription: 'Ein unverzichtbares Grundmesser für jeden Haushalt. Die langen Wellenzähne greifen unmittelbar in krosse Holzofenbrote, Zwieback oder Melonen ein. Die 23 cm Klinge ermöglicht glatte Schnitte ohne lästiges Hin- und Hersägen.',
    features: [
      'Spezial-Wellenschliff mit optimierten Spitzenradien für minimales Krümeln',
      'X50CrMoV15 Klingenstahl: Rostfrei, extrem elastisch und langlebig',
      'Ergonomischer, feuchtigkeitsresistenter Hartholzgriff mit Messingnieten',
      'Ideal auch für Kürbis, Ananas, Bratenkrusten und Tortenböden'
    ],
    specs: {
      bladeSteel: 'Solinger Messerstahl X50CrMoV15',
      hardnessHRC: 57,
      bladeLengthCm: 23.0,
      totalLengthCm: 36.5,
      bladeThicknessMm: 2.2,
      handleMaterial: 'Geräucherte Eiche, dreifach vernietet',
      grindType: 'Einseitiger Präzisions-Wellenschliff',
      grindAngle: '20° Wellenflanke',
      weightG: 195,
      origin: 'KlingenWerk Deutschland'
    },
    reviews: [
      {
        id: 'rev-b1',
        author: 'Bernd L. (Hobbybäcker)',
        rating: 5,
        date: '08.10.2026',
        title: 'Endlich kein Zerdrücken von warmem Sauerteigbrot mehr!',
        comment: 'Die Kruste knackt sauber durch und das Innere bleibt vollkommen intakt. Höchste Empfehlung.',
        verifiedBuyer: true
      }
    ],
    rating: 4.9,
    reviewCount: 31,
    frequentlyBoughtWithId: 'magnetic-oak-block',
    frequentlyBoughtDiscount: 10
  },

  // 4. KÜCHE: Nakiri Gemüsemesser
  {
    id: 'nakiri-damast-ebony',
    slug: 'nakiri-gemuesemesser-damast-ebenholz',
    name: 'Nakiri Gemüseklinge 67 Lagen 17cm',
    subtitle: 'Japanischer Kappschnitt · Oktogonaler Ebenholzgriff · Horn-Zwinge',
    category: 'kuechenmesser',
    categoryLabel: 'Küchenmesser',
    subcategoryLabel: 'Gemüsemesser & Hackmesser',
    price: 175.00,
    inStock: true,
    stockCount: 5,
    isNew: true,
    image: nakiriDamast,
    description: 'Das traditionelle japanische Gemüsemesser mit gerader Schneide für saubere Kappschnitte ohne Ziehbewegung.',
    longDescription: 'Dank der hohen, rechteckigen Klinge führen Sie das Nakiri präzise am Fingerknöchel entlang. Kohl, Lauch, Möhren und Kräuter werden mit einem einzigen senkrechten Schnitt akkurat zerteilt.',
    features: [
      'Planparallele Schneide für lückenlose Durchtrennung bis aufs Brett',
      'Hohes Klingenblatt dient ideal als Schaufel für Schnittgut',
      '67 Lagen Damast mit mikrofeiner Karbidstruktur',
      'Traditioneller oktogonaler Wa-Griff nach japanischem Vorbild'
    ],
    specs: {
      bladeSteel: '67 Lagen VG-10 Damaszenerstahl',
      hardnessHRC: 61,
      bladeLengthCm: 17.2,
      totalLengthCm: 31.5,
      bladeThicknessMm: 1.8,
      handleMaterial: 'Schwarzes Ebenholz mit Büffelhorn-Zwinge',
      grindType: 'Doppelseitiger Kappschnitt-Schliff',
      grindAngle: '13° je Seite',
      weightG: 210,
      origin: 'Manufaktur Japan / Endkontrolle Deutschland'
    },
    reviews: [
      {
        id: 'rev-4',
        author: 'Maximilian E.',
        rating: 5,
        date: '19.09.2026',
        title: 'Für Vegetarier & Profiköche unverzichtbar',
        comment: 'Hatte noch nie ein Nakiri. Nach drei Tagen frage ich mich, wie ich jemals ohne Gemüse geschnitten habe.',
        verifiedBuyer: true
      }
    ],
    rating: 4.8,
    reviewCount: 19,
    frequentlyBoughtWithId: 'whetstone-1000-6000',
    frequentlyBoughtDiscount: 15
  },

  // 5. KÜCHE: Schäl- & Officemesser
  {
    id: 'artisan-forged-paring',
    slug: 'manufaktur-officemesser-schaelmesser-9cm',
    name: 'Manufaktur Schäl- & Officemesser 9cm',
    subtitle: 'VG-10 Kern · Wüsteneisenholz · Exakter Spitzenschliff',
    category: 'kuechenmesser',
    categoryLabel: 'Küchenmesser',
    subcategoryLabel: 'Schäl- & Officemesser',
    price: 115.00,
    inStock: true,
    stockCount: 8,
    image: forgeCraft,
    description: 'Das unersetzliche Präzisionswerkzeug für filigrane Schälarbeiten, Entkernen und feine Verzierungen frei in der Hand.',
    longDescription: 'Mit seiner schlanken, spitzen 9 cm Klinge ermöglicht das Schälmesser millimetergenaue Schnittführung direkt in der Hand. Ob Äpfel schälen, Knoblauch schneiden oder Tomaten häuten.',
    features: [
      '67 Lagen Damastklinge für dauerhafte Schärfe auch bei sauren Früchten',
      'Schlanke Geometrie für ermüdungsfreies Arbeiten frei in der Hand',
      'Edler Griff aus hochdichtem Wüsteneisenholz'
    ],
    specs: {
      bladeSteel: 'VG-10 Damaststahl',
      hardnessHRC: 60,
      bladeLengthCm: 9.0,
      totalLengthCm: 20.0,
      bladeThicknessMm: 1.6,
      handleMaterial: 'Wüsteneisenholz (stabilisiert)',
      grindType: 'Symmetrischer Feinschliff',
      grindAngle: '14° je Seite',
      weightG: 78,
      origin: 'Manufaktur Solingen'
    },
    reviews: [
      {
        id: 'rev-9',
        author: 'Tobias H.',
        rating: 5,
        date: '11.08.2026',
        title: 'Kompakt und unheimlich scharf',
        comment: 'Liegt wie angegossen in der Hand. Ideal für alles Kleingemüse.',
        verifiedBuyer: true
      }
    ],
    rating: 4.9,
    reviewCount: 16
  },

  // 6. BESTECK & STEAKMESSER: 4er Gourmet Steakmesser Set
  {
    id: 'gourmet-steak-knife-set-4pc',
    slug: 'gourmet-steakmesser-set-4-teilig-raeuchereiche',
    name: 'Gourmet Steakmesser 4er-Set Räuchereiche',
    subtitle: 'Rasiermesserscharfe Glattschneide · Kein Zerreißen der Fleischfasern · Geschenkschatulle',
    category: 'besteck',
    categoryLabel: 'Besteck & Steakmesser',
    subcategoryLabel: 'Steak- & Gästemesser',
    price: 149.00,
    originalPrice: 179.00,
    inStock: true,
    stockCount: 6,
    isBestseller: true,
    image: steakKnivesSet,
    description: 'Das ultimative Genuss-Set für Steakliebhaber und gehobene Gastronomie. Glatter Schliff statt Reißzähnen, damit edler Fleischsaft im Steak verbleibt.',
    longDescription: 'Billige Steakmesser besitzen oft grobe Sägezähne, die das Fleisch zerrupfen und den Saft herauspressen. Unsere Gourmet-Steakmesser besitzen eine rasiermesserscharfe Glatschneide aus rostfreiem Molybdän-Vanadium-Stahl, die durch Ribeye, Filet und Rumpsteak wie durch Butter schneidet. Geliefert in einer edlen mattschwarzen Präsentationskassette.',
    features: [
      '4 handabgezogene Gourmet-Steakmesser in luxuriöser Schatulle',
      'Feine Glattschneide: Kein Ausfransen edler Rindersteaks',
      'Griffe aus heimischer Räuchereiche mit doppelter Messingvernietung',
      'Gastronomie- und spülzertifizierte Materialgüte'
    ],
    specs: {
      bladeSteel: 'X50CrMoV15 Molybdän-Vanadium Edelstahl',
      hardnessHRC: 58,
      bladeLengthCm: 12.0,
      totalLengthCm: 23.5,
      bladeThicknessMm: 1.8,
      handleMaterial: 'Räuchereiche Vollholz',
      grindType: 'Rasiermesserscharfer Glattschliff (Plain Edge)',
      grindAngle: '15° je Seite',
      weightG: 92,
      origin: 'Solinger Manufaktur'
    },
    reviews: [
      {
        id: 'rev-s1',
        author: 'Moritz G. (Gastronom)',
        rating: 5,
        date: '04.10.2026',
        title: 'Unsere Gäste im Steakhouse sind begeistert!',
        comment: 'Die Messer sehen auf der Tafel fantastisch aus und schneiden Dry-Aged Beef mit minimalem Druck.',
        verifiedBuyer: true
      }
    ],
    rating: 5.0,
    reviewCount: 22,
    frequentlyBoughtWithId: 'magnetic-oak-block',
    frequentlyBoughtDiscount: 10
  },

  // 7. FREIZEIT / OUTDOOR: Fischer- & Filetiermesser
  {
    id: 'fillet-fishing-knife-flex',
    slug: 'profi-filetiermesser-fischer-angler-flexibel',
    name: 'KlingenWerk HydroFlex Angler- & Filetiermesser',
    subtitle: 'Hochflexible Klinge · Rostträger 1.4116 Stahl · Rutschfester Griff & belüftete Scheide',
    category: 'outdoor',
    categoryLabel: 'Freizeit, Jagd & Outdoor',
    subcategoryLabel: 'Fischer- & Filetiermesser',
    price: 69.00,
    originalPrice: 79.00,
    inStock: true,
    stockCount: 14,
    image: filletFishingKnife,
    description: 'Für Angler, Fischliebhaber und Köche: Die federnde Klinge folgt jeder Fischgräte haargenau und löst zarteste Filets ohne Fleischverlust.',
    longDescription: 'Konzipiert für den Einsatz an Fluss, See und Meer sowie in der Fischküche. Die flexible, salzwasserresistente Edelstahlklinge gleitet mühelos an der Mittelgräte von Forelle, Zander, Lachs und Hecht entlang. Der gummierte, ergonomische Griff sorgt selbst bei feuchten, fischigen Händen für absolut sicheren Halt.',
    features: [
      'Gezielte Klingenelastizität für sauberes Häuten und Filetieren',
      '100% rostfreier salzwasserbeständiger Spezial-Edelstahl',
      'Texturierter rutschfester Griff mit Fingerschutz-Parierelement',
      'Belüftete Hardshell-Gürtelscheide mit Wasserablauf'
    ],
    specs: {
      bladeSteel: '1.4116 Salzwasserfester Chrom-Molybdänstahl',
      hardnessHRC: 56,
      bladeLengthCm: 16.5,
      totalLengthCm: 29.0,
      bladeThicknessMm: 1.4,
      handleMaterial: 'Ergonomischer rutschfester Gummi-Polymer',
      grindType: 'Feiner V-Abzug für zartes Bindegewebe',
      grindAngle: '14° je Seite',
      weightG: 110,
      origin: 'Skandinavische Kooperation'
    },
    reviews: [
      {
        id: 'rev-f1',
        author: 'Carsten B. (Sportfischer)',
        rating: 5,
        date: '29.09.2026',
        title: 'Filetiert Saibling und Lachs wie ein Laser',
        comment: 'Die Biegung ist exakt richtig austariert. Kein Verrupfen der empfindlichen Haut.',
        verifiedBuyer: true
      }
    ],
    rating: 4.9,
    reviewCount: 18,
    frequentlyBoughtWithId: 'whetstone-1000-6000',
    frequentlyBoughtDiscount: 15
  },

  // 8. FREIZEIT / OUTDOOR: Bushcraft & Jagdmesser
  {
    id: 'outdoor-bushcraft-d2',
    slug: 'bushcraft-survival-messer-d2-micarta',
    name: 'KlingenWerk Outback Pro D2 Bushcraftmesser',
    subtitle: 'Massiver 4.5 mm Full-Tang · D2 Stahl 61 HRC · Canvas-Micarta & Kydex',
    category: 'outdoor',
    categoryLabel: 'Freizeit, Jagd & Outdoor',
    subcategoryLabel: 'Bushcraft & Survival',
    price: 145.00,
    originalPrice: 169.00,
    inStock: true,
    stockCount: 6,
    isBestseller: true,
    image: bushcraftKnife,
    description: 'Unzerstörbares Bushcraft- und Outdoormesser für Expeditionen, Holzarbeiten, Batoning und Feuerstarter. § 42a WaffG konform mit 11,5 cm Klingenlänge.',
    longDescription: 'Konstruiert für härteste Bedingungen in der Wildnis. Die 4,5 mm starke durchgehende Klinge (Full-Tang) aus zähem D2-Präzisionsstahl widersteht Schlägen und Querbelastungen problemlos. Der 90°-Klingenrücken ist scharfkantig geschliffen, um mühelos Funkenregen an einem Mischmetall-Feuerstahl zu erzeugen.',
    features: [
      'Massiver 4.5 mm Full-Tang D2 Werkzeugstahl',
      'Unverwüstlicher Griff aus grünem Canvas-Micarta (rutschfest bei Nässe)',
      'Scharfer 90° Klingenrücken für Feuerstahl & Rinde schaben',
      'Konform mit dem deutschen Waffenrecht (§ 42a WaffG < 12cm Klinge)'
    ],
    specs: {
      bladeSteel: 'D2 Präzisions-Werkzeugstahl (vakuumgehärtet)',
      hardnessHRC: 61,
      bladeLengthCm: 11.5,
      totalLengthCm: 23.5,
      bladeThicknessMm: 4.5,
      handleMaterial: 'Canvas Micarta (olivgrün texturiert)',
      grindType: 'Robuster Scandi-Schliff mit Mikrofase',
      grindAngle: '22° je Seite',
      weightG: 245,
      origin: 'KlingenWerk Manufaktur'
    },
    reviews: [
      {
        id: 'rev-5',
        author: 'Jens T. (Bushcrafter)',
        rating: 5,
        date: '09.10.2026',
        title: 'Ein Panzer von einem Messer',
        comment: 'Hartholz gespalten, Feathersticks geschnitzt, Feuer entzündet. Die Schneide rasiert danach immer noch die Armhaare.',
        verifiedBuyer: true
      }
    ],
    rating: 5.0,
    reviewCount: 42,
    frequentlyBoughtWithId: 'whetstone-1000-6000',
    frequentlyBoughtDiscount: 15
  },

  // 9. FREIZEIT / HOBBY: Nordisches Sloyd Schnitzmesser
  {
    id: 'sloyd-woodcarving-nordic',
    slug: 'nordisches-sloyd-schnitzmesser-maserbirke',
    name: 'Nordisches Sloyd Schnitz- & Hobbymesser',
    subtitle: 'Schwedenstahl O1 Carbon · Geölte Maserbirke · Skandinavischer Null-Schliff',
    category: 'outdoor',
    categoryLabel: 'Freizeit, Jagd & Outdoor',
    subcategoryLabel: 'Schnitz- & Hobbymesser',
    price: 89.00,
    inStock: true,
    stockCount: 8,
    image: whittlingSloyd,
    description: 'Traditionelles Schnitz- und Hobbymesser für filigrane Holzarbeiten, Löffelschnitzen und Detailgestaltung.',
    longDescription: 'Für Liebhaber des echten Handwerks. Die spitze, bauchige Klinge aus hochreinem Carbonstahl lässt sich auf extrem feine Schneidkanten nachschärfen. Der ergonomische tonnenförmige Griff aus karelischer Maserbirke liegt satt und ermüdungsfrei in der Hand.',
    features: [
      'Reiner O1 Kohlenstoffstahl für unvergleichliche Anfangsschärfe',
      'Klassischer Null-Scandi-Schliff (Zero Grind) für tiefen Holzbiss',
      'Handgedrechselter Griff aus karelischer Maserbirke'
    ],
    specs: {
      bladeSteel: 'O1 High-Carbon Werkzeugstahl (extrem schnitthaltig)',
      hardnessHRC: 60,
      bladeLengthCm: 8.5,
      totalLengthCm: 19.5,
      bladeThicknessMm: 2.7,
      handleMaterial: 'Karelische Maserbirke, Leinöl',
      grindType: 'Skandinavischer Null-Schliff',
      grindAngle: '20° Gesamtwinkel',
      weightG: 82,
      origin: 'Skandinavische Manufaktur-Kooperation'
    },
    reviews: [
      {
        id: 'rev-6',
        author: 'Christoph V.',
        rating: 5,
        date: '25.09.2026',
        title: 'Das beste Holzschnitzmesser auf dem Markt',
        comment: 'Die Späne fliegen wie Butter vom Lindenholz. Griff liegt perfekt im Handballen.',
        verifiedBuyer: true
      }
    ],
    rating: 4.9,
    reviewCount: 23
  },

  // 10. TREND- & DESIGN-KLASSIKER: Traditionelles Taschen- & Klappmesser
  {
    id: 'classic-gentleman-pocket-knife',
    slug: 'klassiker-taschenmesser-walnuss-messing-klappmesser',
    name: 'KlingenWerk Evergreen Klapp- & Taschenmesser',
    subtitle: 'Klassiker & Trend-Messer · Walnussholz · Massive Messingbacken · Backlock-Verriegelung',
    category: 'trend',
    categoryLabel: 'Trend-Messer & Klassiker',
    subcategoryLabel: 'Traditions- & Sammlermesser',
    price: 79.00,
    originalPrice: 95.00,
    inStock: true,
    stockCount: 12,
    isBestseller: true,
    image: classicPocketKnife,
    description: 'Der zeitlose Klassiker für Alltag, Reise, Vesper und Sammlung. Massive Messingbeschläge, edles Walnussholz und sichere Backlock-Klingenarretierung.',
    longDescription: 'Ein echtes Evergreen-Messer, das Trends überdauert. Ob zum Aufschneiden von Landjägern bei der Bergwanderung, zum Schälen von Obst im Büro oder als stilvolles Sammlerstück in der Vitrine: Die Clip-Point-Klinge aus zähem 440C Edelstahl ist extrem schnitthaltig und widersteht Alltagsabnutzung mit Bravour.',
    features: [
      'Zeitloses Gentleman-Design mit massiven Messingbacken',
      'Handgepasste Griffschalen aus edlem, geöltem Walnussholz',
      'Zuverlässiger Back-Lock Verriegelungsmechanismus gegen versehentliches Einklappen',
      'Inklusive handgenähtem Gürtelholster aus echtem Rindsleder'
    ],
    specs: {
      bladeSteel: '440C Hochleistungs-Edelstahl',
      hardnessHRC: 58,
      bladeLengthCm: 8.8,
      totalLengthCm: 20.2,
      bladeThicknessMm: 2.8,
      handleMaterial: 'Nussbaumholz mit massiven Messingbacken',
      grindType: 'Klassischer Hohlschliff (Hollow Grind)',
      grindAngle: '18° je Seite',
      weightG: 145,
      origin: 'Traditionsfertigung & Handabzug'
    },
    reviews: [
      {
        id: 'rev-c1',
        author: 'Heinrich R.',
        rating: 5,
        date: '03.10.2026',
        title: 'Ein Messer fürs Leben – Haptik wie vor 50 Jahren',
        comment: 'Solide, schwer in der Hand, der Verschluss rastet mit einem satten Klicken ein. Perfektes Geschenk.',
        verifiedBuyer: true
      }
    ],
    rating: 4.9,
    reviewCount: 35
  },

  // 11. ZUBEHÖR & PFLEGE: Kombi-Wasserstein 1000/6000
  {
    id: 'whetstone-1000-6000',
    slug: 'japanischer-kombi-wasserstein-1000-6000',
    name: 'Premium Wasserstein Schleifstein-Set 1000/6000',
    subtitle: 'Doppelkörnung · Rutschfester Bambussockel · Inkl. Abrichtstein & Winkellehre',
    category: 'zubehoer',
    categoryLabel: 'Zubehör & Schleifen',
    subcategoryLabel: 'Schleifsteine & Schärfer',
    price: 69.00,
    originalPrice: 85.00,
    inStock: true,
    stockCount: 15,
    isBestseller: true,
    image: whetstoneKit,
    description: 'Das essenzielle Schleifset für alle Messerarten: Küchenmesser, Brotmesser, Taschenmesser und Outdoorklingen. Körnung 1000 für Grundschärfe, 6000 für Rasierspiegel.',
    longDescription: 'Selbst der beste Stahl verliert mit der Zeit seine Schärfe. Mit diesem professionellen Wasserabziehstein schleifen Sie Ihre Klingen in wenigen Minuten schonend nach. Kein Klingenabtrag durch aggressive elektrische Maschinen, sondern kühles traditionelles Nassschleifen.',
    features: [
      'Grobseite Körnung 1000 zur Wiederherstellung der Grundschärfe',
      'Feinseite Körnung 6000 für hochglanzpolierte Rasiermesserschärfe',
      'Rutschfester massiver Bambussockel mit Silikoneinlage',
      'Inklusive Abrichtstein zur Glättung und Schleifhilfe (15° Winkelführung)'
    ],
    specs: {
      bladeSteel: 'Weißes Edelkorund (Aluminiumoxid)',
      hardnessHRC: 0,
      bladeLengthCm: 18.0,
      totalLengthCm: 21.0,
      bladeThicknessMm: 30.0,
      handleMaterial: 'Geölter Bambus & rutschfestes Silikon',
      grindType: 'Wasserstein Körnung #1000 / #6000',
      grindAngle: 'Universell für alle Klingenwinkel',
      weightG: 920,
      origin: 'Qualitätskontrolle Deutschland'
    },
    reviews: [
      {
        id: 'rev-7',
        author: 'Stefan M.',
        rating: 5,
        date: '01.10.2026',
        title: 'Alle Küchenmesser rasiermesserscharf',
        comment: 'Mit der 15° Schleifhilfe klappt es selbst für Anfänger sofort. Mein Santoku schneidet wieder wie am ersten Tag!',
        verifiedBuyer: true
      }
    ],
    rating: 4.9,
    reviewCount: 64
  },

  // 12. ZUBEHÖR & PFLEGE: Magnetischer Messerblock
  {
    id: 'magnetic-oak-block',
    slug: 'magnetischer-messerblock-raeuchereiche',
    name: 'Magnetischer Messerblock Räuchereiche',
    subtitle: 'Massivholz · Beidseitig stark magnetisch für bis zu 6 Messer · Edelstahlsockel',
    category: 'zubehoer',
    categoryLabel: 'Zubehör & Schleifen',
    subcategoryLabel: 'Messerblöcke & Aufbewahrung',
    price: 119.00,
    originalPrice: 139.00,
    inStock: true,
    stockCount: 9,
    image: magneticBlock,
    description: 'Schont alle Klingen vor dem Abstumpfen in Schubladen. Hält bis zu 6 Koch-, Brot-, Steak- und Outdoormesser schwebend an unsichtbaren Neodym-Magneten.',
    longDescription: 'In der Besteckschublade schlagen Klingen aneinander und splittern im Mikrobereich aus. Dieser Design-Messerblock aus thermobehandelter deutscher Räuchereiche schützt den Grat und setzt Ihre Messersammlung wie im Gourmet-Restaurant in Szene.',
    features: [
      'Extra starke unsichtbar eingelassene N52 Neodym-Magnete',
      'Kratzfreier Kontakt: Klingen berühren nur samtig geöltes Eichenholz',
      'Massiver, schwerer Standsockel gegen Kippen',
      'Hygienisch und leicht zu reinigen – keine schmutzigen Schlitze'
    ],
    specs: {
      bladeSteel: 'Nicht zutreffend (Holz- & Magnetaufbewahrung)',
      hardnessHRC: 0,
      bladeLengthCm: 24.0,
      totalLengthCm: 26.0,
      bladeThicknessMm: 12.0,
      handleMaterial: 'Deutsche Räuchereiche, lebensmittelecht versiegelt',
      grindType: 'Messeraufbewahrung',
      grindAngle: 'Neodym-Magnetkraft bis 1,2 kg je Position',
      weightG: 2850,
      origin: 'Handgefertigt in Deutschland'
    },
    reviews: [
      {
        id: 'rev-8',
        author: 'Andrea S.',
        rating: 5,
        date: '14.09.2026',
        title: 'Blickfang in jeder Küche',
        comment: 'Hält selbst schwere Kochmesser absolut sicher. Holzoberfläche ist ein Traum.',
        verifiedBuyer: true
      }
    ],
    rating: 4.8,
    reviewCount: 31
  }
];
