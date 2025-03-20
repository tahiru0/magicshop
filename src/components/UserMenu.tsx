"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import LoginModal from './LoginModal';

export default function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="relative">
        <button 
          className="flex items-center space-x-1 p-2"
          onClick={() => user ? setIsMenuOpen(!isMenuOpen) : setIsLoginModalOpen(true)}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="hidden md:inline font-cinzel text-sm">
            {user ? user.name || 'Account' : 'Login'}
          </span>
        </button>
        
        {isMenuOpen && user && (
          <div className="absolute right-0 mt-2 w-48 bg-magic-dark border border-magic-border shadow-xl z-50">
            <div className="p-3 border-b border-magic-border">
              <p className="font-cinzel text-sm">{user.name}</p>
              <p className="text-xs opacity-70 truncate">{user.email}</p>
            </div>
            <div className="p-2">
              {user.isAdmin && (
                <Link 
                  href="/admin" 
                  className="block px-4 py-2 text-sm font-cinzel hover:bg-magic-secondary/30"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
              )}
              <button 
                className="w-full text-left px-4 py-2 text-sm font-cinzel hover:bg-magic-secondary/30"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
}
