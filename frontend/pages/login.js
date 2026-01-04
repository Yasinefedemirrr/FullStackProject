import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Hardcoded login bilgileri
  const validUsername = 'admin';
  const validPassword = 'admin123';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basit hardcoded kontrol
    if (username === validUsername && password === validPassword) {
      // Giriş başarılı - sessionStorage'a kaydet
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('username', username);
      
      // Listeleme sayfasına yönlendir
      router.push('/list');
    } else {
      setError('Kullanıcı adı veya şifre hatalı!');
    }
  };

  return (
    <div className="container">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '80vh' 
      }}>
        <div className="card" style={{ width: '400px' }}>
          <h1 style={{ 
            textAlign: 'center', 
            marginBottom: '30px', 
            color: '#333' 
          }}>
            🔐 Giriş Yap
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Kullanıcı Adı</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Kullanıcı adınızı girin"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Şifre</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifrenizi girin"
                required
              />
            </div>

            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Giriş Yap
            </button>
          </form>

          <div style={{ 
            marginTop: '20px', 
            padding: '15px', 
            background: '#f8f9fa', 
            borderRadius: '6px',
            fontSize: '14px',
            color: '#666'
          }}>
            <strong>Test Bilgileri:</strong><br />
            Kullanıcı Adı: <code>admin</code><br />
            Şifre: <code>admin123</code>
          </div>
        </div>
      </div>
    </div>
  );
}

