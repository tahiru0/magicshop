"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function AdminHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false); // Close menu when pathname changes
  }, [pathname]);

  const links = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Products', path: '/admin' },
    { name: 'Orders', path: '/admin/orders' },
    { name: 'Store Front', path: '/' },
  ];

  const handleLogout = async () => {
    if (confirm('Are you sure you want to log out?')) {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/admin'; // Redirect to login page
    }
  };

  const isActive = (path: string) => {
    // Special case for admin root
    if (path === '/admin' && pathname === '/admin') {
      return true;
    }
    
    return pathname.startsWith(path);
  };

  return (
    <header className="bg-magic-dark border-b border-magic-border py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 relative">
            <div className="absolute inset-0 bg-magic-primary rounded-full opacity-20 animate-pulse"></div>
            <Image 
              src="/magic-emblem.svg" 
              alt="Arcane Nexus Admin" 
              width={32} 
              height={32}
              className="relative z-10"
            />
          </div>
          <h1 className="text-lg ml-3 font-pirata tracking-wider text-magic-primary">
            Arcane Nexus <span className="text-sm opacity-70">Admin</span>
          </h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className={`font-cinzel text-sm tracking-widest hover:text-magic-accent transition-colors ${
                    isActive(link.path) ? 'text-magic-accent' : 'text-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="font-cinzel text-sm tracking-widest hover:text-magic-accent transition-colors"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} pt-4 pb-4 border-t border-magic-border mt-4`}>
        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.name} className="px-6">
              <Link
                href={link.path}
                className={`block font-cinzel text-sm tracking-widest ${
                  isActive(link.path) ? 'text-magic-accent' : 'text-foreground'
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li className="px-6">
            <button
              onClick={handleLogout}
              className="font-cinzel text-sm tracking-widest"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
