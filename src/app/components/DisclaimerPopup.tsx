import { useState, useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';

export function DisclaimerPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup on component mount (page load)
    setIsOpen(true);
  }, []);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg animate-in fade-in zoom-in duration-200">
        <div 
          className="mx-4 rounded-2xl shadow-2xl p-8 relative"
          style={{ backgroundColor: 'var(--mlf-warm-beige)' }}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
            aria-label="Close"
          >
            <X size={18} style={{ color: 'var(--mlf-indigo)' }} />
          </button>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(255, 152, 0, 0.15)' }}
            >
              <AlertCircle size={32} style={{ color: 'var(--mlf-saffron)' }} />
            </div>
          </div>

          {/* Title */}
          <h2 
            className="text-2xl font-bold text-center mb-4"
            style={{ color: 'var(--mlf-indigo)' }}
          >
            Website Under Development
          </h2>

          {/* Content */}
          <div className="space-y-4 mb-6 text-center">
            <p 
              className="text-base leading-relaxed"
              style={{ color: 'var(--mlf-text-primary)' }}
            >
              The website is under development and may lack accuracy in data. 
              Kindly contact us for further information.
            </p>
            
            <p 
              className="text-base leading-relaxed font-semibold"
              style={{ color: 'var(--mlf-heritage-green)' }}
            >
              Follow us on social media for latest and updated information.
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="w-full py-3 rounded-lg font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: 'var(--mlf-saffron)' }}
          >
            I Understand
          </button>

          {/* Decorative Elements */}
          <div className="flex items-center justify-center space-x-2 mt-6">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--mlf-saffron)' }} />
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--mlf-gold)' }} />
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--mlf-leaf-green)' }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default DisclaimerPopup;
