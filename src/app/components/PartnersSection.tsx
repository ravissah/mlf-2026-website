export function PartnersSection() {
  const partnerCategories = [
    {
      title: 'Organized By',
      titleNp: 'आयोजक',
      partners: ['Uttarsh Nepal', 'MLF Organizing Committee'],
    },
    {
      title: 'Supported By',
      titleNp: 'सहयोगी',
      partners: ['Ministry of Culture', 'Madhesh Provincial Government', 'Nepal Academy'],
    },
    {
      title: 'Cultural Partner',
      titleNp: 'सांस्कृतिक साझेदार',
      partners: ['India-Nepal Cultural Forum', 'Maithili Sahitya Parishad'],
    },
    {
      title: 'Tech Partner',
      titleNp: 'प्रविधि साझेदार',
      partners: ['Digital Nepal', 'Tech for Culture'],
    },
    {
      title: 'Community Partners',
      titleNp: 'सामुदायिक साझेदार',
      partners: ['Local NGOs', 'Youth Organizations', 'Literary Societies', 'Cultural Groups'],
    },
  ];

  return (
    <section id="partners" className="relative py-24" style={{ backgroundColor: 'var(--mlf-warm-beige)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div 
            className="inline-block px-6 py-2 rounded-full mb-4"
            style={{ backgroundColor: 'rgba(76, 175, 80, 0.1)' }}
          >
            <span className="text-sm font-semibold tracking-wide" style={{ color: 'var(--mlf-leaf-green)' }}>
              OUR SUPPORTERS
            </span>
          </div>
          <h2 
            className="text-4xl sm:text-5xl font-bold mb-6"
            style={{ color: 'var(--mlf-indigo)' }}
          >
            Partners & <span style={{ color: 'var(--mlf-saffron)' }}>Supporters</span>
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--mlf-text-secondary)' }}
          >
            Made possible through the generous support of our partners and community
          </p>
        </div>

        {/* Partners Grid */}
        <div className="space-y-12">
          {partnerCategories.map((category, index) => (
            <div key={index}>
              <div className="mb-6">
                <h3 
                  className="text-2xl font-bold mb-1"
                  style={{ color: 'var(--mlf-indigo)' }}
                >
                  {category.title}
                </h3>
                <p 
                  className="text-lg devanagari"
                  style={{ color: 'var(--mlf-saffron)' }}
                >
                  {category.titleNp}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {category.partners.map((partner, pIndex) => (
                  <div
                    key={pIndex}
                    className="group flex items-center justify-center p-8 rounded-2xl transition-all hover:scale-105 hover:shadow-lg cursor-pointer"
                    style={{ backgroundColor: 'white' }}
                  >
                    <div className="text-center">
                      {/* Placeholder Logo Circle */}
                      <div 
                        className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
                        style={{ backgroundColor: `${['var(--mlf-saffron)', 'var(--mlf-indigo)', 'var(--mlf-leaf-green)'][pIndex % 3]}15` }}
                      >
                        <span 
                          className="text-2xl font-bold"
                          style={{ color: ['var(--mlf-saffron)', 'var(--mlf-indigo)', 'var(--mlf-leaf-green)'][pIndex % 3] }}
                        >
                          {partner.charAt(0)}
                        </span>
                      </div>
                      <p 
                        className="text-sm font-semibold"
                        style={{ color: 'var(--mlf-text-primary)' }}
                      >
                        {partner}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div 
            className="p-10 rounded-3xl"
            style={{ backgroundColor: 'var(--mlf-indigo)' }}
          >
            <h3 className="text-3xl font-bold mb-4 text-white">
              Become a Partner
            </h3>
            <p className="text-lg mb-6 text-white/90 max-w-2xl mx-auto">
              Join us in celebrating Madheshi culture and literature. Partnership opportunities available.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                className="px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
                style={{ 
                  backgroundColor: 'var(--mlf-saffron)',
                  color: 'white'
                }}
              >
                Download Proposal
              </button>
              <button 
                className="px-8 py-3 rounded-lg font-semibold border-2 transition-all hover:scale-105"
                style={{ 
                  borderColor: 'white',
                  color: 'white',
                  backgroundColor: 'transparent'
                }}
              >
                Partner With Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PartnersSection;