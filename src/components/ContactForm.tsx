import { Mail, Phone, MapPin } from 'lucide-react';

export function ContactForm() {
  return (
    <section id="contact" className="py-24 bg-transparent relative">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-red-600 font-bold uppercase tracking-widest text-[10px] mb-4">Contact</h2>
          <h3 className="text-5xl font-extrabold text-white mb-8 tracking-tight">Connect With Us</h3>
          <p className="text-white/40 text-lg mb-12 font-medium">
            Have inquiries about your session? Reach out via our direct clinical lines.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col items-center gap-4 shadow-sm hover:bg-white/10 transition-all">
              <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center shadow-sm">
                <Phone className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Clinic line</p>
                <p className="text-base font-bold text-white">01557022897</p>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col items-center gap-4 shadow-sm hover:bg-white/10 transition-all">
              <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center shadow-sm">
                <Mail className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Digital Mail</p>
                <p className="text-[13px] font-bold text-white">nour.mohamashaly@gmail.com</p>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col items-center gap-4 shadow-sm hover:bg-white/10 transition-all">
              <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center shadow-sm">
                <MapPin className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Location</p>
                <p className="text-base font-bold text-white">Alexandria, Egypt</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
