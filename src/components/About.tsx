import { motion } from 'motion/react';
import { Award, GraduationCap, Users } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import aboutImage from '../assets/images/regenerated_image_1778841710995.jpg';

export function About() {
  const { t } = useLanguage();

  const achievements = [
    { icon: GraduationCap, title: t('about.grad.title'), desc: t('about.grad.desc') },
    { icon: Award, title: t('about.award.title'), desc: t('about.award.desc') },
    { icon: Users, title: t('about.users.title'), desc: t('about.users.desc') }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-2xl relative z-10">
              <img 
                src={aboutImage} 
                alt="Dr. Nour Mashaly" 
                className="w-full h-full object-cover scale-125"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            {/* Decorative background for the photo */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-red-600/10 blur-[80px] rounded-full" />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-red-900/20 blur-[60px] rounded-full" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-red-500 font-bold uppercase tracking-widest text-[10px] mb-4">{t('about.badge')}</h2>
            <h3 className="text-5xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">
              {t('about.title.meet')}<span className="text-red-650">{t('about.title.name')}</span>
            </h3>
            <p className="text-white/40 text-lg mb-8 leading-relaxed font-medium">
              {t('about.desc')}
            </p>

            <div className="grid gap-6">
              {achievements.map((item, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center gap-6 shadow-sm hover:bg-white/10 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-red-600/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">{item.title}</h4>
                    <p className="text-white/30 text-sm font-bold uppercase tracking-wider">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
