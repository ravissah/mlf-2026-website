import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import festivalBg from '../../assets/3ec544e0711938c32ca76d6c4763db5983188386.png';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${festivalBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 87, 34, 0.05) 0%, rgba(63, 81, 181, 0.05) 100%)'
        }}
      />

      {/* Decorative Arch Top */}
      <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden">
        <svg viewBox="0 0 1200 120" className="w-full h-full" style={{ fill: 'var(--mlf-saffron)', opacity: 0.1 }}>
          <path d="M0,0 L0,60 Q300,120 600,60 T1200,60 L1200,0 Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Ornamental Border */}
        <div className="inline-block mb-8">
          <div 
            className="px-6 py-2 rounded-full border-2"
            style={{ 
              borderColor: 'var(--mlf-gold)',
              backgroundColor: 'rgba(255, 179, 0, 0.1)'
            }}
          >
            <p className="text-sm tracking-wide" style={{ color: 'var(--mlf-deep-orange)' }}>
              Celebrating Literature, Culture & Heritage
            </p>
          </div>
        </div>

        {/* Main Title */}
        <h1 
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          style={{ color: 'var(--mlf-indigo)' }}
        >
          Madhesh Literature
          <br />
          <span style={{ color: 'var(--mlf-saffron)' }}>Festival 2026</span>
        </h1>

        {/* Nepali Theme */}
        <p 
          className="text-2xl sm:text-3xl lg:text-4xl mb-8 devanagari"
          style={{ color: 'var(--mlf-heritage-green)' }}
        >
          माटीको सुगन्ध, जीवनको रंग
        </p>

        <p 
          className="text-base sm:text-lg italic mb-12 max-w-2xl mx-auto"
          style={{ color: 'var(--mlf-text-secondary)' }}
        >
          "Fragrance of the Soil, Colors of Life"
        </p>

        {/* Event Details */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--mlf-warm-beige)' }}
            >
              <Calendar size={24} style={{ color: 'var(--mlf-saffron)' }} />
            </div>
            <div className="text-left">
              <p className="font-semibold" style={{ color: 'var(--mlf-indigo)' }}>
                January 29–31, 2026
              </p>
              <p className="text-sm" style={{ color: 'var(--mlf-text-muted)' }}>
                3 Days of Celebration
              </p>
            </div>
          </div>

          <div 
            className="hidden sm:block w-px h-12"
            style={{ backgroundColor: 'var(--mlf-divider)' }}
          />

          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--mlf-warm-beige)' }}
            >
              <MapPin size={24} style={{ color: 'var(--mlf-leaf-green)' }} />
            </div>
            <div className="text-left">
              <p className="font-semibold" style={{ color: 'var(--mlf-indigo)' }}>
                Birgunj, Madhesh
              </p>
              <p className="text-sm" style={{ color: 'var(--mlf-text-muted)' }}>
                Nepal
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            className="group px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg flex items-center space-x-2"
            style={{ 
              backgroundColor: 'var(--mlf-saffron)',
              color: 'white'
            }}
          >
            <span>Explore Festival</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button 
            className="px-8 py-4 rounded-lg font-semibold text-lg border-2 transition-all hover:scale-105"
            style={{ 
              borderColor: 'var(--mlf-indigo)',
              color: 'var(--mlf-indigo)',
              backgroundColor: 'transparent'
            }}
          >
            Program Schedule
          </button>

          <button 
            className="px-8 py-4 rounded-lg font-semibold text-lg border-2 transition-all hover:scale-105"
            style={{ 
              borderColor: 'var(--mlf-leaf-green)',
              color: 'var(--mlf-leaf-green)',
              backgroundColor: 'transparent'
            }}
          >
            Become a Partner
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 animate-bounce">
          <div 
            className="w-6 h-10 rounded-full border-2 mx-auto relative"
            style={{ borderColor: 'var(--mlf-gold)' }}
          >
            <div 
              className="w-1.5 h-1.5 rounded-full absolute top-2 left-1/2 -translate-x-1/2"
              style={{ backgroundColor: 'var(--mlf-gold)' }}
            />
          </div>
        </div>
      </div>

      {/* Decorative Arch Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <svg viewBox="0 0 1200 120" className="w-full h-full" style={{ fill: 'var(--mlf-warm-beige)' }}>
          <path d="M0,120 L0,60 Q300,0 600,60 T1200,60 L1200,120 Z" />
        </svg>
      </div>
    </section>
  );
}

export default Hero;