// components/Navigation.tsx
'use client'
import React from 'react';
import { User, Role } from '@/types';
import { LogOut, User as UserIcon, LayoutDashboard } from 'lucide-react';

interface NavigationProps {
  user: User;
  onLogout: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ user, onLogout }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#0b3d59] text-white z-50 px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold italic tracking-tighter font-sporty">RSBE PRO</div>
          <span className="bg-[#eab308] text-[#0b3d59] text-[10px] font-black px-2 py-0.5 rounded uppercase">
            {user.role}
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2">
            <UserIcon size={16} className="text-slate-400" />
            <span className="text-sm font-medium">{user.name}</span>
          </div>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 transition text-sm font-bold uppercase tracking-wider"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};