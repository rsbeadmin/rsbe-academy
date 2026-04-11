'use client'
import React, { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import { LoginPage } from '@/components/LoginPage';
import ClientPortal from '@/components/ClientPortal';
import Navigation from '@/components/Navigation'; // Pastikan Navigation diimport

import { DEFAULT_LANDING_CONTENT } from '@/lib/constants';

export default function RSBEApp() {
  const [view, setView] = useState<'LANDING' | 'LOGIN' | 'DASHBOARD'>('LANDING');
  const [user, setUser] = useState<any>(null);

  const handleLoginSuccess = () => {
    setUser({ name: 'Parent RSBE' });
    setView('DASHBOARD');
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
      {view === 'DASHBOARD' && (
        <div className="min-h-screen bg-slate-50">
          {/* Kita hantar onLogout untuk balik ke landing */}
          <Navigation user={user} onLogout={() => setView('LANDING')} />
          <div className="pt-24 pb-12">
            {/* KITA BUANG student={MOCK_STUDENTS[0]} 
              Sebab ClientPortal awak dah pandai tarik data sendiri guna Supabase 
            */}
            <ClientPortal onLogout={() => setView('LANDING')} />
          </div>
        </div>
      )}
    </main>
  );
}'use client'
import React, { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import { LoginPage } from '@/components/LoginPage';
import ClientPortal from '@/components/ClientPortal';
import Navigation from '@/components/Navigation'; // Pastikan Navigation diimport

import { DEFAULT_LANDING_CONTENT } from '@/lib/constants';

export default function RSBEApp() {
  const [view, setView] = useState<'LANDING' | 'LOGIN' | 'DASHBOARD'>('LANDING');
  const [user, setUser] = useState<any>(null);

  const handleLoginSuccess = () => {
    setUser({ name: 'Parent RSBE' });
    setView('DASHBOARD');
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
      {view === 'DASHBOARD' && (
        <div className="min-h-screen bg-slate-50">
          {/* Kita hantar onLogout untuk balik ke landing */}
          <Navigation user={user} onLogout={() => setView('LANDING')} />
          <div className="pt-24 pb-12">
            {/* KITA BUANG student={MOCK_STUDENTS[0]} 
              Sebab ClientPortal awak dah pandai tarik data sendiri guna Supabase 
            */}
            <ClientPortal onLogout={() => setView('LANDING')} />
          </div>
        </div>
      )}
    </main>
  );
}