'use client'
import React, { useState } from 'react';
// Kita guna import yang lebih selamat
import LandingPage from '@/components/LandingPage';
import { LoginPage } from '@/components/LoginPage';
import ClientPortal from '@/components/ClientPortal';
import { DEFAULT_LANDING_CONTENT } from '@/lib/constants';

// Padankan enum Role secara manual jika import Role bermasalah
type Role = 'ADMIN' | 'COACH' | 'CLIENT';

export default function RSBEApp() {
  const [view, setView] = useState<'LANDING' | 'LOGIN' | 'DASHBOARD'>('LANDING');
  const [user, setUser] = useState<any>(null);

  const handleLoginSuccess = () => {
    setUser({ name: 'Parent RSBE' });
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
          onSuccess={() => handleLoginSuccess(Role.CLIENT)} 
        />
      )}

      {/* 3. CLIENT DASHBOARD */}
      {view === 'DASHBOARD' && user && (
        <div className="min-h-screen bg-slate-50">
          <Navigation user={user} onLogout={() => setView('LANDING')} />
          <div className="pt-24 pb-12">
             <ClientPortal user={user} student={MOCK_STUDENTS[0]} />
          </div>
        </div>
      )}
    </main>
  );
}