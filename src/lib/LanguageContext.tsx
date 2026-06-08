import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ar';

export interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  isRtl: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.cases': 'Cases',
    'nav.booking': 'Booking',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    'nav.bookNow': 'Book Now',
    'nav.bookAppointment': 'Book Appointment',

    // Hero
    'hero.badge': 'Premium Dental Care',
    'hero.title.part1': 'Elevate Your ',
    'hero.title.part2': 'Vision of a Smile.',
    'hero.desc': 'Experience the fusion of advanced clinical expertise and modern aesthetic care with Dr. Nour Mashaly in Alexandria.',
    'hero.btn.consultation': 'Book Free Consultation',
    'hero.btn.services': 'Explore Services',
    'hero.rating': 'Patient Rating',
    'hero.ratingValue': '4.9/5',
    'hero.patients': 'Happy Patients',
    'hero.patientsValue': '8k+',
    'hero.expertise': 'Years Expertise',
    'hero.expertiseValue': '10+',
    'hero.badge.certified': 'Certified Professional',
    'hero.badge.specialist': 'Alexandria Specialist',

    // About
    'about.badge': 'The Specialist',
    'about.title.meet': 'Meet ',
    'about.title.name': 'Dr. Nour Mashaly',
    'about.desc': 'A visionary in modern dentistry, Dr. Nour Mashaly combines years of clinical expertise with an artistic approach to oral health. Graduated from Ternopil University, she has dedicated her career to mastering the latest digital dental technologies.',
    'about.grad.title': 'DDS, Ternopil University',
    'about.grad.desc': 'Specialized in Digital Cosmetic Dentistry',
    'about.award.title': 'Clinical Excellence Award',
    'about.award.desc': 'Recognized for innovative patient care 2022',
    'about.users.title': 'Lead Dental Surgeon',
    'about.users.desc': 'Over 8,000 successful smile transformations',

    // Services
    'services.badge': 'Our Services',
    'services.title': 'Innovative Care Custom For Your Smile',
    'services.desc': 'We provide a wide range of dental services personalized to each patient\'s unique needs using the latest medical equipment.',
    'services.learnMore': 'Learn More',
    'services.whitening.title': 'Teeth Whitening',
    'services.whitening.desc': 'Get a brighter, more confident smile with our professional whitening treatments.',
    'services.implants.title': 'Dental Implants',
    'services.implants.desc': 'Permanent solutions for missing teeth that look and feel completely natural.',
    'services.cosmetic.title': 'Cosmetic Dentistry',
    'services.cosmetic.desc': 'Veneers, bonding, and shaping to create your perfect aesthetic smile.',
    'services.checkup.title': 'General Checkup',
    'services.checkup.desc': 'Comprehensive dental exams and professional cleaning for long-term health.',
    'services.ortho.title': 'Orthodontics',
    'services.ortho.desc': 'Modern teeth straightening solutions for both children and adults.',
    'services.emergency.title': 'Emergency Care',
    'services.emergency.desc': 'Quick and compassionate care for urgent dental issues when you need it most.',

    // Gallery
    'gallery.badge': 'Smile Gallery',
    'gallery.title': 'Clinical Transformations',
    'gallery.desc': 'Explore our curated selection of digital patient transformations. Real results, precision-engineered for every smile.',
    'gallery.instagram': 'Follow on Instagram for more cases',
    'gallery.cat.veneers': 'Veneers',
    'gallery.cat.implants': 'Implants',
    'gallery.cat.ortho': 'Orthodontics',
    'gallery.cat.surgery': 'Surgery',
    'gallery.cat.cosmetic': 'Cosmetic',
    'gallery.cat.restoration': 'Restoration',
    'gallery.case.hollywood': 'Digital Hollywood Smile',
    'gallery.case.reconstruction': 'Full Arch Reconstruction',
    'gallery.case.aligners': 'Precision Aligners',
    'gallery.case.laser': 'Advanced Laser Contouring',
    'gallery.case.whitening': 'Whitening cases',
    'gallery.case.composite': 'Composite Masterpiece',

    // Booking & Inquiry
    'booking.badge': 'Reservation',
    'booking.title.journey': 'Your Digital ',
    'booking.title.smile': 'Smile Journey.',
    'booking.desc': 'Secure your session through our seamless booking interface. Modern technology meets dedicated care.',
    'booking.highlight.instant': 'Instant secure confirmation',
    'booking.highlight.priority': 'Priority diagnostic care',
    'booking.highlight.digital': 'Digital clinical history',
    'booking.highlight.expert': 'Expert dental consultation',
    'booking.tab.booking': 'Booking',
    'booking.tab.inquiry': 'Inquiry',
    'booking.success.title.booking': 'Confirmed!',
    'booking.success.title.inquiry': 'Message Sent!',
    'booking.success.desc.booking': 'Your session is locked. A confirmation email has been dispatched.',
    'booking.success.desc.inquiry': 'Your inquiry has been submitted. Our team will contact you shortly.',
    'booking.success.return': 'Return',
    
    // Booking Step 1
    'booking.step1.title': 'Select Service',
    'booking.step1.label.service': 'Dental Service',
    'booking.step1.choose': 'Choose Service',
    'booking.step1.label.date': 'Preferred Date',
    'booking.step1.btn.next': 'Next Step',

    // Booking Step 2
    'booking.step2.prev': 'Previous',
    'booking.step2.title': 'Select Time',
    'booking.step2.btn.confirm': 'Confirm Slot',

    // Booking Step 3
    'booking.step3.title': 'Your Profile',
    'booking.step3.placeholder.name': 'Full Name',
    'booking.step3.placeholder.email': 'Email Address (Required for Confirmation)',
    'booking.step3.manifest.title': 'Manifest Summary',
    'booking.step3.manifest.with': 'with Dr. Nour',
    'booking.step3.manifest.note': 'A confirmation email will be sent to the address above.',
    'booking.step3.btn.confirm': 'Confirm Session',

    // Inquiry
    'booking.inquiry.title': 'Quick Inquiry',
    'booking.inquiry.placeholder.msg': 'Your inquiry message...',
    'booking.inquiry.btn.submit': 'Submit Inquiry',

    // Services dropdown translations
    'service.opt.consultation': 'Consultation',
    'service.opt.whitening': 'Teeth Whitening',
    'service.opt.cleaning': 'Cleaning',
    'service.opt.emergency': 'Emergency',
    'service.opt.orthodontic': 'Orthodontics',

    // Contact
    'contact.badge': 'Contact',
    'contact.title': 'Connect With Us',
    'contact.desc': 'Have inquiries about your session? Reach out via our direct clinical lines.',
    'contact.label.phone': 'Clinic line',
    'contact.label.mail': 'Digital Mail',
    'contact.label.location': 'Location',
    'contact.value.location': 'Alexandria, Egypt',

    // Footer
    'footer.desc': 'Providing modern, compassionate dental care to the community of Alexandria.',
    'footer.links.title': 'Quick Links',
    'footer.hours.title': 'Hours',
    'footer.hours.sat.thu': 'Sat - Thu',
    'footer.hours.sat.thu.time': '04:00 PM - 09:00 PM',
    'footer.hours.fri': 'Friday',
    'footer.hours.fri.time': 'Closed',
    'footer.news.title': 'Newsletter',
    'footer.news.placeholder': 'YOUR EMAIL',
    'footer.news.btn.join': 'JOIN',
    'footer.news.btn.sent': 'SENT',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.copyright': '© 2024 DR. NOUR MASHALY. ALL RIGHTS RESERVED.',

    // Admin Dashboard Info Panel / Headers
    'admin.back': 'Back to Public Site',
    'admin.dashboard': 'Clinic Admin Control Panel',
    'admin.dashboardSub': 'Secure Database Inspection Platform',
    'admin.bookingsTitle': 'Active Clinical Appointments',
    'admin.inquiriesTitle': 'Patient Contact Inquiries',
    'admin.noBookings': 'No reservation files registered inside Firestore.',
    'admin.noInquiries': 'No active inquiries compiled.',
    'admin.logout': 'Logout'
  },
  ar: {
    // Navbar
    'nav.home': 'الرئيسية',
    'nav.about': 'عن العيادة',
    'nav.services': 'خدماتنا',
    'nav.cases': 'الحالات التجميلية',
    'nav.booking': 'حجز المواعيد',
    'nav.contact': 'اتصل بنا',
    'nav.admin': 'الإدارة',
    'nav.bookNow': 'احجز الآن',
    'nav.bookAppointment': 'احجز موعداً',

    // Hero
    'hero.badge': 'رعاية أسنان متميزة',
    'hero.title.part1': 'ارتقِ برؤيتك لـ ',
    'hero.title.part2': 'جمال ابتسامتك.',
    'hero.desc': 'اختبر مزيج الخبرة الطبية المتقدمة والرعاية التجميلية الحديثة مع د. نور مشالي في الإسكندرية.',
    'hero.btn.consultation': 'احجز استشارة مجانية',
    'hero.btn.services': 'استكشف الخدمات',
    'hero.rating': 'تقييم المرضى',
    'hero.ratingValue': '٤.٩ / ٥',
    'hero.patients': 'ابتسامة سعيدة',
    'hero.patientsValue': '+٨,٠٠٠',
    'hero.expertise': 'سنوات الخبرة',
    'hero.expertiseValue': '+١٠',
    'hero.badge.certified': 'أخصائية معتمدة',
    'hero.badge.specialist': 'أخصائية الإسكندرية',

    // About
    'about.badge': 'الأخصائية الكفاءة',
    'about.title.meet': 'تعرف على ',
    'about.title.name': 'د. نور مشالي',
    'about.desc': 'رائدة في طب الأسنان الحديث، تجمع الدكتورة نور مشالي بين سنوات من الخبرة السريرية والمنهج الفني لصحة وجمال الفم والأسنان. تخرجت من جامعة تيرنوبل، وكرست حياتها المهنية لإتقان أحدث تقنيات طب الأسنان الرقمي المعاصر.',
    'about.grad.title': 'DDS، جامعة تيرنوبل',
    'about.grad.desc': 'متخصصة في تجميل الأسنان الرقمي والترميم الحديث',
    'about.award.title': 'جائزة التميز الأخصائي',
    'about.award.desc': 'تقديرًا لابتكاراتها المتميزة في رعاية المرضى لعام ٢٠٢٢',
    'about.users.title': 'كبير أخصائي تجميل الأسنان',
    'about.users.desc': 'نجاح في تصميم وتغيير أكثر من ٨,٠٠٠ ابتسامة حتى الآن',

    // Services
    'services.badge': 'خدماتنا العلاجية والتجميلية',
    'services.title': 'رعاية طبية مبتكرة مصممة لابتسامتك',
    'services.desc': 'نقدم مجموعة واسعة وشاملة من خدمات الأسنان المخصصة لتلبية الاحتياجات الفريدة لكل مريض بأحدث التقنيات الطبية.',
    'services.learnMore': 'لمعرفة المزيد',
    'services.whitening.title': 'تبييض الأسنان الاحترافي',
    'services.whitening.desc': 'احصل على ابتسامة ناصعة البياض وأكثر ثقة وجاذبية بجلسات تبييض متطورة وآمنة.',
    'services.implants.title': 'زراعة الأسنان الرقمية',
    'services.implants.desc': 'أفضل الحلول الدائمة والآمنة لتعويض الأسنان المفقودة بمظهر وملمس طبيعي تماماً.',
    'services.cosmetic.title': 'طب الأسنان التجميلي',
    'services.cosmetic.desc': 'ابتسامة هوليوود، القشور التجميلية، وحشوات إلكترونية للحصول على ابتسامة متناسقة ورائعة.',
    'services.checkup.title': 'الفحص والوقاية الكاملة',
    'services.checkup.desc': 'فحوصات دورية شاملة وتنظيف احترافي عميق لإزالة الجير وحماية اللثة والأسنان.',
    'services.ortho.title': 'تقويم الأسنان المعاصر',
    'services.ortho.desc': 'أحدث تقنيات تقويم وتعديل اصطفاف الأسنان غير المرئية للأطفال والكبار.',
    'services.emergency.title': 'رعاية الطوارئ العاجلة',
    'services.emergency.desc': 'رعاية طبية فورية للتخفيف من الألم الشديد وحل مشكلات الأسنان الطارئة بكفاءة فائقة.',

    // Gallery
    'gallery.badge': 'معرض الابتسامات',
    'gallery.title': 'نتائجنا والتحولات التجميلية',
    'gallery.desc': 'شاهد تفاصيل بعض الحالات الاستثنائية التي قمنا بتصميم هوليوود سمايل لها بدقة علمية وفنية متناهية.',
    'gallery.instagram': 'تابعوا صفحتنا على إنستغرام لمشاهدة باحة الحالات اليومية',
    'gallery.cat.veneers': 'الفينير والقشور',
    'gallery.cat.implants': 'الزراعة التعويضية',
    'gallery.cat.ortho': 'تقويم الأسنان الشفاف',
    'gallery.cat.surgery': 'الجراحة بالليزر',
    'gallery.cat.cosmetic': 'تجميل الأسنان',
    'gallery.cat.restoration': 'العلاج والترميم',
    'gallery.case.hollywood': 'ابتسامة هوليوود الرقمية المتكاملة',
    'gallery.case.reconstruction': 'إعادة ترميم كامل الفكين',
    'gallery.case.aligners': 'التقاويم الشفافة عالية الدقة',
    'gallery.case.laser': 'إعادة رسم اللثة بالليزر المتطور',
    'gallery.case.whitening': 'حالات تبييض وتفتيح مكثف',
    'gallery.case.composite': 'تحف الحشوات التجميلية المباشرة',

    // Booking & Inquiry
    'booking.badge': 'التسجيل والحجز الالكتروني',
    'booking.title.journey': 'ابدأ رحلة ',
    'booking.title.smile': 'ابتسامتك الجديدة اليوم.',
    'booking.desc': 'احجز موعد كشفك أو استشارتك بكل سهولة وأمان عبر منصتنا. تكنولوجيا الغد، لرعايتك اليوم.',
    'booking.highlight.instant': 'تأكيد فوري وآمن للموعد المحجوز',
    'booking.highlight.priority': 'رعاية تشخيصية بأولوية كاملة لكل مريض',
    'booking.highlight.digital': 'ملف طبي إلكتروني معتمد لمتابعة حالتك',
    'booking.highlight.expert': 'استشارة تخصصية دقيقة مع د. نور مشالي',
    'booking.tab.booking': 'حجز عيادة',
    'booking.tab.inquiry': 'استفسار سريع',
    'booking.success.title.booking': 'تم تأكيد طلبك!',
    'booking.success.title.inquiry': 'تم الإرسال بنجاح!',
    'booking.success.desc.booking': 'تم قفل وتثبيت موعدك بالعيادة بنجاح. أرسلنا لك رسالة تأكيد عبر البريد الإلكتروني.',
    'booking.success.desc.inquiry': 'تلقينا رسالتك بنجاح. سنقوم بالرد عليك وإجابة استفسارك بشكل كامل قريبًا.',
    'booking.success.return': 'العودة للرئيسية',

    // Booking Step 1
    'booking.step1.title': 'اختر الخدمة المطلوبة',
    'booking.step1.label.service': 'الخدمة الأساسية',
    'booking.step1.choose': 'انقر لاختيار الخدمة المطلوبة...',
    'booking.step1.label.date': 'تاريخ الزيارة المفضل',
    'booking.step1.btn.next': 'الخطوة التالية',

    // Booking Step 2
    'booking.step2.prev': 'السابق',
    'booking.step2.title': 'اختر التوقيت المفضل للزيارة',
    'booking.step2.btn.confirm': 'تأكيد وحجز التوقيت',

    // Booking Step 3
    'booking.step3.title': 'ملفك الشخصي ومعلومات التواصل',
    'booking.step3.placeholder.name': 'اسمك بالكامل',
    'booking.step3.placeholder.email': 'بريدك الإلكتروني (مطلوب لإرسال التأكيد فوريًا)',
    'booking.step3.manifest.title': 'ملخص تفاصيل الحجز',
    'booking.step3.manifest.with': 'مع الدكتورة نور بالعيادة',
    'booking.step3.manifest.note': 'رسالة إلكترونية رسمية بها كود الموعد ستصل لعنوان البريد المدون أعلاه.',
    'booking.step3.btn.confirm': 'تأكيد وإتمام حجز الموعد',

    // Inquiry
    'booking.inquiry.title': 'اكتب استفسارك أو شكواك',
    'booking.inquiry.placeholder.msg': 'تفاصيل استفسارك أو مشكلة الأسنان التي تواجهها...',
    'booking.inquiry.btn.submit': 'إرسال الاستفسار الآن',

    // Services dropdown translations
    'service.opt.consultation': 'كشف واستشارة تجميلية',
    'service.opt.whitening': 'تبييض أسنان احترافي',
    'service.opt.cleaning': 'تنظيف عميق وإزالة الجير',
    'service.opt.emergency': 'حالة طارئة وعلاج ألم عاجل',
    'service.opt.orthodontic': 'تقويم أسنان حديث',

    // Contact
    'contact.badge': 'اتصل بنا والزيارة',
    'contact.title': 'يسعدنا تواصلك معنا دائماً',
    'contact.desc': 'هل لديك تساؤلات أو استفسارات طبية؟ اتصل بنا فورًا عبر أرقام العيادة المباشرة.',
    'contact.label.phone': 'خط العيادة المباشر',
    'contact.label.mail': 'المراسلات الإلكترونية الرقمية',
    'contact.label.location': 'مقر العيادة الفخمة',
    'contact.value.location': 'الإسكندرية، جمهورية مصر العربية',

    // Footer
    'footer.desc': 'نحن ملتزمون بتقديم أعلى مستويات الرعاية ونرسم الابتسامة المشرقة الخلابة التي تليق بكم في الإسكندرية.',
    'footer.links.title': 'روابط سريعة ومفيدة',
    'footer.hours.title': 'مواعيد ودوام العيادة',
    'footer.hours.sat.thu': 'من السبت إلى الخميس',
    'footer.hours.sat.thu.time': '٠٤:٠٠ مساءً - ٠٩:٠٠ مساءً',
    'footer.hours.fri': 'يوم الجمعة المباركة',
    'footer.hours.fri.time': 'عطلة نهاية الأسبوع',
    'footer.news.title': 'النشرة الدورية الحصرية لجمال الأسنان',
    'footer.news.placeholder': 'أدخل عنوان بريدك',
    'footer.news.btn.join': 'اشتراك',
    'footer.news.btn.sent': 'تم بنجاح',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'الشروط والأحكام',
    'footer.copyright': '© ٢٠٢٤ د. نور مشالي لطب الأسنان. جميع الحقوق محفوظة.',

    // Admin Dashboard Info Panel
    'admin.back': 'العودة للموقع العام',
    'admin.dashboard': 'لوحة تحكم إدارة العيادة والأطباء',
    'admin.dashboardSub': 'الفحص الآمن لبيانات الحجز وسجلات التواصل',
    'admin.bookingsTitle': 'قائمة حجوزات الكشف المسجلة حالياً',
    'admin.inquiriesTitle': 'استفسارات ورسائل المرضى الواردة للعيادة',
    'admin.noBookings': 'لا توجد أي حجوزات محفوظة بقاعدة فايرستور السحابية حاليا.',
    'admin.noInquiries': 'لم يتم العثور على أي استفسارات أو رسائل مضافة.',
    'admin.logout': 'تسجيل خروج'
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // Read cached language selection, fallback to 'en'
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('clinic_lang');
      return (saved === 'ar' || saved === 'en') ? saved : 'en';
    }
    return 'en';
  });

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const nextLang = prev === 'en' ? 'ar' : 'en';
      localStorage.setItem('clinic_lang', nextLang);
      return nextLang;
    });
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  const isRtl = language === 'ar';

  useEffect(() => {
    // Dynamic html updates for accessibility and global direction styling
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Smoothly apply Arabic font to the html body
    if (isRtl) {
      document.documentElement.classList.add('rtl-active');
      document.body.style.fontFamily = '"Cairo", "Inter", ui-sans-serif, system-ui, sans-serif';
    } else {
      document.documentElement.classList.remove('rtl-active');
      document.body.style.fontFamily = '"Inter", ui-sans-serif, system-ui, sans-serif';
    }
  }, [language, isRtl]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
