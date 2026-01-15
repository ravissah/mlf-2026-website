import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase, Speaker } from '../../../lib/supabase';
import { Plus, ArrowLeft, Save, X, Image as ImageIcon } from 'lucide-react';
import { SearchBar } from '../../components/admin/SearchBar';
import { DataTable, Column } from '../../components/admin/DataTable';

const categories = ['Writers & Thinkers', 'Performers', 'Poets', 'International'];

export function SpeakersManagement() {
  const { } = useAuth();
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [filteredSpeakers, setFilteredSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<Partial<Speaker>>({
    name: '',
    name_np: '',
    domain: '',
    country: '',
    category: 'Writers & Thinkers',
    bio: '',
    photo_url: '',
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
      const speakersData = data || [];
      setSpeakers(speakersData);
      setFilteredSpeakers(speakersData);
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Error loading speakers:', error);
      }
      alert('Error loading speakers: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredSpeakers(speakers);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = speakers.filter((speaker) => {
      return (
        speaker.name.toLowerCase().includes(lowerQuery) ||
        (speaker.name_np && speaker.name_np.includes(query)) ||
        speaker.domain.toLowerCase().includes(lowerQuery) ||
        speaker.country.toLowerCase().includes(lowerQuery) ||
        speaker.category.toLowerCase().includes(lowerQuery) ||
        speaker.bio.toLowerCase().includes(lowerQuery)
      );
    });
    setFilteredSpeakers(filtered);
  };

  const columns: Column<Speaker>[] = [
    {
      key: 'photo_url',
      label: 'Photo',
      sortable: false,
      render: (speaker: Speaker) => (
        <div className="flex items-center">
          {speaker.photo_url ? (
            <img
              src={speaker.photo_url}
              alt={speaker.name}
              className="w-12 h-12 object-cover rounded-full"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--mlf-warm-beige)' }}
            >
              <ImageIcon size={20} style={{ color: 'var(--mlf-text-muted)' }} />
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (speaker: Speaker) => (
        <div>
          <div className="font-semibold" style={{ color: 'var(--mlf-indigo)' }}>
            {speaker.name}
          </div>
          {speaker.name_np && (
            <div className="text-sm devanagari" style={{ color: 'var(--mlf-saffron)' }}>
              {speaker.name_np}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'domain',
      label: 'Domain',
      sortable: true,
      render: (speaker: Speaker) => (
        <div className="text-sm" style={{ color: 'var(--mlf-text-primary)' }}>
          {speaker.domain}
        </div>
      ),
    },
    {
      key: 'country',
      label: 'Country',
      sortable: true,
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (speaker: Speaker) => (
        <span 
          className="px-2 py-1 rounded text-xs font-semibold"
          style={{ 
            backgroundColor: 'var(--mlf-warm-beige)', 
            color: 'var(--mlf-indigo)' 
          }}
        >
          {speaker.category}
        </span>
      ),
    },
    {
      key: 'bio',
      label: 'Bio',
      sortable: false,
      render: (speaker: Speaker) => (
        <div className="text-sm max-w-xs truncate" style={{ color: 'var(--mlf-text-secondary)' }}>
          {speaker.bio}
        </div>
      ),
    },
  ];

  const uploadImageToStorage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${formData.name?.toLowerCase().replace(/\s+/g, '-') || 'speaker'}-${Date.now()}.${fileExt}`;
    const filePath = `speakers/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('speakers_photo')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('speakers_photo')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const fetchAndUploadImage = async (url: string): Promise<string> => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch image');
      
      const blob = await response.blob();
      const contentType = response.headers.get('content-type') || 'image/jpeg';
      const fileExt = contentType.split('/')[1] || 'jpg';
      const fileName = `${formData.name?.toLowerCase().replace(/\s+/g, '-') || 'speaker'}-${Date.now()}.${fileExt}`;
      const filePath = `speakers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('speakers_photo')
        .upload(filePath, blob, {
          cacheControl: '3600',
          upsert: false,
          contentType,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('speakers_photo')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (err: any) {
      throw new Error(`Failed to fetch and upload image: ${err.message}`);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setImageUploading(true);
    setError('');

    try {
      const publicUrl = await uploadImageToStorage(file);
      setFormData((prev) => ({ ...prev, photo_url: publicUrl }));
      setImagePreview(publicUrl);
    } catch (err: any) {
      setError(err.message || 'Failed to upload image');
    } finally {
      setImageUploading(false);
    }
  };

  const handleUrlFetch = async () => {
    const url = formData.photo_url?.trim();
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setImageUploading(true);
    setError('');

    try {
      const publicUrl = await fetchAndUploadImage(url);
      setFormData((prev) => ({ ...prev, photo_url: publicUrl }));
      setImagePreview(publicUrl);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch and upload image');
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (imageUploading) {
      setError('Please wait for image upload to complete');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      // Verify user is authenticated
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error('Not authenticated. Please log in again.');
      }

      // Ensure photo_url is properly set from formData or imagePreview
      // Use imagePreview as fallback since it's updated immediately after upload
      const photoUrl = (formData.photo_url?.trim() || imagePreview || null);
      
      // Only log in development
      if (import.meta.env.DEV) {
        console.log('Form data before submit:', { 
          formDataPhotoUrl: formData.photo_url, 
          imagePreview, 
          finalPhotoUrl: photoUrl 
        });
      }
      
      const dataToSubmit = {
        name: formData.name,
        name_np: formData.name_np || null,
        domain: formData.domain,
        country: formData.country,
        category: formData.category,
        bio: formData.bio,
        photo_url: photoUrl,
      };

      if (import.meta.env.DEV) {
        console.log('Submitting data:', dataToSubmit);
      }

      if (editingId) {
        if (import.meta.env.DEV) {
          console.log('Updating speaker:', { id: editingId, dataToSubmit });
          console.log('Current user:', user.email);
        }
        
        // First, verify we can read the speaker
        const { data: existingSpeaker, error: readError } = await supabase
          .from('speakers')
          .select('*')
          .eq('id', editingId)
          .single();
        
        if (import.meta.env.DEV) {
          console.log('Existing speaker check:', { existingSpeaker, readError });
        }
        
        if (readError) {
          throw new Error(`Cannot read speaker: ${readError.message}`);
        }
        
        const { data: updateData, error: updateError } = await supabase
          .from('speakers')
          .update({
            ...dataToSubmit,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingId)
          .select();

        if (import.meta.env.DEV) {
          console.log('Update response:', { updateData, updateError, count: updateData?.length });
        }

        if (updateError) {
          // Always log errors, even in production, but without sensitive data
          if (import.meta.env.DEV) {
            console.error('Update error details:', updateError);
          } else {
            console.error('Update failed:', updateError.message);
          }
          throw new Error(`Update failed: ${updateError.message} (Code: ${updateError.code})`);
        }

        if (!updateData || updateData.length === 0) {
          // Try to get more info about why the update failed
          const { data: checkData, error: checkError } = await supabase
            .from('speakers')
            .select('id, name, photo_url')
            .eq('id', editingId);
          
          if (import.meta.env.DEV) {
            console.error('Update failed - diagnostic info:', { 
              checkData, 
              checkError,
              editingId,
              userEmail: user.email,
              userId: user.id
            });
          }
          
          throw new Error(
            'Update did not affect any rows. This is likely due to Row Level Security (RLS) policies blocking the update. ' +
            'Please run the fix script in Supabase SQL Editor: scripts/fix_rls_policies.sql'
          );
        }
        
        if (import.meta.env.DEV) {
          console.log('Successfully updated speaker:', updateData[0]);
        }
      } else {
        const { data: insertData, error: insertError } = await supabase
          .from('speakers')
          .insert([dataToSubmit])
          .select();

        if (insertError) {
          if (import.meta.env.DEV) {
            console.error('Insert error:', insertError);
          }
          throw new Error(`Insert failed: ${insertError.message}`);
        }

        if (import.meta.env.DEV) {
          console.log('Insert response:', { insertData });
        }
      }

      await loadSpeakers();
      resetForm();
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Error saving speaker:', error);
      }
      setError(error.message || 'Error saving speaker');
    } finally {
      setLoading(false);
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
      photo_url: speaker.photo_url,
    });
    setImagePreview(speaker.photo_url || null);
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
      if (import.meta.env.DEV) {
        console.error('Error deleting speaker:', error);
      }
      alert('Error deleting speaker: ' + error.message);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    setImagePreview(null);
    setError('');
    setFormData({
      name: '',
      name_np: '',
      domain: '',
      country: '',
      category: 'Writers & Thinkers',
      bio: '',
      photo_url: '',
    });
  };

  if (loading && speakers.length === 0) {
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
              className="w-full max-w-3xl rounded-2xl p-8 max-h-[90vh] overflow-y-auto"
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

              {error && (
                <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: 'rgba(244, 67, 54, 0.1)', color: '#f44336' }}>
                  {error}
                </div>
              )}

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

                {/* Photo Upload Section */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--mlf-text-primary)' }}>
                    Photo
                  </label>
                  
                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mb-4 flex items-start gap-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg border-2"
                        style={{ borderColor: 'var(--mlf-divider)' }}
                        onError={() => setImagePreview(null)}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData((prev) => ({ ...prev, photo_url: '' }));
                        }}
                        disabled={imageUploading || loading}
                        className="px-3 py-1 text-sm rounded-lg transition-all disabled:opacity-50"
                        style={{ 
                          backgroundColor: 'rgba(244, 67, 54, 0.1)',
                          color: '#f44336',
                          border: '1px solid #f44336'
                        }}
                      >
                        Remove Image
                      </button>
                    </div>
                  )}

                  {/* File Upload */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--mlf-text-primary)' }}>
                      Upload Image File
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={imageUploading || loading}
                      className="block w-full text-sm"
                      style={{ color: 'var(--mlf-text-muted)' }}
                    />
                    <p className="mt-1 text-xs" style={{ color: 'var(--mlf-text-muted)' }}>
                      Upload an image file (max 5MB, JPG, PNG, or WebP)
                    </p>
                  </div>

                  {/* URL Fetch */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--mlf-text-primary)' }}>
                      Or Fetch from URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={formData.photo_url || ''}
                        onChange={(e) => {
                          setFormData({ ...formData, photo_url: e.target.value });
                          if (e.target.value.startsWith('http')) {
                            setImagePreview(e.target.value);
                          }
                        }}
                        placeholder="https://example.com/photo.jpg"
                        disabled={imageUploading || loading}
                        className="flex-1 px-4 py-2 rounded-lg border-2 outline-none disabled:opacity-50"
                        style={{ borderColor: 'var(--mlf-divider)', backgroundColor: 'var(--mlf-warm-beige)' }}
                      />
                      <button
                        type="button"
                        onClick={handleUrlFetch}
                        disabled={imageUploading || loading || !formData.photo_url?.trim()}
                        className="px-4 py-2 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: 'var(--mlf-saffron)' }}
                      >
                        {imageUploading ? 'Uploading...' : 'Fetch & Upload'}
                      </button>
                    </div>
                    <p className="mt-1 text-xs" style={{ color: 'var(--mlf-text-muted)' }}>
                      Enter a URL and click "Fetch & Upload" to download the image and save it to Supabase Storage. 
                      Or leave the URL as-is to use it directly (external URL).
                    </p>
                  </div>
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
                    disabled={loading || imageUploading}
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105 disabled:opacity-50"
                    style={{ backgroundColor: 'var(--mlf-saffron)' }}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        <span>{editingId ? 'Update' : 'Create'} Speaker</span>
                      </>
                    )}
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
          placeholder="Search speakers by name, domain, country, category, or bio..."
          minLength={2}
        />

        {/* Speakers Table */}
        <DataTable
          data={filteredSpeakers.filter((s): s is Speaker & { id: string } => !!s.id)}
          columns={columns}
          onEdit={handleEdit}
          onDelete={(speaker) => speaker.id && handleDelete(speaker.id)}
          emptyMessage={
            <div>
              <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--mlf-warm-beige)' }}>
                <span className="text-4xl">📋</span>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--mlf-indigo)' }}>
                No speakers found
              </h3>
              <p className="mb-6" style={{ color: 'var(--mlf-text-secondary)' }}>
                Get started by adding your first speaker
              </p>
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105"
                style={{ backgroundColor: 'var(--mlf-saffron)' }}
              >
                Add Speaker
              </button>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default SpeakersManagement;
