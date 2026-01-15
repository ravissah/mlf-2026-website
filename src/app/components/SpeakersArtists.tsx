import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSpeakers, FrontendSpeaker } from '../../hooks/useSpeakers';
import SpeakerCard from './SpeakerCard';

export function SpeakersArtists() {
  const { speakers, loading } = useSpeakers();
  const [selectedSpeaker, setSelectedSpeaker] = useState<FrontendSpeaker | null>(null);

  // Show only first 8 speakers
  const displayedSpeakers = speakers.slice(0, 8);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Writers & Thinkers': return 'var(--mlf-indigo)';
      case 'Performers': return 'var(--mlf-saffron)';
      case 'Poets': return 'var(--mlf-leaf-green)';
      case 'International': return 'var(--mlf-royal-blue)';
      default: return 'var(--mlf-indigo)';
    }
  };

  if (loading) {
    return (
      <section id="speakers" className="relative py-24" style={{ backgroundColor: 'var(--mlf-warm-beige)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--mlf-saffron)' }}></div>
            <p style={{ color: 'var(--mlf-text-primary)' }}>Loading speakers...</p>
          </div>
        </div>
      </section>
    );
  }

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
        {displayedSpeakers.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {displayedSpeakers.map((speaker, index) => (
              <SpeakerCard
                key={speaker.name + index}
                speaker={speaker}
                onClick={() => setSelectedSpeaker(speaker)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p style={{ color: 'var(--mlf-text-secondary)' }}>
              No speakers available at the moment. Please check back later.
            </p>
          </div>
        )}

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