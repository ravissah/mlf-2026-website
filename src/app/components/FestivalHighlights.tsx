import { Users, Mic2, BookText, Music, Palette, GraduationCap } from 'lucide-react';

export function FestivalHighlights() {
  const highlights = [
    {
      icon: Users,
      number: '40,000+',
      label: 'Attendees',
      labelNp: 'सहभागी',
      color: 'var(--mlf-saffron)',
    },
    {
      icon: Mic2,
      number: '100+',
      label: 'Speakers & Artists',
      labelNp: 'वक्ता र कलाकार',
      color: 'var(--mlf-indigo)',
    },
    {
      icon: BookText,
      number: '15+',
      label: 'Literary Sessions',
      labelNp: 'साहित्यिक सत्र',
      color: 'var(--mlf-leaf-green)',
    },
    {
      icon: Music,
      number: '3',
      label: 'Cultural Nights',
      labelNp: 'सांस्कृतिक रात',
      color: 'var(--mlf-deep-orange)',
    },
    {
      icon: Palette,
      number: '50+',
      label: 'Arts & Crafts Stalls',
      labelNp: 'कला र शिल्प',
      color: 'var(--mlf-heritage-green)',
    },
    {
      icon: GraduationCap,
      number: '20+',
      label: 'Schools & Youth',
      labelNp: 'विद्यालय र युवा',
      color: 'var(--mlf-royal-blue)',
    },
  ];

  return (
    <section className="relative py-24">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            var(--mlf-saffron),
            var(--mlf-saffron) 10px,
            transparent 10px,
            transparent 20px
          )`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div 
            className="inline-block px-6 py-2 rounded-full mb-4"
            style={{ backgroundColor: 'rgba(76, 175, 80, 0.1)' }}
          >
            <span className="text-sm font-semibold tracking-wide" style={{ color: 'var(--mlf-leaf-green)' }}>
              FESTIVAL BY NUMBERS
            </span>
          </div>
          <h2 
            className="text-4xl sm:text-5xl font-bold mb-6"
            style={{ color: 'var(--mlf-indigo)' }}
          >
            Festival <span style={{ color: 'var(--mlf-saffron)' }}>Highlights</span>
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--mlf-text-secondary)' }}
          >
            Three days of immersive cultural experiences, literary dialogues, and artistic celebrations
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl text-center transition-all hover:scale-110 hover:shadow-2xl cursor-pointer"
              style={{ backgroundColor: 'white' }}
            >
              {/* Gradient Background on Hover */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity"
                style={{ backgroundColor: highlight.color }}
              />

              {/* Icon */}
              <div 
                className="relative w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                style={{ backgroundColor: `${highlight.color}15` }}
              >
                <highlight.icon size={32} style={{ color: highlight.color }} />
              </div>

              {/* Number */}
              <div 
                className="text-3xl font-bold mb-2 transition-all group-hover:scale-110"
                style={{ color: highlight.color }}
              >
                {highlight.number}
              </div>

              {/* Label */}
              <div>
                <p 
                  className="text-sm font-semibold mb-1"
                  style={{ color: 'var(--mlf-text-primary)' }}
                >
                  {highlight.label}
                </p>
                <p 
                  className="text-xs devanagari"
                  style={{ color: 'var(--mlf-text-muted)' }}
                >
                  {highlight.labelNp}
                </p>
              </div>

              {/* Decorative Corner */}
              <div 
                className="absolute top-3 right-3 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: highlight.color }}
              />
            </div>
          ))}
        </div>

        {/* Bottom Decoration */}
        <div className="flex justify-center mt-16 space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ 
                backgroundColor: 'var(--mlf-gold)',
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FestivalHighlights;