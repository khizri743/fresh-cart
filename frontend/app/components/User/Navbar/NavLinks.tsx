import Link from 'next/link';
import React from 'react';

interface NavLinksProps {
  className?: string;
  onClick?: () => void;
}

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Offers', href: '/offers' },
];

const NavLinks = ({ className = "", onClick }: NavLinksProps) => {
  return (
    <>
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClick}
          className={`text-gray-700 hover:text-green-600 font-medium transition ${className}`}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
};

export default NavLinks;