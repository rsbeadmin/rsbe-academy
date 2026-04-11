// components/LandingPage.tsx
'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Trophy, Smartphone, TrendingUp, ArrowRight } from 'lucide-react'
import { LandingPageContent } from '@/types'
import { createClient } from '@/lib/supabaseClient' 

interface LandingPageProps {
  onLogin: () => void;
  content: LandingPageContent;
}

export default function LandingPage({ onLogin }: LandingPageProps) {
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    password: '', 
    contactNumber: '',
    program: 'Youth Development (6-12 Years)',
    location: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Semak pastikan semua kotak diisi
    if (!formData.studentName || !formData.email || !formData.password || !formData.contactNumber || !formData.location) {
      alert("Sila penuhkan semua maklumat pendaftaran.")
      return
    }

    // Pastikan password kuat sikit (minimum 6 huruf/nombor)
    if (formData.password.length < 6) {
      alert("Kata laluan mestilah sekurang-kurangnya 6 aksara.")
      return
    }

    setIsSubmitting(true)
    const supabase = createClient()

    // 2. DAFTAR AKAUN LOGIN (SUPABASE AUTH)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    })

    if (authError) {
      setIsSubmitting(false)
      console.error("Ralat Daftar Akaun:", authError.message)
      alert("Gagal mendaftar akaun: " + authError.message)
      return
    }

    // 3. SIMPAN DATA PELAJAR KE DALAM TABLE 'rsbe_students'
    const { error: dbError } = await supabase
      .from('rsbe_students')
      .insert([
        { 
          full_name: formData.studentName, 
          email: formData.email, 
          phone_number: formData.contactNumber, 
          program_selection: formData.program, 
          location_preference: formData.location 
        }
      ])

    setIsSubmitting(false)

    if (dbError) {
      console.error("Ralat Simpan Data:", dbError.message)
      alert("Akaun berjaya dicipta tetapi ada masalah menyimpan profil: " + dbError.message)
    } else {
      alert(`Tahniah ${formData.studentName}!\nPermohonan anda berjaya dihantar dan akaun telah dicipta.\n\nSila klik 'Access Student Portal' untuk log masuk.`);
      
      // Kosongkan form lepas berjaya
      setFormData({
        studentName: '',
        email: '',
        password: '',
        contactNumber: '',
        program: 'Youth Development (6-12 Years)',
        location: ''
      })
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#0b3d59] text-white pt-20 pb-32 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <span className="bg-[#eab308] text-[#0b3d59] text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase">
              Elite Badminton Management
            </span>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-none mt-6">
              RSBE <br />
              
              <span className="text-[#eab308]">ACADEMY</span>
            </h1>
            <p className="mt-8 text-slate-300 max-w-md text-lg leading-relaxed">
              Managing Malaysia's future champions with a world-class digital syllabus, personalized video tracking, and elite performance analysis.
            </p>
            <button 
              onClick={onLogin}
              className="mt-10 bg-white text-[#0b3d59] font-bold py-4 px-8 rounded-full flex items-center gap-3 hover:bg-slate-100 transition shadow-xl"
            >
              Access Student Portal <ArrowRight size={20} />
            </button>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden border-8 border-[#1a4f6e] shadow-2xl rotate-2">
              <img 
                src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070&auto=format&fit=crop" 
                alt="Badminton Court"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-blue-400 opacity-10 rounded-full blur-3xl"></div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Trophy className="text-[#eab308]" size={32} />} 
            title="Pro Syllabus" 
            desc="Structured training modules for every level from beginner to elite tournament prep." 
            href="/syllabus" 
          />
          <FeatureCard 
            icon={<Smartphone className="text-blue-500" size={32} />} 
            title="Performance Apps" 
            desc="Dedicated interfaces for Web, iOS, and Android ensuring full business accessibility." 
            href="/apps" 
          />
          <FeatureCard 
            icon={<TrendingUp className="text-green-500" size={32} />} 
            title="Video Proof" 
            desc="Personalized training clips provided to parents as proof of student progression." 
            href="/videos" 
          />
        </div>
      </section>

      {/* --- REGISTRATION FORM SECTION --- */}
      <section className="py-24 px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black italic uppercase">Apply For Admission</h2>
            <p className="text-slate-500 mt-4">Elite coaching is in high demand. Secure your spot in the next intake by filling in your details below.</p>
          </div>

          <div className="bg-white p-2 rounded-[40px] shadow-2xl border border-slate-100">
            <form onSubmit={handleRegister} className="p-10 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-1">Student Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                    placeholder="Name as per IC" 
                    className="w-full bg-black text-white p-4 rounded-2xl outline-none focus:ring-2 ring-blue-500" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-1">Contact Number</label>
                  <input 
                    type="text" 
                    required
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                    placeholder="+6012-XXXXXXX" 
                    className="w-full bg-black text-white p-4 rounded-2xl outline-none focus:ring-2 ring-blue-500" 
                  />
                </div>
              </div>

              {/* BARU: Susunan kotak Email dan Password (Grid supaya kemas) */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-slate-400">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="parent@rsbe.com" 
                    className="w-full bg-black text-white p-4 rounded-2xl outline-none focus:ring-2 ring-blue-500 transition-all font-bold" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-slate-400">Set Password</label>
                  <input 
                    type="password" 
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Min. 6 characters" 
                    className="w-full bg-black text-white p-4 rounded-2xl outline-none focus:ring-2 ring-blue-500 transition-all font-bold" 
                  />
                </div>
              </div>

              {/* Program Selection */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-slate-400">
                  Program Selection
                </label>
                <div className="relative">
                  <select 
                    value={formData.program}
                    onChange={(e) => setFormData({...formData, program: e.target.value})}
                    className="w-full bg-black text-white p-4 rounded-2xl outline-none appearance-none cursor-pointer border border-transparent focus:ring-2 ring-blue-500 transition-all font-bold italic"
                  >
                    <option value="Youth Development (6-12 Years)">Youth Development (6-12 Years)</option>
                    <option value="Junior Competitive (13-17 Years)">Junior Competitive (13-17 Years)</option>
                    <option value="Corporate Adult Training">Corporate Adult Training</option>
                    <option value="Private Elite Coaching">Private Elite Coaching</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
              </div>

              {/* Location Preference */}
              <div className="space-y-2 pb-6">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-slate-400">
                  Location Preference
                </label>
                <div className="relative">
                  <select 
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full bg-black text-white p-4 rounded-2xl outline-none appearance-none cursor-pointer border border-transparent focus:ring-2 ring-blue-500 transition-all font-bold italic"
                  >
                    <option value="">Select a venue</option>
                    <option value="Stadium Alpha">Stadium Alpha</option>
                    <option value="Kuala Lumpur Central">Kuala Lumpur Central</option>
                    <option value="Selangor Sports Complex">Selangor Sports Complex</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
              </div>

              {/* TUKAR AYAT BUTANG */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0082c8] text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-600 transition shadow-lg uppercase italic tracking-widest active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"} <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#030a12] text-white py-16 px-6 text-center">
        <h2 className="text-2xl font-black italic uppercase tracking-widest mb-4">RSBE ACADEMY</h2>
        <div className="flex justify-center gap-8 text-slate-400 text-xs font-bold uppercase tracking-widest mb-16">
          <a href="#" className="hover:text-white transition">Instagram</a>
          <a href="#" className="hover:text-white transition">TikTok</a>
          <a href="#" className="hover:text-white transition">Contact Support</a>
        </div>
        <div className="text-[10px] text-slate-600 uppercase tracking-[0.2em]">
          © 2026 RSBE Badminton Academy. All Rights Reserved.
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, desc, href }: { icon: any, title: string, desc: string, href: string }) {
  return (
    <Link href={href} className="group">
      <div className="bg-white p-10 rounded-[40px] shadow-sm flex flex-col items-center text-center border border-slate-100 
                      transition-all duration-300 ease-in-out cursor-pointer 
                      hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-200/50 hover:border-blue-500 
                      hover:-translate-y-2 active:scale-[0.98]">
        <div className="w-16 h-16 bg-white shadow-md rounded-2xl flex items-center justify-center mb-6 border border-slate-50 
                        transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <h3 className="font-black uppercase tracking-wider mb-4 
                       transition-colors duration-300 group-hover:text-blue-700">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </Link>
  )
}