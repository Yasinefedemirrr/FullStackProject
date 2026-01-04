import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { api } from '../lib/api';

export default function Update() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    // Login kontrolü
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    // ID varsa kullanıcı bilgilerini getir
    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      setFetching(true);
      const response = await api.getUserById(id);
      
      if (response.success && response.data) {
        setFormData({
          name: response.data.name,
          email: response.data.email
        });
      } else {
        setMessage({
          type: 'error',
          text: 'Kullanıcı bulunamadı'
        });
      }
    } catch (error) {
      console.error('Kullanıcı getirme hatası:', error);
      setMessage({
        type: 'error',
        text: 'Kullanıcı bilgileri yüklenirken bir hata oluştu'
      });
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await api.updateUser(id, formData);
      
      if (response.success) {
        setMessage({
          type: 'success',
          text: 'Kullanıcı başarıyla güncellendi!'
        });
        
        // 2 saniye sonra listeleme sayfasına yönlendir
        setTimeout(() => {
          router.push('/list');
        }, 2000);
      }
    } catch (error) {
      console.error('Kullanıcı güncelleme hatası:', error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Kullanıcı güncellenirken bir hata oluştu. Backend server\'ın çalıştığından emin olun.'
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="container">
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ textAlign: 'center', fontSize: '18px' }}>Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h1 style={{ color: '#333' }}>✏️ Kullanıcı Güncelle</h1>
          <button 
            onClick={() => router.push('/list')} 
            className="btn btn-secondary"
          >
            ← Geri Dön
          </button>
        </div>

        {message.text && (
          <div className={`alert alert-${message.type === 'success' ? 'success' : 'error'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Ad Soyad *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Örn: Ahmet Yılmaz"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Örn: ahmet@example.com"
              required
              disabled={loading}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
              style={{ flex: 1 }}
            >
              {loading ? 'Güncelleniyor...' : '💾 Güncelle'}
            </button>
            <button 
              type="button" 
              onClick={() => router.push('/list')}
              className="btn btn-secondary"
              disabled={loading}
            >
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

