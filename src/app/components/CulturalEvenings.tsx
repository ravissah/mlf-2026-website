import { Calendar, Music, Sparkles } from 'lucide-react';

export function CulturalEvenings() {
  const evenings = [
    {
      day: 'Day 1',
      dayNp: 'पहिलो दिन',
      date: 'January 29',
      title: 'Cultural Performance Night',
      titleNp: 'सांस्कृतिक प्रस्तुति रात',
      description: 'Traditional dance, folk music, and theatrical performances showcasing Madheshi heritage',
      color: 'var(--mlf-saffron)',
      bgColor: 'rgba(255, 87, 34, 0.05)',
    },
    {
      day: 'Day 2',
      dayNp: 'दोस्रो दिन',
      date: 'January 30',
      title: 'Poetry, Ghazal & Storytelling',
      titleNp: 'कविता, गजल र कथा',
      description: 'An evening of soul-stirring poetry, ghazal performances, and traditional storytelling',
      color: 'var(--mlf-indigo)',
      bgColor: 'rgba(63, 81, 181, 0.05)',
    },
    {
      day: 'Day 3',
      dayNp: 'तेस्रो दिन',
      date: 'January 31',
      title: 'Grand Musical Night',
      titleNp: 'भव्य संगीत रात',
      description: 'A spectacular finale featuring renowned musicians and contemporary fusion performances',
      color: 'var(--mlf-leaf-green)',
      bgColor: 'rgba(76, 175, 80, 0.05)',
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse"
          style={{ backgroundColor: 'var(--mlf-saffron)', animationDuration: '4s' }}
        />
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{ backgroundColor: 'var(--mlf-indigo)', animationDuration: '6s' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div 
            className="inline-block px-6 py-2 rounded-full mb-4"
            style={{ backgroundColor: 'rgba(255, 179, 0, 0.15)' }}
          >
            <span className="text-sm font-semibold tracking-wide" style={{ color: 'var(--mlf-deep-orange)' }}>
              EVENING PROGRAMS
            </span>
          </div>
          <h2 
            className="text-4xl sm:text-5xl font-bold mb-6"
            style={{ color: 'var(--mlf-indigo)' }}
          >
            Cultural <span style={{ color: 'var(--mlf-saffron)' }}>Evenings</span>
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--mlf-text-secondary)' }}
          >
            Three enchanting nights celebrating the artistic soul of Madhesh
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line (Desktop) */}
          <div 
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2"
            style={{ backgroundColor: 'var(--mlf-gold)', opacity: 0.3 }}
          />

          {/* Events */}
          <div className="space-y-12">
            {evenings.map((evening, index) => (
              <div
                key={index}
                className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className="flex-1 w-full">
                  <div
                    className="group relative p-8 rounded-3xl transition-all hover:scale-105 hover:shadow-2xl overflow-hidden"
                    style={{ backgroundColor: 'white' }}
                  >
                    {/* Background Gradient */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: `linear-gradient(135deg, ${evening.bgColor} 0%, transparent 100%)` }}
                    />

                    <div className="relative z-10">
                      {/* Day Badge */}
                      <div 
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-4"
                        style={{ backgroundColor: evening.bgColor }}
                      >
                        <Calendar size={16} style={{ color: evening.color }} />
                        <span className="font-semibold text-sm" style={{ color: evening.color }}>
                          {evening.day} • {evening.date}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 
                        className="text-2xl sm:text-3xl font-bold mb-2"
                        style={{ color: 'var(--mlf-indigo)' }}
                      >
                        {evening.title}
                      </h3>

                      {/* Nepali Title */}
                      <p 
                        className="text-xl devanagari mb-4"
                        style={{ color: evening.color }}
                      >
                        {evening.titleNp}
                      </p>

                      {/* Description */}
                      <p 
                        className="text-lg leading-relaxed"
                        style={{ color: 'var(--mlf-text-secondary)' }}
                      >
                        {evening.description}
                      </p>

                      {/* Decorative Icon */}
                      <div className="mt-6 flex items-center space-x-2">
                        <Music size={20} style={{ color: evening.color }} />
                        <Sparkles size={20} style={{ color: 'var(--mlf-gold)' }} />
                      </div>
                    </div>

                    {/* Corner Decoration */}
                    <div 
                      className="absolute top-6 right-6 w-16 h-16 rounded-full opacity-10"
                      style={{ backgroundColor: evening.color }}
                    />
                  </div>
                </div>

                {/* Center Node (Desktop) */}
                <div className="hidden lg:block flex-shrink-0">
                  <div 
                    className="w-16 h-16 rounded-full border-4 flex items-center justify-center shadow-lg"
                    style={{ 
                      borderColor: 'white',
                      backgroundColor: evening.color 
                    }}
                  >
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 w-full hidden lg:block" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <button 
            className="px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg"
            style={{ 
              backgroundColor: 'var(--mlf-saffron)',
              color: 'white'
            }}
          >
            View Full Evening Schedule
          </button>
        </div>
      </div>
    </section>
  );
}

export default CulturalEvenings;