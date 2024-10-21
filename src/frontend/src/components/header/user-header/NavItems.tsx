import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from 'react-router-dom';

interface NavItemsProps {
  onNavigate: () => void;
  isMobileMenuOpen: boolean;
  closeMobileMenu: () => void;
}

const NavItems: React.FC<NavItemsProps> = ({ closeMobileMenu }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Posts', path: '/posts-feed' },
    { name: 'Providers', path: '/provider-feed' },
  ];

  return (
    <>
      {navItems.map((item) => (
        <li key={item.name}>
          <Button
            variant="ghost"
            asChild
            className={`w-full justify-start hover:bg-transparent hover:text-blue-500 transition-colors duration-200 dark:hover:text-yellow-500 
              ${location.pathname === item.path ? 'text-blue-500 font-bold dark:text-yellow-500' : ''}`}
          >
            <a
              onClick={() => {
                if (location.pathname === item.path) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  closeMobileMenu(); // Close menu when clicked on mobile
                  navigate(item.path);
                }
              }}
              className={`hover:underline transition-colors duration-200 cursor-pointer 
                ${location.pathname === item.path ? 'underline' : ''}`} // Add underline for active link
            >
              {item.name}
            </a>
          </Button>
        </li>
      ))}
    </>
  );
};

export default NavItems;
