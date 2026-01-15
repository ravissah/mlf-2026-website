import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { Users, Handshake, LogOut, Settings } from 'lucide-react';

export function Dashboard() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--mlf-warm-beige)' }}>
      {/* Header */}
      <div 
        className="border-b"
        style={{ backgroundColor: 'white', borderColor: 'var(--mlf-divider)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--mlf-indigo)' }}
              >
                <span className="text-white font-bold">म</span>
              </div>
              <div>
                <h1 className="text-xl font-bold" style={{ color: 'var(--mlf-indigo)' }}>
                  MLF Admin Dashboard
                </h1>
                <p className="text-sm" style={{ color: 'var(--mlf-text-muted)' }}>
                  {user?.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all hover:scale-105"
              style={{ 
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                color: '#f44336'
              }}
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--mlf-indigo)' }}>
            Content Management
          </h2>
          <p style={{ color: 'var(--mlf-text-secondary)' }}>
            Manage speakers and partners for MLF 2026
          </p>
        </div>

        {/* Management Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Speakers Management */}
          <Link
            to="/admin/speakers"
            className="group block p-8 rounded-2xl transition-all hover:scale-105 hover:shadow-xl"
            style={{ backgroundColor: 'white' }}
          >
            <div className="flex items-start space-x-4">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                style={{ backgroundColor: 'rgba(63, 81, 181, 0.1)' }}
              >
                <Users size={32} style={{ color: 'var(--mlf-indigo)' }} />
              </div>
              <div className="flex-1">
                <h3 
                  className="text-2xl font-bold mb-2"
                  style={{ color: 'var(--mlf-indigo)' }}
                >
                  Speakers
                </h3>
                <p style={{ color: 'var(--mlf-text-secondary)' }}>
                  Manage speakers, artists, and participants for the festival
                </p>
                <div className="mt-4">
                  <span 
                    className="text-sm font-semibold inline-flex items-center space-x-1"
                    style={{ color: 'var(--mlf-saffron)' }}
                  >
                    <span>Manage Speakers</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Partners Management */}
          <Link
            to="/admin/partners"
            className="group block p-8 rounded-2xl transition-all hover:scale-105 hover:shadow-xl"
            style={{ backgroundColor: 'white' }}
          >
            <div className="flex items-start space-x-4">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                style={{ backgroundColor: 'rgba(255, 152, 0, 0.1)' }}
              >
                <Handshake size={32} style={{ color: 'var(--mlf-saffron)' }} />
              </div>
              <div className="flex-1">
                <h3 
                  className="text-2xl font-bold mb-2"
                  style={{ color: 'var(--mlf-indigo)' }}
                >
                  Partners
                </h3>
                <p style={{ color: 'var(--mlf-text-secondary)' }}>
                  Manage partners, sponsors, and supporters
                </p>
                <div className="mt-4">
                  <span 
                    className="text-sm font-semibold inline-flex items-center space-x-1"
                    style={{ color: 'var(--mlf-saffron)' }}
                  >
                    <span>Manage Partners</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 p-8 rounded-2xl" style={{ backgroundColor: 'white' }}>
          <h3 
            className="text-xl font-bold mb-4"
            style={{ color: 'var(--mlf-indigo)' }}
          >
            Quick Information
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--mlf-warm-beige)' }}>
              <p className="text-sm mb-1" style={{ color: 'var(--mlf-text-muted)' }}>
                Website Status
              </p>
              <p className="text-lg font-bold" style={{ color: 'var(--mlf-indigo)' }}>
                Under Development
              </p>
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--mlf-warm-beige)' }}>
              <p className="text-sm mb-1" style={{ color: 'var(--mlf-text-muted)' }}>
                Festival Date
              </p>
              <p className="text-lg font-bold" style={{ color: 'var(--mlf-indigo)' }}>
                Jan 29-31, 2026
              </p>
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--mlf-warm-beige)' }}>
              <p className="text-sm mb-1" style={{ color: 'var(--mlf-text-muted)' }}>
                Location
              </p>
              <p className="text-lg font-bold" style={{ color: 'var(--mlf-indigo)' }}>
                Birgunj, Madhesh
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
