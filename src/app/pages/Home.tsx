import { Hero } from '../components/Hero';
import { AboutSection } from '../components/AboutSection';
import { FestivalHighlights } from '../components/FestivalHighlights';
import { ProgramPillars } from '../components/ProgramPillars';
import { CulturalEvenings } from '../components/CulturalEvenings';
import { ProgramSchedule } from '../components/ProgramSchedule';
import { SpeakersArtists } from '../components/SpeakersArtists';
import { PartnersSection } from '../components/PartnersSection';
import { ContactSection } from '../components/ContactSection';

export function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <FestivalHighlights />
      <ProgramPillars />
      <CulturalEvenings />
      <ProgramSchedule />
      <SpeakersArtists />
      <PartnersSection />
      <ContactSection />
    </>
  );
}

export default Home;
