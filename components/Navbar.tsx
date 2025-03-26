'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, ChevronRight, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// Menu data structure with deeper nesting
const menuItems = [
  {
    title: 'Our Services',
    submenu: [
      { title: 'Security Alarm Systems', link: '/services/alarm-systems' },
      { title: 'CCTV & Camera Systems', link: '/services/cctv' },
      {
        title: 'Security Camera Installation Service',
        link: '/services/installation',
      },
      { title: 'Swann Security Cameras & Systems', link: '/services/swann' },
      { title: 'Service & Repairs', link: '/services/repairs' },
      {
        title: 'Video Intercoms & Access Control',
        link: '/services/intercoms',
      },
      { title: '24/7 Alarm Monitoring', link: '/services/monitoring' },
      {
        title: 'Smart Security and Home Automation',
        link: '/services/smart-security',
      },
      {
        title: 'New Home Build Security Consultation',
        link: '/services/home-security',
      },
      {
        title: 'Medical and Personal Alarms',
        link: '/services/medical-alarms',
      },
    ],
  },
  {
    title: 'Offers',
    submenu: [
      {
        title: 'CCTV',
        submenu: [
          {
            title: 'Dahua and Hikvision',
            submenu: [
              {
                title: 'HiLook 6MP Acusense CCTV Package',
                link: '/offers/hilook',
              },
              {
                title: 'Dahua 6MP Starlight CCTV Package',
                link: '/offers/dahua-starlight',
              },
              {
                title: 'Dahua TiOC 2.0 Security Camera Package',
                link: '/offers/dahua-tioc',
              },
              {
                title: 'Hikvision 6MP Acusense CCTV Package',
                link: '/offers/hikvision-acusense',
              },
              {
                title: 'Hikvision 4K DarkFighter Package',
                link: '/offers/hikvision-darkfighter',
              },
              {
                title: 'Hikvision Acusense CCTV Package',
                link: '/offers/hikvision-acusense-alt',
              },
            ],
          },
        ],
      },
      {
        title: 'Other Brands',
        submenu: [
          {
            title: 'Swann 4K Ultra HD 4 Camera NVR Security Package',
            link: '/offers/swann',
          },
          {
            title: 'Uniview 6MP Easystar CCTV Package',
            link: '/offers/uniview',
          },
          { title: 'Uniview 4K IP CCTV Package', link: '/offers/uniview-4k' },
          { title: 'Vivotek 5MP CCTV Package', link: '/offers/vivotek' },
          {
            title: 'Provision ISR CCTV Package',
            link: '/offers/provision-isr',
          },
        ],
      },
      {
        title: 'Alarms',
        submenu: [
          {
            title: 'Bosch Solution 3000 Alarm System Package',
            link: '/offers/bosch-3000',
          },
          {
            title: 'Hikvision Ax Pro Wireless Alarm Package',
            link: '/offers/hikvision-axpro',
          },
          {
            title: 'Paradox Magellan Hybrid Interactive Alarm Package',
            link: '/offers/paradox-magellan',
          },
          {
            title: 'Bosch Solution 6000 Alarm Package',
            link: '/offers/bosch-6000',
          },
        ],
      },
      {
        title: 'Intercoms',
        submenu: [
          {
            title: 'Akuvox Doorbell & Video Intercom Package',
            link: '/offers/akuvox',
          },
          {
            title: 'Dahua Video Intercom Packages',
            link: '/offers/dahua-intercom',
          },
          {
            title: 'Hikvision IP Intercom Package',
            link: '/offers/hikvision-intercom',
          },
        ],
      },
    ],
  },
  { title: 'Business Security', link: '/business-security' },
  { title: 'Articles', link: '/articles' },
  {
    title: 'About Secure Pal',
    submenu: [
      { title: "Why Choose Secure Pal's", link: '/about/why-choose' },
      { title: 'Meet Our Team', link: '/about/team' },
      { title: 'Request a Quote', link: '/about/quote' },
      { title: 'Brands We Supply', link: '/about/brands' },
      { title: 'Customer Service', link: '/about/service' },
      { title: 'Warranty Terms & Conditions', link: '/about/warranty' },
      { title: 'Security Licensing', link: '/about/licensing' },
    ],
  },
  {
    title: 'Become a Franchisee',
    submenu: [
      {
        title: "Why Invest in a Jim's Security Franchise?",
        link: '/franchise/why-invest',
      },
      {
        title: 'Franchisee Testimonials / Franchisee Q&A',
        link: '/franchise/testimonials',
      },
      {
        title: 'Dual Franchise Opportunity for Regional Areas',
        link: '/franchise/dual-opportunity',
      },
      { title: 'Onboarding Process', link: '/franchise/onboarding' },
      { title: 'Training and Support', link: '/franchise/training' },
      {
        title: "FAQS | Purchasing a Security Pal's Franchise",
        link: '/franchise/faqs',
      },
    ],
  },
  { title: 'Contact', link: '/contact' },
];

// Types for menu items
type MenuItem = {
  title: string;
  link?: string;
  submenu?: MenuItem[];
};

// Theme Toggle Component
function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is already set
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium text-white transition-colors hover:bg-[#0c5e99]"
      aria-label="Toggle theme"
    >
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-200',
        isScrolled ? 'bg-[#0a4e7f] shadow-md' : 'bg-[#0a4e7f]'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-auto items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Secure Pal Logo"
                className="h-20 w-20 object-contain"
                width={70}
                height={70}
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex">
            <ul className="flex space-x-1">
              {menuItems.map((item, index) => (
                <NavItem key={index} item={item} />
              ))}
            </ul>
          </nav>

          {/* Theme Toggle and Mobile Menu */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Mobile Navigation Trigger */}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium text-white transition-colors hover:bg-[#0c5e99] lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0a4e7f]/80 backdrop-blur-sm lg:hidden">
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-[#0a4e7f] p-0 shadow-lg">
            <div className="flex h-16 items-center justify-between border-b px-4">
              <Link
                href="/"
                className="flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <img
                  src="/images/secure-pal-logo-bg-removed.png"
                  alt="Secure Pal Logo"
                  className="h-10 w-auto"
                />
              </Link>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium text-white transition-colors hover:bg-[#0c5e99]"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="h-[calc(100vh-4rem)] overflow-y-auto pb-10">
              <nav className="flex-1 px-2 py-4">
                <MobileNavItems
                  items={menuItems}
                  closeMenu={() => setMobileMenuOpen(false)}
                />
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// Desktop Navigation Item Component
function NavItem({ item }: { item: MenuItem }) {
  const [isOpen, setIsOpen] = useState(false);

  // Handle mouse events for desktop
  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <li
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {item.link ? (
        <Link
          href={item.link}
          className="flex h-16 items-center px-3 text-sm font-medium text-white transition-colors hover:text-gray-200"
        >
          {item.title}
          {item.submenu && <ChevronDown className="ml-1 h-4 w-4" />}
        </Link>
      ) : (
        <button
          className="flex h-16 items-center px-3 text-sm font-medium text-white transition-colors hover:text-gray-200"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {item.title}
          {item.submenu && <ChevronDown className="ml-1 h-4 w-4" />}
        </button>
      )}

      {/* Dropdown for first level */}
      {item.submenu && isOpen && (
        <div className="absolute left-0 top-full z-50 min-w-[200px] rounded-md border border-gray-700 bg-[#0a4e7f] p-2 shadow-lg">
          <ul>
            {item.submenu.map((subItem, index) => (
              <li key={index} className="relative">
                {subItem.submenu ? (
                  <NestedDropdown item={subItem} />
                ) : (
                  <Link
                    href={subItem.link || '#'}
                    className="block rounded-md px-3 py-2 text-sm text-white hover:bg-[#0c5e99]"
                  >
                    {subItem.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

// Nested Dropdown Component for second level
function NestedDropdown({ item }: { item: MenuItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-white hover:bg-[#0c5e99]"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {item.title}
        <ChevronRight className="ml-2 h-4 w-4" />
      </button>

      {isOpen && item.submenu && (
        <div className="absolute left-full top-0 z-50 min-w-[200px] rounded-md border border-gray-700 bg-[#0a4e7f] p-2 shadow-lg">
          <ul>
            {item.submenu.map((subItem, index) => (
              <li key={index} className="relative">
                {subItem.submenu ? (
                  <DeepNestedDropdown item={subItem} />
                ) : (
                  <Link
                    href={subItem.link || '#'}
                    className="block rounded-md px-3 py-2 text-sm text-white hover:bg-[#0c5e99]"
                  >
                    {subItem.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Deep Nested Dropdown Component for third level
function DeepNestedDropdown({ item }: { item: MenuItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-white hover:bg-[#0c5e99]"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {item.title}
        <ChevronRight className="ml-2 h-4 w-4" />
      </button>

      {isOpen && item.submenu && (
        <div className="absolute left-full top-0 z-50 min-w-[250px] rounded-md border border-gray-700 bg-[#0a4e7f] p-2 shadow-lg">
          <ul>
            {item.submenu.map((subItem, index) => (
              <li key={index}>
                <Link
                  href={subItem.link || '#'}
                  className="block rounded-md px-3 py-2 text-sm text-white hover:bg-[#0c5e99]"
                >
                  {subItem.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Mobile Navigation Items Component
function MobileNavItems({
  items,
  closeMenu,
}: {
  items: MenuItem[];
  closeMenu: () => void;
}) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <MobileNavItem key={index} item={item} closeMenu={closeMenu} />
      ))}
    </ul>
  );
}

// Mobile Navigation Item Component
function MobileNavItem({
  item,
  closeMenu,
}: {
  item: MenuItem;
  closeMenu: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (!item.submenu) {
    return (
      <li>
        <Link
          href={item.link || '#'}
          className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-[#0c5e99]"
          onClick={closeMenu}
        >
          {item.title}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-[#0c5e99]"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {item.title}
        <ChevronDown
          className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')}
        />
      </button>
      {isOpen && item.submenu && (
        <ul className="mt-1 space-y-1 pl-6">
          {item.submenu.map((subItem, subIndex) => (
            <MobileSubNavItem
              key={subIndex}
              item={subItem}
              closeMenu={closeMenu}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

// Mobile Sub Navigation Item Component
function MobileSubNavItem({
  item,
  closeMenu,
}: {
  item: MenuItem;
  closeMenu: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (!item.submenu) {
    return (
      <li>
        <Link
          href={item.link || '#'}
          className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-[#0c5e99]"
          onClick={closeMenu}
        >
          {item.title}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-[#0c5e99]"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {item.title}
        <ChevronDown
          className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')}
        />
      </button>
      {isOpen && item.submenu && (
        <ul className="mt-1 space-y-1 pl-6">
          {item.submenu.map((subItem, subIndex) => (
            <MobileDeepSubNavItem
              key={subIndex}
              item={subItem}
              closeMenu={closeMenu}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

// Mobile Deep Sub Navigation Item Component for third level
function MobileDeepSubNavItem({
  item,
  closeMenu,
}: {
  item: MenuItem;
  closeMenu: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (!item.submenu) {
    return (
      <li>
        <Link
          href={item.link || '#'}
          className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-[#0c5e99]"
          onClick={closeMenu}
        >
          {item.title}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-[#0c5e99]"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {item.title}
        <ChevronDown
          className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')}
        />
      </button>
      {isOpen && item.submenu && (
        <ul className="mt-1 space-y-1 pl-6">
          {item.submenu.map((subItem, subIndex) => (
            <li key={subIndex}>
              <Link
                href={subItem.link || '#'}
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-[#0c5e99]"
                onClick={closeMenu}
              >
                {subItem.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default Navbar;
