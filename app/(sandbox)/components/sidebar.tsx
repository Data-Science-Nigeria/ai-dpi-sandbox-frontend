'use client';

import { useState } from 'react';
import { ChevronRightIcon, ChevronDownIcon, PlayIcon, BookOpenIcon, CubeIcon } from '@heroicons/react/24/outline';
import { PanelLeft, PanelRight } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  hasDropdown?: boolean;
  items?: { id: string; label: string }[];
}

const menuItems: MenuItem[] = [
  {
    id: 'get-started',
    label: 'Get Started',
    icon: PlayIcon,
    hasDropdown: true,
    items: [
      { id: 'introduction', label: 'Introduction' },
      { id: 'quick-start', label: 'Quick Start' },
      { id: 'installation', label: 'Installation' },
      { id: 'setup', label: 'Setup' }
    ]
  },
  {
    id: 'guide',
    label: 'Guide',
    icon: BookOpenIcon,
    hasDropdown: true,
    items: [
      { id: 'basics', label: 'Basics' },
      { id: 'advanced', label: 'Advanced' },
      { id: 'best-practices', label: 'Best Practices' }
    ]
  },
  {
    id: 'core-resources',
    label: 'Core Resources',
    icon: CubeIcon,
    hasDropdown: true,
    items: [
      { id: 'components', label: 'Components' },
      { id: 'hooks', label: 'Hooks' },
      { id: 'utilities', label: 'Utilities' }
    ]
  }
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string>('');

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleItemSelect = (itemId: string) => {
    setSelectedItem(itemId);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen bg-white dark:bg-[#1C1E22] z-40
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-56 sm:w-64' : 'w-12 sm:w-16'}
        translate-x-0
      `}>
        {/* Header */}
        <div className={`flex items-center p-4 mt-20 ${isOpen ? 'justify-between' : 'justify-center'}`}>
          {isOpen && (
            <h1 className="text-[#00A859] font-bold text-xl">
              AI-DPI
            </h1>
          )}
          <button
            onClick={onToggle}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-[#AFBDD1]"
          >
            {isOpen ? (
              <PanelLeft className="w-5 h-5" />
            ) : (
              <PanelRight className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Menu Items */}
        <nav className={`flex-1 p-4 mt-2 space-y-2 ${!isOpen ? 'flex flex-col items-center' : ''}`}>
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.hasDropdown) {
                    toggleExpanded(item.id);
                  } else {
                    handleItemSelect(item.id);
                  }
                }}
                className={`
                  w-full flex items-center justify-between p-2 rounded-md
                  text-gray-700 dark:text-[#AFBDD1] hover:bg-gray-100 dark:hover:bg-gray-700
                  transition-colors duration-200
                  ${selectedItem === item.id ? 'bg-[#00A859] text-white' : ''}
                `}
              >
                <div className={`flex items-center ${isOpen ? 'space-x-3' : 'justify-center'}`}>
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {isOpen && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </div>
                {isOpen && item.hasDropdown && (
                  expandedItems.includes(item.id) ? (
                    <ChevronDownIcon className="w-4 h-4" />
                  ) : (
                    <ChevronRightIcon className="w-4 h-4" />
                  )
                )}
              </button>

              {/* Dropdown Items */}
              {isOpen && item.hasDropdown && expandedItems.includes(item.id) && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.items?.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => handleItemSelect(subItem.id)}
                      className={`
                        w-full text-left p-2 rounded-md text-sm
                        transition-colors duration-200
                        ${
                          selectedItem === subItem.id
                            ? 'bg-[#00A859] text-white'
                            : 'text-gray-600 dark:text-[#AFBDD1] hover:bg-gray-100 dark:hover:bg-gray-700'
                        }
                      `}
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      
    </>
  );
}