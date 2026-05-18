import { Stethoscope, Facebook, Instagram, Twitter, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="px-10 py-20 flex flex-col items-center border-t border-white/5 bg-white/5 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-8 group">
              <div className="p-2 bg-red-600 rounded-lg group-hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Dr. Nour <span className="text-red-600 font-black">Mashaly</span>
              </span>
            </a>
            <p className="text-white/30 text-sm font-bold uppercase tracking-widest leading-relaxed max-w-xs">
              Providing modern, compassionate dental care to the community of Alexandria.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-8">Quick Links</h4>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-white/40">
              <li><a href="#" className="hover:text-red-500 transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-red-500 transition-colors">Services</a></li>
              <li><a href="#booking" className="hover:text-red-500 transition-colors">Bookings</a></li>
              <li><a href="#contact" className="hover:text-red-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-8">Hours</h4>
            <ul className="space-y-4 text-[14px] font-bold uppercase tracking-widest text-[#fff9f9]">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Sat - Thu</span>
                <span className="text-white">04:00 PM - 09:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Friday</span>
                <span className="text-red-600">Closed</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-8">Newsletter</h4>
            <div className="flex gap-2 mb-8">
              <input 
                placeholder="YOUR EMAIL"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 w-full text-[10px] font-bold tracking-widest focus:ring-2 focus:ring-red-500 outline-none text-white"
              />
              <button 
                onClick={(e) => {
                  const btn = e.currentTarget;
                  btn.innerText = 'SENT';
                  btn.classList.add('bg-green-600');
                  setTimeout(() => {
                    btn.innerText = 'JOIN';
                    btn.classList.remove('bg-green-600');
                  }, 2000);
                }}
                className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-4 text-[10px] font-bold tracking-widest transition-all shadow-lg shadow-red-900/20"
              >
                JOIN
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
                href="#" 
                className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white hover:scale-110 active:scale-95 transition-all shadow-sm group"
                title="Twitter"
              >
                <Twitter className="w-5 h-5 group-hover:animate-pulse" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/20 font-bold uppercase tracking-tighter">
          <p>© 2024 DR. NOUR MASHALY. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-red-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-red-600 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
