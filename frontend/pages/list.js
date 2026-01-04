import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { api } from '../lib/api';

export default function List() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Login kontrolü
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    // Kullanıcıları getir
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.getUsers();
      setUsers(response.data || []);
    } catch (err) {
      console.error('Kullanıcılar getirilirken hata:', err);
      setError('Veriler yüklenirken bir hata oluştu. Backend server\'ın çalıştığından emin olun.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    router.push('/login');
  };

  const handleDelete = async (id) => {
    if (!confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) {
      return;
    }

    try {
      await api.deleteUser(id);
      // Listeyi yenile
      fetchUsers();
    } catch (err) {
      console.error('Silme hatası:', err);
      alert('Kullanıcı silinirken bir hata oluştu');
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <p style={{ textAlign: 'center', fontSize: '18px' }}>Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h1 style={{ color: '#333' }}>👥 Kullanıcı Listesi</h1>
          <div>
            <button 
              onClick={() => router.push('/form')} 
              className="btn btn-success"
              style={{ marginRight: '10px' }}
            >
              ➕ Yeni Kullanıcı Ekle
            </button>
            <button onClick={handleLogout} className="btn btn-secondary">
              🚪 Çıkış Yap
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {users.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#666' 
          }}>
            <p>Henüz kullanıcı bulunmuyor.</p>
            <button 
              onClick={() => router.push('/form')} 
              className="btn btn-primary"
              style={{ marginTop: '20px' }}
            >
              İlk Kullanıcıyı Ekle
            </button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '20px', color: '#666' }}>
              Toplam <strong>{users.length}</strong> kullanıcı bulundu
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Ad</th>
                  <th>Email</th>
                  <th>Oluşturulma Tarihi</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {new Date(user.created_at).toLocaleString('tr-TR')}
                    </td>
                    <td>
                      <button
                        onClick={() => router.push(`/update?id=${user.id}`)}
                        className="btn btn-primary"
                        style={{ padding: '6px 12px', fontSize: '14px', marginRight: '8px' }}
                      >
                        ✏️ Düzenle
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="btn btn-danger"
                        style={{ padding: '6px 12px', fontSize: '14px' }}
                      >
                        🗑️ Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

