import { BookOpen, Users, Globe2, Heart } from 'lucide-react';

export function AboutSection() {
  const features = [
    {
      icon: BookOpen,
      title: '22 Districts',
      titleNp: '२२ जिल्ला',
      description: 'Celebrating Madhesh across all districts',
    },
    {
      icon: Users,
      title: 'Multiple Languages',
      titleNp: 'बहुभाषिक',
      description: 'Bhojpuri, Maithili, Tharu, Awadhi, Urdu, Hindi, Nepali',
    },
    {
      icon: Globe2,
      title: 'Cross-Border Unity',
      titleNp: 'सीमापार एकता',
      description: 'Nepal–India cultural collaboration',
    },
    {
      icon: Heart,
      title: 'Folk Traditions',
      titleNp: 'लोक परम्परा',
      description: 'Preserving and celebrating heritage',
    },
  ];

  return (
    <section id="about" className="relative py-24" style={{ backgroundColor: 'var(--mlf-warm-beige)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div 
            className="inline-block px-6 py-2 rounded-full mb-4"
            style={{ backgroundColor: 'rgba(255, 87, 34, 0.1)' }}
          >
            <span className="text-sm font-semibold tracking-wide" style={{ color: 'var(--mlf-saffron)' }}>
              ABOUT THE FESTIVAL
            </span>
          </div>
          <h2 
            className="text-4xl sm:text-5xl font-bold mb-6"
            style={{ color: 'var(--mlf-indigo)' }}
          >
            A Celebration of
            <br />
            <span style={{ color: 'var(--mlf-saffron)' }}>Madheshi Culture</span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: 'var(--mlf-gold)' }} />
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <div>
            <p 
              className="text-lg leading-relaxed mb-6"
              style={{ color: 'var(--mlf-text-secondary)' }}
            >
              The Madhesh Literature Festival is an annual celebration of literature, arts, and 
              culture that brings together writers, thinkers, artists, and communities from across 
              the 22 districts of Madhesh Province.
            </p>
            <p 
              className="text-lg leading-relaxed mb-6"
              style={{ color: 'var(--mlf-text-secondary)' }}
            >
              Our festival celebrates linguistic diversity with programs in Bhojpuri, Maithili, 
              Tharu, Awadhi, Urdu, Hindi, and Nepali, fostering cross-border cultural exchange 
              between Nepal and India.
            </p>
            <p 
              className="text-lg leading-relaxed"
              style={{ color: 'var(--mlf-text-secondary)' }}
            >
              From folk traditions to contemporary literature, from poetry to performing arts, 
              MLF 2026 promises to be a vibrant tapestry of voices, stories, and experiences.
            </p>

            <button 
              className="mt-8 px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
              style={{ 
                backgroundColor: 'var(--mlf-indigo)',
                color: 'white'
              }}
            >
              Read More About MLF
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl transition-all hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: 'white' }}
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{ 
                    backgroundColor: index % 2 === 0 ? 'rgba(255, 87, 34, 0.1)' : 'rgba(63, 81, 181, 0.1)'
                  }}
                >
                  <feature.icon 
                    size={28} 
                    style={{ 
                      color: index % 2 === 0 ? 'var(--mlf-saffron)' : 'var(--mlf-indigo)' 
                    }} 
                  />
                </div>
                <h3 
                  className="font-bold mb-1"
                  style={{ color: 'var(--mlf-indigo)' }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="text-sm devanagari mb-2"
                  style={{ color: 'var(--mlf-saffron)' }}
                >
                  {feature.titleNp}
                </p>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--mlf-text-muted)' }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Section */}
        <div 
          className="relative p-8 sm:p-12 rounded-3xl overflow-hidden"
          style={{ backgroundColor: 'var(--mlf-indigo)' }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20" 
            style={{ backgroundColor: 'var(--mlf-saffron)' }} 
          />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="text-6xl mb-6 opacity-50" style={{ color: 'var(--mlf-gold)' }}>
              "
            </div>
            <p className="text-xl sm:text-2xl italic mb-6 leading-relaxed text-white">
              Where the soil whispers ancient stories and the colors of life paint our shared heritage
            </p>
            <p className="text-lg devanagari text-white/90">
              जहाँ माटो पुरानो कथा सुनाउँछ र जीवनका रङहरूले हाम्रो साझा सम्पदा चित्रण गर्छन्
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;