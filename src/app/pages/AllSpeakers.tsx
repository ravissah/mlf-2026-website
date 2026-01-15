import { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSpeakers, FrontendSpeaker } from '../../hooks/useSpeakers';
import SpeakerCard from '../components/SpeakerCard';

export function AllSpeakers() {
  const { speakers, loading, error } = useSpeakers();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedSpeaker, setSelectedSpeaker] = useState<FrontendSpeaker | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const speakersPerPage = 8;

  // Get unique categories from speakers
  const categories = useMemo(() => {
    const cats = ['All', ...Array.from(new Set(speakers.map(s => s.category)))];
    return cats;
  }, [speakers]);

  // Filter speakers by category and search query
  const filteredSpeakers = useMemo(() => {
    let filtered = activeCategory === 'All' 
      ? speakers 
      : speakers.filter(s => s.category === activeCategory);

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(speaker => 
        speaker.name.toLowerCase().includes(query) ||
        (speaker.nameNp && speaker.nameNp.includes(query)) ||
        speaker.domain.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [speakers, activeCategory, searchQuery]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredSpeakers.length / speakersPerPage);
  const startIndex = (currentPage - 1) * speakersPerPage;
  const endIndex = startIndex + speakersPerPage;
  const currentSpeakers = filteredSpeakers.slice(startIndex, endIndex);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
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

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ backgroundColor: 'var(--mlf-warm-beige)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--mlf-saffron)' }}></div>
          <p style={{ color: 'var(--mlf-text-primary)' }}>Loading speakers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ backgroundColor: 'var(--mlf-warm-beige)' }}>
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(244, 67, 54, 0.1)' }}>
            <span className="text-4xl">⚠️</span>
          </div>
          <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--mlf-indigo)' }}>
            Error Loading Speakers
          </h3>
          <p style={{ color: 'var(--mlf-text-secondary)' }}>{error}</p>
          <Link 
            to="/"
            className="inline-block mt-6 px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105"
            style={{ backgroundColor: 'var(--mlf-saffron)' }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: 'var(--mlf-warm-beige)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link 
          to="/"
          className="inline-flex items-center space-x-2 mb-8 group transition-all hover:scale-105"
          style={{ color: 'var(--mlf-indigo)' }}
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Home</span>
        </Link>

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
          <h1 
            className="text-4xl sm:text-5xl font-bold mb-6"
            style={{ color: 'var(--mlf-indigo)' }}
          >
            All Speakers & <span style={{ color: 'var(--mlf-saffron)' }}>Artists</span>
          </h1>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--mlf-text-secondary)' }}
          >
            Meet all {speakers.length} distinguished writers, thinkers, performers, and artists joining us at MLF 2026
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={20} style={{ color: 'var(--mlf-text-muted)' }} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, domain, or देवनागरी..."
              className="search-input w-full pl-12 pr-12 py-4 rounded-xl border-2 transition-all focus:outline-none focus:scale-[1.02]"
              style={{
                borderColor: searchQuery ? 'var(--mlf-saffron)' : 'var(--mlf-border)',
                backgroundColor: 'white',
                color: 'var(--mlf-text-primary)',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center transition-all hover:scale-110"
                style={{ color: 'var(--mlf-text-muted)' }}
              >
                <X size={20} />
              </button>
            )}
          </div>
          {searchQuery && (
            <p 
              className="mt-3 text-sm text-center"
              style={{ color: 'var(--mlf-text-muted)' }}
            >
              Searching for: <span className="font-semibold" style={{ color: 'var(--mlf-saffron)' }}>{searchQuery}</span>
            </p>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="px-5 py-3 rounded-lg font-medium transition-all hover:scale-105"
              style={{
                backgroundColor: activeCategory === category ? 'var(--mlf-saffron)' : 'white',
                color: activeCategory === category ? 'white' : 'var(--mlf-text-primary)',
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Speakers Grid */}
        {currentSpeakers.length > 0 ? (
          <div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {currentSpeakers.map((speaker, index) => (
                <SpeakerCard
                  key={speaker.name + index}
                  speaker={speaker}
                  onClick={() => setSelectedSpeaker(speaker)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Page Info */}
                <p 
                  className="text-sm"
                  style={{ color: 'var(--mlf-text-muted)' }}
                >
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredSpeakers.length)} of {filteredSpeakers.length} speakers
                </p>

                {/* Pagination Buttons */}
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{
                      backgroundColor: currentPage === 1 ? 'var(--mlf-warm-beige)' : 'white',
                      color: 'var(--mlf-indigo)',
                      border: '2px solid var(--mlf-border)',
                    }}
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {/* Page Numbers */}
                  {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                      <span 
                        key={`ellipsis-${index}`}
                        className="px-2"
                        style={{ color: 'var(--mlf-text-muted)' }}
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page as number)}
                        className="w-10 h-10 rounded-lg font-medium transition-all hover:scale-105"
                        style={{
                          backgroundColor: currentPage === page ? 'var(--mlf-saffron)' : 'white',
                          color: currentPage === page ? 'white' : 'var(--mlf-indigo)',
                          border: `2px solid ${currentPage === page ? 'var(--mlf-saffron)' : 'var(--mlf-border)'}`,
                        }}
                      >
                        {page}
                      </button>
                    )
                  ))}

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{
                      backgroundColor: currentPage === totalPages ? 'var(--mlf-warm-beige)' : 'white',
                      color: 'var(--mlf-indigo)',
                      border: '2px solid var(--mlf-border)',
                    }}
                    aria-label="Next page"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <div 
              className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ backgroundColor: 'var(--mlf-warm-beige)' }}
            >
              <Search size={40} style={{ color: 'var(--mlf-text-muted)' }} />
            </div>
            <h3 
              className="text-2xl font-bold mb-3"
              style={{ color: 'var(--mlf-indigo)' }}
            >
              No Speakers Found
            </h3>
            <p 
              className="text-lg mb-6"
              style={{ color: 'var(--mlf-text-secondary)' }}
            >
              Try adjusting your search or filters
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
                  style={{
                    backgroundColor: 'var(--mlf-saffron)',
                    color: 'white',
                  }}
                >
                  Clear Search
                </button>
              )}
              {activeCategory !== 'All' && (
                <button
                  onClick={() => setActiveCategory('All')}
                  className="px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
                  style={{
                    backgroundColor: 'var(--mlf-indigo)',
                    color: 'white',
                  }}
                >
                  Show All Categories
                </button>
              )}
            </div>
          </div>
        )}
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
    </div>
  );
}

export default AllSpeakers;
