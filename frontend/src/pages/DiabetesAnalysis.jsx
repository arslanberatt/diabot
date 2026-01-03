import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import DiabetesAnalysisForm from "../components/DiabetesAnalysisForm";
import AnalysisResults from "../components/AnalysisResults";
import ErrorAlert from "../components/ErrorAlert";

function DiabetesAnalysis() {
  const [formData, setFormData] = useState({
    gender: "Male",
    age: "",
    hypertension: 0,
    heart_disease: 0,
    smoking_history: "never",
    bmi: "",
    HbA1c_level: "",
    blood_glucose_level: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const resultsRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Virgülü noktaya çevir (Türkçe klavye desteği)
    const normalizedValue = type === "number" && value ? value.replace(",", ".") : value;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : normalizedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Form validasyonu
      if (!formData.age || !formData.bmi || !formData.HbA1c_level || !formData.blood_glucose_level) {
        throw new Error("Lütfen tüm alanları doldurun");
      }

      const age = parseFloat(formData.age);
      const bmi = parseFloat(formData.bmi);
      const hba1c = parseFloat(formData.HbA1c_level);
      const glucose = parseFloat(formData.blood_glucose_level);

      if (age < 0 || age > 120) {
        throw new Error("Yaş 0-120 arasında olmalıdır");
      }
      if (bmi < 10 || bmi > 60) {
        throw new Error("BMI 10-60 arasında olmalıdır");
      }
      if (hba1c < 0 || hba1c > 20) {
        throw new Error("HbA1c 0-20 arasında olmalıdır");
      }
      if (glucose < 0 || glucose > 500) {
        throw new Error("Kan şekeri 0-500 arasında olmalıdır");
      }

      const dataToSend = {
        gender: formData.gender,
        age: age,
        hypertension: formData.hypertension,
        heart_disease: formData.heart_disease,
        smoking_history: formData.smoking_history,
        bmi: bmi,
        HbA1c_level: hba1c,
        blood_glucose_level: glucose,
      };

      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      
      let response;
      try {
        response = await fetch(`${apiUrl}/api/diabetes/predict`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });
      } catch (fetchError) {
        throw new Error("Backend sunucusuna bağlanılamadı. Lütfen sunucunun çalıştığından emin olun.");
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || "Tahmin yapılırken bir hata oluştu");
      }

      const predictionResult = await response.json();
      setResult(predictionResult.data || predictionResult);
      
      // Scroll to results after a short delay
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      setError(err.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setFormData({
      gender: "Male",
      age: "",
      hypertension: 0,
      heart_disease: 0,
      smoking_history: "never",
      bmi: "",
      HbA1c_level: "",
      blood_glucose_level: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />

      <PageHero
        title="Diyabet Risk Analizi"
        subtitle="Makine öğrenmesi modelimiz ile diyabet riskinizi değerlendirin. Lütfen aşağıdaki bilgileri doldurun."
      />

      <main className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <DiabetesAnalysisForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
          />

          <ErrorAlert error={error} />

          <div ref={resultsRef}>
            {result && <AnalysisResults result={result} onReset={handleReset} />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default DiabetesAnalysis;
