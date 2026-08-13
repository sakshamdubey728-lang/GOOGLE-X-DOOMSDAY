import { Product } from '../types';
import hoodieImage from '../assets/images/regenerated_image_1786556411401.png';
import keyboardImage from '../assets/images/doom_keyboard_1786556549164.jpg';
import doomsdayTeeImage from '../assets/images/doomsday_tee_1786556713468.jpg';
import flaskImage from '../assets/images/doomsday_flask_main_1786588232276.jpg';

// Helper SVG generator for dark armored product renderings
const createProductSVG = (
  type: string,
  primaryColor: string = '#063B27',
  accentColor: string = '#B8BAB7',
  bgGrad: string = '#111512'
) => {
  const encoded = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="75%">
          <stop offset="0%" stop-color="#1A201C" />
          <stop offset="100%" stop-color="${bgGrad}" />
        </radialGradient>
        <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E5E5E0" />
          <stop offset="50%" stop-color="#8D918E" />
          <stop offset="100%" stop-color="#2D302F" />
        </linearGradient>
        <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#2CF598" />
          <stop offset="50%" stop-color="#0D9A5F" />
          <stop offset="100%" stop-color="#063B27" />
        </linearGradient>
        <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- Card Base Background -->
      <rect width="600" height="600" fill="url(#bgGrad)" />
      
      <!-- Tech Grid Lines -->
      <path d="M 0,150 L 600,150 M 0,300 L 600,300 M 0,450 L 600,450 M 150,0 L 150,600 M 300,0 L 300,600 M 450,0 L 450,600" 
            stroke="rgba(184,186,183,0.04)" stroke-width="1" stroke-dasharray="4,4"/>

      <!-- Ambient Glow Behind Product -->
      <circle cx="300" cy="300" r="180" fill="${primaryColor}" opacity="0.35" filter="url(#emeraldGlow)" />

      ${type === 'hoodie' ? `
        <!-- Tactical Hoodie Render -->
        <g transform="translate(100, 70)">
          <!-- Hood & Cape Outline -->
          <path d="M 120,80 Q 200,10 280,80 L 360,140 L 350,380 L 50,380 L 40,140 Z" fill="#141816" stroke="url(#metalGrad)" stroke-width="3" />
          <!-- Hood Inner Shadow -->
          <path d="M 140,80 Q 200,40 260,80 L 270,160 Q 200,190 130,160 Z" fill="#080A09" stroke="${primaryColor}" stroke-width="2" />
          <!-- Latverian Crest on Chest -->
          <polygon points="200,190 230,220 200,280 170,220" fill="none" stroke="url(#emeraldGrad)" stroke-width="4" filter="url(#emeraldGlow)"/>
          <circle cx="200" cy="235" r="8" fill="#E5E5E0" />
          <!-- Armor Plates on Shoulders -->
          <path d="M 50,140 L 120,160 L 100,240 L 45,200 Z" fill="url(#metalGrad)" opacity="0.8"/>
          <path d="M 350,140 L 280,160 L 300,240 L 355,200 Z" fill="url(#metalGrad)" opacity="0.8"/>
          <!-- Tactical Zipper / Seams -->
          <line x1="200" y1="180" x2="200" y2="380" stroke="#8D918E" stroke-width="3" stroke-dasharray="8,4" />
        </g>
      ` : ''}

      ${type === 'flask' ? `
        <!-- Cyber Titanium Flask -->
        <g transform="translate(180, 80)">
          <!-- Main Body -->
          <rect x="50" y="100" width="140" height="320" rx="20" fill="#181C1A" stroke="url(#metalGrad)" stroke-width="4" />
          <!-- Metal Ribs -->
          <rect x="50" y="160" width="140" height="20" fill="url(#metalGrad)" opacity="0.7"/>
          <rect x="50" y="240" width="140" height="20" fill="url(#metalGrad)" opacity="0.7"/>
          <rect x="50" y="320" width="140" height="20" fill="url(#metalGrad)" opacity="0.7"/>
          <!-- Cap -->
          <path d="M 90,60 L 150,60 L 160,100 L 80,100 Z" fill="url(#emeraldGrad)" stroke="#E5E5E0" stroke-width="2" />
          <rect x="105" y="30" width="30" height="30" rx="4" fill="url(#metalGrad)" />
          <!-- Energy Core Indicator -->
          <rect x="110" y="200" width="20" height="100" rx="10" fill="#080A09" stroke="${primaryColor}" stroke-width="2"/>
          <rect x="114" y="240" width="12" height="55" rx="6" fill="url(#emeraldGrad)" filter="url(#emeraldGlow)"/>
        </g>
      ` : ''}

      ${type === 'keyboard' ? `
        <!-- Doom Core Mechanical Keyboard -->
        <g transform="translate(50, 140)">
          <!-- Keyboard Base -->
          <polygon points="40,60 460,60 500,260 0,260" fill="#121614" stroke="url(#metalGrad)" stroke-width="4" />
          <!-- Top Aluminum Bezel -->
          <polygon points="40,60 460,60 450,90 50,90" fill="url(#metalGrad)" opacity="0.9" />
          <!-- Emerald Underglow Base -->
          <polygon points="10,260 490,260 505,275 -5,275" fill="url(#emeraldGrad)" filter="url(#emeraldGlow)"/>
          <!-- Keycaps Grid Representation -->
          <g fill="#252A28" stroke="${primaryColor}" stroke-width="1.5">
            <rect x="60" y="100" width="380" height="25" rx="3" />
            <rect x="55" y="135" width="390" height="25" rx="3" />
            <rect x="50" y="170" width="400" height="25" rx="3" />
            <rect x="45" y="205" width="410" height="30" rx="4" />
          </g>
          <!-- Latveria Crest Badge -->
          <polygon points="250,65 260,75 250,85 240,75" fill="#E5E5E0" />
        </g>
      ` : ''}

      ${type === 'backpack' ? `
        <!-- Latveria Obsidian Backpack -->
        <g transform="translate(130, 80)">
          <!-- Main Bag Body -->
          <path d="M 80,60 Q 170,30 260,60 L 300,380 L 40,380 Z" fill="#121513" stroke="url(#metalGrad)" stroke-width="4" />
          <!-- Hard Shell Front Plate -->
          <polygon points="100,100 240,100 270,320 70,320" fill="#1A1F1D" stroke="url(#emeraldGrad)" stroke-width="3" />
          <!-- Latveria Emblem -->
          <circle cx="170" cy="180" r="35" fill="#080A09" stroke="url(#metalGrad)" stroke-width="3" />
          <polygon points="170,160 185,190 155,190" fill="url(#emeraldGrad)" filter="url(#emeraldGlow)"/>
          <!-- Tactical Straps & Buckles -->
          <line x1="70" y1="240" x2="270" y2="240" stroke="#8D918E" stroke-width="4"/>
          <rect x="150" y="230" width="40" height="20" rx="4" fill="url(#metalGrad)"/>
        </g>
      ` : ''}

      ${type === 'tumbler' ? `
        <!-- Armor Plated Tumbler -->
        <g transform="translate(190, 80)">
          <!-- Tumbler Body -->
          <polygon points="40,40 180,40 150,380 70,380" fill="#151A18" stroke="url(#metalGrad)" stroke-width="4"/>
          <!-- Crimson / Emerald Band -->
          <polygon points="43,90 177,90 171,150 49,150" fill="${primaryColor}" stroke="#2CF598" stroke-width="2"/>
          <text x="110" y="125" font-family="Orbitron, sans-serif" font-size="14" fill="#E5E5E0" text-anchor="middle" font-weight="bold">DOOM</text>
          <!-- Grip Armor Cuts -->
          <line x1="60" y1="200" x2="160" y2="200" stroke="#8D918E" stroke-width="3"/>
          <line x1="63" y1="240" x2="157" y2="240" stroke="#8D918E" stroke-width="3"/>
          <line x1="66" y1="280" x2="154" y2="280" stroke="#8D918E" stroke-width="3"/>
          <!-- Lid -->
          <rect x="30" y="20" width="160" height="20" rx="5" fill="url(#metalGrad)"/>
        </g>
      ` : ''}

      ${type === 'charger' ? `
        <!-- Doomsday Wireless Charger -->
        <g transform="translate(130, 130)">
          <!-- Outer Octagon Base -->
          <polygon points="100,20 240,20 320,100 320,240 240,320 100,320 20,240 20,100" fill="#121614" stroke="url(#metalGrad)" stroke-width="5" />
          <!-- Inner Energy Ring -->
          <circle cx="170" cy="170" r="100" fill="#080A09" stroke="url(#emeraldGrad)" stroke-width="6" filter="url(#emeraldGlow)" />
          <!-- Center Emblem -->
          <polygon points="170,120 200,170 170,220 140,170" fill="url(#metalGrad)" />
          <circle cx="170" cy="170" r="12" fill="#2CF598" />
        </g>
      ` : ''}

      ${type === 'journal' ? `
        <!-- Latveria Leather Tactical Journal -->
        <g transform="translate(140, 80)">
          <!-- Book Cover -->
          <rect x="40" y="40" width="260" height="360" rx="12" fill="#1C1B18" stroke="url(#metalGrad)" stroke-width="4"/>
          <!-- Metallic Spine -->
          <rect x="40" y="40" width="35" height="360" rx="4" fill="url(#metalGrad)"/>
          <!-- Embossed Latverian Seal -->
          <circle cx="180" cy="200" r="50" fill="#080A09" stroke="${accentColor}" stroke-width="3"/>
          <polygon points="180,165 200,215 160,215" fill="url(#emeraldGrad)" filter="url(#emeraldGlow)"/>
          <!-- Metal Corner Protectors -->
          <polygon points="260,40 300,40 300,80" fill="url(#metalGrad)"/>
          <polygon points="260,400 300,400 300,360" fill="url(#metalGrad)"/>
        </g>
      ` : ''}

      ${type === 'pin' ? `
        <!-- Latverian Crest Metal Pin Set -->
        <g transform="translate(120, 100)">
          <!-- Large Center Shield Pin -->
          <polygon points="180,40 260,90 240,220 180,260 120,220 100,90" fill="#141816" stroke="url(#metalGrad)" stroke-width="5"/>
          <polygon points="180,70 230,105 215,195 180,225 145,195 130,105" fill="url(#emeraldGrad)" opacity="0.8"/>
          <circle cx="180" cy="140" r="20" fill="#E5E5E0" stroke="#080A09" stroke-width="3"/>
          
          <!-- Mini Pins -->
          <circle cx="70" cy="280" r="30" fill="url(#metalGrad)" stroke="#2CF598" stroke-width="2"/>
          <polygon points="290,250 320,280 290,310 260,280" fill="url(#metalGrad)" stroke="#2CF598" stroke-width="2"/>
        </g>
      ` : ''}

      ${type === 'deskpad' ? `
        <!-- Emerald Ray Desk Pad -->
        <g transform="translate(40, 150)">
          <!-- Wide Leather / Armor Mat -->
          <rect x="20" y="40" width="480" height="240" rx="16" fill="#111413" stroke="url(#metalGrad)" stroke-width="4"/>
          <!-- Emerald Edge Stitching -->
          <rect x="30" y="50" width="460" height="220" rx="10" fill="none" stroke="url(#emeraldGrad)" stroke-width="2" stroke-dasharray="6,4"/>
          <!-- Top Right Latveria Tech Stamp -->
          <polygon points="420,60 470,60 470,110" fill="url(#metalGrad)"/>
          <!-- Grid Overlay -->
          <path d="M 50,160 L 470,160 M 250,60 L 250,260" stroke="#2CF598" stroke-width="1" opacity="0.3"/>
        </g>
      ` : ''}

      ${type === 'cap' ? `
        <!-- Latverian Crest Embossed Cap -->
        <g transform="translate(110, 110)">
          <!-- Cap Crown -->
          <path d="M 80,220 C 80,100 300,100 300,220 Z" fill="#151A18" stroke="url(#metalGrad)" stroke-width="4"/>
          <!-- Visor / Bill -->
          <path d="M 60,220 Q 190,270 340,210 L 320,240 Q 180,300 40,240 Z" fill="url(#metalGrad)"/>
          <!-- Embossed Front Emblem -->
          <polygon points="190,130 215,165 190,200 165,165" fill="#080A09" stroke="url(#emeraldGrad)" stroke-width="3" filter="url(#emeraldGlow)"/>
        </g>
      ` : ''}

      ${type === 'earbuds' ? `
        <!-- High-Tech Earbuds -->
        <g transform="translate(120, 110)">
          <!-- Charging Case -->
          <rect x="100" y="100" width="160" height="180" rx="30" fill="#141816" stroke="url(#metalGrad)" stroke-width="4"/>
          <!-- Lid Seam -->
          <line x1="100" y1="150" x2="260" y2="150" stroke="url(#emeraldGrad)" stroke-width="3" filter="url(#emeraldGlow)"/>
          <!-- LED Indicator -->
          <circle cx="180" cy="200" r="6" fill="#2CF598" filter="url(#emeraldGlow)"/>
          <!-- Left Earbud Outside -->
          <circle cx="60" cy="80" r="22" fill="url(#metalGrad)"/>
          <rect x="55" y="80" width="10" height="40" fill="url(#metalGrad)"/>
          <!-- Right Earbud Outside -->
          <circle cx="300" cy="80" r="22" fill="url(#metalGrad)"/>
          <rect x="295" y="80" width="10" height="40" fill="url(#metalGrad)"/>
        </g>
      ` : ''}

      ${type === 'watchband' ? `
        <!-- Doomsday Watch Strap -->
        <g transform="translate(180, 80)">
          <!-- Watch Face -->
          <rect x="50" y="150" width="140" height="150" rx="20" fill="#080A09" stroke="url(#metalGrad)" stroke-width="4"/>
          <!-- Screen Display -->
          <rect x="65" y="165" width="110" height="120" rx="10" fill="#0E1411" stroke="#0D9A5F" stroke-width="2"/>
          <text x="120" y="225" font-family="Orbitron, sans-serif" font-size="20" fill="#2CF598" text-anchor="middle" font-weight="bold">DOOM</text>
          <!-- Armor Links Top -->
          <rect x="70" y="30" width="100" height="120" rx="8" fill="#181D1B" stroke="url(#metalGrad)" stroke-width="2"/>
          <line x1="70" y1="70" x2="170" y2="70" stroke="#8D918E" stroke-width="2"/>
          <!-- Armor Links Bottom -->
          <rect x="70" y="300" width="100" height="120" rx="8" fill="#181D1B" stroke="url(#metalGrad)" stroke-width="2"/>
          <line x1="70" y1="340" x2="170" y2="340" stroke="#8D918E" stroke-width="2"/>
        </g>
      ` : ''}

      <!-- Corner Frame Brackets -->
      <path d="M 20,50 L 20,20 L 50,20" stroke="url(#metalGrad)" stroke-width="3" fill="none"/>
      <path d="M 580,50 L 580,20 L 550,20" stroke="url(#metalGrad)" stroke-width="3" fill="none"/>
      <path d="M 20,550 L 20,580 L 50,580" stroke="url(#metalGrad)" stroke-width="3" fill="none"/>
      <path d="M 580,550 L 580,580 L 550,580" stroke="url(#metalGrad)" stroke-width="3" fill="none"/>
    </svg>
  `);
  return `data:image/svg+xml;utf8,${encoded}`;
};

export const PRODUCTS: Product[] = [
  {
    id: 'latveria-tactical-hoodie',
    name: 'Latveria Tactical Anorak Hoodie',
    originalName: 'Google Heavyweight Overhead Hoodie',
    price: 98.00,
    originalPrice: 120.00,
    category: 'apparel',
    collection: 'armor',
    badge: 'BEST SELLER',
    badgeType: 'silver',
    rating: 4.9,
    reviewsCount: 142,
    image: hoodieImage,
    description: 'Forged with high-density Latverian-grade fleece and reinforced shoulder armor plates. Features a water-resistant finish, high-neck magnetic cowl, and an embossed Google x Doom crest.',
    storyCopy: 'Designed for the vanguard who command respect in any environment. Heavyweight 480GSM fabric engineered to withstand harsh mountain winds.',
    features: [
      'Reinforced shoulder armor stitching',
      'Magnetic cowl high-collar hood',
      'Hidden tactical zip pocket for mobile devices',
      'Water-repellent DWR coating',
      'Embossed Latverian shield crest'
    ],
    specs: [
      { label: 'Material', value: '75% Organic Cotton, 25% Latverian Poly-Tech' },
      { label: 'Fit', value: 'Over-sized Tactical Cut' },
      { label: 'Weight', value: '480 GSM' },
      { label: 'Care', value: 'Machine Wash Cold / Air Dry' }
    ],
    colors: [
      { name: 'Dark Emerald', hex: '#063B27' },
      { name: 'Charcoal Black', hex: '#101311' },
      { name: 'Fractured Silver', hex: '#B8BAB7' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    stock: 24,
    isClassified: false
  },
  {
    id: 'doom-citadel-tee',
    name: 'Doom Citadel Heavyweight Tee',
    originalName: 'Google Organic Cotton T-Shirt',
    price: 48.00,
    category: 'apparel',
    collection: 'armor',
    badge: 'BEST SELLER',
    badgeType: 'silver',
    rating: 4.8,
    reviewsCount: 167,
    image: doomsdayTeeImage,
    description: '300GSM combed cotton boxy tee featuring high-density puff print Latverian Citadel graphics across the back and silver subtle chest branding.',
    storyCopy: 'Thick, structured silhouette designed to hold its boxy drape wash after wash.',
    features: [
      '300 GSM 100% Organic Cotton',
      'High-density puff print back graphics',
      'Reinforced rib collar',
      'Pre-shrunk vintage wash treatment'
    ],
    specs: [
      { label: 'Fit', value: 'Boxy / Dropped Shoulder' },
      { label: 'Care', value: 'Machine wash inside out' }
    ],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Charcoal Black', hex: '#080A09' },
      { name: 'Dark Emerald', hex: '#063B27' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    stock: 30,
    isClassified: false
  },
  {
    id: 'doomsday-titanium-flask',
    name: 'Doomsday Titanium Cyber Flask',
    originalName: 'Google Insulated Water Bottle',
    price: 42.00,
    category: 'drinkware',
    collection: 'vault',
    badge: 'LIMITED',
    badgeType: 'crimson',
    rating: 4.8,
    reviewsCount: 89,
    image: flaskImage,
    description: 'Vacuum-insulated double-wall titanium alloy vessel. Keeps liquids ice-cold for 36 hours or scalding hot for 18 hours. Equipped with an integrated energy core fill window.',
    storyCopy: 'Built to sustain long campaigns across hostile territory. Indestructible titanium build with zero taste retention.',
    features: [
      'Pure Grade 2 Titanium construction',
      'Double-wall vacuum thermal preservation',
      'Leakproof magnetic twist lock cap',
      'Integrated volume core window',
      'Laser-etched Victor Von Doom signature'
    ],
    specs: [
      { label: 'Capacity', value: '750 ml / 25 oz' },
      { label: 'Weight', value: '280g' },
      { label: 'Thermal Rating', value: 'Hot: 18h / Cold: 36h' },
      { label: 'BPA Free', value: '100% Certified' }
    ],
    colors: [
      { name: 'Fractured Silver', hex: '#B8BAB7' },
      { name: 'Obsidian Black', hex: '#080A09' }
    ],
    stock: 12,
    isClassified: false
  },
  {
    id: 'doom-core-keyboard',
    name: 'Doom Core Mechanical Keyboard',
    originalName: 'Google Custom Mechanical Keyboard',
    price: 185.00,
    originalPrice: 210.00,
    category: 'tech',
    collection: 'vault',
    badge: 'CLASSIFIED',
    badgeType: 'purple',
    rating: 5.0,
    reviewsCount: 64,
    image: keyboardImage,
    description: 'CNC-machined anodized aluminum chassis with custom emerald tactile switches. Features programmable macro keys, emerald reactive RGB underglow, and Latverian keycap legends.',
    storyCopy: 'Every keystroke echoes like a decree from Castle Doom. Tuned for sub-millisecond latency and acoustics.',
    features: [
      'Gasket-mounted CNC aluminum body',
      'Hot-swappable Latveria Tactile switches',
      'PBT double-shot keycaps with Doom runic accents',
      'South-facing emerald RGB lighting',
      'Coiled detachable aviator cable included'
    ],
    specs: [
      { label: 'Layout', value: '75% Compact (82 Keys)' },
      { label: 'Connectivity', value: 'Type-C / 2.4G Wireless / Bluetooth 5.2' },
      { label: 'Battery', value: '4000 mAh (120 Hours)' },
      { label: 'Weight', value: '1.45 kg' }
    ],
    colors: [
      { name: 'Obsidian & Emerald', hex: '#063B27' },
      { name: 'Deep Purple & Silver', hex: '#35143F' }
    ],
    stock: 7,
    isClassified: true
  },
  {
    id: 'latveria-obsidian-backpack',
    name: 'Latveria Obsidian Cyber Backpack',
    originalName: 'Google Commuter Laptop Backpack',
    price: 120.00,
    category: 'accessories',
    collection: 'ashes',
    badge: 'NEW',
    badgeType: 'emerald',
    rating: 4.7,
    reviewsCount: 31,
    image: createProductSVG('backpack', '#063B27', '#B8BAB7'),
    description: 'Molded hardshell front armor panel protecting laptops up to 16". Features anti-theft hidden zippers, TSA checkpoint-friendly expansion, and weather-sealed storm cuffs.',
    storyCopy: 'Engineered for urban operations and daily field deployment with maximum ergonomic lumbar support.',
    features: [
      'EVA molded hardshell protective armor',
      'Dedicated padded 16" laptop sleeve',
      'Integrated USB-C passthrough charging port',
      'Waterproof YKK AquaGuard zippers',
      'Ergonomic breathable mesh air-channel back panel'
    ],
    specs: [
      { label: 'Capacity', value: '28L Expanded' },
      { label: 'Dimensions', value: '48 x 32 x 18 cm' },
      { label: 'Material', value: '1680D Cordura Ballistic Nylon' }
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#101311' },
      { name: 'Tactical Gray', hex: '#565A58' }
    ],
    stock: 19,
    isClassified: false
  },
  {
    id: 'latverian-crest-metal-pins',
    name: 'Latverian Crest Metal Pin Set',
    originalName: 'Google Lapel Pin Collection',
    price: 24.00,
    category: 'collectibles',
    collection: 'legacy',
    badge: 'BEST SELLER',
    badgeType: 'silver',
    rating: 4.9,
    reviewsCount: 210,
    image: createProductSVG('pin', '#063B27', '#E5E5E0'),
    description: 'Set of 4 heavy zinc alloy enamel pins featuring the official Latverian Crest, Doom Armor Mask, Google G Cyber Emblem, and Doomsday Monogram.',
    storyCopy: 'Wear the mark of the sovereign ruler. Crafted with hard enamel fill and dual rubber clutch backings.',
    features: [
      'Solid Zinc-Alloy metal construction',
      'Hard enamel scratch-resistant finish',
      'Dual rubber clutch backings for secure attachment',
      'Includes custom metallic display box'
    ],
    specs: [
      { label: 'Quantity', value: '4 Pins Included' },
      { label: 'Size', value: '35mm - 45mm' },
      { label: 'Finish', value: 'Fractured Antique Silver' }
    ],
    colors: [
      { name: 'Antique Silver & Emerald', hex: '#B8BAB7' }
    ],
    stock: 45,
    isClassified: false
  },
  {
    id: 'victor-armor-tumbler',
    name: 'Victor\'s Armor Plated Tumbler',
    originalName: 'Google Stainless Steel Travel Mug',
    price: 38.00,
    category: 'drinkware',
    collection: 'armor',
    badge: 'LAST UNITS',
    badgeType: 'red',
    rating: 4.6,
    reviewsCount: 78,
    image: createProductSVG('tumbler', '#641719', '#E5E5E0'),
    description: 'Triple-insulated stainless steel tumbler with aggressive armor-plate grip ridges and a dark crimson energy ring accent.',
    storyCopy: 'Keep your brew hot during long hours of strategy and engineering in the sanctuary.',
    features: [
      'Triple-wall 18/8 stainless steel',
      'Tactile armor grip ridges',
      'Shatterproof clear splash lock lid',
      'Fits standard automotive cupholders'
    ],
    specs: [
      { label: 'Capacity', value: '20 oz / 600 ml' },
      { label: 'Insulation', value: '12h Hot / 24h Cold' }
    ],
    colors: [
      { name: 'Crimson & Charcoal', hex: '#641719' },
      { name: 'Emerald & Obsidian', hex: '#063B27' }
    ],
    stock: 5,
    isClassified: false
  },
  {
    id: 'doomsday-wireless-charger',
    name: 'Doomsday Wireless Fast Charger',
    originalName: 'Google Qi Wireless Charging Pad',
    price: 55.00,
    category: 'tech',
    collection: 'legacy',
    badge: 'NEW',
    badgeType: 'emerald',
    rating: 4.8,
    reviewsCount: 52,
    image: createProductSVG('charger', '#063B27', '#2CF598'),
    description: '15W MagSafe-compatible wireless charging pad with an octagonal alloy frame and animated emerald energy glow ring during active power delivery.',
    storyCopy: 'Instantly energize your mobile devices with sovereign efficiency.',
    features: [
      '15W Fast Wireless Output',
      'MagSafe magnetic alignment array',
      'Anodized aluminum heat-sink chassis',
      'Dynamic breathing emerald LED indicator'
    ],
    specs: [
      { label: 'Input', value: 'Type-C PD 20W' },
      { label: 'Compatibility', value: 'iPhone, Pixel, Galaxy, AirPods' },
      { label: 'Cable Length', value: '1.5 Meter Braided Cable Included' }
    ],
    colors: [
      { name: 'Emerald Cyber Ring', hex: '#063B27' }
    ],
    stock: 32,
    isClassified: false
  },
  {
    id: 'latveria-leather-journal',
    name: 'Latveria Leather Tactical Journal',
    originalName: 'Google Hardcover Notebook',
    price: 34.00,
    category: 'workspace',
    collection: 'ashes',
    badge: 'CLASSIFIED',
    badgeType: 'purple',
    rating: 4.9,
    reviewsCount: 41,
    image: createProductSVG('journal', '#35143F', '#C0B7A2'),
    description: 'Heavyweight 160GSM archivist paper bound in dark distressed eco-leather. Features silver metal corner guards and an expandable back pocket for schematics.',
    storyCopy: 'Where sovereign decrees, technological blueprints, and tactical strategies are inscribed.',
    features: [
      '160 GSM ink-proof fountain paper',
      '240 dotted numbered pages',
      'Fractured metal corner protectors',
      'Dual ribbon bookmark ribbons',
      'Includes metal Latverian pen holder loop'
    ],
    specs: [
      { label: 'Format', value: 'A5 (148 x 210 mm)' },
      { label: 'Binding', value: '180° Lay-Flat Thread Bound' }
    ],
    colors: [
      { name: 'Dark Ash & Silver', hex: '#726C60' },
      { name: 'Royal Purple', hex: '#35143F' }
    ],
    stock: 15,
    isClassified: true
  },
  {
    id: 'emerald-ray-deskpad',
    name: 'Emerald Ray Ultra-Wide Desk Pad',
    originalName: 'Google Desk Mat',
    price: 45.00,
    category: 'workspace',
    collection: 'legacy',
    badge: 'NEW',
    badgeType: 'emerald',
    rating: 4.9,
    reviewsCount: 28,
    image: createProductSVG('deskpad', '#063B27', '#2CF598'),
    description: '900x400mm waterproof desk mat featuring a micro-textured cloth tracking surface, stitched emerald edges, and anti-slip rubber base.',
    storyCopy: 'Frame your workstation with sovereign precision and buttery mouse sensor accuracy.',
    features: [
      'Ultra-dense micro-weave mouse surface',
      'Anti-fraying stitched emerald border',
      '4mm thick rubber anti-slip base',
      'Waterproof spill-resistant coating'
    ],
    specs: [
      { label: 'Dimensions', value: '900 x 400 x 4 mm' },
      { label: 'Weight', value: '850g' }
    ],
    colors: [
      { name: 'Tactical Grid & Emerald', hex: '#063B27' }
    ],
    stock: 22,
    isClassified: false
  },
  {
    id: 'latverian-crest-cap',
    name: 'Latverian Crest Embossed Cap',
    originalName: 'Google Adjustable Baseball Cap',
    price: 36.00,
    category: 'apparel',
    collection: 'ashes',
    badge: 'LAST UNITS',
    badgeType: 'red',
    rating: 4.7,
    reviewsCount: 56,
    image: createProductSVG('cap', '#063B27', '#B8BAB7'),
    description: 'Structured 6-panel cotton twill snapback cap featuring a 3D molded rubber Latverian crest front emblem and metallic buckle clasp.',
    storyCopy: 'Shield your eyes under the cover of sovereign authority.',
    features: [
      'Premium heavy cotton twill',
      '3D molded rubberized crest',
      'Laser-vented side airflow eyelets',
      'Custom metal strap enclosure'
    ],
    specs: [
      { label: 'Size', value: 'One Size Fits Most (Adjustable)' }
    ],
    colors: [
      { name: 'Dark Emerald', hex: '#063B27' },
      { name: 'Stealth Black', hex: '#101311' }
    ],
    sizes: ['One Size'],
    stock: 4,
    isClassified: false
  },
  {
    id: 'doomsday-earbuds',
    name: 'Doomsday Active ANC Earbuds',
    originalName: 'Google Pixel Buds Pro',
    price: 165.00,
    originalPrice: 199.00,
    category: 'tech',
    collection: 'vault',
    badge: 'LIMITED',
    badgeType: 'crimson',
    rating: 4.9,
    reviewsCount: 93,
    image: createProductSVG('earbuds', '#35143F', '#B8BAB7'),
    description: 'Active Noise Canceling earbuds with custom 11mm titanium drivers, spatial audio tracking, and a metallic armored wireless charging case.',
    storyCopy: 'Silence the noise of lesser minds. Immerse yourself in total acoustic command.',
    features: [
      '45dB Active Noise Cancellation',
      'Custom 11mm Titanium diaphragm drivers',
      '31 Hours battery life with charging case',
      'IPX4 water-resistant earbuds'
    ],
    specs: [
      { label: 'ANC Mode', value: 'Hybrid Triple-Microphone' },
      { label: 'Bluetooth', value: 'v5.3 Multipoint' }
    ],
    colors: [
      { name: 'Fractured Silver', hex: '#B8BAB7' },
      { name: 'Obsidian Black', hex: '#101311' }
    ],
    stock: 9,
    isClassified: false
  }
];
