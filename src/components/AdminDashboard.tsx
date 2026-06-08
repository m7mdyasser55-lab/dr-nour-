import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, loginWithGoogle, logout, db } from '../lib/firebase';
import { useLanguage } from '../lib/LanguageContext';
import { collection, query, orderBy, Timestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LogIn, 
  LogOut, 
  Calendar, 
  MessageSquare, 
  CheckCircle, 
  XCircle, 
  Trash2,
  Lock,
  ArrowLeft,
  Clock,
  Mail,
  Activity,
  Users,
  TrendingUp,
  Filter,
  ShieldCheck,
  ShieldAlert,
  Send,
  Key
} from 'lucide-react';
import { updateBookingStatus, deleteInquiry } from '../lib/db';

const ADMIN_EMAILS = ['nour.mohamashaly@gmail.com', 'm7mdyasser55@gmail.com'];

interface Booking {
  id: string;
  name: string;
  email?: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Timestamp;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: Timestamp;
}

export function AdminDashboard({ onBack }: { onBack: () => void }) {
  const { t, isRtl } = useLanguage();
  const [user, loadingAuth] = useAuthState(auth);
  const [activeTab, setActiveTab] = useState<'bookings' | 'inquiries'>('bookings');
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');

  const [bookingsValue, loadingBookings, bookingsError] = useCollection(
    user && ADMIN_EMAILS.includes(user.email || '') 
      ? query(collection(db, 'bookings'), orderBy('createdAt', 'desc')) 
      : null
  );

  const [inquiriesValue, loadingInquiries, inquiriesError] = useCollection(
    user && ADMIN_EMAILS.includes(user.email || '') 
      ? query(collection(db, 'inquiries'), orderBy('createdAt', 'desc')) 
      : null
  );

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    setAuthError(null);
    try {
      await loginWithGoogle();
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.code === 'auth/popup-blocked') {
        setAuthError('The sign-in popup was blocked by your browser. Please allow popups for this site and try again.');
      } else if (error.code === 'auth/popup-closed-by-user') {
        setAuthError('The sign-in window was closed before completion. Please try again.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        setAuthError('Another login request is already in progress.');
      } else {
        setAuthError(error.message || 'An unexpected error occurred during authentication.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const isAdmin = user ? ADMIN_EMAILS.includes(user.email || '') : false;

  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [resendStatus, setResendStatus] = useState<{ configured: boolean; message: string } | null>(null);
  const [loadingStatus, setLoadingStatus] = useState<boolean>(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchResendStatus = async () => {
    setLoadingStatus(true);
    try {
      const response = await fetch('/api/resend-status');
      const data = await response.json();
      if (data.success) {
        setResendStatus({ configured: data.configured, message: data.message });
      }
    } catch (err) {
      console.error('Error fetching Resend status:', err);
    } finally {
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    if (user && ADMIN_EMAILS.includes(user.email || '')) {
      fetchResendStatus();
    }
  }, [user]);

  const testEmailConnection = async () => {
    setIsTestingEmail(true);
    setToast(null);
    try {
      const response = await fetch('/api/test-resend');
      const data = await response.json();
      if (data.success) {
        setToast({ type: 'success', message: 'Success! A verification email contains the test token has been dispatched successfully.' });
      } else {
        setToast({ type: 'error', message: data.message || 'Check if RESEND_API_KEY is configured correctly.' });
      }
    } catch (err) {
      setToast({ type: 'error', message: 'Network error occurred. Unable to relay communications to server.' });
    } finally {
      setIsTestingEmail(false);
    }
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6 selection:bg-red-500/30">
        <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-[3.5rem] p-12 text-center shadow-2xl backdrop-blur-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-24 h-24 bg-red-600/10 rounded-3xl flex items-center justify-center text-red-600 mx-auto mb-10 border border-red-500/20 rotate-3 group-hover:rotate-0 transition-transform duration-500">
            <Lock className="w-10 h-10" />
          </div>
          <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">Clinical Access</h2>
          <p className="text-white/40 mb-12 font-medium leading-relaxed px-4">
            Authorized personnel only. Please verify your credentials to manage active practice operations.
          </p>
          <div className="flex flex-col gap-4">
            <button 
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="w-full py-5 bg-red-600 text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-red-700 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-red-900/40 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogIn className="w-4 h-4" />
              {isLoggingIn ? 'Authenticating...' : 'Primary Authentication'}
            </button>
            {authError && (
              <p className="text-[10px] font-bold text-red-500 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                {authError}
              </p>
            )}
            <button 
              onClick={onBack}
              className="w-full py-5 bg-white/5 text-white/60 rounded-[1.5rem] font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              <ArrowLeft className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
              {t('admin.back')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
        <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-[3.5rem] p-12 text-center shadow-2xl backdrop-blur-2xl">
          <div className="w-24 h-24 bg-red-600/10 rounded-3xl flex items-center justify-center text-red-600 mx-auto mb-10 border border-red-500/20">
            <XCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-white mb-4 tracking-tighter">Restriction Applied</h2>
          <p className="text-white/40 mb-12 font-medium px-4">
            The account <span className="text-white">{user.email}</span> lacks the required administrative clearances.
          </p>
          <button 
            onClick={() => logout()}
            className="w-full py-5 bg-white/5 text-red-500 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] border border-red-500/20 hover:bg-red-500/10 transition-all active:scale-[0.98]"
          >
            Terminal Switch
          </button>
        </div>
      </div>
    );
  }

  const rawBookings = bookingsValue?.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Booking)) || [];
  const inquiries = inquiriesValue?.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Inquiry)) || [];

  const bookings = filter === 'all' 
    ? rawBookings 
    : rawBookings.filter(b => b.status === filter);

  const stats = {
    pending: rawBookings.filter(b => b.status === 'pending').length,
    confirmed: rawBookings.filter(b => b.status === 'confirmed').length,
    inquiries: inquiries.length,
    totalSessions: rawBookings.length
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-red-500/30">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 px-6 md:px-12 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-red-900/40">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter">Practice <span className="text-red-500">HQ</span></h1>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Operational Dashboard — ID: {user.uid.slice(0, 8)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button 
              onClick={testEmailConnection}
              disabled={isTestingEmail}
              className="px-6 py-3 bg-red-600/10 text-red-500 hover:bg-red-600/20 rounded-xl font-bold text-xs transition-all border border-red-500/20 flex items-center gap-2 disabled:opacity-50"
            >
              <Mail className="w-3.5 h-3.5" />
              {isTestingEmail ? (isRtl ? 'جاري الاختبار...' : 'Testing...') : (isRtl ? 'اختبار المزامنة' : 'Test Integration')}
            </button>
            <button 
              onClick={onBack}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-xs transition-all border border-white/10 flex items-center gap-2"
            >
              <ArrowLeft className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
              {t('admin.back')}
            </button>
            <button 
              onClick={() => logout()}
              className="px-6 py-3 bg-red-600/10 text-red-500 hover:bg-red-600/20 rounded-xl font-black uppercase tracking-widest text-[9px] transition-all border border-red-500/20 flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              {t('admin.logout')}
            </button>
          </div>
        </div>
      </header>

      <main className="p-6 md:p-12 max-w-7xl mx-auto pb-32">
        {/* Statistics Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {[
            { label: 'Queued Appointments', value: stats.pending, icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
            { label: 'Confirmed Sessions', value: stats.confirmed, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
            { label: 'Open Inquiries', value: stats.inquiries, icon: MessageSquare, color: 'text-red-500', bg: 'bg-red-500/10' },
            { label: 'Total Volume', value: stats.totalSessions, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          ].map((stat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={stat.label} 
              className="bg-white/5 border border-white/10 rounded-[2rem] p-6 group hover:border-white/20 transition-all hover:bg-white/[0.07]"
            >
              <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4 border border-white/5`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.15em] mb-1">{stat.label}</p>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-black tracking-tighter">{stat.value}</span>
                <TrendingUp className="w-4 h-4 text-white/10 group-hover:text-red-500 transition-colors" />
              </div>
            </motion.div>
          ))}
        </section>

        {/* Resend API Integration Status */}
        {resendStatus && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-12 p-8 rounded-[2.5rem] border backdrop-blur-xl relative overflow-hidden transition-all duration-300 ${
              resendStatus.configured 
                ? 'bg-green-500/5 border-green-500/20 text-green-200' 
                : 'bg-red-500/5 border-red-500/20 text-red-200'
            }`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full pointer-events-none" />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 ${
                  resendStatus.configured 
                    ? 'bg-green-500/10 border-green-500/20 text-green-500' 
                    : 'bg-red-500/10 border-red-500/20 text-red-500'
                }`}>
                  {resendStatus.configured ? <ShieldCheck className="w-6 h-6 animate-pulse" /> : <ShieldAlert className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight text-white flex flex-wrap items-center gap-2">
                    Email Service (Resend Integration)
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${
                      resendStatus.configured ? 'bg-green-500/10 text-green-400 border border-green-400/20' : 'bg-red-500/10 text-red-400 border border-red-400/20'
                    }`}>
                      {resendStatus.configured ? 'Connected & Active' : 'Missing Key'}
                    </span>
                  </h3>
                  <p className="text-xs text-white/50 mt-1 font-medium leading-relaxed max-w-2xl">
                    {resendStatus.message} {resendStatus.configured 
                      ? 'The clinic and patient communications are successfully integrated to trigger notifications automatically.' 
                      : 'Please define your RESEND_API_KEY inside the Secrets panel of Google AI Studio Settings. Once designated, click "Re-verify Status" to establish connectivity.'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto self-stretch md:self-auto shrink-0">
                <button 
                  onClick={testEmailConnection}
                  disabled={isTestingEmail || !resendStatus.configured}
                  className="flex-1 md:flex-none px-6 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold text-xs transition-all border border-white/10 flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isTestingEmail ? 'Sending...' : 'Test Sync'}
                </button>
                <button 
                  onClick={fetchResendStatus}
                  disabled={loadingStatus}
                  className="flex-1 md:flex-none px-6 py-4 bg-white/5 hover:bg-white/10 text-white/80 rounded-2xl font-bold text-xs transition-all border border-white/10 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Key className="w-3.5 h-3.5 text-white/30" />
                  {loadingStatus ? 'Checking...' : 'Re-verify Status'}
                </button>
              </div>
            </div>

            {toast && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 p-4 rounded-2xl border text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
                  toast.type === 'success' 
                    ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                }`}
              >
                {toast.type === 'success' ? <ShieldCheck className="w-4 h-4 shrink-0" /> : <ShieldAlert className="w-4 h-4 shrink-0" />}
                <span>{toast.message}</span>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Dashboard Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
          <div className="flex gap-2 p-1.5 bg-white/5 border border-white/10 rounded-[1.8rem]">
            <button 
              onClick={() => setActiveTab('bookings')}
              className={`px-8 py-4 rounded-[1.4rem] font-black uppercase tracking-widest text-[9px] transition-all flex items-center gap-3 shrink-0 ${activeTab === 'bookings' ? 'bg-red-600 text-white shadow-xl shadow-red-900/40 scale-[1.02]' : 'text-white/40 hover:text-white'}`}
            >
              <Calendar className="w-4 h-4" />
              Sessions
            </button>
            <button 
              onClick={() => setActiveTab('inquiries')}
              className={`px-8 py-4 rounded-[1.4rem] font-black uppercase tracking-widest text-[9px] transition-all flex items-center gap-3 shrink-0 ${activeTab === 'inquiries' ? 'bg-red-600 text-white shadow-xl shadow-red-900/40 scale-[1.02]' : 'text-white/40 hover:text-white'}`}
            >
              <MessageSquare className="w-4 h-4" />
              Inquiries
              {stats.inquiries > 0 && (
                <span className="bg-red-500/20 text-red-500 px-2 py-0.5 rounded-full text-[8px] border border-red-500/30">
                  {stats.inquiries}
                </span>
              )}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'bookings' && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full"
              >
                <div className="p-1 px-3 bg-white/5 border border-white/5 rounded-full flex items-center gap-2 mr-2">
                  <Filter className="w-3 h-3 text-white/20" />
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Filter:</span>
                </div>
                {['all', 'pending', 'confirmed', 'cancelled'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border transition-all whitespace-nowrap ${filter === f ? 'bg-white border-white text-black' : 'bg-transparent border-white/10 text-white/40 hover:border-white/30 hover:text-white'}`}
                  >
                    {f}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'bookings' ? (
            <motion.div 
              key="bookings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {loadingBookings ? (
                <div className="flex flex-col items-center justify-center py-32 text-white/10">
                  <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="font-black uppercase tracking-[0.3em] text-[10px]">Synchronizing Clinical Data</p>
                </div>
              ) : bookings.length === 0 ? (
                <div className="bg-white/5 rounded-[3rem] p-24 text-center border border-dashed border-white/10">
                  <Calendar className="w-16 h-16 text-white/5 mx-auto mb-6" />
                  <p className="text-white/20 font-black uppercase tracking-[0.2em] text-[10px]">No appointments match current filters.</p>
                </div>
              ) : (
                bookings.map((booking: Booking, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    key={booking.id} 
                    className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 flex flex-col lg:flex-row gap-8 items-start lg:items-center hover:bg-white/[0.08] transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                          booking.status === 'confirmed' ? 'bg-green-600/10 text-green-500 border-green-500/20' :
                          booking.status === 'cancelled' ? 'bg-red-600/10 text-red-500 border-red-500/20' :
                          'bg-yellow-600/10 text-yellow-500 border-yellow-500/20'
                        }`}>
                          {booking.status}
                        </span>
                        <div className="h-1 w-1 bg-white/20 rounded-full" />
                        <span className="text-white/30 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          {booking.createdAt?.toDate().toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                        </span>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-2xl font-black tracking-tighter text-white mb-2 leading-none">{booking.name}</h3>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-600 rounded-full" />
                          <p className="text-red-500/80 font-bold text-[11px] uppercase tracking-[0.2em]">{booking.service}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <div className="flex items-center gap-3 bg-black/40 px-5 py-3 rounded-2xl border border-white/5">
                          <Calendar className="w-4 h-4 text-red-500" />
                          <span className="text-xs font-black tracking-tight">{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-3 bg-black/40 px-5 py-3 rounded-2xl border border-white/5">
                          <Clock className="w-4 h-4 text-red-500" />
                          <span className="text-xs font-black tracking-tight">{booking.time}</span>
                        </div>
                        <div className="flex items-center gap-3 bg-black/40 px-5 py-3 rounded-2xl border border-white/5">
                          <Mail className="w-4 h-4 text-white/20" />
                          <span className="text-xs font-medium text-white/60">{booking.email || 'No email provided'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 self-stretch lg:self-center shrink-0">
                      <button 
                        onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                        className={`flex-1 lg:w-16 lg:h-16 rounded-2xl transition-all flex items-center justify-center border group/btn relative ${booking.status === 'confirmed' ? 'bg-green-600 text-white border-green-600' : 'bg-white/5 hover:bg-green-600/10 text-white/20 hover:text-green-500 border-white/10 hover:border-green-500/20'}`}
                        title="Confirm Appointment"
                      >
                        <CheckCircle className="w-6 h-6" />
                        <span className="lg:hidden ml-3 font-bold text-[10px] uppercase tracking-widest">{booking.status === 'confirmed' ? 'Confirmed' : 'Confirm'}</span>
                      </button>
                      <button 
                        onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                        className={`flex-1 lg:w-16 lg:h-16 rounded-2xl transition-all flex items-center justify-center border group/btn relative ${booking.status === 'cancelled' ? 'bg-red-600 text-white border-red-600' : 'bg-white/5 hover:bg-red-600/10 text-white/20 hover:text-red-500 border-white/10 hover:border-red-500/20'}`}
                        title="Cancel Appointment"
                      >
                        <XCircle className="w-6 h-6" />
                        <span className="lg:hidden ml-3 font-bold text-[10px] uppercase tracking-widest">{booking.status === 'cancelled' ? 'Cancelled' : 'Cancel'}</span>
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="inquiries"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {loadingInquiries ? (
                <div className="flex flex-col items-center justify-center py-32 text-white/10">
                  <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="font-black uppercase tracking-[0.3em] text-[10px]">Fetching Communications</p>
                </div>
              ) : inquiries.length === 0 ? (
                <div className="bg-white/5 rounded-[3rem] p-24 text-center border border-dashed border-white/10">
                  <MessageSquare className="w-16 h-16 text-white/5 mx-auto mb-6" />
                  <p className="text-white/20 font-black uppercase tracking-[0.2em] text-[10px]">Inbox is currently clear.</p>
                </div>
              ) : (
                inquiries.map((inquiry: Inquiry, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    key={inquiry.id} 
                    className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 flex flex-col lg:flex-row gap-10 items-start hover:bg-white/[0.08] transition-all relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                      <MessageSquare className="w-24 h-24 rotate-12" />
                    </div>
                    
                    <div className="flex-1 relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 font-black text-lg">
                          {inquiry.name[0]}
                        </div>
                        <div>
                          <h3 className="text-2xl font-black tracking-tighter text-white leading-none mb-1">{inquiry.name}</h3>
                          <div className="flex items-center gap-3">
                            <span className="text-red-500/80 font-black text-[9px] uppercase tracking-[0.2em]">{inquiry.subject || 'Direct Patient Inquiry'}</span>
                            <div className="w-1 h-1 bg-white/20 rounded-full" />
                            <span className="text-white/30 text-[9px] font-bold uppercase tracking-widest">{inquiry.createdAt?.toDate().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-black/20 rounded-3xl p-8 border border-white/5 mb-8 relative">
                        <div className="absolute -left-2 top-8 w-1 h-8 bg-red-600 rounded-full" />
                        <p className="text-white/80 leading-relaxed font-medium italic text-lg select-text">
                          "{inquiry.message}"
                        </p>
                      </div>

                      <a 
                        href={`mailto:${inquiry.email}`}
                        className="inline-flex items-center gap-3 bg-white/5 border border-white/5 px-6 py-4 rounded-2xl hover:bg-white/10 transition-all group"
                      >
                        <Mail className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-black tracking-tight text-white/60 group-hover:text-white transition-colors">{inquiry.email}</span>
                      </a>
                    </div>

                    <button 
                      onClick={() => deleteInquiry(inquiry.id)}
                      className="w-16 h-16 bg-white/5 hover:bg-red-600 text-white/20 hover:text-white rounded-2xl transition-all flex items-center justify-center border border-white/10 shrink-0 group self-end lg:self-start"
                      title="Archive Record"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      {/* Footer Branding */}
      <footer className="fixed bottom-0 left-0 w-full p-8 flex justify-center pointer-events-none">
        <div className="bg-black/40 backdrop-blur-md border border-white/10 px-8 py-3 rounded-full flex items-center gap-4 text-white/20 pointer-events-auto">
          <Activity className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Dr. Nour Mashaly Operations • v2.4.0</span>
        </div>
      </footer>
    </div>
  );
}
