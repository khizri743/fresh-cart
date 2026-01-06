import React from 'react';
import Link from 'next/link';
import NavLinks from './NavLinks';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  logout: () => void;
}

const MobileMenu = ({ isOpen, onClose, user, logout }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0 z-40">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <NavLinks
          onClick={onClose}
          className="block px-3 py-2 rounded-md text-base hover:bg-green-50"
        />

        <div className="border-t border-gray-100 my-2"></div>

        {/* Mobile Auth Logic */}
        {user ? (
          <div className="px-3 py-2 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-500 mb-2">
              Signed in as{' '}
              <span className="font-bold text-gray-900">{user.name}</span>
            </p>

            {/* --- ADMIN BUTTON MOBILE --- */}
            {user.role === 'admin' && (
              <Link
                href="/admin/dashboard"
                onClick={onClose}
                className="block w-full text-center px-3 py-2 mb-2 rounded-md text-base font-bold bg-slate-800 text-white hover:bg-slate-900"
              >
                Admin Dashboard
              </Link>
            )}

            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="block w-full text-center px-3 py-2 rounded-md text-base font-medium bg-white border border-gray-300 text-red-600 hover:bg-red-50 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            onClick={onClose}
            className="block w-full text-center px-3 py-3 rounded-md text-base font-medium bg-green-600 text-white hover:bg-green-700"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
