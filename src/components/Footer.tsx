import { Stethoscope, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export function Footer() {
  const { t, isRtl } = useLanguage();

  return (
    <footer className="px-10 py-20 flex flex-col items-center border-t border-white/5 bg-white/5 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-8 group">
              <div className="p-2 bg-red-600 rounded-lg group-hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white leading-none">
                {isRtl ? (
                  <>د. نور <span className="text-red-600 font-black">مشالي</span></>
                ) : (
                  <>Dr. Nour <span className="text-red-600 font-black">Mashaly</span></>
                )}
              </span>
            </a>
            <p className="text-white/30 text-sm font-bold uppercase tracking-widest leading-relaxed max-w-xs">
              {t('footer.desc')}
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-8">{t('footer.links.title')}</h4>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-white/40">
              <li><a href="#" className="hover:text-red-500 transition-colors">{t('nav.home')}</a></li>
              <li><a href="#services" className="hover:text-red-500 transition-colors">{t('nav.services')}</a></li>
              <li><a href="#booking" className="hover:text-red-500 transition-colors">{t('nav.booking')}</a></li>
              <li><a href="#contact" className="hover:text-red-500 transition-colors">{t('nav.contact')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-8">{t('footer.hours.title')}</h4>
            <ul className="space-y-4 text-[14px] font-bold uppercase tracking-widest text-[#fff9f9]">
              <li className="flex justify-between border-b border-white/5 pb-2 gap-4">
                <span>{t('footer.hours.sat.thu')}</span>
                <span className="text-white text-xs">{t('footer.hours.sat.thu.time')}</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2 gap-4">
                <span>{t('footer.hours.fri')}</span>
                <span className="text-red-600 font-black text-xs">{t('footer.hours.fri.time')}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-8">{t('footer.news.title')}</h4>
            <div className="flex gap-2 mb-8">
              <input 
                placeholder={t('footer.news.placeholder')}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 w-full text-[10px] font-bold tracking-widest focus:ring-2 focus:ring-red-500 outline-none text-white"
              />
              <button 
                onClick={(e) => {
                  const btn = e.currentTarget;
                  btn.innerText = t('footer.news.btn.sent');
                  btn.classList.add('bg-green-600');
                  setTimeout(() => {
                    btn.innerText = t('footer.news.btn.join');
                    btn.classList.remove('bg-green-600');
                  }, 2000);
                }}
                className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-4 text-[10px] font-bold tracking-widest transition-all shadow-lg shadow-red-900/20"
              >
                {t('footer.news.btn.join')}
              </button>
            </div>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/share/1CjGXDvjbj/" 
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:text-white hover:scale-110 active:scale-95 transition-all shadow-sm group"
                title="Facebook"
              >
                <Facebook className="w-5 h-5 group-hover:animate-pulse" />
              </a>
              <a 
                href="https://www.instagram.com/drnourmashaly?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white hover:scale-110 active:scale-95 transition-all shadow-sm group"
                title="Instagram"
              >
                <Instagram className="w-5 h-5 group-hover:animate-pulse" />
              </a>
              <a 
                href="https://wa.me/201559909874" 
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-[#25D366] hover:text-white hover:scale-110 active:scale-95 transition-all shadow-sm group"
                title="WhatsApp"
              >
                <svg 
                  className="w-5 h-5 fill-current group-hover:animate-pulse" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.705 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/20 font-bold uppercase tracking-tighter">
          <p>{t('footer.copyright')}</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-red-600 transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-red-600 transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
