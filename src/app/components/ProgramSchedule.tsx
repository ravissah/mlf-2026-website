import { useState } from 'react';
import { Clock, MapPin, Globe2, Users } from 'lucide-react';

interface Session {
  time: string;
  title: string;
  titleNp: string;
  speakers: string[];
  language: string;
  venue: string;
  theme: string;
}

export function ProgramSchedule() {
  const [activeDay, setActiveDay] = useState(1);
  const [activeFilter, setActiveFilter] = useState('All');

  const themes = ['All', 'Literature', 'AI & Technology', 'Culture', 'Youth', 'Politics'];
  const languages = ['All', 'Nepali', 'Maithili', 'Bhojpuri', 'Hindi', 'Urdu', 'English'];

  const schedule: { [key: number]: Session[] } = {
    1: [
      {
        time: '9:00 AM - 10:30 AM',
        title: 'Opening Ceremony & Inaugural Session',
        titleNp: 'उद्घाटन समारोह',
        speakers: ['Chief Guest', 'Festival Director', 'Cultural Dignitaries'],
        language: 'Nepali',
        venue: 'Main Auditorium',
        theme: 'Culture',
      },
      {
        time: '11:00 AM - 12:30 PM',
        title: 'Madheshi Literature: Past, Present, Future',
        titleNp: 'मधेशी साहित्य: भूत, वर्तमान, भविष्य',
        speakers: ['Dr. Tapti Devi', 'Rajneh Saraogi', 'Dr. Shila Mishra'],
        language: 'Maithili',
        venue: 'Literary Hall',
        theme: 'Literature',
      },
      {
        time: '2:00 PM - 3:30 PM',
        title: 'AI & Technology in Preserving Regional Languages',
        titleNp: 'क्षेत्रीय भाषा संरक्षणमा AI',
        speakers: ['Tech Experts', 'Language Scholars'],
        language: 'English',
        venue: 'Innovation Hub',
        theme: 'AI & Technology',
      },
      {
        time: '4:00 PM - 5:30 PM',
        title: 'Youth Panel: Future of Madheshi Culture',
        titleNp: 'युवा प्यानल: मधेशी संस्कृतिको भविष्य',
        speakers: ['Youth Leaders', 'Student Representatives'],
        language: 'Nepali',
        venue: 'Youth Zone',
        theme: 'Youth',
      },
      {
        time: '7:00 PM - 9:00 PM',
        title: 'Cultural Performance Night',
        titleNp: 'सांस्कृतिक प्रस्तुति रात',
        speakers: ['Folk Artists', 'Dance Troupes', 'Musicians'],
        language: 'Multiple',
        venue: 'Open Air Theatre',
        theme: 'Culture',
      },
    ],
    2: [
      {
        time: '9:00 AM - 10:30 AM',
        title: 'Politics and Identity in Madhesh',
        titleNp: 'मधेशमा राजनीति र पहिचान',
        speakers: ['Political Analysts', 'Social Scientists'],
        language: 'Nepali',
        venue: 'Main Auditorium',
        theme: 'Politics',
      },
      {
        time: '11:00 AM - 12:30 PM',
        title: 'Bhojpuri Poetry Session',
        titleNp: 'भोजपुरी कविता सत्र',
        speakers: ['Renowned Bhojpuri Poets'],
        language: 'Bhojpuri',
        venue: 'Poetry Corner',
        theme: 'Literature',
      },
      {
        time: '2:00 PM - 3:30 PM',
        title: 'Cross-Border Cultural Exchange',
        titleNp: 'सीमापार सांस्कृतिक आदानप्रदान',
        speakers: ['India-Nepal Cultural Representatives'],
        language: 'Hindi',
        venue: 'Cultural Hall',
        theme: 'Culture',
      },
      {
        time: '4:00 PM - 5:30 PM',
        title: 'Book Launch & Author Meets',
        titleNp: 'पुस्तक विमोचन र लेखक भेट',
        speakers: ['New Authors', 'Publishers'],
        language: 'Multiple',
        venue: 'Literary Hall',
        theme: 'Literature',
      },
      {
        time: '7:00 PM - 9:00 PM',
        title: 'Poetry, Ghazal & Storytelling Evening',
        titleNp: 'कविता, गजल र कथा सन्ध्या',
        speakers: ['Poets', 'Ghazal Artists', 'Storytellers'],
        language: 'Urdu',
        venue: 'Open Air Theatre',
        theme: 'Literature',
      },
    ],
    3: [
      {
        time: '9:00 AM - 10:30 AM',
        title: 'Women in Madheshi Literature',
        titleNp: 'मधेशी साहित्यमा महिला',
        speakers: ['Women Writers', 'Feminist Scholars'],
        language: 'Nepali',
        venue: 'Main Auditorium',
        theme: 'Literature',
      },
      {
        time: '11:00 AM - 12:30 PM',
        title: 'Digital Innovation for Regional Languages',
        titleNp: 'क्षेत्रीय भाषाका लागि डिजिटल नवाचार',
        speakers: ['Tech Developers', 'Language Experts'],
        language: 'English',
        venue: 'Innovation Hub',
        theme: 'AI & Technology',
      },
      {
        time: '2:00 PM - 3:30 PM',
        title: 'Youth Writing Competition Results',
        titleNp: 'युवा लेखन प्रतियोगिता परिणाम',
        speakers: ['Winners', 'Judges'],
        language: 'Multiple',
        venue: 'Youth Zone',
        theme: 'Youth',
      },
      {
        time: '4:00 PM - 5:30 PM',
        title: 'Closing Ceremony & Future Vision',
        titleNp: 'समापन समारोह',
        speakers: ['Festival Organizers', 'Special Guests'],
        language: 'Nepali',
        venue: 'Main Auditorium',
        theme: 'Culture',
      },
      {
        time: '7:00 PM - 10:00 PM',
        title: 'Grand Musical Night Finale',
        titleNp: 'भव्य संगीत रात फिनाले',
        speakers: ['Renowned Musicians', 'Fusion Bands'],
        language: 'Multiple',
        venue: 'Open Air Theatre',
        theme: 'Culture',
      },
    ],
  };

  const filteredSessions = schedule[activeDay].filter(
    (session) => activeFilter === 'All' || session.theme === activeFilter
  );

  return (
    <section id="program" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div 
            className="inline-block px-6 py-2 rounded-full mb-4"
            style={{ backgroundColor: 'rgba(255, 87, 34, 0.1)' }}
          >
            <span className="text-sm font-semibold tracking-wide" style={{ color: 'var(--mlf-saffron)' }}>
              FESTIVAL PROGRAM
            </span>
          </div>
          <h2 
            className="text-4xl sm:text-5xl font-bold mb-6"
            style={{ color: 'var(--mlf-indigo)' }}
          >
            Program & <span style={{ color: 'var(--mlf-saffron)' }}>Schedule</span>
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--mlf-text-secondary)' }}
          >
            Explore our comprehensive three-day program featuring diverse sessions and events
          </p>
        </div>

        {/* Day Tabs */}
        <div className="flex justify-center mb-8">
          <div 
            className="inline-flex rounded-xl p-1 gap-1"
            style={{ backgroundColor: 'var(--mlf-warm-beige)' }}
          >
            {[1, 2, 3].map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className="px-6 py-3 rounded-lg font-semibold transition-all"
                style={{
                  backgroundColor: activeDay === day ? 'var(--mlf-saffron)' : 'transparent',
                  color: activeDay === day ? 'white' : 'var(--mlf-text-primary)',
                }}
              >
                Day {day}
                <span className="block text-xs mt-1">
                  Jan {28 + day}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Theme Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {themes.map((theme) => (
            <button
              key={theme}
              onClick={() => setActiveFilter(theme)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
              style={{
                backgroundColor: activeFilter === theme ? 'var(--mlf-indigo)' : 'var(--mlf-warm-beige)',
                color: activeFilter === theme ? 'white' : 'var(--mlf-text-primary)',
              }}
            >
              {theme}
            </button>
          ))}
        </div>

        {/* Sessions */}
        <div className="space-y-6">
          {filteredSessions.map((session, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl transition-all hover:scale-[1.02] hover:shadow-xl"
              style={{ backgroundColor: 'white' }}
            >
              {/* Colored Left Border */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-2 transition-all group-hover:w-3"
                style={{ 
                  backgroundColor: 
                    session.theme === 'Literature' ? 'var(--mlf-indigo)' :
                    session.theme === 'AI & Technology' ? 'var(--mlf-leaf-green)' :
                    session.theme === 'Culture' ? 'var(--mlf-saffron)' :
                    session.theme === 'Youth' ? 'var(--mlf-heritage-green)' :
                    'var(--mlf-royal-blue)'
                }}
              />

              <div className="p-6 sm:p-8 pl-8 sm:pl-12">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Time */}
                  <div className="lg:w-48 flex-shrink-0">
                    <div 
                      className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg"
                      style={{ backgroundColor: 'var(--mlf-warm-beige)' }}
                    >
                      <Clock size={16} style={{ color: 'var(--mlf-saffron)' }} />
                      <span className="font-semibold text-sm" style={{ color: 'var(--mlf-text-primary)' }}>
                        {session.time}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="mb-2">
                      <span 
                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ 
                          backgroundColor: `${
                            session.theme === 'Literature' ? 'var(--mlf-indigo)' :
                            session.theme === 'AI & Technology' ? 'var(--mlf-leaf-green)' :
                            session.theme === 'Culture' ? 'var(--mlf-saffron)' :
                            session.theme === 'Youth' ? 'var(--mlf-heritage-green)' :
                            'var(--mlf-royal-blue)'
                          }15`,
                          color: 
                            session.theme === 'Literature' ? 'var(--mlf-indigo)' :
                            session.theme === 'AI & Technology' ? 'var(--mlf-leaf-green)' :
                            session.theme === 'Culture' ? 'var(--mlf-saffron)' :
                            session.theme === 'Youth' ? 'var(--mlf-heritage-green)' :
                            'var(--mlf-royal-blue)'
                        }}
                      >
                        {session.theme}
                      </span>
                    </div>
                    <h3 
                      className="text-xl sm:text-2xl font-bold mb-1"
                      style={{ color: 'var(--mlf-indigo)' }}
                    >
                      {session.title}
                    </h3>
                    <p 
                      className="text-base devanagari mb-3"
                      style={{ color: 'var(--mlf-saffron)' }}
                    >
                      {session.titleNp}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Users size={16} style={{ color: 'var(--mlf-text-muted)' }} />
                        <span style={{ color: 'var(--mlf-text-secondary)' }}>
                          {session.speakers.join(', ')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe2 size={16} style={{ color: 'var(--mlf-text-muted)' }} />
                        <span style={{ color: 'var(--mlf-text-secondary)' }}>
                          {session.language}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} style={{ color: 'var(--mlf-text-muted)' }} />
                        <span style={{ color: 'var(--mlf-text-secondary)' }}>
                          {session.venue}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Download Button */}
        <div className="text-center mt-12">
          <button 
            className="px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 hover:shadow-lg"
            style={{ 
              backgroundColor: 'var(--mlf-indigo)',
              color: 'white'
            }}
          >
            Download Full Schedule PDF
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProgramSchedule;