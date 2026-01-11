import { useState } from 'react';
import { Globe, BookOpen, Mic2, Palette, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { speakers, categories, Speaker } from '../data/speakersData';

export function SpeakersArtists() {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  // Show only first 8 speakers
  const displayedSpeakers = speakers.slice(0, 8);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Writers & Thinkers': return BookOpen;
      case 'Performers': return Palette;
      case 'Poets': return Mic2;
      case 'International': return Globe;
      default: return BookOpen;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Writers & Thinkers': return 'var(--mlf-indigo)';
      case 'Performers': return 'var(--mlf-saffron)';
      case 'Poets': return 'var(--mlf-leaf-green)';
      case 'International': return 'var(--mlf-royal-blue)';
      default: return 'var(--mlf-indigo)';
    }
  };

  return (
    <section id="speakers" className="relative py-24" style={{ backgroundColor: 'var(--mlf-warm-beige)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div 
            className="inline-block px-6 py-2 rounded-full mb-4"
            style={{ backgroundColor: 'rgba(63, 81, 181, 0.1)' }}
          >
            <span className="text-sm font-semibold tracking-wide" style={{ color: 'var(--mlf-indigo)' }}>
              FEATURED VOICES
            </span>
          </div>
          <h2 
            className="text-4xl sm:text-5xl font-bold mb-6"
            style={{ color: 'var(--mlf-indigo)' }}
          >
            Speakers & <span style={{ color: 'var(--mlf-saffron)' }}>Artists</span>
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--mlf-text-secondary)' }}
          >
            Meet the distinguished writers, thinkers, performers, and artists joining us at MLF 2026
          </p>
        </div>

        {/* Speakers Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {displayedSpeakers.map((speaker, index) => {
            const Icon = getCategoryIcon(speaker.category);
            const color = getCategoryColor(speaker.category);

            return (
              <div
                key={index}
                onClick={() => setSelectedSpeaker(speaker)}
                className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all hover:scale-105 hover:shadow-2xl"
                style={{ backgroundColor: 'white' }}
              >
                {/* Photo Placeholder */}
                <div 
                  className="aspect-square flex items-center justify-center relative overflow-hidden"
                  style={{ backgroundColor: `${color}10` }}
                >
                  <div 
                    className="w-32 h-32 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${color}20` }}
                  >
                    <span 
                      className="text-5xl font-bold"
                      style={{ color }}
                    >
                      {speaker.name.charAt(0)}
                    </span>
                  </div>
                  
                  {/* Category Icon Badge */}
                  <div 
                    className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'white' }}
                  >
                    <Icon size={20} style={{ color }} />
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 
                    className="font-bold text-lg mb-1"
                    style={{ color: 'var(--mlf-indigo)' }}
                  >
                    {speaker.name}
                  </h3>
                  {speaker.nameNp && (
                    <p 
                      className="text-sm devanagari mb-2"
                      style={{ color }}
                    >
                      {speaker.nameNp}
                    </p>
                  )}
                  <p 
                    className="text-sm mb-2"
                    style={{ color: 'var(--mlf-text-secondary)' }}
                  >
                    {speaker.domain}
                  </p>
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-xs font-medium px-3 py-1 rounded-full"
                      style={{ 
                        backgroundColor: `${color}15`,
                        color 
                      }}
                    >
                      {speaker.country}
                    </span>
                    <span 
                      className="text-xs group-hover:translate-x-1 transition-transform"
                      style={{ color }}
                    >
                      View Bio →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link 
            to="/speakers"
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg group"
            style={{ 
              backgroundColor: 'var(--mlf-indigo)',
              color: 'white'
            }}
          >
            <span>View All Speakers</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <p 
            className="mt-4 text-sm"
            style={{ color: 'var(--mlf-text-muted)' }}
          >
            See all {speakers.length} featured speakers and artists
          </p>
        </div>
      </div>

      {/* Modal */}
      {selectedSpeaker && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedSpeaker(null)}
        >
          <div 
            className="max-w-2xl w-full rounded-3xl p-8 relative"
            style={{ backgroundColor: 'white' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedSpeaker(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ backgroundColor: 'var(--mlf-warm-beige)' }}
            >
              <span style={{ color: 'var(--mlf-text-primary)' }}>✕</span>
            </button>

            <div className="mb-6">
              <h3 
                className="text-3xl font-bold mb-2"
                style={{ color: 'var(--mlf-indigo)' }}
              >
                {selectedSpeaker.name}
              </h3>
              {selectedSpeaker.nameNp && (
                <p 
                  className="text-xl devanagari mb-3"
                  style={{ color: getCategoryColor(selectedSpeaker.category) }}
                >
                  {selectedSpeaker.nameNp}
                </p>
              )}
              <p 
                className="text-lg font-medium mb-2"
                style={{ color: 'var(--mlf-text-secondary)' }}
              >
                {selectedSpeaker.domain}
              </p>
              <div className="flex items-center space-x-4">
                <span 
                  className="text-sm font-medium px-4 py-2 rounded-full"
                  style={{ 
                    backgroundColor: `${getCategoryColor(selectedSpeaker.category)}15`,
                    color: getCategoryColor(selectedSpeaker.category)
                  }}
                >
                  {selectedSpeaker.category}
                </span>
                <span 
                  className="text-sm font-medium px-4 py-2 rounded-full"
                  style={{ backgroundColor: 'var(--mlf-warm-beige)' }}
                >
                  {selectedSpeaker.country}
                </span>
              </div>
            </div>

            <div>
              <h4 
                className="font-bold mb-3"
                style={{ color: 'var(--mlf-indigo)' }}
              >
                Biography
              </h4>
              <p 
                className="leading-relaxed"
                style={{ color: 'var(--mlf-text-secondary)' }}
              >
                {selectedSpeaker.bio}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default SpeakersArtists;