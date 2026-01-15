import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { Lock, Mail, AlertCircle } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message || 'Invalid email or password');
    } else {
      navigate('/admin/dashboard');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--mlf-warm-beige)' }}>
      <div className="w-full max-w-md mx-4">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
              style={{ backgroundColor: 'var(--mlf-indigo)' }}
            >
              <span className="text-white font-bold text-2xl">म</span>
            </div>
          </div>
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ color: 'var(--mlf-indigo)' }}
          >
            MLF Admin
          </h1>
          <p style={{ color: 'var(--mlf-text-secondary)' }}>
            Sign in to manage content
          </p>
        </div>

        {/* Login Form */}
        <div 
          className="rounded-2xl shadow-2xl p-8"
          style={{ backgroundColor: 'white' }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div 
                className="flex items-center space-x-2 p-4 rounded-lg"
                style={{ backgroundColor: 'rgba(244, 67, 54, 0.1)' }}
              >
                <AlertCircle size={20} style={{ color: '#f44336' }} />
                <p className="text-sm" style={{ color: '#f44336' }}>{error}</p>
              </div>
            )}

            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-semibold mb-2"
                style={{ color: 'var(--mlf-text-primary)' }}
              >
                Email
              </label>
              <div className="relative">
                <Mail 
                  size={20} 
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--mlf-text-muted)' }}
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-2 outline-none transition-all focus:border-opacity-100"
                  style={{ 
                    borderColor: 'var(--mlf-divider)',
                    backgroundColor: 'var(--mlf-warm-beige)',
                  }}
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-semibold mb-2"
                style={{ color: 'var(--mlf-text-primary)' }}
              >
                Password
              </label>
              <div className="relative">
                <Lock 
                  size={20} 
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--mlf-text-muted)' }}
                />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-2 outline-none transition-all focus:border-opacity-100"
                  style={{ 
                    borderColor: 'var(--mlf-divider)',
                    backgroundColor: 'var(--mlf-warm-beige)',
                  }}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-white transition-all hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: 'var(--mlf-saffron)' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Footer Note */}
          <div className="mt-6 text-center">
            <p className="text-xs" style={{ color: 'var(--mlf-text-muted)' }}>
              MLF 2026 Admin Dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
