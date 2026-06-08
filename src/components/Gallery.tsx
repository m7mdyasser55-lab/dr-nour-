import { motion } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';
import case1 from '../assets/images/regenerated_image_1779030729981.png';
import case3 from '../assets/images/regenerated_image_1779126058318.png';
import case5 from '../assets/images/regenerated_image_1779030931731.jpg';
import case6 from '../assets/images/regenerated_image_1779030735959.png';

export function Gallery() {
  const { t } = useLanguage();

  const cases = [
    { 
      title: t('gallery.case.hollywood'), 
      category: t('gallery.cat.veneers'), 
      image: case1 
    },
    { 
      title: t('gallery.case.reconstruction'), 
      category: t('gallery.cat.implants'), 
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800' 
    },
    { 
      title: t('gallery.case.aligners'), 
      category: t('gallery.cat.ortho'), 
      image: case3 
    },
    { 
      title: t('gallery.case.laser'), 
      category: t('gallery.cat.surgery'), 
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800' 
    },
    { 
      title: t('gallery.case.whitening'), 
      category: t('gallery.cat.cosmetic'), 
      image: case5 
    },
    { 
      title: t('gallery.case.composite'), 
      category: t('gallery.cat.restoration'), 
      image: case6 
    },
  ];

  return (
    <section id="cases" className="py-24 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-red-500 font-bold uppercase tracking-widest text-[10px] mb-4">{t('gallery.badge')}</h2>
          <h3 className="text-5xl font-extrabold text-white mb-6 tracking-tight">{t('gallery.title')}</h3>
          <p className="text-white/40 text-lg font-medium mb-8">
            {t('gallery.desc')}
          </p>
          <a 
            href="https://www.instagram.com/drnourmashaly" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-semibold transition-colors group"
          >
            <span>{t('gallery.instagram')}</span>
            <div className="w-8 h-px bg-red-500 group-hover:w-12 transition-all" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-white/5 bg-black/40 shadow-2xl"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-[0.2em] mb-1">{item.category}</p>
                <h4 className="text-xl font-bold text-white tracking-tight">{item.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
