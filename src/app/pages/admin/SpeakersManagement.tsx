import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase, Speaker } from '../../../lib/supabase';
import { Plus, Edit, Trash2, ArrowLeft, Save, X } from 'lucide-react';

const categories = ['Writers & Thinkers', 'Performers', 'Poets', 'International'];

export function SpeakersManagement() {
  const { signOut } = useAuth();
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Speaker>>({
    name: '',
    name_np: '',
    domain: '',
    country: '',
    category: 'Writers & Thinkers',
    bio: '',
  });

  useEffect(() => {
    loadSpeakers();
  }, []);

  const loadSpeakers = async () => {
    try {
      const { data, error } = await supabase
        .from('speakers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSpeakers(data || []);
    } catch (error: any) {
      console.error('Error loading speakers:', error);
      alert('Error loading speakers: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const { error } = await supabase
          .from('speakers')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('speakers')
          .insert([formData]);

        if (error) throw error;
      }

      await loadSpeakers();
      resetForm();
    } catch (error: any) {
      console.error('Error saving speaker:', error);
      alert('Error saving speaker: ' + error.message);
    }
  };

  const handleEdit = (speaker: Speaker) => {
    setEditingId(speaker.id || null);
    setFormData({
      name: speaker.name,
      name_np: speaker.name_np,
      domain: speaker.domain,
      country: speaker.country,
      category: speaker.category,
      bio: speaker.bio,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this speaker?')) return;

    try {
      const { error } = await supabase
        .from('speakers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await loadSpeakers();
    } catch (error: any) {
      console.error('Error deleting speaker:', error);
      alert('Error deleting speaker: ' + error.message);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    setFormData({
      name: '',
      name_np: '',
      domain: '',
      country: '',
      category: 'Writers & Thinkers',
      bio: '',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--mlf-warm-beige)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--mlf-saffron)' }}></div>
          <p style={{ color: 'var(--mlf-text-primary)' }}>Loading speakers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--mlf-warm-beige)' }}>
      {/* Header */}
      <div 
        className="border-b"
        style={{ backgroundColor: 'white', borderColor: 'var(--mlf-divider)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/admin/dashboard"
                className="p-2 rounded-lg transition-all hover:scale-110"
                style={{ backgroundColor: 'var(--mlf-warm-beige)' }}
              >
                <ArrowLeft size={20} style={{ color: 'var(--mlf-indigo)' }} />
              </Link>
              <div>
                <h1 className="text-xl font-bold" style={{ color: 'var(--mlf-indigo)' }}>
                  Speakers Management
                </h1>
                <p className="text-sm" style={{ color: 'var(--mlf-text-muted)' }}>
                  {speakers.length} speaker(s) total
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-white transition-all hover:scale-105"
              style={{ backgroundColor: 'var(--mlf-saffron)' }}
            >
              <Plus size={18} />
              <span>Add Speaker</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div 
              className="w-full max-w-2xl rounded-2xl p-8 max-h-[90vh] overflow-y-auto"
              style={{ backgroundColor: 'white' }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--mlf-indigo)' }}>
                  {editingId ? 'Edit Speaker' : 'Add New Speaker'}
                </h2>
                <button
                  onClick={resetForm}
                  className="p-2 rounded-lg transition-all hover:scale-110"
                  style={{ backgroundColor: 'var(--mlf-warm-beige)' }}
                >
                  <X size={20} style={{ color: 'var(--mlf-indigo)' }} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--mlf-text-primary)' }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border-2 outline-none"
                      style={{ borderColor: 'var(--mlf-divider)', backgroundColor: 'var(--mlf-warm-beige)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--mlf-text-primary)' }}>
                      Name (Nepali)
                    </label>
                    <input
                      type="text"
                      value={formData.name_np || ''}
                      onChange={(e) => setFormData({ ...formData, name_np: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border-2 outline-none"
                      style={{ borderColor: 'var(--mlf-divider)', backgroundColor: 'var(--mlf-warm-beige)' }}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--mlf-text-primary)' }}>
                      Domain *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.domain}
                      onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border-2 outline-none"
                      style={{ borderColor: 'var(--mlf-divider)', backgroundColor: 'var(--mlf-warm-beige)' }}
                      placeholder="e.g., Maithili Literature"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--mlf-text-primary)' }}>
                      Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border-2 outline-none"
                      style={{ borderColor: 'var(--mlf-divider)', backgroundColor: 'var(--mlf-warm-beige)' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--mlf-text-primary)' }}>
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border-2 outline-none"
                    style={{ borderColor: 'var(--mlf-divider)', backgroundColor: 'var(--mlf-warm-beige)' }}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--mlf-text-primary)' }}>
                    Bio *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border-2 outline-none"
                    style={{ borderColor: 'var(--mlf-divider)', backgroundColor: 'var(--mlf-warm-beige)' }}
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105"
                    style={{ backgroundColor: 'var(--mlf-saffron)' }}
                  >
                    <Save size={18} />
                    <span>{editingId ? 'Update' : 'Create'} Speaker</span>
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 rounded-lg font-semibold border-2 transition-all hover:scale-105"
                    style={{ 
                      borderColor: 'var(--mlf-indigo)',
                      color: 'var(--mlf-indigo)',
                      backgroundColor: 'transparent'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Speakers List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="p-6 rounded-2xl transition-all hover:shadow-lg"
              style={{ backgroundColor: 'white' }}
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--mlf-indigo)' }}>
                  {speaker.name}
                </h3>
                {speaker.name_np && (
                  <p className="text-sm devanagari mb-2" style={{ color: 'var(--mlf-saffron)' }}>
                    {speaker.name_np}
                  </p>
                )}
                <div className="flex items-center space-x-2 text-sm mb-2">
                  <span className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--mlf-warm-beige)', color: 'var(--mlf-text-primary)' }}>
                    {speaker.category}
                  </span>
                  <span style={{ color: 'var(--mlf-text-muted)' }}>•</span>
                  <span style={{ color: 'var(--mlf-text-muted)' }}>{speaker.country}</span>
                </div>
                <p className="text-sm mb-2" style={{ color: 'var(--mlf-text-secondary)' }}>
                  {speaker.domain}
                </p>
                <p className="text-sm line-clamp-2" style={{ color: 'var(--mlf-text-secondary)' }}>
                  {speaker.bio}
                </p>
              </div>
              <div className="flex space-x-2 pt-4 border-t" style={{ borderColor: 'var(--mlf-divider)' }}>
                <button
                  onClick={() => handleEdit(speaker)}
                  className="flex-1 flex items-center justify-center space-x-1 px-4 py-2 rounded-lg transition-all hover:scale-105"
                  style={{ backgroundColor: 'rgba(63, 81, 181, 0.1)', color: 'var(--mlf-indigo)' }}
                >
                  <Edit size={16} />
                  <span className="text-sm">Edit</span>
                </button>
                <button
                  onClick={() => speaker.id && handleDelete(speaker.id)}
                  className="flex items-center justify-center px-4 py-2 rounded-lg transition-all hover:scale-105"
                  style={{ backgroundColor: 'rgba(244, 67, 54, 0.1)', color: '#f44336' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {speakers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg mb-4" style={{ color: 'var(--mlf-text-secondary)' }}>
              No speakers found. Add your first speaker!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SpeakersManagement;
