import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Stethoscope, Globe } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t, isRtl } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '#' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.cases'), href: '#cases' },
    { name: t('nav.booking'), href: '#booking' },
    { name: t('nav.contact'), href: '#contact' },
    { name: t('nav.admin'), href: '#admin' },
  ];

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-black/40 backdrop-blur-xl border-b border-white/5 shadow-xl py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
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

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-red-500 transition-colors"
            >
              {link.name}
            </a>
          ))}

          {/* Desktop Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 hover:border-white/20 transition-all font-bold text-[10px] tracking-wider text-white uppercase cursor-pointer"
            title={language === 'en' ? 'عربي' : 'English'}
          >
            <Globe className="w-3.5 h-3.5 text-red-500" />
            <span>{language === 'en' ? 'العربية' : 'EN'}</span>
          </button>

          <motion.a
            href="#booking"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2.5 bg-red-600 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-all shadow-lg shadow-red-950/40"
          >
            {t('nav.bookNow')}
          </motion.a>
        </div>

        {/* Mobile Actions: Language + Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white flex items-center gap-1 text-[10px] font-bold cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-red-500" />
            <span>{language === 'en' ? 'AR' : 'EN'}</span>
          </button>

          <button
            className="p-2 text-white hover:text-red-500 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950/95 backdrop-blur-2xl border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-bold text-white/70 hover:text-red-500"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsOpen(false);
                }}
                className="w-full py-3.5 bg-white/5 border border-white/10 text-white rounded-xl flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest cursor-pointer"
              >
                <Globe className="w-4 h-4 text-red-500" />
                <span>{language === 'en' ? 'تغيير إلى العربية' : 'Switch to English'}</span>
              </button>

              <a
                href="#booking"
                className="w-full py-4 bg-red-600 text-white rounded-xl text-center font-bold text-sm uppercase tracking-wide shadow-lg shadow-red-900/20"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.bookAppointment')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
