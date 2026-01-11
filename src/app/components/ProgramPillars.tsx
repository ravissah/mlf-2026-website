import { BookOpen, Drama, Mic, UtensilsCrossed, Users2, Landmark } from 'lucide-react';

export function ProgramPillars() {
  const pillars = [
    {
      icon: BookOpen,
      title: 'Literary Sessions',
      titleNp: 'साहित्यिक सत्र',
      description: 'Panel discussions, book launches, author meets, and storytelling sessions featuring renowned writers and scholars',
      color: 'var(--mlf-indigo)',
      bgColor: 'rgba(63, 81, 181, 0.1)',
    },
    {
      icon: Drama,
      title: 'Performing Arts',
      titleNp: 'प्रदर्शन कला',
      description: 'Traditional dance, theatre performances, folk music, and contemporary cultural expressions',
      color: 'var(--mlf-saffron)',
      bgColor: 'rgba(255, 87, 34, 0.1)',
    },
    {
      icon: Mic,
      title: 'Poetry & Open Mic',
      titleNp: 'कविता र खुला माइक',
      description: 'Poetry recitals, ghazal evenings, and open mic sessions in multiple languages celebrating spoken word',
      color: 'var(--mlf-leaf-green)',
      bgColor: 'rgba(76, 175, 80, 0.1)',
    },
    {
      icon: UtensilsCrossed,
      title: 'Arts, Crafts & Culinary',
      titleNp: 'कला, शिल्प र खाना',
      description: 'Traditional crafts exhibitions, food stalls showcasing Madheshi cuisine, and artisan demonstrations',
      color: 'var(--mlf-deep-orange)',
      bgColor: 'rgba(230, 74, 25, 0.1)',
    },
    {
      icon: Users2,
      title: 'Youth Engagement',
      titleNp: 'युवा सहभागिता',
      description: 'Competitions for schools, volunteer programs, youth debates, and interactive workshops',
      color: 'var(--mlf-heritage-green)',
      bgColor: 'rgba(46, 125, 50, 0.1)',
    },
    {
      icon: Landmark,
      title: 'Heritage & Tourism',
      titleNp: 'धरोहर र पर्यटन',
      description: 'Cultural heritage tours, historical site visits, and showcases of Madhesh\'s rich architectural legacy',
      color: 'var(--mlf-royal-blue)',
      bgColor: 'rgba(26, 35, 126, 0.1)',
    },
  ];

  return (
    <section className="relative py-24" style={{ backgroundColor: 'var(--mlf-warm-beige)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div 
            className="inline-block px-6 py-2 rounded-full mb-4"
            style={{ backgroundColor: 'rgba(63, 81, 181, 0.1)' }}
          >
            <span className="text-sm font-semibold tracking-wide" style={{ color: 'var(--mlf-indigo)' }}>
              PROGRAM OVERVIEW
            </span>
          </div>
          <h2 
            className="text-4xl sm:text-5xl font-bold mb-6"
            style={{ color: 'var(--mlf-indigo)' }}
          >
            Six <span style={{ color: 'var(--mlf-saffron)' }}>Program Pillars</span>
          </h2>
          <p 
            className="text-lg max-w-3xl mx-auto"
            style={{ color: 'var(--mlf-text-secondary)' }}
          >
            A diverse tapestry of cultural experiences designed to celebrate every aspect of Madheshi heritage
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl transition-all hover:scale-105 hover:shadow-2xl"
              style={{ backgroundColor: 'white' }}
            >
              {/* Top Colored Bar */}
              <div 
                className="h-2 w-full transition-all group-hover:h-3"
                style={{ backgroundColor: pillar.color }}
              />

              <div className="p-8">
                {/* Icon */}
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:scale-110 group-hover:rotate-3"
                  style={{ backgroundColor: pillar.bgColor }}
                >
                  <pillar.icon size={36} style={{ color: pillar.color }} />
                </div>

                {/* Title */}
                <h3 
                  className="text-2xl font-bold mb-2"
                  style={{ color: 'var(--mlf-indigo)' }}
                >
                  {pillar.title}
                </h3>

                {/* Nepali Title */}
                <p 
                  className="text-lg devanagari mb-4"
                  style={{ color: pillar.color }}
                >
                  {pillar.titleNp}
                </p>

                {/* Description */}
                <p 
                  className="leading-relaxed"
                  style={{ color: 'var(--mlf-text-secondary)' }}
                >
                  {pillar.description}
                </p>

                {/* Decorative Element */}
                <div className="mt-6 flex space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                      style={{ 
                        backgroundColor: pillar.color,
                        transitionDelay: `${i * 100}ms`
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Background Pattern */}
              <div 
                className="absolute bottom-0 right-0 w-32 h-32 opacity-5 transform translate-x-8 translate-y-8 group-hover:scale-150 transition-transform"
                style={{
                  background: `radial-gradient(circle, ${pillar.color} 0%, transparent 70%)`
                }}
              />
            </div>
          ))}
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center mt-20">
          <div 
            className="h-1 w-32 rounded-full"
            style={{ backgroundColor: 'var(--mlf-gold)' }}
          />
          <div 
            className="w-4 h-4 mx-4 rounded-full"
            style={{ backgroundColor: 'var(--mlf-saffron)' }}
          />
          <div 
            className="h-1 w-32 rounded-full"
            style={{ backgroundColor: 'var(--mlf-gold)' }}
          />
        </div>
      </div>
    </section>
  );
}

export default ProgramPillars;