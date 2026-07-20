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
      { type: 'image', src: 'images/projects/tiny-little-platform.svg', alt: 'Conceptual map of screens connected to shared player services.', caption: 'Shared platform concept · Placeholder artwork' },
      { type: 'image', src: 'images/projects/tiny-little-services.svg', alt: 'Conceptual service diagram showing player data moving through a shared backend.', caption: 'Player-service flow · Placeholder artwork' },
      { type: 'image', src: 'images/projects/tiny-little-releases.svg', alt: 'Conceptual release surface showing browser and mobile game formats.', caption: 'Release surfaces · Placeholder artwork' },
    ],
    products: [
      { name: 'Tiny Little', icon: 'images/projects/apps/tiny-little.svg', links: [{ label: 'Tiny Little on Google Play', href: 'https://play.google.com/store/apps/details?id=com.tinylittle.app' }] },
      { name: 'Tiny Little Royale', icon: 'images/projects/apps/royale.svg', links: [{ label: 'Tiny Little Royale on Google Play', href: 'https://play.google.com/store/apps/details?id=com.hengtech.tinylittleroyale' }, { label: 'Tiny Little Royale on the App Store', href: 'https://apps.apple.com/app/id6743611360' }] },
      { name: 'Tiny Little Deva', icon: 'images/projects/apps/deva.svg', note: 'Currently listed as Deva: Hero Roguelike TD', links: [{ label: 'Deva on Google Play', href: 'https://play.google.com/store/apps/details?id=com.hengtech.tinylittledeva' }] },
      { name: 'Devares', icon: 'images/projects/apps/devares.svg', links: [{ label: 'Devares on Google Play', href: 'https://play.google.com/store/apps/details?id=com.hengtech.devares' }, { label: 'Devares on the App Store', href: 'https://apps.apple.com/app/id6744045988' }] },
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
    media: [{ type: 'image', src: 'images/projects/rentpilot.svg', alt: 'Conceptual view of the local-first RentPilot workflow.', caption: 'Local-first workflow · Placeholder artwork' }],
  },
  {
    slug: 'welearn-pro', domain: 'Enterprise learning', title: 'WeLearn Pro',
    summary: 'Enterprise learning platform adapted to client-specific requirements.',
    description: 'A master learning platform customised by the company for individual client deployments.',
    cover: 'images/projects/welearn-pro.svg', coverAlt: 'Conceptual placeholder showing video playback, progress records, and learning checkpoints.',
    contributions: ['Co-designed the backend architecture.', 'Implemented learning progress tracking, HLS streaming, and YouTube playback.', 'Implemented AFK detection and in-video quizzes.'],
    scopeLabel: 'Project context', scope: 'A master learning platform customised by the company for individual client deployments.',
    links: [{ label: 'Visit WeLearn Pro', href: 'https://welearnpro.com/' }],
    media: [{ type: 'image', src: 'images/projects/welearn-pro.svg', alt: 'Conceptual view of video, progress, and learning checkpoints.', caption: 'Learning flow · Placeholder artwork' }],
  },
  {
    slug: 'public-sector-solutions', domain: 'Public sector', title: 'Government & Public Sector Solutions',
    summary: 'Enterprise solutions for government agencies and public-sector organisations.',
    description: 'Representative work across internal workflows, public-facing services, access systems, kiosks, and specialised hardware integrations.',
    cover: 'images/projects/public-sector.svg', coverAlt: 'Conceptual placeholder showing service terminals and access devices connected to a central workflow.',
    contributions: ["Modernised TK Park's workstation management, RFID access control, POS integration, and kiosk systems.", 'Developed internal workflow systems and backend integrations for the Central Institute of Forensic Science and the Public Debt Management Office.', 'Developed public-facing applications including U-NAI for missing persons and unidentified bodies.'],
    scopeLabel: 'Public context', scope: 'Client work for government agencies and public-sector organisations.',
    media: [{ type: 'image', src: 'images/projects/public-sector.svg', alt: 'Conceptual view of public service terminals and integrated devices.', caption: 'Connected service workflow · Placeholder artwork' }],
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
