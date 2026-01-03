import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.colors import ListedColormap
import warnings

warnings.filterwarnings('ignore')

data_path = "./data/diabetes_prediction_dataset.csv"

# Veri seti analizi için
df = pd.read_csv(data_path, delimiter=",")

print("="*60)
print("📊 DIABETES VERİ SETİ ANALİZİ")
print("="*60)

print(f"\n📏 Veri boyutu: {df.shape[0]} satır x {df.shape[1]} sütun\n")

# Veri tipi bilgileri ve null kontrolü
print("="*60)
print("📋 VERİ TİPİ BİLGİLERİ VE NULL KONTROLÜ")
print("="*60)
print(df.info())

# İstatistiksel bilgiler
print("\n" + "="*60)
print("📈 İSTATİSTİKSEL BİLGİLER")
print("="*60)
print(df.describe().T)

# Diabetes dağılımı
print("\n" + "="*60)
print("🎯 DİYABET DAĞILIMI")
print("="*60)
print(df['diabetes'].value_counts())
print(f"\nDiyabet oranı: {df['diabetes'].mean()*100:.2f}%")
print(f"Diyabet olmayan: {(1-df['diabetes'].mean())*100:.2f}%")

# Kategorik değişkenlerin dağılımı
print("\n" + "="*60)
print("📊 KATEGORİK DEĞİŞKEN DAĞILIMLARI")
print("="*60)

categorical_cols = ["gender", "smoking_history"]

for col in categorical_cols:
    if col in df.columns:
        print(f"\n{col}:")
        print(df[col].value_counts())

# İlk 10 satır
print("\n" + "="*60)
print("👀 İLK 10 SATIR")
print("="*60)
print(df.head(10))

# Eksik değer kontrolü
print("\n" + "="*60)
print("❓ EKSİK DEĞER KONTROLÜ")
print("="*60)
missing = df.isnull().sum()
if missing.sum() > 0:
    print("Eksik değerler:")
    print(missing[missing > 0])
else:
    print("✅ Eksik değer yok!")

# Korelasyon matrisi (numerik değişkenler için)
print("\n" + "="*60)
print("🔗 KORELASYON MATRİSİ")
print("="*60)
numeric_cols = df.select_dtypes(include=[np.number]).columns
correlation = df[numeric_cols].corr()
print(correlation)

# Korelasyon görselleştirmesi
plt.figure(figsize=(10, 8))
sns.heatmap(df[numeric_cols].corr(), annot=True, fmt=".2f", cmap="coolwarm", center=0)
plt.title("Korelasyon Matrisi (Numerik Değişkenler)", fontsize=14, fontweight='bold')
plt.tight_layout()
plt.savefig('diabetes_correlation_matrix.png', dpi=150)
print("\n💾 Korelasyon matrisi kaydedildi: diabetes_correlation_matrix.png")
plt.close()

print("\n" + "="*60)
print("✅ ANALİZ TAMAMLANDI!")
print("="*60)
