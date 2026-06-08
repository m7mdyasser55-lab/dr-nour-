import { motion } from 'motion/react';
import { Wand2, Anchor, Shapes, ClipboardCheck, Activity, Siren } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export function Services() {
  const { t } = useLanguage();

  const services = [
    {
      title: t('services.whitening.title'),
      description: t('services.whitening.desc'),
      icon: Wand2,
      color: 'bg-red-950/20 text-red-500',
    },
    {
      title: t('services.implants.title'),
      description: t('services.implants.desc'),
      icon: Anchor,
      color: 'bg-red-950/20 text-red-500',
    },
    {
      title: t('services.cosmetic.title'),
      description: t('services.cosmetic.desc'),
      icon: Shapes,
      color: 'bg-red-950/20 text-red-500',
    },
    {
      title: t('services.checkup.title'),
      description: t('services.checkup.desc'),
      icon: ClipboardCheck,
      color: 'bg-red-950/20 text-red-500',
    },
    {
      title: t('services.ortho.title'),
      description: t('services.ortho.desc'),
      icon: Activity,
      color: 'bg-red-950/20 text-red-500',
    },
    {
      title: t('services.emergency.title'),
      description: t('services.emergency.desc'),
      icon: Siren,
      color: 'bg-red-950/20 text-red-500',
    },
  ];

  return (
    <section id="services" className="py-24 bg-transparent relative">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-red-500 font-bold uppercase tracking-widest text-[10px] mb-4">{t('services.badge')}</h2>
          <h3 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">{t('services.title')}</h3>
          <p className="text-white/40 text-lg font-medium">
            {t('services.desc')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-[2.5rem] bg-black/20 backdrop-blur-xl border border-white/5 hover:bg-black/30 transition-all hover:shadow-2xl hover:shadow-red-900/20"
            >
              <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm border border-red-500/10`}>
                <service.icon className="w-7 h-7" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">{service.title}</h4>
              <p className="text-white/50 leading-relaxed font-medium">{service.description}</p>
              <a href="#booking" className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 transition-all hover:gap-3">
                {t('services.learnMore')} <span>→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
