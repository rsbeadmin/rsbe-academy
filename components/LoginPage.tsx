// components/LoginPage.tsx
'use client'
import React, { useState } from 'react';
import { ArrowLeft, Lock, Mail, AlertCircle, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabaseClient'; 

export function LoginPage({ onBack, onSuccess }: { onBack: () => void, onSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // State untuk mesej Ralat (Merah) dan Kejayaan (Hijau)
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Fungsi Login
  const handleLogin = async () => {
    setErrorMsg(''); 
    setSuccessMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setIsLoading(false);

    if (error) {
      setErrorMsg('Access denied. Invalid email or password.');
    } else {
      onSuccess();
    }
  };

  // Fungsi Lupa Kata Laluan (Forgot Password)
  const handleForgotPassword = async () => {
    setErrorMsg('');
    setSuccessMsg('');

    if (!email) {
      setErrorMsg('Please enter your email address first to reset password.');
      return;
    }

    setIsLoading(true);
    const supabase = createClient();

    // Minta Supabase hantar email reset password
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/reset-password', // Akan bawa user ke page reset (boleh setup kemudian)
    });

    setIsLoading(false);

    if (error) {
      setErrorMsg('Failed to send reset link: ' + error.message);
    } else {
      setSuccessMsg('Password reset link has been sent to your email.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b3d59] flex items-center justify-center px-6 font-sans">
      <div className="bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-slate-400 mb-8 hover:text-[#0b3d59] transition font-bold uppercase text-xs tracking-widest"
        >
          <ArrowLeft size={16} /> Back
        </button>
        
        <h2 className="text-3xl font-black italic uppercase mb-2 text-[#0b3d59]">Welcome Back</h2>
        <p className="text-slate-500 mb-8 font-medium">Login to manage your child's training.</p>

        {/* Kotak Amaran Merah (Error) */}
        {errorMsg && (
          <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold border border-red-100">
            <AlertCircle size={18} className="shrink-0" />
            <p>{errorMsg}</p>
          </div>
        )}

        {/* Kotak Mesej Hijau (Success Reset Password) */}
        {successMsg && (
          <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold border border-green-100">
            <CheckCircle2 size={18} className="shrink-0" />
            <p>{successMsg}</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#eab308] outline-none transition-all font-medium" 
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()} 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#eab308] outline-none transition-all font-medium" 
            />
          </div>

          {/* Butang Forgot Password */}
          <div className="flex justify-end pt-1">
            <button 
              onClick={handleForgotPassword}
              type="button"
              className="text-xs font-bold text-slate-400 hover:text-[#0b3d59] transition-colors"
            >
              Forgot Password?
            </button>
          </div>
          
          <button 
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full mt-4 bg-[#eab308] text-[#0b3d59] font-black py-4 rounded-2xl uppercase italic shadow-lg hover:scale-[1.02] active:scale-95 transition-all tracking-widest disabled:opacity-70 disabled:hover:scale-100 flex justify-center items-center h-14"
          >
            {isLoading ? (
              <span className="animate-pulse">Authenticating...</span>
            ) : (
              "Login Now"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}