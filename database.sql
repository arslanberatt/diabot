-- Veritabanı oluşturma (PostgreSQL'de çalıştırın)
-- CREATE DATABASE mydb;

-- Örnek users tablosu
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
);

-- Örnek veri ekleme (isteğe bağlı)
INSERT INTO users (name, email) VALUES 
  ('Ahmet Yılmaz', 'ahmet@example.com'),
  ('Ayşe Demir', 'ayse@example.com'),
  ('Mehmet Kaya', 'mehmet@example.com')
ON CONFLICT (email) DO NOTHING;

