-- FullProje veritabanı için users tablosu oluşturma scripti

-- Tabloyu oluştur
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Örnek veri ekle (opsiyonel)
INSERT INTO users (name, email) VALUES 
    ('Ahmet Yılmaz', 'ahmet@example.com'),
    ('Ayşe Demir', 'ayse@example.com'),
    ('Mehmet Kaya', 'mehmet@example.com')
ON CONFLICT (email) DO NOTHING;

