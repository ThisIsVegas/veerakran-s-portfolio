export type ProjectMedia =
  | { type: 'image'; src: string; alt: string; caption: string }
  | { type: 'video'; src: string; poster: string; caption: string; transcript?: string };

export interface ProjectLink { label: string; href: string }
export interface ProductLink { name: string; icon: string; note?: string; links: ProjectLink[] }

export interface Project {
  slug: string;
  domain: string;
  title: string;
  summary: string;
  description: string;
  cover: string;
  coverAlt: string;
  contributions: string[];
  scopeLabel: string;
  scope: string;
  media: ProjectMedia[];
  links?: ProjectLink[];
  products?: ProductLink[];
  status?: string;
  demoSoon?: string;
}

export const projects: Project[] = [
  {
    slug: 'tiny-little-platform', domain: 'Live-service games', title: 'Tiny Little Platform',
    summary: 'Shared backend platform supporting seven commercial games across browser, Android, and iOS.',
    description: 'A shared platform for player accounts, cloud saves, progression, and online services across a family of commercial games.',
    cover: 'images/projects/tiny-little-platform.svg',
    coverAlt: 'Conceptual placeholder showing connected game screens and shared player-service nodes.',
    contributions: [
      'Designed shared APIs and database structures for player accounts, cloud saves, progression, and online services.',
      'Developed gameplay features and backend functionality across Tiny Little Royale, Tiny Little Gangz, Tiny Little Deva, and Tiny Little Fly.',
      'Supported deployment of the wider seven-game platform across browser and mobile releases.',
    ],
    scopeLabel: 'Public scope', scope: 'Seven commercial games released across browser, Android, and iOS.',
    links: [{ label: 'Visit Tiny Little', href: 'https://tinylittle.io/' }],
    media: [
      { type: 'image', src: 'images/projects/screenshots/tinylittle/tinylittle1.webp', alt: 'Tiny Little app overview screen.', caption: 'Tiny Little app overview' },
      { type: 'image', src: 'images/projects/screenshots/tinylittle/tinylittle2.webp', alt: 'Friend messaging screen within the Tiny Little app.', caption: 'Friend messaging' },
      { type: 'image', src: 'images/projects/screenshots/tinylittle/tinylittle3.webp', alt: 'Clan system screen showing joined and suggested clans.', caption: 'Clan system' },
      { type: 'image', src: 'images/projects/screenshots/tinylittle/tinylittle4.webp', alt: 'Activity feed showing a followed friend’s post.', caption: 'Activity feed' },
      { type: 'image', src: 'images/projects/screenshots/tinylittle/tinylittle5.webp', alt: 'In-app library listing the games on the shared platform.', caption: 'In-app game library' },
      { type: 'image', src: 'images/projects/screenshots/tinylittle/tinylittle6.webp', alt: 'Devares card-collection gameplay screen.', caption: 'Devares gameplay' },
      { type: 'image', src: 'images/projects/screenshots/tinylittle/tinylittle7.webp', alt: 'Tiny Little Tank battle gameplay screen.', caption: 'Tiny Little Tank gameplay' },
      { type: 'image', src: 'images/projects/screenshots/tinylittle/tinylittle8.webp', alt: 'Tiny Little Jump platformer gameplay screen.', caption: 'Tiny Little Jump gameplay' },
      { type: 'image', src: 'images/projects/screenshots/tinylittle/tinylittle9.webp', alt: 'Gifting screen for sending virtual gifts to friends.', caption: 'Gifting system' },
      { type: 'video', src: 'videos/projects/deva.webm', poster: 'images/projects/apps/deva.webp', caption: 'Tiny Little Deva gameplay' },
      { type: 'video', src: 'videos/projects/tinyroyale.webm', poster: 'images/projects/apps/tinyroyale.webp', caption: 'Tiny Little Royale gameplay' },
    ],
    products: [
      { name: 'Tiny Little', icon: 'images/projects/apps/tinylittle.webp', links: [{ label: 'Tiny Little on Google Play', href: 'https://play.google.com/store/apps/details?id=com.tinylittle.app' }, { label: 'Tiny Little on the App Store', href: 'https://apps.apple.com/th/app/tinylittle/id6466629837' }] },
      { name: 'Tiny Little Royale', icon: 'images/projects/apps/tinyroyale.webp', links: [{ label: 'Tiny Little Royale on Google Play', href: 'https://play.google.com/store/apps/details?id=com.hengtech.tinylittleroyale' }, { label: 'Tiny Little Royale on the App Store', href: 'https://apps.apple.com/app/id6743611360' }] },
      { name: 'Tiny Little Deva', icon: 'images/projects/apps/deva.webp', note: 'Currently listed as Deva: Hero Roguelike TD', links: [{ label: 'Deva on Google Play', href: 'https://play.google.com/store/apps/details?id=com.hengtech.tinylittledeva' }, { label: 'Deva on the App Store', href: 'https://apps.apple.com/th/app/deva-td/id6738650568' }] },
      { name: 'Devares', icon: 'images/projects/apps/devares.webp', links: [{ label: 'Devares on Google Play', href: 'https://play.google.com/store/apps/details?id=com.hengtech.devares' }, { label: 'Devares on the App Store', href: 'https://apps.apple.com/app/id6744045988' }] },
    ],
  },
  {
    slug: 'rentpilot', domain: 'Desktop software', title: 'RentPilot',
    summary: 'Commercial offline dormitory management system for Windows.',
    description: 'An offline Windows dormitory management application using a local database, with OneDrive backup support.',
    cover: 'images/projects/rentpilot.svg', coverAlt: 'Conceptual placeholder showing property records, an offline application, and a backup copy.',
    contributions: ['Built the offline Windows application around a local database for day-to-day dormitory management.', 'Added OneDrive backup support and deployed the application for an active client.', 'Continue to maintain the production application.'],
    scopeLabel: 'Production context', scope: 'Deployed for and maintained for an active commercial client.',
    status: 'Product demo in preparation',
    demoSoon: 'Demo available soon',
    media: [
      { type: 'image', src: 'images/projects/screenshots/rentpilot/rentpilot1.png', alt: 'RentPilot dashboard showing occupancy rate and recent income.', caption: 'Dashboard' },
      { type: 'image', src: 'images/projects/screenshots/rentpilot/rentpilot2.png', alt: 'RentPilot invoice creation screen.', caption: 'Invoice creation' },
      { type: 'image', src: 'images/projects/screenshots/rentpilot/rentpilot3.png', alt: 'RentPilot overview of issued invoices.', caption: 'Invoice issue overview' },
    ],
  },
  {
    slug: 'welearn-pro', domain: 'Enterprise learning', title: 'WeLearn Pro',
    summary: 'Enterprise learning platform adapted to client-specific requirements.',
    description: 'A master learning platform customised by the company for individual client deployments.',
    cover: 'images/projects/welearn-pro.svg', coverAlt: 'Conceptual placeholder showing video playback, progress records, and learning checkpoints.',
    contributions: ['Co-designed the backend architecture.', 'Implemented learning progress tracking, HLS streaming, and YouTube playback.', 'Implemented AFK detection and in-video quizzes.'],
    scopeLabel: 'Project context', scope: 'A master learning platform customised by the company for individual client deployments.',
    links: [{ label: 'Visit WeLearn Pro', href: 'https://welearnpro.com/' }],
    media: [{ type: 'image', src: 'images/projects/screenshots/welearnpro/welearnpro1.webp', alt: 'WeLearn Pro marketing page showing the certificate editor feature.', caption: 'Certificate editor feature' }],
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

export interface ProfessionalWorkstream {
  title: string;
  summary: string;
  systems: string[];
}

export const professionalExperience: ProfessionalWorkstream[] = [
  {
    title: 'Public-sector information systems',
    summary: 'Developed backend and frontend systems for internal workflows, public-facing services, and integrations across government and public-sector projects.',
    systems: [
      'Internal workflow systems',
      'Public-facing applications',
      'Backend integrations',
      'SQL Server',
      'Oracle Database',
    ],
  },
  {
    title: 'Hardware-integrated Windows software',
    summary: 'Developed Windows applications that connected physical devices and identity systems with client workflows.',
    systems: [
      'C#',
      'Thai Citizen ID readers',
      'RFID',
      'Barcode scanners',
      'Digital signature pads',
      'Touch-screen kiosks',
      'POS',
    ],
  },
  {
    title: 'Enterprise software and systems integration',
    summary: 'Developed client-specific enterprise software spanning chatbots, database-backed applications, and integrations between existing systems.',
    systems: [
      'LINE Messaging API',
      'Node.js',
      'PHP',
      'SQL Server',
      'Oracle Database',
    ],
  },
];
