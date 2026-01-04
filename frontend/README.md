# Frontend - Next.js

Next.js ve React kullanılarak oluşturulmuş frontend uygulaması.

## Kurulum

1. Bağımlılıkları yükle:
```bash
npm install
```

2. Development server'ı başlat:
```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacak.

## Sayfalar

- `/login` - Giriş sayfası (hardcoded: admin/admin123)
- `/list` - Kullanıcı listeleme sayfası
- `/form` - Yeni kullanıcı ekleme formu
- `/update` - Kullanıcı güncelleme sayfası (query: ?id=1)

## Önemli Notlar

- Backend server'ın `http://localhost:5000` adresinde çalışıyor olması gerekir
- Login bilgileri sessionStorage'da tutulur
- API çağrıları `lib/api.js` dosyasından yönetilir

