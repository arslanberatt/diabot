# Diyobot - Diyabet Yönetim Platformu

Modern bir diyabet yönetim ve bilgilendirme platformu.

## Özellikler

- 🏠 **Ana Sayfa**: Diyabet hakkında genel bilgiler
- 📚 **Blog Sistemi**: MongoDB ile blog yazma ve yönetimi
- 🔍 **Diyabet Analizi**: Makine öğrenmesi ile diyabet risk analizi
- 👨‍💼 **Admin Paneli**: Blog yazma ve yönetim paneli (`/paneldoc`)

## Kurulum

### 1. Bağımlılıkları Yükleyin

```bash
npm install
cd frontend
npm install
```

### 2. Environment Variables

`.env` dosyası oluşturun (`.env.example` dosyasını referans alın):

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/diyabetcare
JWT_SECRET=your-secret-key-here
CORS_ORIGIN=*
```

### 3. MongoDB'yi Başlatın

Yerel MongoDB kullanıyorsanız:
```bash
# Windows
mongod

# Linux/Mac
sudo systemctl start mongod
```

Veya MongoDB Atlas kullanabilirsiniz.

### 4. Backend Server'ı Başlatın

```bash
npm run dev
```

### 5. Frontend'i Başlatın

Yeni bir terminal'de:

```bash
cd frontend
npm run dev
```

## Kullanım

### Admin Paneli

1. Tarayıcıda `http://localhost:5173/paneldoc` adresine gidin
2. "Kayıt Ol" sekmesinden yeni hesap oluşturun
3. Giriş yapın ve blog yazmaya başlayın

### API Endpoints

- `GET /api/blogs` - Tüm blogları getir
- `GET /api/blogs/:id` - Tek bir blog getir
- `POST /api/blogs` - Yeni blog oluştur (Auth gerekli)
- `PUT /api/blogs/:id` - Blog güncelle (Auth gerekli)
- `DELETE /api/blogs/:id` - Blog sil (Auth gerekli)
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi
- `POST /api/diabetes/predict` - Diyabet risk analizi

## Teknolojiler

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT
- **ML**: Python, scikit-learn, Random Forest

## Notlar

- MongoDB bağlantısı opsiyoneldir (server çalışmaya devam eder)
- İlk kullanıcıyı admin panelden oluşturabilirsiniz
- Diyabet analizi için Python script'leri `data_analys/` klasöründe

# diabot