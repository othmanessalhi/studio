import { PlaceHolderImages } from "./placeholder-images";

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/properties', label: 'Properties' },
  { href: '/dakhla', label: 'Why Dakhla' },
  { href: '/contact', label: 'Contact' },
];

export const MOCK_PROPERTIES = [
  {
    id: 'p1',
    title: 'Oceanfront Oasis',
    price: 350000,
    size: 5000,
    location: 'Coastal',
    description: 'A stunning plot with direct access to the beach, perfect for a luxury villa or a boutique hotel. Unobstructed views of the Atlantic.',
    image: PlaceHolderImages.find(p => p.id === 'property-2'),
  },
  {
    id: 'p2',
    title: 'The Entrepreneur\'s Expanse',
    price: 180000,
    size: 10000,
    location: 'Inland',
    description: 'A vast expanse of flat land ideal for large-scale commercial or agricultural projects. Close to main transport routes.',
    image: PlaceHolderImages.find(p => p.id === 'property-1'),
  },
  {
    id: 'p3',
    title: 'Lagoon View Lot',
    price: 275000,
    size: 4500,
    location: 'Coastal',
    description: 'Overlooking the serene Dakhla lagoon, this plot is a haven for water sports enthusiasts and those seeking tranquility.',
    image: PlaceHolderImages.find(p => p.id === 'property-5'),
  },
  {
    id: 'p4',
    title: 'Strategic Industrial Plot',
    price: 220000,
    size: 20000,
    location: 'Industrial',
    description: 'Located in the new industrial zone, this plot is perfect for logistics, manufacturing, or warehousing, with key infrastructure nearby.',
    image: PlaceHolderImages.find(p => p.id === 'property-3'),
  },
  {
    id: 'p5',
    title: 'Desert Rose Retreat',
    price: 120000,
    size: 8000,
    location: 'Inland',
    description: 'A secluded and peaceful lot surrounded by unique desert landscapes. Ideal for a private retreat or an eco-tourism project.',
    image: PlaceHolderImages.find(p => p.id === 'property-4'),
  },
  {
    id: 'p6',
    title: 'Prime Commercial Corner',
    price: 450000,
    size: 3000,
    location: 'Urban',
    description: 'A high-visibility plot at a major intersection in the growing urban center, suitable for retail or mixed-use development.',
    image: PlaceHolderImages.find(p => p.id === 'property-6'),
  },
];

export type Property = (typeof MOCK_PROPERTIES)[0];
