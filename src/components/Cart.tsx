"use client";

import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import LoginModal from './LoginModal';

export default function Cart() {
  // Make sure to extract cartTotal from the context
  const { cart, isOpen, closeCart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { user, logout } = useAuth();
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Remove this redundant calculation since we're using the one from context
  // const totalPrice = cart.reduce((total, item) => {
  //   return total + (item.product.numericPrice * item.quantity);
  // }, 0);

  const handleCheckout = () => {
    if (!user) {
      // Open login modal if user is not logged in
      setShowLoginModal(true);
      return;
    }
    
    if (checkoutStep < 2) {
      setCheckoutStep(prev => prev + 1);
    } else {
      // Final checkout
      clearCart();
      setCheckoutStep(0);
      closeCart();
      alert('Your arcane items are being summoned from the ethereal plane. The Dark Courier will deliver them shortly.');
    }
  };

  const stepTitles = [
    'Your Arcane Requisitions',
    'Blood Oath & Soul Details',
    'Payment by Astral Essence'
  ];
  
  const stepButtons = [
    'Begin Blood Oath',
    'Offer Payment',
    'Seal Your Fate'
  ];

  return (
    <>
      {/* Cart Overlay */}
      <div 
        className={`cart-overlay ${isOpen ? 'open' : ''}`}
        onClick={closeCart}
      />
      
      {/* Cart Content */}
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-pirata text-2xl text-magic-primary">
            {stepTitles[checkoutStep]}
          </h2>
          <button 
            className="text-2xl"
            onClick={closeCart}
            aria-label="Close cart"
          >
            &times;
          </button>
        </div>

        {/* User info at the top of cart */}
        {user && (
          <div className="mb-4 pb-4 border-b border-magic-border">
            <div className="flex justify-between items-center">
              <div className="font-cinzel">
                <div>{user.name}</div>
                <div className="text-xs opacity-70">{user.email}</div>
              </div>
              <button 
                onClick={logout} 
                className="text-xs text-magic-accent hover:underline"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {checkoutStep === 0 ? (
          <>
            {cart.length === 0 ? (
              <div className="text-center my-20">
                <div className="text-5xl mb-4 opacity-30">✧</div>
                <p className="font-cinzel">Your ethereal collection is empty.</p>
                <p className="text-sm mt-2 opacity-70">The void awaits your selections.</p>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="flex-grow overflow-y-auto mb-4">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-image">
                        <Image 
                          src={item.product.image || '/placeholder-product.jpg'}
                          alt={item.product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      
                      <div>
                        <h3 className="font-pirata text-magic-primary">{item.product.name}</h3>
                        <p className="text-xs opacity-70 mb-2 font-cinzel">{item.product.category}</p>
                        <p className="text-magic-accent">{item.product.price}</p>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm opacity-60 hover:opacity-100 mb-2"
                        >
                          &times;
                        </button>
                        
                        <div className="flex border border-magic-border">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 hover:bg-magic-dark"
                          >
                            -
                          </button>
                          <span className="px-2 py-1">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 hover:bg-magic-dark"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-auto border-t border-magic-border pt-4">
                  <div className="flex justify-between mb-4">
                    <span className="font-cinzel">Total Arcane Value:</span>
                    {/* Display the cartTotal with proper formatting */}
                    <span className="font-pirata text-magic-accent">{cartTotal.toFixed(0)} souls</span>
                  </div>
                  
                  {cart.length > 0 && (
                    <button 
                      className="magic-button w-full"
                      onClick={handleCheckout}
                    >
                      {user ? stepButtons[checkoutStep] : "Login to Continue"}
                    </button>
                  )}
                  
                  <button 
                    className="w-full text-center mt-4 text-sm opacity-60 hover:opacity-100"
                    onClick={clearCart}
                  >
                    Discard All Items
                  </button>
                </div>
              </div>
            )}
          </>
        ) : checkoutStep === 1 ? (
          <div className="flex flex-col h-full">
            <div className="flex-grow mb-6">
              <div className="magic-card mb-6">
                <h3 className="font-pirata text-magic-primary mb-4">Scribe Your Covenant Details</h3>
                
                <div className="mb-4">
                  <label className="block font-cinzel text-sm mb-2">Summoner&apos;s True Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-magic-dark/50 border border-magic-border p-2 font-cinzel"
                    placeholder="As written in the Grimoire of Existence"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block font-cinzel text-sm mb-2">Astral Coordinates</label>
                  <input 
                    type="text" 
                    className="w-full bg-magic-dark/50 border border-magic-border p-2 font-cinzel"
                    placeholder="e.g. The Thirteenth Realm, Sector 7"
                  />
                </div>
                
                <div>
                  <label className="block font-cinzel text-sm mb-2">Blood Moon Phase</label>
                  <select className="w-full bg-magic-dark/50 border border-magic-border p-2 font-cinzel">
                    <option>Waxing Crescent</option>
                    <option>First Quarter</option>
                    <option>Waxing Gibbous</option>
                    <option>Full Moon</option>
                    <option>Waning Gibbous</option>
                    <option>Third Quarter</option>
                    <option>Waning Crescent</option>
                  </select>
                </div>
              </div>
              
              <div className="magic-card">
                <h3 className="font-pirata text-magic-primary mb-4">Warning of Consequences</h3>
                <p className="text-sm font-cinzel mb-4">By proceeding, you acknowledge that all ethereal transactions are final. The Arcane Nexus bears no responsibility for:</p>
                <ul className="text-sm list-disc pl-5 font-cinzel space-y-1">
                  <li>Possession by otherworldly entities</li>
                  <li>Spontaneous combustion of mortal vessels</li>
                  <li>Unwanted prophetic visions</li>
                  <li>Temporal displacement</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-auto flex gap-4">
              <button 
                className="flex-1 border border-magic-border py-2 px-4 hover:bg-magic-dark/50 font-cinzel"
                onClick={() => setCheckoutStep(0)}
              >
                Return
              </button>
              <button 
                className="flex-1 magic-button"
                onClick={handleCheckout}
              >
                {stepButtons[checkoutStep]}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-grow mb-6">
              <div className="magic-card mb-6">
                <h3 className="font-pirata text-magic-primary mb-4">Choose Your Soul Currency</h3>
                
                <div className="space-y-3 mb-6">
                  {['Memory Essence', 'Dream Fragments', 'Past-Life Energy', 'Astral Projections', 'Conscious Thought'].map((method, index) => (
                    <div key={index} className="flex items-center">
                      <input 
                        type="radio" 
                        id={`method-${index}`} 
                        name="payment-method"
                        className="mr-3"
                        defaultChecked={index === 0}
                      />
                      <label htmlFor={`method-${index}`} className="font-cinzel text-sm">{method}</label>
                    </div>
                  ))}
                </div>
                
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-magic-primary/10 flex items-center justify-center">
                    <div className="text-6xl text-magic-primary opacity-10 animate-pulse">⦾</div>
                  </div>
                  <textarea 
                    className="w-full bg-transparent border border-magic-border p-4 h-32 relative z-10 font-cinzel text-sm"
                    placeholder="Inscribe your binding oath here..."
                  ></textarea>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-cinzel">Total Arcane Value:</span>
                  <span className="font-pirata text-magic-accent">{cartTotal.toFixed(0)} souls</span>
                </div>
              </div>
              
              <div className="text-center font-cinzel text-sm opacity-70">
                <p>Your essence will be bound to these artifacts upon completion.</p>
                <p className="text-xs mt-2">The Cosmic Order shall be maintained.</p>
              </div>
            </div>
            
            <div className="mt-auto flex gap-4">
              <button 
                className="flex-1 border border-magic-border py-2 px-4 hover:bg-magic-dark/50 font-cinzel"
                onClick={() => setCheckoutStep(1)}
              >
                Return
              </button>
              <button 
                className="flex-1 magic-button"
                onClick={handleCheckout}
              >
                {stepButtons[checkoutStep]}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}
