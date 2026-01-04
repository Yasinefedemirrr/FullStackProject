# Full Stack Proje - Node.js + Next.js + PostgreSQL

Bu proje, staj defteri için hazırlanmış tam stack bir uygulamadır.

## 📋 Proje Yapısı

```
Node.jsProje/
├── backend/          # Node.js + Express + PostgreSQL API
│   ├── config/       # Veritabanı bağlantı ayarları
│   ├── routes/       # API route'ları
│   ├── server.js     # Express server
│   └── database.sql  # Veritabanı tablo scripti
│
└── frontend/         # Next.js + React Frontend
    ├── pages/        # Next.js sayfaları
    ├── lib/          # API helper fonksiyonları
    └── styles/       # CSS stilleri
```

## 🚀 Kurulum ve Çalıştırma

### 1. Backend Kurulumu

```bash
cd backend
npm install
```

### 2. Veritabanı Kurulumu

PostgreSQL'de `FullProje` veritabanında tabloyu oluşturun:

```bash
psql -U postgres -d FullProje -f database.sql
```

veya pgAdmin üzerinden `backend/database.sql` dosyasını çalıştırın.

### 3. Backend'i Başlatma

```bash
cd backend
npm start
```

Backend `http://localhost:5000` adresinde çalışacak.

### 4. Frontend Kurulumu

Yeni bir terminal açın:

```bash
cd frontend
npm install
npm run dev
```

Frontend `http://localhost:3000` adresinde çalışacak.

## 🔐 Giriş Bilgileri

- **Kullanıcı Adı:** `admin`
- **Şifre:** `admin123`

## 📡 API Endpoints

- `GET /api/users` - Tüm kullanıcıları listele
- `GET /api/users/:id` - Tekil kullanıcı getir
- `POST /api/users` - Yeni kullanıcı ekle
- `PUT /api/users/:id` - Kullanıcı güncelle
- `DELETE /api/users/:id` - Kullanıcı sil

## 🗄️ Veritabanı Bilgileri

- **Host:** localhost
- **User:** postgres
- **Password:** yasin123
- **Database:** FullProje
- **Port:** 5432

## ✅ Özellikler

- ✅ Node.js + Express.js backend
- ✅ PostgreSQL veritabanı (pg paketi ile bağlantı)
- ✅ REST API (GET, POST, PUT, DELETE)
- ✅ Next.js frontend
- ✅ Login sayfası (hardcoded)
- ✅ Kullanıcı listeleme
- ✅ Kullanıcı ekleme formu
- ✅ Kullanıcı güncelleme sayfası
- ✅ Kullanıcı silme özelliği
- ✅ Gerçek veri akışı (Frontend → API → PostgreSQL)

## 📝 Staj Defteri İçin Notlar

Bu proje şu şekilde ifade edilebilir:

> "Node.js ve Express.js kullanılarak PostgreSQL veritabanına pg paketi ile bağlanan bir REST API geliştirildi."
> 
> "Geliştirilen API, Next.js kullanılarak oluşturulan frontend uygulamasına entegre edilerek veri listeleme, veri ekleme, veri güncelleme ve veri silme işlemleri gerçekleştirildi."

