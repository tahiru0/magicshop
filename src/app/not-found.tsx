"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-6 ${
      loaded ? 'opacity-100' : 'opacity-0'
    } transition-opacity duration-1000`}>
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 animate-rotate-slow" style={{ animationDuration: '60s' }}>
          <Image src="/sigil1.svg" alt="" width={300} height={300} />
        </div>
        <div className="absolute bottom-1/4 right-1/4 animate-rotate-slow" style={{ animationDuration: '40s', animationDirection: 'reverse' }}>
          <Image src="/sigil2.svg" alt="" width={200} height={200} />
        </div>
      </div>
      
      <div className="relative z-10 text-center max-w-lg">
        <div className="text-9xl text-magic-primary opacity-30 font-pirata">404</div>
        
        <h1 className="font-pirata text-4xl mb-6 mt-2">Reality Distortion</h1>
        
        <div className="magic-card mb-8">
          <p className="font-cinzel mb-4">
            The page you seek has been consumed by the void or was never woven into the fabric of this realm.
          </p>
          
          <p className="font-cinzel text-sm opacity-70">
            Perhaps it exists in another dimension, or was merely a figment of collective imagination.
          </p>
        </div>
        
        <Link href="/" className="magic-button inline-block">
          Return to the Nexus
        </Link>
      </div>
    </div>
  );
}
