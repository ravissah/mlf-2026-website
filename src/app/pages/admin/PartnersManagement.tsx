import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase, Partner } from '../../../lib/supabase';
import { Plus, ArrowLeft, Save, X, ExternalLink } from 'lucide-react';
import { SearchBar } from '../../components/admin/SearchBar';
import { DataTable, Column } from '../../components/admin/DataTable';

const categories = [
  'Organized By',
  'Supported By',
  'Cultural Partner',
  'Tech Partner',
  'Community Partners',
];

export function PartnersManagement() {
  const { } = useAuth();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [filteredPartners, setFilteredPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Partner>>({
    name: '',
    name_np: '',
    category: 'Organized By',
    logo_url: '',
    website_url: '',
  });

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      const partnersData = data || [];
      setPartners(partnersData);
      setFilteredPartners(partnersData);
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Error loading partners:', error);
      }
      alert('Error loading partners: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredPartners(partners);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = partners.filter((partner) => {
      return (
        partner.name.toLowerCase().includes(lowerQuery) ||
        (partner.name_np && partner.name_np.includes(query)) ||
        partner.category.toLowerCase().includes(lowerQuery) ||
        (partner.website_url && partner.website_url.toLowerCase().includes(lowerQuery))
      );
    });
    setFilteredPartners(filtered);
  };

  const columns: Column<Partner>[] = [
    {
      key: 'logo_url',
      label: 'Logo',
      sortable: false,
      render: (partner: Partner) => (
        <div className="flex items-center">
          {partner.logo_url ? (
            <img
              src={partner.logo_url}
              alt={partner.name}
              className="w-12 h-12 object-contain rounded"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div 
              className="w-12 h-12 rounded flex items-center justify-center font-bold"
              style={{ backgroundColor: 'var(--mlf-warm-beige)', color: 'var(--mlf-indigo)' }}
            >
              {partner.name.charAt(0)}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (partner: Partner) => (
        <div>
          <div className="font-semibold" style={{ color: 'var(--mlf-indigo)' }}>
            {partner.name}
          </div>
          {partner.name_np && (
            <div className="text-sm devanagari" style={{ color: 'var(--mlf-saffron)' }}>
              {partner.name_np}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (partner: Partner) => (
        <span 
          className="px-2 py-1 rounded text-xs font-semibold"
          style={{ 
            backgroundColor: 'var(--mlf-warm-beige)', 
            color: 'var(--mlf-indigo)' 
          }}
        >
          {partner.category}
        </span>
      ),
    },
    {
      key: 'website_url',
      label: 'Website',
      sortable: false,
      render: (partner: Partner) => (
        <div>
          {partner.website_url ? (
            <a
              href={partner.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm transition-all hover:opacity-80"
              style={{ color: 'var(--mlf-saffron)' }}
            >
              <span>Visit</span>
              <ExternalLink size={14} />
            </a>
          ) : (
            <span className="text-sm" style={{ color: 'var(--mlf-text-muted)' }}>—</span>
          )}
        </div>
      ),
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const { error } = await supabase
          .from('partners')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('partners')
          .insert([formData]);

        if (error) throw error;
      }

      await loadPartners();
      resetForm();
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Error saving partner:', error);
      }
      alert('Error saving partner: ' + error.message);
    }
  };

  const handleEdit = (partner: Partner) => {
    setEditingId(partner.id || null);
    setFormData({
      name: partner.name,
      name_np: partner.name_np,
      category: partner.category,
      logo_url: partner.logo_url,
      website_url: partner.website_url,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this partner?')) return;

    try {
      const { error } = await supabase
        .from('partners')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await loadPartners();
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Error deleting partner:', error);
      }
      alert('Error deleting partner: ' + error.message);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    setFormData({
      name: '',
      name_np: '',
      category: 'Organized By',
      logo_url: '',
      website_url: '',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--mlf-warm-beige)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--mlf-saffron)' }}></div>
          <p style={{ color: 'var(--mlf-text-primary)' }}>Loading partners...</p>
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
                  Partners Management
                </h1>
                <p className="text-sm" style={{ color: 'var(--mlf-text-muted)' }}>
                  {partners.length} partner(s) total
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
              <span>Add Partner</span>
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
                  {editingId ? 'Edit Partner' : 'Add New Partner'}
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
                    Logo URL
                  </label>
                  <input
                    type="url"
                    value={formData.logo_url || ''}
                    onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border-2 outline-none"
                    style={{ borderColor: 'var(--mlf-divider)', backgroundColor: 'var(--mlf-warm-beige)' }}
                    placeholder="https://example.com/logo.png"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--mlf-text-primary)' }}>
                    Website URL
                  </label>
                  <input
                    type="url"
                    value={formData.website_url || ''}
                    onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border-2 outline-none"
                    style={{ borderColor: 'var(--mlf-divider)', backgroundColor: 'var(--mlf-warm-beige)' }}
                    placeholder="https://example.com"
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105"
                    style={{ backgroundColor: 'var(--mlf-saffron)' }}
                  >
                    <Save size={18} />
                    <span>{editingId ? 'Update' : 'Create'} Partner</span>
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

        {/* Search Bar */}
        <SearchBar 
          onSearch={handleSearch}
          placeholder="Search partners by name, category, or website..."
          minLength={2}
        />

        {/* Partners Table */}
        <DataTable
          data={filteredPartners.filter((p): p is Partner & { id: string } => !!p.id)}
          columns={columns}
          onEdit={handleEdit}
          onDelete={(partner) => partner.id && handleDelete(partner.id)}
          emptyMessage={
            <div>
              <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--mlf-warm-beige)' }}>
                <span className="text-4xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--mlf-indigo)' }}>
                No partners found
              </h3>
              <p className="mb-6" style={{ color: 'var(--mlf-text-secondary)' }}>
                Get started by adding your first partner
              </p>
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105"
                style={{ backgroundColor: 'var(--mlf-saffron)' }}
              >
                Add Partner
              </button>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default PartnersManagement;
