"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, register, error, loading, clearError } = useAuth();
  const { mergeWithServerCart } = useCart();
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger entrance animation after modal is visible
      setTimeout(() => setAnimateIn(true), 50);
    } else {
      setAnimateIn(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      
      // Merge cart after successful login/register
      await mergeWithServerCart();
      
      // Close modal after successful auth
      if (!error) {
        resetForm();
        onClose();
      }
    } catch (err) {
      console.error('Auth error:', err);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    clearError();
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Semi-transparent overlay */}
      <div 
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 transition-all duration-500 ${
        animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        {/* Special border modal */}
        <div className="special-border-container">
          <div className="special-border">
            <div className="special-border-content bg-magic-dark">
              {/* Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-magic-border/50">
                <h2 className="font-pirata text-2xl text-magic-primary">
                  {isLogin ? 'Enter the Arcane Nexus' : 'Join the Arcane Circle'}
                </h2>
                <button 
                  onClick={onClose}
                  className="text-2xl hover:text-magic-accent transition-colors"
                >
                  &times;
                </button>
              </div>
              
              {/* Error message */}
              {error && (
                <div className="mb-4 p-3 bg-magic-accent/10 border border-magic-accent/20 text-magic-accent font-cinzel text-sm">
                  {error}
                </div>
              )}
              
              {/* Login/Register form */}
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="mb-4">
                    <label htmlFor="name" className="block font-cinzel text-sm mb-2">
                      Arcane Name
                    </label>
                    <input 
                      type="text"
                      id="name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-magic-dark/80 border border-magic-border p-3 font-cinzel outline-none focus:border-magic-accent transition-colors"
                      required={!isLogin}
                    />
                  </div>
                )}
                
                <div className="mb-4">
                  <label htmlFor="email" className="block font-cinzel text-sm mb-2">
                    Mystical Email
                  </label>
                  <input 
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-magic-dark/80 border border-magic-border p-3 font-cinzel outline-none focus:border-magic-accent transition-colors"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="password" className="block font-cinzel text-sm mb-2">
                    Secret Incantation
                  </label>
                  <input 
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-magic-dark/80 border border-magic-border p-3 font-cinzel outline-none focus:border-magic-accent transition-colors"
                    required
                  />
                </div>
                
                {/* Login/Register button */}
                <button 
                  type="submit"
                  className="elegant-button w-full mb-6"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Channeling Magic...
                    </span>
                  ) : (
                    isLogin ? 'Enter' : 'Join'
                  )}
                </button>
                
                {/* Toggle between login and register */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-sm font-cinzel text-magic-primary hover:text-magic-accent transition-colors"
                  >
                    {isLogin ? 'Need to join the circle? Register' : 'Already a member? Login'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .special-border-container {
          position: relative;
          padding: 4px;
        }

        .special-border {
          position: relative;
          border-radius: 6px;
          overflow: hidden;
        }

        .special-border:before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, 
            rgba(180, 41, 249, 0.6), 
            rgba(80, 10, 105, 0.8), 
            rgba(180, 41, 249, 0.6));
          z-index: -1;
          border-radius: 8px;
        }

        .special-border-content {
          padding: 24px;
          position: relative;
          z-index: 1;
          border-radius: 4px;
          background-color: #0a070d;
        }

        .elegant-button {
          position: relative;
          background: linear-gradient(to right, #8a1a9e, #b429f9, #8a1a9e);
          color: white;
          font-family: 'Cinzel', serif;
          padding: 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 14px;
        }

        .elegant-button:hover {
          background: linear-gradient(to right, #991fb2, #c944ff, #991fb2);
          box-shadow: 0 0 10px rgba(180, 41, 249, 0.3);
        }

        .elegant-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
}
