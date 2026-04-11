'use client'
import React, { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import { LoginPage } from '@/components/LoginPage';
import ClientPortal from '@/components/ClientPortal';
// Kita guna { Navigation } sebab dalam fail asal awak guna Named Export
import { Navigation } from '@/components/Navigation'; 

import { DEFAULT_LANDING_CONTENT } from '@/lib/constants';

export default function RSBEApp() {
  const [view, setView] = useState<'LANDING' | 'LOGIN' | 'DASHBOARD'>('LANDING');
  const [user, setUser] = useState<any>(null);

  const handleLoginSuccess = () => {
    // Kita set data user yang ringkas supaya padan dengan props Navigation
    setUser({ name: 'Parent RSBE', role: 'CLIENT' });
    setView('DASHBOARD');
  };

  const handleLogout = () => {
    setUser(null);
    setView('LANDING');
  };

  return (
    <main>
      {/* 1. LANDING PAGE */}
      {view === 'LANDING' && (
        <LandingPage 
          onLogin={() => setView('LOGIN')} 
          content={DEFAULT_LANDING_CONTENT} 
        />
      )}

      {/* 2. LOGIN PAGE */}
      {view === 'LOGIN' && (
        <LoginPage 
          onBack={() => setView('LANDING')} 
          onSuccess={handleLoginSuccess}
        />
      )}

      {/* 3. CLIENT DASHBOARD */}
      {view === 'DASHBOARD' && user && (
        <div className="min-h-screen bg-slate-50">
          <Navigation user={user} onLogout={handleLogout} />
          <div className="pt-24 pb-12">
            <ClientPortal onLogout={handleLogout} />
          </div>
        </div>
      )}
    </main>
  );
}