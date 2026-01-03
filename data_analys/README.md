# Data Analysis & Machine Learning

CSV dosyalarını yükleyip machine learning modelleri ile eğitmek için proje.

## 📁 Klasör Yapısı

```
data_analys/
├── data/              # CSV dosyalarınızı buraya koyun
├── models/            # Eğitilmiş modeller (otomatik oluşturulur)
├── scripts/           # Çalıştırılabilir scriptler
│   ├── load_data.py   # CSV yükleme scripti
│   └── train_model.py # Model eğitimi scripti
├── utils/             # Yardımcı modüller
│   ├── data_loader.py      # CSV yükleme sınıfı
│   └── data_preprocessing.py # Veri ön işleme sınıfı
├── requirements.txt   # Python bağımlılıkları
└── README.md          # Bu dosya
```

## 🚀 Kurulum

### 1. Python Sanal Ortamı Oluştur (Önerilen)

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### 2. Bağımlılıkları Yükle

```bash
pip install -r requirements.txt
```

## 📊 Kullanım

### CSV Dosyası Yükleme

1. CSV dosyanızı `data/` klasörüne koyun
2. Scripti çalıştırın:

```bash
python scripts/load_data.py
```

Script size:
- Data klasöründeki CSV dosyalarını listeler
- Seçtiğiniz dosyayı yükler
- Veri hakkında detaylı bilgi gösterir (boyut, sütunlar, istatistikler, eksik değerler)

### Model Eğitimi

```bash
python scripts/train_model.py
```

Script size adım adım:
1. CSV dosyası seçimi
2. Model tipi seçimi (Classification veya Regression)
3. Hedef değişken (target) seçimi
4. Model algoritması seçimi
5. Model eğitimi ve değerlendirme
6. Model kaydetme seçeneği

## 🔧 Python'da Kullanım

### Veri Yükleme

```python
from utils.data_loader import DataLoader

loader = DataLoader(data_dir='data')
df = loader.load_csv('your_file.csv')
loader.get_info(df)
```

### Veri Ön İşleme

```python
from utils.data_preprocessing import DataPreprocessor

preprocessor = DataPreprocessor()

# Eksik değerleri doldur
df = preprocessor.handle_missing_values(df, strategy='mean')

# Kategorik değişkenleri encode et
df = preprocessor.encode_categorical(df, encoding='label')

# Özellikleri ölçeklendir
df = preprocessor.scale_features(df)
```

### Model Eğitimi

```python
from scripts.train_model import ModelTrainer

trainer = ModelTrainer(model_type='classification')
X_train, X_test, y_train, y_test = trainer.prepare_data(df, target_column='target')
trainer.train(X_train, y_train, model_name='random_forest')
trainer.evaluate(X_test, y_test)
trainer.save_model('my_model.pkl')
```

## 📦 Özellikler

### DataLoader
- ✅ CSV dosyalarını yükleme
- ✅ Birden fazla CSV dosyasını yükleme
- ✅ Veri bilgisi gösterme (boyut, sütunlar, istatistikler)
- ✅ Eksik değer analizi

### DataPreprocessor
- ✅ Eksik değer işleme (mean, median, mode, drop, fill)
- ✅ Kategorik değişken encoding (label, one-hot)
- ✅ Özellik ölçeklendirme (standardization)
- ✅ Aykırı değer temizleme (IQR, Z-score)
- ✅ Train-test split

### ModelTrainer
- ✅ Classification modelleri (Random Forest, Logistic Regression)
- ✅ Regression modelleri (Random Forest, Linear Regression)
- ✅ Model değerlendirme (accuracy, classification report, MSE, RMSE, R²)
- ✅ Model kaydetme (joblib)

## 📝 Örnek CSV Formatı

CSV dosyanız şu formatta olmalı:
- İlk satır: Sütun başlıkları
- Her satır: Bir veri kaydı
- Hedef değişken: Classification için kategorik, Regression için numerik

Örnek:
```csv
name,age,salary,department
Ahmet,25,50000,IT
Ayşe,30,60000,HR
Mehmet,28,55000,IT
```

## 🔍 Desteklenen Modeller

### Classification
- Random Forest Classifier
- Logistic Regression

### Regression
- Random Forest Regressor
- Linear Regression

## 💡 İpuçları

1. **CSV Dosyaları**: CSV dosyalarınızı `data/` klasörüne koyun
2. **Model Kaydetme**: Eğitilmiş modeller `models/` klasörüne kaydedilir
3. **Veri Ön İşleme**: Büyük veri setleri için preprocessing önemlidir
4. **Hedef Değişken**: Classification için kategorik, Regression için numerik olmalı

## 📚 Bağımlılıklar

- **pandas**: Veri manipülasyonu
- **numpy**: Numerik işlemler
- **scikit-learn**: Machine learning modelleri
- **matplotlib**: Görselleştirme
- **seaborn**: İstatistiksel görselleştirme
- **joblib**: Model kaydetme/yükleme

## 🐛 Sorun Giderme

- **CSV bulunamadı**: Dosyanın `data/` klasöründe olduğundan emin olun
- **Import hatası**: `pip install -r requirements.txt` çalıştırın
- **Memory hatası**: Büyük dosyalar için chunk size kullanın


