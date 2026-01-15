import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { DisclaimerPopup } from './components/DisclaimerPopup';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { Home } from './pages/Home';
import { AllSpeakers } from './pages/AllSpeakers';
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { SpeakersManagement } from './pages/admin/SpeakersManagement';
import { PartnersManagement } from './pages/admin/PartnersManagement';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Navigation />
              <Home />
              <Footer />
              <ScrollToTop />
              <DisclaimerPopup />
            </>
          } />
          <Route path="/speakers" element={
            <>
              <Navigation />
              <AllSpeakers />
              <Footer />
              <ScrollToTop />
            </>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/speakers" element={
            <ProtectedRoute>
              <SpeakersManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/partners" element={
            <ProtectedRoute>
              <PartnersManagement />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}