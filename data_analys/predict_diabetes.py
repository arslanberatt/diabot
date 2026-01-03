import sys
import json
import joblib
import pandas as pd
import os
import io
import base64

# Windows terminal encoding sorununu çöz
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

try:
    # MUTLAK YOLLARI KULLAN
    script_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(script_dir, "models", "best_diabetes_model.pkl")
    encoder_path = os.path.join(script_dir, "models", "diabetes_label_encoders.pkl")
    feature_order_path = os.path.join(script_dir, "models", "diabetes_feature_order.pkl")

    # Debug bilgisi - Başlangıç
    print(f"DEBUG: Python script started. Arguments: {sys.argv}", file=sys.stderr)

    if not os.path.exists(model_path):
        print(f"DEBUG: Model file missing at {model_path}", file=sys.stderr)
        raise FileNotFoundError(f"Model bulunamadı: {model_path}")

    if not os.path.exists(encoder_path):
        print(f"DEBUG: Encoder file missing at {encoder_path}", file=sys.stderr)
        raise FileNotFoundError(f"Encoder bulunamadı: {encoder_path}")

    if not os.path.exists(feature_order_path):
        print(f"DEBUG: Feature order file missing at {feature_order_path}", file=sys.stderr)
        raise FileNotFoundError(f"Feature order bulunamadı: {feature_order_path}")

    # Model, encoder ve feature order'ı yükle
    print("DEBUG: Loading model...", file=sys.stderr)
    model = joblib.load(model_path)
    label_encoders = joblib.load(encoder_path)
    feature_order = joblib.load(feature_order_path)
    print("DEBUG: Model loaded.", file=sys.stderr)

    # Frontend'den gelen veriyi al (base64 encoded)
    try:
        encoded_input = sys.argv[1]
        print(f"DEBUG: Encoded input received: {encoded_input[:50]}...", file=sys.stderr)
        # Decode base64
        decoded_input = base64.b64decode(encoded_input).decode('utf-8')
        print(f"DEBUG: Decoded input: {decoded_input}", file=sys.stderr)
        user_data = json.loads(decoded_input)
    except (IndexError, json.JSONDecodeError, Exception) as e:
        print(f"DEBUG: Error parsing input: {e}", file=sys.stderr)
        raise

    # Eksik alanları varsayılan değerlerle doldur
    default_data = {
        "gender": "Male",
        "age": 45.0,
        "hypertension": 0,
        "heart_disease": 0,
        "smoking_history": "never",
        "bmi": 25.0,
        "HbA1c_level": 5.5,
        "blood_glucose_level": 100.0
    }

    # Kullanıcı verisini varsayılan verilerle birleştir
    for key, value in default_data.items():
        if key not in user_data:
            print(f"DEBUG: Missing key '{key}', using default: {value}", file=sys.stderr)
            user_data[key] = value

    print(f"DEBUG: Processed user data: {user_data}", file=sys.stderr)

    df = pd.DataFrame([user_data])

    categorical_cols = ["gender", "smoking_history"]
    
    for col in categorical_cols:
        if col in df.columns and col in label_encoders:
            try:
                print(f"DEBUG: Encoding column '{col}' with value '{df[col].iloc[0]}'", file=sys.stderr)
                value = str(df[col].iloc[0])
                if value in label_encoders[col]:
                    df[col] = label_encoders[col][value]
                else:
                    default_val = list(label_encoders[col].values())[0]
                    print(f"DEBUG: Unknown label '{value}', using default: {default_val}", file=sys.stderr)
                    df[col] = default_val
            except Exception as e:
                print(f"DEBUG: Error encoding {col}: {e}", file=sys.stderr)
                default_val = list(label_encoders[col].values())[0]
                df[col] = default_val

    # Eksik sütunları ekle
    for col in feature_order:
        if col not in df.columns:
            print(f"DEBUG: Missing expected column '{col}' before prediction.", file=sys.stderr)
            df[col] = 0

    df = df[feature_order]
    print(f"DEBUG: DataFrame ready for prediction:\n{df}", file=sys.stderr)

    diabetes_prob = model.predict_proba(df)[0][1]  # Diabetes olasılığı
    diabetes_percent = round(diabetes_prob * 100, 1)
    print(f"DEBUG: Prediction success. Probability: {diabetes_prob}", file=sys.stderr)

    if diabetes_percent >= 70:
        risk_level = "YÜKSEK"
        risk_color = "red"
    elif diabetes_percent >= 40:
        risk_level = "ORTA"
        risk_color = "orange"
    else:
        risk_level = "DÜŞÜK"
        risk_color = "green"

    data_path = os.path.join(script_dir, "data", "diabetes_prediction_dataset.csv")
    df_full = pd.read_csv(data_path, delimiter=",")
    
    df_no_diabetes = df_full[df_full["diabetes"] == 0]
    
    factors = []
    
    median_hba1c = df_no_diabetes["HbA1c_level"].median()
    user_hba1c = float(user_data.get("HbA1c_level", 5.5))
    if user_hba1c > 0 and user_hba1c > median_hba1c:
        hba1c_diff_percent = ((user_hba1c - median_hba1c) / median_hba1c) * 100
        hba1c_risk = min(max(round(hba1c_diff_percent, 1), 5), 100)
        if hba1c_risk >= 5:
            factors.append({
                "name": "HbA1c Seviyesi",
                "value": hba1c_risk,
                "impact": "Critical" if user_hba1c > 6.5 else "High" if hba1c_risk > 30 else "Medium",
                "description": f"HbA1c değeriniz ({user_hba1c:.1f}%) medyandan ({median_hba1c:.1f}%) %{hba1c_risk:.1f} yüksek."
            })
    
    median_glucose = df_no_diabetes["blood_glucose_level"].median()
    user_glucose = float(user_data.get("blood_glucose_level", 100))
    if user_glucose > 0 and user_glucose > median_glucose:
        glucose_diff_percent = ((user_glucose - median_glucose) / median_glucose) * 100
        glucose_risk = min(max(round(glucose_diff_percent, 1), 5), 100)
        if glucose_risk >= 5:
            factors.append({
                "name": "Kan Şekeri Seviyesi",
                "value": glucose_risk,
                "impact": "Critical" if user_glucose > 126 else "High" if glucose_risk > 30 else "Medium",
                "description": f"Kan şekeriniz ({user_glucose:.1f} mg/dL) medyandan ({median_glucose:.1f} mg/dL) %{glucose_risk:.1f} yüksek."
            })
    
    median_bmi = df_no_diabetes["bmi"].median()
    user_bmi = float(user_data.get("bmi", 25))
    if user_bmi > 0 and user_bmi > median_bmi:
        bmi_diff_percent = ((user_bmi - median_bmi) / median_bmi) * 100
        bmi_risk = min(max(round(bmi_diff_percent, 1), 5), 100)
        if bmi_risk >= 5:
            factors.append({
                "name": "Vücut Kitle İndeksi (BMI)",
                "value": bmi_risk,
                "impact": "High" if bmi_risk > 25 else "Medium",
                "description": f"BMI değeriniz ({user_bmi:.1f}) medyandan ({median_bmi:.1f}) %{bmi_risk:.1f} yüksek."
            })
    
    median_age = df_no_diabetes["age"].median()
    user_age = float(user_data.get("age", 45))
    if user_age > 0 and user_age > median_age:
        age_diff_percent = ((user_age - median_age) / median_age) * 100
        age_risk = min(max(round(age_diff_percent, 1), 5), 100)
        if age_risk >= 5:
            factors.append({
                "name": "Yaş",
                "value": age_risk,
                "impact": "High" if age_risk > 30 else "Medium",
                "description": f"Yaşınız ({user_age:.0f}) medyandan ({median_age:.1f}) %{age_risk:.1f} yüksek."
            })
    
    if user_data.get("hypertension") == 1 or str(user_data.get("hypertension")) == "1":
        hypertension_rate = (df_no_diabetes["hypertension"] == 1).mean() * 100
        hypertension_risk = round(100 - hypertension_rate, 1)
        factors.append({
            "name": "Hipertansiyon",
            "value": min(hypertension_risk, 40),
            "impact": "Critical",
            "description": "Hipertansiyon diyabet riskini önemli ölçüde artırır."
        })
    
    if user_data.get("heart_disease") == 1 or str(user_data.get("heart_disease")) == "1":
        heart_disease_rate = (df_no_diabetes["heart_disease"] == 1).mean() * 100
        heart_risk = round(100 - heart_disease_rate, 1)
        factors.append({
            "name": "Kalp Hastalığı",
            "value": min(heart_risk, 45),
            "impact": "Critical",
            "description": "Kalp hastalığı diyabet riskini önemli ölçüde artırır."
        })
    
    user_smoking = str(user_data.get("smoking_history", "never"))
    if user_smoking == "current":
        smoking_rate = (df_no_diabetes["smoking_history"] == "current").sum() / len(df_no_diabetes) * 100
        smoking_risk = round(100 - smoking_rate, 1)
        factors.append({
            "name": "Sigara Kullanımı",
            "value": min(smoking_risk, 25),
            "impact": "High",
            "description": "Aktif sigara kullanımı diyabet riskini artırır."
        })
    elif user_smoking == "former":
        factors.append({
            "name": "Sigara Geçmişi",
            "value": 10,
            "impact": "Medium",
            "description": "Geçmişte sigara kullanımı diyabet riskini artırır."
        })
    
    if len(factors) > 0:
        factors.sort(key=lambda x: x["value"], reverse=True)

    # Önerileri risk seviyesine göre özelleştir
    recommendations = []
    if risk_level == "YÜKSEK":
        recommendations = [
            "Acil olarak bir sağlık uzmanına danışın",
            "Düzenli kan şekeri takibi yapın (günde 2-3 kez)",
            "Sağlıklı beslenme planı oluşturun (düşük karbonhidrat, yüksek lif)",
            "Düzenli fiziksel aktivite yapın (haftada en az 150 dakika)",
            "Kilo kontrolü sağlayın (hedef BMI: 18.5-25)",
            "Stres yönetimi teknikleri öğrenin",
            "Düzenli sağlık kontrolleri yaptırın (3 ayda bir)"
        ]
    elif risk_level == "ORTA":
        recommendations = [
            "Bir sağlık uzmanına danışın",
            "Düzenli kan şekeri takibi yapın (haftada 2-3 kez)",
            "Sağlıklı beslenme alışkanlıkları edinin",
            "Düzenli fiziksel aktivite yapın (haftada en az 150 dakika)",
            "Kilo kontrolü sağlayın",
            "Düzenli sağlık kontrolleri yaptırın (6 ayda bir)"
        ]
    else:
        recommendations = [
            "Düzenli kan şekeri takibi yapın (ayda 1-2 kez)",
            "Sağlıklı beslenme alışkanlıkları edinin",
            "Düzenli fiziksel aktivite yapın",
            "Kilo kontrolü sağlayın",
            "Düzenli sağlık kontrolleri yaptırın (yılda bir)"
        ]

    # Sonucu JSON olarak döndür
    result = {
        "risk_score": diabetes_percent,
        "risk_level": risk_level,
        "risk_color": risk_color,
        "factors": factors,
        "recommendations": recommendations,
    }

    print(json.dumps(result))
    sys.stdout.flush()
    print("DEBUG: Result sent to stdout.", file=sys.stderr)

except Exception as e:
    error_msg = f"INTERNAL ERROR: {str(e)}"
    print(f"DEBUG: {error_msg}", file=sys.stderr)
    import traceback
    print(f"DEBUG: Traceback: {traceback.format_exc()}", file=sys.stderr)
    error_result = {"error": str(e), "type": type(e).__name__}
    print(json.dumps(error_result))
    sys.exit(1)
