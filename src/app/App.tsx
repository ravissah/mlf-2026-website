import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { AllSpeakers } from './pages/AllSpeakers';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/speakers" element={<AllSpeakers />} />
        </Routes>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}