import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-magic-dark/50 py-12 px-6 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 relative">
                <div className="absolute inset-0 bg-magic-primary rounded-full opacity-20 animate-pulse"></div>
                <Image 
                  src="/magic-emblem.svg" 
                  alt="Arcane Nexus" 
                  width={40} 
                  height={40}
                  className="relative z-10"
                />
              </div>
              <h3 className="text-xl ml-3 font-pirata tracking-wider text-magic-primary">Arcane Nexus</h3>
            </div>
            <p className="text-sm font-cinzel max-w-md">
              Purveyors of fine magical artifacts, cursed items, and eldritch knowledge
              since the third era of the Seven Moons. Accessible only to those who bear
              the mark of the chosen one.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="w-8 h-8 border border-magic-border rounded-full flex items-center justify-center hover:bg-magic-secondary transition-colors">
                <span className="sr-only">Twitter</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3.00005C22.0424 3.67552 20.9821 4.19216 19.86 4.53005C19.2577 3.83756 18.4573 3.34674 17.567 3.12397C16.6767 2.90121 15.7395 2.95724 14.8821 3.2845C14.0247 3.61176 13.2884 4.19445 12.773 4.95376C12.2575 5.71308 11.9877 6.61238 12 7.53005V8.53005C10.2426 8.57561 8.50127 8.18586 6.93101 7.39549C5.36074 6.60513 4.01032 5.43868 3 4.00005C3 4.00005 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.50005C20.9991 7.2215 20.9723 6.94364 20.92 6.67005C21.9406 5.66354 22.6608 4.39276 23 3.00005Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 border border-magic-border rounded-full flex items-center justify-center hover:bg-magic-secondary transition-colors">
                <span className="sr-only">Instagram</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61991 14.1902 8.22773 13.4229 8.09406 12.5922C7.9604 11.7615 8.09206 10.9099 8.47032 10.1584C8.84858 9.40685 9.45418 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.4789 8.12588 14.2648 8.52146 14.8717 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 border border-magic-border rounded-full flex items-center justify-center hover:bg-magic-secondary transition-colors">
                <span className="sr-only">Discord</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" stroke="currentColor" strokeWidth="0.5" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-pirata text-lg mb-4 text-magic-primary">Navigation</h4>
            <ul className="space-y-2">
              {['Home', 'Grimoires', 'Artifacts', 'Potions', 'Forbidden Lore'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm font-cinzel hover:text-magic-accent transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-pirata text-lg mb-4 text-magic-primary">Information</h4>
            <ul className="space-y-2">
              {['About Us', 'Shipping Policy', 'Return Policy', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm font-cinzel hover:text-magic-accent transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="magic-separator mt-8">
          <span className="magic-separator-icon">✧</span>
        </div>
        
        <div className="mt-8 text-center text-xs font-cinzel opacity-70">
          <p>Warning: Arcane Nexus is not responsible for soul corruption, dimensional rifts, or elder god summoning that may result from product misuse.</p>
          <p className="mt-2">© {new Date().getFullYear()} Arcane Nexus. All rights reserved by the Ancient Ones.</p>
        </div>
      </div>
    </footer>
  );
}
