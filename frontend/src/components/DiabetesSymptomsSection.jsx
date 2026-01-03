function DiabetesSymptomsSection() {
  const symptoms = [
    "Aşırı susama ve sık idrara çıkma",
    "Sürekli yorgunluk",
    "Açıklanamayan kilo kaybı",
    "Yavaş iyileşen yaralar",
  ];

  return (
    <section className="bg-white py-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Diyabet Belirtileri</h2>
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {symptoms.map((symptom, index) => (
          <div key={index} className="flex items-start space-x-3 bg-white p-4 rounded-lg">
            <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-700 font-medium">{symptom}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DiabetesSymptomsSection;

