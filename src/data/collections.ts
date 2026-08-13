export interface CollectionItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  ctaText: string;
  colorTheme: 'emerald' | 'purple' | 'ash' | 'crimson';
  accentHex: string;
  bgGrad: string;
  itemCount: number;
}

export const COLLECTIONS: CollectionItem[] = [
  {
    id: 'armor',
    name: 'THE ARMOR COLLECTION',
    tagline: 'Forged for the Worthy',
    description: 'Heavyweight technical apparel and tactical gear built with reinforced stitching, metallic trims, and sovereign weatherproofing.',
    ctaText: 'ENTER COLLECTION',
    colorTheme: 'emerald',
    accentHex: '#0D9A5F',
    bgGrad: 'linear-gradient(135deg, rgba(6,59,39,0.8) 0%, rgba(16,19,17,0.95) 100%)',
    itemCount: 8
  },
  {
    id: 'vault',
    name: "DOOM'S VAULT",
    tagline: 'Classified Artifacts',
    description: 'Rare limited-edition mechanical keyboards, titanium vessels, and classified audio hardware reserved for those who command true power.',
    ctaText: 'OPEN THE VAULT',
    colorTheme: 'purple',
    accentHex: '#4D1C58',
    bgGrad: 'linear-gradient(135deg, rgba(53,20,63,0.8) 0%, rgba(10,13,11,0.95) 100%)',
    itemCount: 6
  },
  {
    id: 'ashes',
    name: 'ASHES OF EARTH',
    tagline: 'Everyday Field Gear',
    description: 'Muted ash, earth-toned journals, obsidian backpacks, and rugged accessories designed for unyielding daily operations.',
    ctaText: 'DISCOVER',
    colorTheme: 'ash',
    accentHex: '#948C7B',
    bgGrad: 'linear-gradient(135deg, rgba(114,108,96,0.3) 0%, rgba(16,19,17,0.95) 100%)',
    itemCount: 5
  },
  {
    id: 'legacy',
    name: 'EMERALD LEGACY',
    tagline: 'Sovereign Iconography',
    description: 'Signature emerald wireless chargers, desk pads, and hard-enamel metallic pins bearing the official Latverian seal.',
    ctaText: 'EXPLORE',
    colorTheme: 'emerald',
    accentHex: '#2CF598',
    bgGrad: 'linear-gradient(135deg, rgba(13,154,95,0.4) 0%, rgba(8,10,9,0.95) 100%)',
    itemCount: 7
  }
];
