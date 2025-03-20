"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ForbiddenPage() {
  const [loaded, setLoaded] = useState(false);
  const [currentRitual, setCurrentRitual] = useState(0);
  const [showSecretContent, setShowSecretContent] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
    
    // Cycle through rituals
    const interval = setInterval(() => {
      setCurrentRitual(prev => (prev + 1) % rituals.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  const rituals = [
    {
      title: "Void Communion",
      description: "Connect with entities beyond the veil of reality. The ritual requires precise timing with cosmic alignments.",
      warning: "Risk of mental corruption: High",
      difficulty: "Adept"
    },
    {
      title: "Ethereal Projection",
      description: "Temporarily detach your consciousness from your physical form to traverse the astral planes.",
      warning: "Risk of spiritual displacement: Medium",
      difficulty: "Intermediate"
    },
    {
      title: "Chronos Disruption",
      description: "Create limited temporal anomalies within a designated space, allowing for brief glimpses of past or future.",
      warning: "Risk of timeline fragmentation: Very High",
      difficulty: "Master"
    }
  ];
  
  return (
    <div className={`min-h-screen flex flex-col ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
      {/* Animated Background with Sigils */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 animate-rotate-slow" style={{ animationDuration: '60s' }}>
          <Image src="/sigil1.svg" alt="" width={400} height={400} />
        </div>
        <div className="absolute bottom-1/4 right-1/4 animate-rotate-slow" style={{ animationDuration: '80s', animationDirection: 'reverse' }}>
          <Image src="/sigil2.svg" alt="" width={300} height={300} />
        </div>
        <div className="absolute top-2/3 left-1/5 animate-rotate-slow" style={{ animationDuration: '40s' }}>
          <Image src="/sigil1.svg" alt="" width={200} height={200} />
        </div>
      </div>

      <div className="relative z-10 py-20 px-6 max-w-6xl mx-auto">
        <h1 className="magic-title mb-6 text-center">The Forbidden Archives</h1>
        
        <div className="magic-separator">
          <span className="magic-separator-icon">⍟</span>
        </div>
        
        <p className="font-cinzel text-lg mt-10 mb-12 max-w-3xl mx-auto text-center">
          You have entered the restricted section of the Arcane Nexus. These ancient texts contain knowledge deemed 
          too dangerous for the uninitiated. Proceed at your own peril.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <div className="magic-card">
            <h2 className="font-pirata text-2xl text-magic-primary mb-4">Ancient Rituals</h2>
            
            <div className="relative overflow-hidden">
              <div className={`transition-opacity duration-1000 ${currentRitual === 0 ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}>
                <h3 className="font-pirata text-xl text-magic-accent">{rituals[0].title}</h3>
                <p className="font-cinzel my-3">{rituals[0].description}</p>
                <div className="flex justify-between text-sm mt-4">
                  <span className="text-magic-accent">{rituals[0].warning}</span>
                  <span>Difficulty: {rituals[0].difficulty}</span>
                </div>
              </div>
              
              <div className={`transition-opacity duration-1000 ${currentRitual === 1 ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}>
                <h3 className="font-pirata text-xl text-magic-accent">{rituals[1].title}</h3>
                <p className="font-cinzel my-3">{rituals[1].description}</p>
                <div className="flex justify-between text-sm mt-4">
                  <span className="text-magic-accent">{rituals[1].warning}</span>
                  <span>Difficulty: {rituals[1].difficulty}</span>
                </div>
              </div>
              
              <div className={`transition-opacity duration-1000 ${currentRitual === 2 ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}>
                <h3 className="font-pirata text-xl text-magic-accent">{rituals[2].title}</h3>
                <p className="font-cinzel my-3">{rituals[2].description}</p>
                <div className="flex justify-between text-sm mt-4">
                  <span className="text-magic-accent">{rituals[2].warning}</span>
                  <span>Difficulty: {rituals[2].difficulty}</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              <button 
                className={`w-3 h-3 rounded-full ${currentRitual === 0 ? 'bg-magic-accent' : 'bg-magic-border'}`}
                onClick={() => setCurrentRitual(0)}
              />
              <button 
                className={`w-3 h-3 rounded-full ${currentRitual === 1 ? 'bg-magic-accent' : 'bg-magic-border'}`}
                onClick={() => setCurrentRitual(1)}
              />
              <button 
                className={`w-3 h-3 rounded-full ${currentRitual === 2 ? 'bg-magic-accent' : 'bg-magic-border'}`}
                onClick={() => setCurrentRitual(2)}
              />
            </div>
          </div>
          
          <div className="magic-card">
            <h2 className="font-pirata text-2xl text-magic-primary mb-4">Eldritch Knowledge</h2>
            
            <p className="font-cinzel mb-6">
              The ancient tomes of the Arcane Nexus contain secrets that mortal minds were not meant to comprehend.
              Only those who have passed the Seven Trials of the Void may access the complete archives.
            </p>
            
            <div className="border-t border-magic-border pt-4">
              <h3 className="font-pirata text-magic-accent">Requirements for Access:</h3>
              <ul className="font-cinzel text-sm mt-2 space-y-1">
                <li>• Completion of the Ritual of Opening</li>
                <li>• Blood oath of secrecy (binding)</li>
                <li>• Proof of magical lineage</li>
                <li>• Recommendation from two Council members</li>
              </ul>
            </div>
            
            <button 
              className="magic-button w-full mt-8" 
              onClick={() => setShowSecretContent(!showSecretContent)}
            >
              <span className="relative z-10">
                {showSecretContent ? 'Obscure Forbidden Knowledge' : 'Attempt To See Beyond'}
              </span>
            </button>
          </div>
        </div>
        
        {/* Secret Arcane Knowledge Section */}
        <div className={`mt-16 transition-opacity duration-1000 ${showSecretContent ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="magic-separator">
            <span className="magic-separator-icon">⚜</span>
          </div>
          
          <div className="magic-card mt-8 bg-magic-dark/80">
            <h2 className="font-pirata text-2xl text-magic-accent mb-4">Unveiled Secrets</h2>
            
            <div className="prose prose-invert prose-headings:font-pirata prose-headings:text-magic-primary prose-p:font-cinzel">
              <p className="font-cinzel mb-4">
                The following text reveals partial glimpses of knowledge protected by arcane wards.
                Full comprehension requires proper initiation and psychic preparation.
              </p>
              
              <div className="my-6 p-4 bg-magic-dark/80 border border-magic-border font-cinzel text-sm" style={{fontFamily: 'monospace', lineHeight: '1.6'}}>
                <p className="mb-2">...and in the twelfth hour when <span className="blur-sm">the stars align with the ancient gate</span>, a passage opens...</p>
                <p className="mb-2">...whispers from <span className="blur-sm">the void between dimensions</span> can be heard if one...</p>
                <p className="mb-2">...using the <span className="blur-sm">blood of a willing sacrifice</span>, draw the sigil as shown in figure VII...</p>
                <p className="mb-2">...when the <span className="blur-sm">elder beings return</span>, only those who have prepared the...</p>
                <p className="mb-2">...the true name of <span className="blur-sm">REDACTED</span> must never be spoken aloud lest it...</p>
              </div>
              
              <p className="text-magic-accent mt-4 font-cinzel text-sm">
                WARNING: Attempting to decipher the obscured sections without proper training and protection
                may result in irreversible psychic damage and possible possession.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
