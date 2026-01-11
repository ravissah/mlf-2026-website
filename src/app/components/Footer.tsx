import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Youtube, label: 'YouTube', href: '#' },
  ];

  const quickLinks = [
    { label: 'About MLF', labelNp: 'MLF बारे', href: '#about' },
    { label: 'Program', labelNp: 'कार्यक्रम', href: '#program' },
    { label: 'Speakers', labelNp: 'वक्ता', href: '#speakers' },
    { label: 'Partners', labelNp: 'साझेदार', href: '#partners' },
  ];

  const resources = [
    { label: 'Media Gallery', labelNp: 'मिडिया ग्यालेरी', href: '#' },
    { label: 'Press Kit', labelNp: 'प्रेस किट', href: '#' },
    { label: 'Visit Birgunj', labelNp: 'बीरगंज भ्रमण', href: '#' },
    { label: 'Contact Us', labelNp: 'सम्पर्क', href: '#contact' },
  ];

  return (
    <footer className="relative" style={{ backgroundColor: 'var(--mlf-indigo)' }}>
      {/* Decorative Wave */}
      <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
        <svg viewBox="0 0 1200 120" className="w-full h-full" style={{ fill: 'var(--mlf-warm-beige)' }}>
          <path d="M0,0 L0,60 Q300,120 600,60 T1200,60 L1200,0 Z" />
        </svg>
      </div>

      <div className="relative pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* About Column */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF5722] to-[#E64A19] flex items-center justify-center">
                  <span className="text-white font-bold text-xl">म</span>
                </div>
                <div>
                  <div className="font-bold text-lg text-white">MLF 2026</div>
                  <div className="text-xs devanagari text-white/70">साहित्य महोत्सव</div>
                </div>
              </div>
              <p className="text-white/80 mb-6 leading-relaxed">
                Celebrating the rich cultural heritage, linguistic diversity, and literary excellence of Madhesh.
              </p>
              <p className="text-white/80 devanagari leading-relaxed">
                माटीको सुगन्ध, जीवनको रंग
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors block"
                    >
                      {link.label}
                      <span className="text-sm devanagari block text-white/60">{link.labelNp}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Resources</h4>
              <ul className="space-y-3">
                {resources.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors block"
                    >
                      {link.label}
                      <span className="text-sm devanagari block text-white/60">{link.labelNp}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <MapPin size={20} className="text-white/60 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white/80">Birgunj, Madhesh</p>
                    <p className="text-white/80">Nepal</p>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone size={20} className="text-white/60 flex-shrink-0" />
                  <p className="text-white/80">+977-XXX-XXXXX</p>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail size={20} className="text-white/60 flex-shrink-0" />
                  <p className="text-white/80">info@madheshfest.org</p>
                </li>
              </ul>

              {/* Social Links */}
              <div className="mt-6">
                <h5 className="text-white font-semibold mb-3">Follow Us</h5>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      aria-label={social.label}
                    >
                      <social.icon size={18} className="text-white" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div 
            className="p-8 rounded-2xl mb-12"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          >
            <div className="max-w-2xl mx-auto text-center">
              <h4 className="text-white font-bold text-xl mb-2">Stay Updated</h4>
              <p className="text-white/80 mb-6">Subscribe to our newsletter for festival updates</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-lg outline-none"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                />
                <button 
                  className="px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
                  style={{ 
                    backgroundColor: 'var(--mlf-saffron)',
                    color: 'white'
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div 
            className="pt-8 border-t text-center"
            style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            <p className="text-white/60 text-sm">
              © 2026 Madhesh Literature Festival. All rights reserved.
            </p>
            <p className="text-white/60 text-sm mt-2">
              Organized by <span style={{ color: 'var(--mlf-gold)' }}>Uttarsh Nepal</span>
            </p>
            <div className="flex items-center justify-center space-x-2 mt-4">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--mlf-saffron)' }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--mlf-gold)' }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--mlf-leaf-green)' }} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;