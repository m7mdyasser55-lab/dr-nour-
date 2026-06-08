import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export function ContactForm() {
  const { t } = useLanguage();

  const details = [
    {
      icon: Phone,
      label: t('contact.label.phone'),
      value: '01557022897',
    },
    {
      icon: Mail,
      label: t('contact.label.mail'),
      value: 'nour.mohamashaly@gmail.com',
    },
    {
      icon: MapPin,
      label: t('contact.label.location'),
      value: t('contact.value.location'),
    },
  ];

  return (
    <section id="contact" className="py-24 bg-transparent relative">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-red-600 font-bold uppercase tracking-widest text-[10px] mb-4">{t('contact.badge')}</h2>
          <h3 className="text-5xl font-extrabold text-white mb-8 tracking-tight">{t('contact.title')}</h3>
          <p className="text-white/40 text-lg mb-12 font-medium">
            {t('contact.desc')}
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {details.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col items-center gap-4 shadow-sm hover:bg-white/10 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center shadow-sm">
                  <item.icon className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-sm font-bold text-white max-w-full break-all">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
