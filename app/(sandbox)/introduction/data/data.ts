import { PlayIcon, BookOpenIcon, CubeIcon } from '@heroicons/react/24/outline';

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  hasDropdown?: boolean;
  href?: string;
  items?: { id: string; label: string; href: string }[];
}

export const menuItems: MenuItem[] = [
  {
    id: 'get-started',
    label: 'Get Started',
    icon: PlayIcon,
    hasDropdown: true,
    items: [
      { id: 'introduction', label: 'Introduction', href: '/introduction' }
    ]
  },
  {
    id: 'guide',
    label: 'Guide',
    icon: BookOpenIcon,
    hasDropdown: true,
    items: [
      { id: 'basics', label: 'Basics', href: '/' },
      { id: 'advanced', label: 'Advanced', href: '/' },
      { id: 'best-practices', label: 'Best Practices', href: '/' }
    ]
  },
  {
    id: 'core-resources',
    label: 'Core Resources',
    icon: CubeIcon,
    hasDropdown: true,
    items: [
      { id: 'components', label: 'Components', href: '/' },
      { id: 'hooks', label: 'Hooks', href: '/' },
      { id: 'utilities', label: 'Utilities', href: '/' }
    ]
  }
];