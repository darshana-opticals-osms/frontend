import blueShield from '../assets/products/blue-shield.jpg';
import aquaRimless from '../assets/products/aqua-rimless.jpg';
import roundPilot from '../assets/products/round-pilot.jpg';
import smartShades from '../assets/products/smart-shades.jpg';
import halfRimBlack from '../assets/products/half-rim-black.jpg';
import roseLifestyle from '../assets/products/rose-lifestyle.jpg';
import blackPilot from '../assets/products/black-pilot.jpg';

const products = [
  {
    id: 'austen-classic',
    name: 'Austen Classic',
    brand: 'Oliver Peoples',
    category: 'Men',
    price: 12500,
    originalPrice: 14900,
    imageUrl: halfRimBlack,
    imageAlt: 'Black semi-rim rectangular optical frame on a white background',
    frameType: 'Semi-Rim',
    color: 'Black',
    description:
      'A lightweight everyday optical frame with a clean rectangular profile and comfortable nose pads.',
  },
  {
    id: 'apex-geometric',
    name: 'Apex Geometric',
    brand: 'Moscot',
    category: 'Men',
    price: 14500,
    originalPrice: 16900,
    imageUrl: smartShades,
    imageAlt: 'Black angular eyewear frame displayed on a light background',
    frameType: 'Full Rim',
    color: 'Black',
    description:
      'A sharp geometric silhouette designed for a modern look with a lightweight feel.',
  },
  {
    id: 'meridian-slim',
    name: 'Meridian Slim',
    brand: 'Warby Parker',
    category: 'Women',
    price: 12290,
    originalPrice: 14500,
    imageUrl: roseLifestyle,
    imageAlt: 'Rose coloured sunglasses displayed with a matching case',
    frameType: 'Full Rim',
    color: 'Rose',
    description:
      'A slim, softly rounded frame that balances a light profile with an expressive rose finish.',
  },
  {
    id: 'cleo-cat-eye',
    name: 'Cleo Cat-Eye',
    brand: 'Oliver Peoples',
    category: 'Women',
    price: 18000,
    originalPrice: 20500,
    imageUrl: roundPilot,
    imageAlt:
      'Round dark-lens sunglasses with a gold frame on a pink background',
    frameType: 'Full Rim',
    color: 'Gold',
    description:
      'A refined gold-tone frame with dark lenses, designed for an elegant everyday statement.',
  },
  {
    id: 'lumi-round',
    name: 'Lumi Round',
    brand: 'Persol',
    category: 'Women',
    price: 23500,
    originalPrice: 26500,
    imageUrl: aquaRimless,
    imageAlt: 'Aqua tinted rimless shield sunglasses with a gold-tone frame',
    frameType: 'Rimless',
    color: 'Aqua',
    description:
      'A light rimless design with a wide aqua lens and fine metal details for a contemporary finish.',
  },
  {
    id: 'junior-flex',
    name: 'Junior Flex',
    brand: 'Warby Parker',
    category: 'Kids',
    price: 8990,
    originalPrice: 9900,
    imageUrl: roseLifestyle,
    imageAlt:
      'Small rose coloured eyewear frame displayed beside a protective case',
    frameType: 'Full Rim',
    color: 'Rose',
    description:
      'A compact and lightweight frame chosen for comfortable day-to-day wear.',
  },
  {
    id: 'coastal-pilot',
    name: 'Coastal Pilot',
    brand: 'Ray-Ban',
    category: 'Sunglasses',
    price: 12290,
    originalPrice: 14500,
    imageUrl: blackPilot,
    imageAlt: 'Black pilot-style sunglasses on a warm orange background',
    frameType: 'Full Rim',
    color: 'Black',
    description:
      'A bold dark-lens pilot style with a clean black frame for bright outdoor conditions.',
  },
  {
    id: 'blue-shield',
    name: 'Blue Shield',
    brand: 'Oakley',
    category: 'Sunglasses',
    price: 18000,
    originalPrice: 20500,
    imageUrl: blueShield,
    imageAlt: 'Blue mirrored sunglasses with a clear and gold-tone frame',
    frameType: 'Full Rim',
    color: 'Blue',
    description:
      'Blue mirrored lenses pair with a transparent frame and fine gold-tone detailing.',
  },
  {
    id: 'aqua-visor',
    name: 'Aqua Visor',
    brand: 'Persol',
    category: 'Sunglasses',
    price: 15500,
    originalPrice: 17500,
    imageUrl: aquaRimless,
    imageAlt: 'Wide aqua tinted rimless visor sunglasses on a white background',
    frameType: 'Rimless',
    color: 'Aqua',
    description:
      'A wide visor-inspired lens with a light rimless construction and a distinctive aqua tint.',
  },
];

export default products;
