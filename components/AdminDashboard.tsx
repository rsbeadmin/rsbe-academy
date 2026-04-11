// components/AdminDashboard.tsx
'use client'
import React, { useState } from 'react';
import { Student, Application, Transaction } from '@/types';
import { MOCK_APPLICATIONS, TRANSACTIONS } from '@/lib/constants';
import { Users, FileText, DollarSign, CheckCircle, Clock } from 'lucide-react';

interface AdminDashboardProps {
  students: Student[];
  onUpdateStudents: (students: Student[]) => void;
  landingContent: any;
}

export default function AdminDashboard({ students }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'STUDENTS' | 'APPS' | 'FINANCE'>('STUDENTS');

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
      {/* Sidebar Dashboard */}
      <div className="w-full lg:w-64 bg-white border-r border-slate-200 p-6">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8">Admin Menu</h2>
        <nav className="space-y-2">
          <TabButton 
            active={activeTab === 'STUDENTS'} 
            onClick={() => setActiveTab('STUDENTS')} 
            icon={<Users size={18} />} 
            label="Students" 
          />
          <TabButton 
            active={activeTab === 'APPS'} 
            onClick={() => setActiveTab('APPS')} 
            icon={<FileText size={18} />} 
            label="Applications" 
          />
          <TabButton 
            active={activeTab === 'FINANCE'} 
            onClick={() => setActiveTab('FINANCE')} 
            icon={<DollarSign size={18} />} 
            label="Finances" 
          />
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        {activeTab === 'STUDENTS' && (
          <section>
            <h1 className="text-3xl font-black italic uppercase mb-8">Active Students</h1>
            <div className="grid gap-4">
              {students.map(s => (
                <div key={s.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{s.name}</h3>
                    <p className="text-slate-500 text-sm italic uppercase tracking-wider">{s.status}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-bold uppercase">View Profile</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'APPS' && (
          <section>
            <h1 className="text-3xl font-black italic uppercase mb-8">New Applications</h1>
            <div className="space-y-4">
              {MOCK_APPLICATIONS.map((app: Application) => (
                <div key={app.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-xl">{app.studentName}</h3>
                      <p className="text-slate-500">{app.program}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${app.status === 'PENDING' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                      {app.status}
                    </span>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <button className="bg-green-600 text-white px-6 py-2 rounded-xl text-xs font-bold uppercase italic hover:bg-green-700 transition">Approve</button>
                    <button className="bg-slate-100 text-slate-600 px-6 py-2 rounded-xl text-xs font-bold uppercase italic hover:bg-slate-200 transition">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'FINANCE' && (
          <section>
            <h1 className="text-3xl font-black italic uppercase mb-8">Financial Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#0b3d59] text-white p-8 rounded-[40px] shadow-xl">
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Total Income</p>
                <h2 className="text-4xl font-black italic">RM 4,250.00</h2>
              </div>
              <div className="bg-white p-8 rounded-[40px] shadow-xl border border-slate-100">
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Total Expenses</p>
                <h2 className="text-4xl font-black italic text-red-500">RM 1,860.00</h2>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold uppercase italic transition ${active ? 'bg-[#0b3d59] text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
    >
      {icon}
      {label}
    </button>
  );
}