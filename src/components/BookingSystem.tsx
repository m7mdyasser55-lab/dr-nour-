import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Clock, User, CheckCircle2 } from 'lucide-react';
import { createBooking, createInquiry } from '../lib/db';
import { useLanguage } from '../lib/LanguageContext';

export function BookingSystem() {
  const { t, isRtl } = useLanguage();
  const [type, setType] = useState<'booking' | 'inquiry'>('booking');
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);

  const times = ['04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'];
  
  const services = [
    { value: 'Consultation', label: t('service.opt.consultation') },
    { value: 'Teeth Whitening', label: t('service.opt.whitening') },
    { value: 'Cleaning', label: t('service.opt.cleaning') },
    { value: 'Emergency', label: t('service.opt.emergency') },
    { value: 'Orthodontics', label: t('service.opt.orthodontic') },
  ];

  const handleNext = async () => {
    if (type === 'booking' && step === 3) {
      setLoading(true);
      try {
        await createBooking({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          date: selectedDate,
          time: selectedTime,
        });

        // Trigger email notification via server
        try {
          await fetch('/api/notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'booking',
              name: formData.name,
              email: formData.email,
              service: formData.service,
              date: selectedDate,
              time: selectedTime,
            }),
          });
        } catch (emailErr) {
          console.error('Failed to trigger email notification:', emailErr);
        }

        setStep(4);
      } catch (error) {
        alert('Failed to book appointment. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setStep(step + 1);
    }
  };

  const handleInquiry = async () => {
    setLoading(true);
    try {
      await createInquiry({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      // Trigger email notification via server
      try {
        await fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'inquiry',
            name: formData.name,
            email: formData.email,
            message: formData.message,
          }),
        });
      } catch (emailErr) {
        console.error('Failed to trigger email notification:', emailErr);
      }

      setStep(4);
    } catch (error) {
      alert('Failed to send inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleReset = () => {
    setStep(1);
    setSelectedDate('');
    setSelectedTime('');
    setFormData({ name: '', email: '', service: '', message: '' });
  };

  return (
    <section id="booking" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 blur-[100px] -z-0" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-500/10 blur-[80px] -z-0" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="text-red-600 font-bold uppercase tracking-widest text-[10px] mb-4">{t('booking.badge')}</h2>
            <h3 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight">
              {t('booking.title.journey')}<span className="text-red-600">{t('booking.title.smile')}</span>
            </h3>
            <p className="text-white/40 text-lg mb-8 leading-relaxed font-medium">
              {t('booking.desc')}
            </p>
            
            <div className="space-y-4">
              {[
                t('booking.highlight.instant'),
                t('booking.highlight.priority'),
                t('booking.highlight.digital'),
                t('booking.highlight.expert')
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-600/10 flex items-center justify-center text-red-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-white/50 font-bold text-sm uppercase tracking-wider">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-10 shadow-2xl">
            {/* Toggle System */}
            <div className="flex gap-1 mb-8 p-1 bg-white/5 rounded-2xl border border-white/5">
              <button 
                onClick={() => { setType('booking'); handleReset(); }}
                className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${type === 'booking' ? 'bg-red-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                {t('booking.tab.booking')}
              </button>
              <button 
                onClick={() => { setType('inquiry'); handleReset(); }}
                className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${type === 'inquiry' ? 'bg-red-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                {t('booking.tab.inquiry')}
              </button>
            </div>

            {step === 4 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-6 shadow-sm border border-white/10">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-3xl font-extrabold text-white mb-4 tracking-tight">
                  {type === 'booking' ? t('booking.success.title.booking') : t('booking.success.title.inquiry')}
                </h4>
                <p className="text-white/40 font-medium mb-8">
                  {type === 'booking' 
                    ? t('booking.success.desc.booking') 
                    : t('booking.success.desc.inquiry')}
                </p>
                <button
                  onClick={handleReset}
                  className="px-10 py-4 bg-red-600 text-white rounded-xl font-extrabold uppercase tracking-widest text-xs hover:bg-red-700 shadow-xl shadow-red-900/40 cursor-pointer"
                >
                  {t('booking.success.return')}
                </button>
              </motion.div>
            ) : type === 'booking' ? (
              <>
                {step === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h4 className="text-3xl font-extrabold text-white mb-8 tracking-tight">{t('booking.step1.title')}</h4>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">{t('booking.step1.label.service')}</label>
                        <select 
                          className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-red-500 transition-all outline-none font-bold text-white"
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        >
                          <option value="" className="bg-slate-900">{t('booking.step1.choose')}</option>
                          {services.map(s => <option key={s.value} value={s.value} className="bg-slate-900">{s.label}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">{t('booking.step1.label.date')}</label>
                        <input 
                          type="date" 
                          min={new Date().toISOString().split('T')[0]}
                          value={selectedDate}
                          className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-red-500 transition-all outline-none font-bold text-white [&::-webkit-calendar-picker-indicator]:invert"
                          onChange={(e) => setSelectedDate(e.target.value)}
                        />
                      </div>
                      <button
                        disabled={!selectedDate || !formData.service}
                        onClick={handleNext}
                        className="w-full py-5 bg-red-600 text-white rounded-[1.5rem] font-extrabold uppercase tracking-widest text-xs hover:bg-red-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed mt-4 shadow-xl shadow-red-900/40 cursor-pointer"
                      >
                        {t('booking.step1.btn.next')}
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <button onClick={() => setStep(1)} className="text-red-500 font-bold mb-4 flex items-center gap-1 text-[10px] uppercase tracking-widest cursor-pointer">
                      {isRtl ? '→' : '←'} {t('booking.step2.prev')}
                    </button>
                    <h4 className="text-3xl font-extrabold text-white mb-8 tracking-tight">{t('booking.step2.title')}</h4>
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {times.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`p-4 rounded-2xl font-bold transition-all border text-sm cursor-pointer ${
                            selectedTime === t 
                              ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-900/40' 
                              : 'bg-white/5 border-white/10 text-white/40 hover:border-red-500/50 hover:text-white'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <button
                      disabled={!selectedTime}
                      onClick={handleNext}
                      className="w-full py-5 bg-red-600 text-white rounded-[1.5rem] font-extrabold uppercase tracking-widest text-xs hover:bg-red-700 transition-all disabled:opacity-30 mt-4 shadow-xl shadow-red-900/40 cursor-pointer"
                    >
                      {t('booking.step2.btn.confirm')}
                    </button>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <button onClick={() => setStep(2)} className="text-red-500 font-bold mb-4 flex items-center gap-1 text-[10px] uppercase tracking-widest cursor-pointer">
                      {isRtl ? '→' : '←'} {t('booking.step2.prev')}
                    </button>
                    <h4 className="text-3xl font-extrabold text-white mb-8 tracking-tight">{t('booking.step3.title')}</h4>
                    <div className="space-y-6">
                      <input
                        placeholder={t('booking.step3.placeholder.name')}
                        value={formData.name}
                        className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-red-500 transition-all outline-none font-bold text-white placeholder:text-white/20"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      <input
                        type="email"
                        placeholder={t('booking.step3.placeholder.email')}
                        value={formData.email}
                        className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-red-500 transition-all outline-none font-bold text-white placeholder:text-white/20"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                      <div className="p-4 bg-red-500/5 rounded-2xl border border-red-500/10">
                        <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em] mb-2">{t('booking.step3.manifest.title')}</p>
                        <p className="text-sm font-bold text-white">
                          {services.find(s => s.value === formData.service)?.label || formData.service} {t('booking.step3.manifest.with')}
                        </p>
                        <p className="text-xs font-bold text-red-500/60 uppercase tracking-wider">{selectedDate} / {selectedTime}</p>
                        <p className="text-[10px] text-white/45 mt-2 font-medium">{t('booking.step3.manifest.note')}</p>
                      </div>
                      <button
                        disabled={!formData.name || !formData.email || loading}
                        onClick={handleNext}
                        className="w-full py-5 bg-red-600 text-white rounded-[1.5rem] font-extrabold uppercase tracking-widest text-xs hover:bg-red-700 transition-all disabled:opacity-30 mt-4 shadow-xl shadow-red-900/40 flex items-center justify-center cursor-pointer"
                      >
                        {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : t('booking.step3.btn.confirm')}
                      </button>
                    </div>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h4 className="text-3xl font-extrabold text-white mb-8 tracking-tight">{t('booking.inquiry.title')}</h4>
                <div className="space-y-6">
                  <input
                    placeholder={t('booking.step3.placeholder.name')}
                    value={formData.name}
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-red-500 transition-all outline-none font-bold text-white placeholder:text-white/20"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <input
                    type="email"
                    placeholder={t('booking.step3.placeholder.email')}
                    value={formData.email}
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-red-500 transition-all outline-none font-bold text-white placeholder:text-white/20"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <textarea
                    placeholder={t('booking.inquiry.placeholder.msg')}
                    rows={4}
                    value={formData.message}
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-red-500 transition-all outline-none font-bold text-white placeholder:text-white/20 resize-none"
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                  <button
                    onClick={handleInquiry}
                    disabled={!formData.name || !formData.email || !formData.message || loading}
                    className="w-full py-5 bg-red-600 text-white rounded-[1.5rem] font-extrabold uppercase tracking-widest text-xs hover:bg-red-700 transition-all shadow-xl shadow-red-900/40 disabled:opacity-30 flex items-center justify-center cursor-pointer"
                  >
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : t('booking.inquiry.btn.submit')}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
