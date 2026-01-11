import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'np'>('en');
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', labelNp: 'मुख्य', href: '/', isRoute: true },
    { label: 'About', labelNp: 'बारेमा', href: '#about', isRoute: false },
    { label: 'Program', labelNp: 'कार्यक्रम', href: '#program', isRoute: false },
    { label: 'Speakers', labelNp: 'वक्ता', href: '#speakers', isRoute: false },
    { label: 'Partners', labelNp: 'साझेदार', href: '#partners', isRoute: false },
    { label: 'Contact', labelNp: 'सम्पर्क', href: '#contact', isRoute: false },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/mlf-logo.png" 
              alt="Madhesh Literature Festival Logo" 
              className="h-14 w-auto object-contain"
            />
            <div>
              <div className="font-bold text-lg" style={{ color: 'var(--mlf-indigo)' }}>
                MLF 2026
              </div>
              <div className="text-xs devanagari" style={{ color: 'var(--mlf-text-muted)' }}>
                साहित्य महोत्सव
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className="transition-colors hover:opacity-80"
                  style={{ color: 'var(--mlf-text-primary)' }}
                >
                  {language === 'en' ? item.label : item.labelNp}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={isHomePage ? item.href : `/${item.href}`}
                  onClick={(e) => {
                    if (!isHomePage) {
                      e.preventDefault();
                      window.location.href = `/${item.href}`;
                    }
                  }}
                  className="transition-colors hover:opacity-80"
                  style={{ color: 'var(--mlf-text-primary)' }}
                >
                  {language === 'en' ? item.label : item.labelNp}
                </a>
              )
            ))}
            
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'np' : 'en')}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all"
              style={{ 
                backgroundColor: 'var(--mlf-warm-beige)',
                color: 'var(--mlf-text-primary)'
              }}
            >
              <Globe size={16} />
              <span className="text-sm font-medium">{language === 'en' ? 'NP' : 'EN'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ color: 'var(--mlf-text-primary)' }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            {menuItems.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block py-3 border-t transition-colors hover:opacity-80"
                  style={{ 
                    color: 'var(--mlf-text-primary)',
                    borderColor: 'var(--mlf-border)'
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {language === 'en' ? item.label : item.labelNp}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={isHomePage ? item.href : `/${item.href}`}
                  className="block py-3 border-t transition-colors hover:opacity-80"
                  style={{ 
                    color: 'var(--mlf-text-primary)',
                    borderColor: 'var(--mlf-border)'
                  }}
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    if (!isHomePage) {
                      e.preventDefault();
                      window.location.href = `/${item.href}`;
                    }
                  }}
                >
                  {language === 'en' ? item.label : item.labelNp}
                </a>
              )
            ))}
            <button
              onClick={() => setLanguage(language === 'en' ? 'np' : 'en')}
              className="w-full mt-3 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg"
              style={{ 
                backgroundColor: 'var(--mlf-warm-beige)',
                color: 'var(--mlf-text-primary)'
              }}
            >
              <Globe size={16} />
              <span>{language === 'en' ? 'Switch to Nepali' : 'Switch to English'}</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;