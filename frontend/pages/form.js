import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { api } from '../lib/api';

export default function Form() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    // Login kontrolü
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
  }, []);

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
      const response = await api.createUser(formData);
      
      if (response.success) {
        setMessage({
          type: 'success',
          text: 'Kullanıcı başarıyla eklendi!'
        });
        
        // Formu temizle
        setFormData({ name: '', email: '' });
        
        // 2 saniye sonra listeleme sayfasına yönlendir
        setTimeout(() => {
          router.push('/list');
        }, 2000);
      }
    } catch (error) {
      console.error('Kullanıcı ekleme hatası:', error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Kullanıcı eklenirken bir hata oluştu. Backend server\'ın çalıştığından emin olun.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h1 style={{ color: '#333' }}>➕ Yeni Kullanıcı Ekle</h1>
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
              {loading ? 'Kaydediliyor...' : '💾 Kaydet'}
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

