"""
Diabetes tahmin scriptini test etmek için örnek kullanım
"""

import subprocess
import json
import sys

# Test verisi (yeni veri setine göre)
test_data = {
    "gender": "Female",
    "age": 80.0,
    "hypertension": 0,
    "heart_disease": 1,
    "smoking_history": "never",
    "bmi": 25.19,
    "HbA1c_level": 6.6,
    "blood_glucose_level": 140.0
}

# JSON'a çevir
json_input = json.dumps(test_data)

print("="*60)
print("🧪 DIABETES TAHMİN TESTİ")
print("="*60)
print(f"\n📥 Test verisi:")
for key, value in test_data.items():
    print(f"  {key}: {value}")

print("\n" + "="*60)
print("🔮 TAHMİN SONUCU")
print("="*60)

try:
    # Python scriptini çalıştır
    result = subprocess.run(
        [sys.executable, "predict_diabetes.py", json_input],
        capture_output=True,
        text=True,
        check=True
    )
    
    # Sonucu parse et
    output = result.stdout.strip()
    prediction = json.loads(output)
    
    print(f"\n🎯 Risk Skoru: %{prediction['risk_score']}")
    print(f"📊 Risk Seviyesi: {prediction['risk_level']}")
    print(f"🎨 Risk Rengi: {prediction['risk_color']}")
    
    if prediction.get('factors'):
        print(f"\n⚠️ Risk Faktörleri:")
        for factor in prediction['factors']:
            print(f"  • {factor['name']}: %{factor['value']:.1f} - {factor['description']}")
    
    if prediction.get('recommendations'):
        print(f"\n💡 Öneriler:")
        for i, rec in enumerate(prediction['recommendations'], 1):
            print(f"  {i}. {rec}")
    
    print("\n✅ Test başarılı!")
    
except subprocess.CalledProcessError as e:
    print(f"\n❌ Hata oluştu:")
    print(f"STDOUT: {e.stdout}")
    print(f"STDERR: {e.stderr}")
    sys.exit(1)
except json.JSONDecodeError as e:
    print(f"\n❌ JSON parse hatası: {e}")
    sys.exit(1)
except Exception as e:
    print(f"\n❌ Beklenmeyen hata: {e}")
    sys.exit(1)
