import { motion } from 'motion/react';
import { Calendar, ShieldCheck, Star } from 'lucide-react';
import heroImage from '../assets/images/regenerated_image_1778841257517.png';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background decorative elements matching theme */}
      <div className="absolute top-1/4 -right-20 -z-10 w-96 h-96 bg-red-900/20 blur-[120px] rounded-full" />
      <div className="absolute -bottom-20 -left-20 -z-10 w-96 h-96 bg-slate-900/40 blur-[120px] rounded-full" />
      
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/30 backdrop-blur-sm text-red-400 text-[10px] font-bold uppercase tracking-widest mb-6 border border-red-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Premium Dental Care
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 font-black">Vision of a Smile.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 max-w-xl mb-10 leading-relaxed font-medium">
            Experience the fusion of advanced clinical expertise and modern aesthetic care with Dr. Nour Mashaly in Alexandria.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="#booking"
              className="px-10 py-5 bg-red-600 text-white rounded-2xl font-bold text-lg hover:bg-red-700 transition-all shadow-2xl shadow-red-900/40 flex items-center justify-center gap-2 group"
            >
              <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Book Free Consultation
            </a>
            <a
              href="#services"
              className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              Explore Services
            </a>
          </div>
          
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5">
            <div>
              <div className="flex items-center gap-1 text-red-500 mb-1">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-lg font-bold text-white">4.9/5</span>
              </div>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Patient Rating</p>
            </div>
            <div>
              <div className="text-lg font-bold text-white mb-1">8k+</div>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Happy Patients</p>
            </div>
            <div>
              <div className="text-lg font-bold text-white mb-1">10+</div>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Years Expertise</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative lg:ml-12"
        >
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative border-8 border-white/5 backdrop-blur-sm">
            <img
              src={heroImage}
              alt="Dr. Nour Mashaly Clinic"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            
            {/* Floating Glass Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-8 left-8 right-8 bg-black/40 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl border border-white/10 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-900/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white tracking-tight">Certified Professional</h4>
                <p className="text-xs font-bold text-white/30 uppercase tracking-widest">Alexandria Specialist</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
