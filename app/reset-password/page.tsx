// app/reset-password/page.tsx
'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabaseClient';

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();

  const handleUpdatePassword = async () => {
    setErrorMsg('');
    setSuccessMsg('');

    if (newPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);
    const supabase = createClient();

    // Fungsi Supabase untuk update password baru
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    setIsSubmitting(false);

    if (error) {
      setErrorMsg('Failed to reset password: ' + error.message);
    } else {
      setSuccessMsg('Password has been successfully reset! You can now login.');
      // Bawa user balik ke muka depan lepas 3 saat
      setTimeout(() => {
        router.push('/');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b3d59] flex items-center justify-center px-6 font-sans">
      <div className="bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl">
        <h2 className="text-3xl font-black italic uppercase mb-2 text-[#0b3d59]">Reset Password</h2>
        <p className="text-slate-500 mb-8 font-medium">Please enter your new password below.</p>

        {/* Mesej Error */}
        {errorMsg && (
          <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold border border-red-100">
            <AlertCircle size={18} className="shrink-0" />
            <p>{errorMsg}</p>
          </div>
        )}

        {/* Mesej Success */}
        {successMsg && (
          <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold border border-green-100">
            <CheckCircle2 size={18} className="shrink-0" />
            <p>{successMsg}</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="password" 
              placeholder="New Password (min. 6 characters)" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={!!successMsg} // Kunci input kalau dah berjaya
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#eab308] outline-none transition-all font-medium" 
            />
          </div>
          
          <button 
            onClick={handleUpdatePassword}
            disabled={isSubmitting || !!successMsg}
            className="w-full mt-4 bg-[#eab308] text-[#0b3d59] font-black py-4 rounded-2xl uppercase italic shadow-lg hover:scale-[1.02] active:scale-95 transition-all tracking-widest disabled:opacity-70 disabled:hover:scale-100 flex justify-center items-center h-14"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Updating...</span>
            ) : (
              "Update Password"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}