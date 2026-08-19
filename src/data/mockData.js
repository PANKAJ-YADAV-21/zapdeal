export const SUPPORTED_MODELS = [
  { id: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max', brand: 'Apple' },
  { id: 'iphone-16-pro', name: 'iPhone 16 Pro', brand: 'Apple' },
  { id: 'iphone-16-plus', name: 'iPhone 16 Plus', brand: 'Apple' },
  { id: 'iphone-16', name: 'iPhone 16', brand: 'Apple' },
  { id: 'iphone-15-pro-max', name: 'iPhone 15 Pro Max', brand: 'Apple' },
  { id: 'iphone-15-pro', name: 'iPhone 15 Pro', brand: 'Apple' },
  { id: 'iphone-15-plus', name: 'iPhone 15 Plus', brand: 'Apple' },
  { id: 'iphone-15', name: 'iPhone 15', brand: 'Apple' },
  { id: 'iphone-14-pro-max', name: 'iPhone 14 Pro Max', brand: 'Apple' },
  { id: 'iphone-14-pro', name: 'iPhone 14 Pro', brand: 'Apple' },
  { id: 'iphone-14', name: 'iPhone 14', brand: 'Apple' },
  { id: 'iphone-13-pro-max', name: 'iPhone 13 Pro Max', brand: 'Apple' },
  { id: 'iphone-13-pro', name: 'iPhone 13 Pro', brand: 'Apple' },
  { id: 'iphone-13', name: 'iPhone 13', brand: 'Apple' },
  { id: 'galaxy-s24-ultra', name: 'Galaxy S24 Ultra', brand: 'Samsung' },
  { id: 'galaxy-s24', name: 'Galaxy S24', brand: 'Samsung' },
  { id: 'oneplus-12', name: 'OnePlus 12', brand: 'OnePlus' }
];

export const CASE_MATERIALS = [
  { id: 'silicone', name: 'Liquid Silicone', priceModifier: 0, description: 'Soft touch, shock-absorbent, microfiber lining' },
  { id: 'clear-magsafe', name: 'Crystal MagSafe Shield', priceModifier: 5, description: 'Ultra-clear TPU, anti-yellowing, built-in magnets' },
  { id: 'rugged', name: 'Armor Shockproof', priceModifier: 8, description: 'Dual-layer defense, military-grade drop test certified' },
  { id: 'matte-slim', name: 'Matte Slim Fit', priceModifier: -2, description: 'Super thin 0.8mm profile, fingerprint-resistant coating' }
];

export const BASE_COLORS = [
  { name: 'Midnight Black', hex: '#111111' },
  { name: 'Deep Indigo', hex: '#1e293b' },
  { name: 'Emerald Forest', hex: '#064e3b' },
  { name: 'Sunset Crimson', hex: '#7f1d1d' },
  { name: 'Lavender Mist', hex: '#a78bfa' },
  { name: 'Titanium Grey', hex: '#64748b' },
  { name: 'Sand Dune', hex: '#d97706' }
];

export const PRODUCTS = [
  {
    id: 'cyberpunk-neon',
    name: 'Cyberpunk Neon Shift',
    tagline: 'Futuristic Glow & Aesthetic',
    category: 'printed',
    basePrice: 24,
    rating: 4.9,
    reviewsCount: 142,
    description: 'Bring the neon-lit futuristic street vibes to your phone. Made with deep-ink UV printing that resists scratches and fading over long usage.',
    badge: 'Best Seller',
    image: '/assets/cyberpunk_neon.jpg',
    features: ['High-definition UV printing', 'Wireless charging compatible', 'Raised 1.2mm camera bezel']
  },
  {
    id: 'liquid-pearl',
    name: 'Liquid Pearl Silicone',
    tagline: 'Minimalist Premium Soft Feel',
    category: 'silicone',
    basePrice: 19,
    rating: 4.7,
    reviewsCount: 89,
    description: 'Smooth as silk, tough as armor. Our liquid silicone case provides an exceptional grip while protecting your device from everyday bumps.',
    badge: 'Trending',
    image: '/assets/liquid_pearl.jpg',
    features: ['Anti-dust coating', 'Premium microfiber interior', 'All-around protection']
  },
  {
    id: 'crystal-magsafe',
    name: 'Crystal MagSafe Shield',
    tagline: 'Pure Transparency with Magnetic Power',
    category: 'clear',
    basePrice: 29,
    rating: 4.8,
    reviewsCount: 204,
    description: 'Showcase your phone\'s original beauty while enjoying fast, snap-on wireless charging. Features specialized non-yellowing compound.',
    badge: 'Premium',
    isTransparent: true,
    features: ['High-grade polycarbonate back', 'Built-in N52 magnets', 'Corner bumpers']
  },
  {
    id: 'botanical-leaves',
    name: 'Botanical Illustration',
    tagline: 'Scandinavian Leaf Line-Art Style',
    category: 'printed',
    basePrice: 22,
    rating: 4.9,
    reviewsCount: 118,
    description: 'Bring an elegant scandinavian leaf illustration to your phone. Beautiful warm organic color accents printed with premium ink coat.',
    badge: 'New Release',
    image: '/assets/botanical_leaves.jpg',
    features: ['Eco-friendly organic ink base', 'Soft-touch matte clear-coat', 'Extremely light profile']
  },
  {
    id: 'monolithic-carbon',
    name: 'Monolithic Carbon Fiber',
    tagline: 'Ultra-Slim Aerospace Texture',
    category: 'rugged',
    basePrice: 32,
    rating: 4.6,
    reviewsCount: 95,
    description: 'Engineered for maximum durability without adding bulk. Carbon fiber textured finish offers superior tactile grip and impact protection.',
    badge: 'Rugged',
    gradient: 'linear-gradient(135deg, #1e293b, #0f172a, #020617)',
    hasPattern: true,
    patternType: 'carbon',
    features: ['Real carbon-textured grip', 'Drop-tested up to 10 feet', 'Ultra-thin profile']
  },
  {
    id: 'retro-grid',
    name: 'Retro Synthwave Grid',
    tagline: '80s Nostalgia Graphic Design',
    category: 'printed',
    basePrice: 22,
    rating: 4.8,
    reviewsCount: 63,
    description: 'Take a trip back to the 80s with this classic retrogrid theme. Features violet colors and sunset vector elements.',
    badge: 'Limited',
    image: '/assets/retro_synthwave.jpg',
    features: ['Scratch-resistant clear coat', 'Perfect cutouts for ports', 'Wireless-pay friendly']
  }
];

export const DISCOUNT_CODES = {
  'ZAPP20': 0.20,
  'WELCOME10': 0.10,
  'FREESHIP': 'FREE'
};
