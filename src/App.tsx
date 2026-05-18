import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { BookingSystem } from './components/BookingSystem';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [view, setView] = useState<'public' | 'admin'>('public');

  useEffect(() => {
    // Check hash on load
    if (window.location.hash === '#admin') {
      setView('admin');
    }

    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setView('admin');
      } else {
        setView('public');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {view === 'admin' ? (
        <motion.div 
          key="admin"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <AdminDashboard onBack={() => {
            window.location.hash = '';
            setView('public');
          }} />
        </motion.div>
      ) : (
        <motion.div 
          key="public"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950/20 to-black font-sans text-white selection:bg-red-500/30 selection:text-white"
        >
          <Navbar />
          <main>
            <Hero />
            <About />
            <Services />
            <Gallery />
            <BookingSystem />
            <ContactForm />
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
