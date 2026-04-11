// components/ClientPortal.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { Calendar, MapPin, Trophy } from 'lucide-react';

export default function ClientPortal({ onLogout }: { onLogout: () => void }) {
  const [studentData, setStudentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    const supabase = createClient();
    
    // 1. Dapatkan user yang tengah login
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // 2. Cari data dalam rsbe_students yang padan dengan email user
      const { data, error } = await supabase
        .from('rsbe_students')
        .select('*')
        .eq('email', user.email)
        .single();

      if (data) {
        setStudentData(data);
      }
    }
    setLoading(false);
  };

  // Kita dah tak perlukan handleLogout di sini sebab butang LOGOUT utama ada kat luar komponen ni

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-[#0b3d59]">Loading Portal...</div>;

  return (
    <div className="min-h-screen bg-slate-50 font-sans pt-10"> {/* Tambah pt-10 supaya jarak sikit dari navbar atas */}
      <main className="max-w-7xl mx-auto p-6 md:p-12">
        {/* Welcome Card */}
        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-slate-100 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="text-[#eab308] font-black uppercase text-xs tracking-widest">Student Profile</span>
              <h2 className="text-4xl md:text-5xl font-black italic uppercase text-[#0b3d59] mt-2">
                {studentData ? studentData.full_name : 'No Data Found'}
              </h2>
              <p className="text-slate-500 mt-2 font-medium">Welcome back to your training headquarters.</p>
            </div>
            <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-black text-slate-400 uppercase block">Status</span>
              <span className="text-green-600 font-bold uppercase text-sm tracking-wider">
                ● {studentData?.status || 'Active'}
              </span>
            </div>
          </div>

          <hr className="my-10 border-slate-100" />

          {/* Details Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <Trophy size={24} />
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Program</span>
                <p className="font-bold text-[#0b3d59]">{studentData?.program_selection || '-'}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
                <MapPin size={24} />
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</span>
                <p className="font-bold text-[#0b3d59]">{studentData?.location_preference || '-'}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                <Calendar size={24} />
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Joined Date</span>
                <p className="font-bold text-[#0b3d59]">
                  {studentData?.created_at ? new Date(studentData.created_at).toLocaleDateString() : '-'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Placeholder */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm opacity-50">
            <h3 className="font-black italic uppercase text-[#0b3d59] mb-4">Upcoming Training</h3>
            <p className="text-slate-400 text-sm">Next session details will appear here.</p>
          </div>
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm opacity-50">
            <h3 className="font-black italic uppercase text-[#0b3d59] mb-4">Payment History</h3>
            <p className="text-slate-400 text-sm">No recent transactions found.</p>
          </div>
        </div>
      </main>
    </div>
  );
}