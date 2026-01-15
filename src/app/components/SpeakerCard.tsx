import { useState } from 'react';
import { Globe, BookOpen, Mic2, Palette } from 'lucide-react';
import { FrontendSpeaker } from '../../hooks/useSpeakers';

interface SpeakerCardProps {
  speaker: FrontendSpeaker;
  onClick: () => void;
}

function SpeakerCard({ speaker, onClick }: SpeakerCardProps) {
  const [imageError, setImageError] = useState(false);

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

  const Icon = getCategoryIcon(speaker.category);
  const color = getCategoryColor(speaker.category);

  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all hover:scale-105 hover:shadow-2xl"
      style={{ backgroundColor: 'white' }}
    >
      {/* Photo */}
      <div 
        className="aspect-square relative overflow-hidden"
        style={{ backgroundColor: `${color}10` }}
      >
        {speaker.photo_url && !imageError ? (
          <img
            src={speaker.photo_url}
            alt={speaker.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
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
          </div>
        )}
        
        {/* Category Icon Badge */}
        <div 
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-10"
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
}

export { SpeakerCard };
export default SpeakerCard;
