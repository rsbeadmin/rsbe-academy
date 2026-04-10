'use client'
import { useState } from 'react'
import { Trophy, Smartphone, TrendingUp, ArrowRight, Instagram, Music2, LifeBuoy } from 'lucide-react'

export default function RSBEAcademy() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    program: 'Youth Development (6-12 Years)',
    location: ''
  })

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
              ACADEMY <br />
              <span className="text-[#eab308]">ACADEMY</span>
            </h1>
            <p className="mt-8 text-slate-300 max-w-md text-lg leading-relaxed">
              Managing Malaysia's future champions with a world-class digital syllabus, personalized video tracking, and elite performance analysis.
            </p>
            <button className="mt-10 bg-white text-[#0b3d59] font-bold py-4 px-8 rounded-full flex items-center gap-3 hover:bg-slate-100 transition shadow-xl">
              Access Student Portal <ArrowRight size={20} />
            </button>
          </div>

          {/* Court Image Placeholder */}
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
        
        {/* Background Decorative Circles */}
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-blue-400 opacity-10 rounded-full blur-3xl"></div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-10 rounded-[40px] shadow-sm flex flex-col items-center text-center border border-slate-100">
            <div className="w-16 h-16 bg-white shadow-md rounded-2xl flex items-center justify-center mb-6 border border-slate-50">
              <Trophy className="text-[#eab308]" size={32} />
            </div>
            <h3 className="font-black uppercase tracking-wider mb-4">Pro Syllabus</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Structured training modules for every level from beginner to elite tournament prep.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-10 rounded-[40px] shadow-sm flex flex-col items-center text-center border border-slate-100">
            <div className="w-16 h-16 bg-white shadow-md rounded-2xl flex items-center justify-center mb-6 border border-slate-50">
              <Smartphone className="text-blue-500" size={32} />
            </div>
            <h3 className="font-black uppercase tracking-wider mb-4">Performance Apps</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Dedicated interfaces for Web, iOS, and Android ensuring full business accessibility.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-10 rounded-[40px] shadow-sm flex flex-col items-center text-center border border-slate-100">
            <div className="w-16 h-16 bg-white shadow-md rounded-2xl flex items-center justify-center mb-6 border border-slate-50">
              <TrendingUp className="text-green-500" size={32} />
            </div>
            <h3 className="font-black uppercase tracking-wider mb-4">Video Proof</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Personalized training clips provided to parents as proof of student progression.
            </p>
          </div>
        </div>
      </section>

      {/* --- REGISTRATION FORM SECTION --- */}
      <section className="py-24 px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black italic uppercase italic">Apply For Admission</h2>
            <p className="text-slate-500 mt-4">Elite coaching is in high demand. Secure your spot in the next intake by filling in your details below.</p>
          </div>

          <div className="bg-white p-2 rounded-[40px] shadow-2xl border border-slate-100">
            <div className="p-10 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-1">Student Full Name</label>
                  <input type="text" placeholder="Name as per IC" className="w-full bg-black text-white p-4 rounded-2xl outline-none focus:ring-2 ring-blue-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-1">Contact Number</label>
                  <input type="text" placeholder="+6012-XXXXXXX" className="w-full bg-black text-white p-4 rounded-2xl outline-none focus:ring-2 ring-blue-500" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1">Program Selection</label>
                <select className="w-full bg-black text-white p-4 rounded-2xl outline-none appearance-none cursor-pointer">
                  <option>Youth Development (6-12 Years)</option>
                  <option>Pro Intensive (13-18 Years)</option>
                  <option>Adult Social</option>
                </select>
              </div>

              <div className="space-y-2 pb-6">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1">Location Preference</label>
                <select className="w-full bg-black text-white p-4 rounded-2xl outline-none appearance-none cursor-pointer">
                  <option>Select a venue</option>
                  <option>Setapak Hub</option>
                  <option>Petaling Jaya Branch</option>
                </select>
              </div>

              <button className="w-full bg-[#0082c8] text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-600 transition shadow-lg uppercase italic tracking-widest">
                Next: Create Account <ArrowRight size={20} />
              </button>

              <p className="text-[10px] text-slate-400 text-center mt-6">
                Note: No free trial sessions. Enrollment is subject to initial assessment by RSBE head coach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#030a12] text-white py-16 px-6 text-center">
        <h2 className="text-2xl font-black italic uppercase italic tracking-widest mb-4">RSBE ACADEMY</h2>
        <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed mb-10">
          Professional badminton coaching and management. Building the next generation of shuttlers with integrity and innovation.
        </p>
        
        <div className="flex justify-center gap-8 text-slate-400 text-xs font-bold uppercase tracking-widest mb-16">
          <a href="#" className="hover:text-white transition">Instagram</a>
          <a href="#" className="hover:text-white transition">TikTok</a>
          <a href="#" className="hover:text-white transition">Contact Support</a>
        </div>

        <div className="text-[10px] text-slate-600 uppercase tracking-[0.2em]">
          © 2024 RSBE Badminton Academy. All Rights Reserved.
        </div>
      </footer>

    </div>
  )
}