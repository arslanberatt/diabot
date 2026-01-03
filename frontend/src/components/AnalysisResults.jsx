function AnalysisResults({ result, onReset }) {
  const getRiskColor = (level) => {
    switch (level) {
      case "YÜKSEK":
        return "text-red-600 bg-red-50";
      case "ORTA":
        return "text-orange-600 bg-orange-50";
      case "DÜŞÜK":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Analiz Sonuçları
      </h2>

      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-8 py-4 mb-4">
          <p className="text-sm font-semibold mb-1">Diyabet Risk Skoru</p>
          <p className="text-5xl font-bold">{result.risk_score}%</p>
        </div>
        <div
          className={`inline-block px-6 py-3 rounded-full font-semibold ${getRiskColor(
            result.risk_level
          )}`}
        >
          {result.risk_level} RİSK
        </div>
      </div>

      {result.factors && result.factors.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Risk Faktörleri
          </h3>
          <div className="space-y-4">
            {result.factors.map((factor, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">
                    {factor.name}
                  </span>
                  <span className="text-blue-600 font-bold">
                    %{factor.value}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{factor.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {result.recommendations && result.recommendations.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Öneriler</h3>
          <ul className="space-y-3">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start space-x-3">
                <svg
                  className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={onReset}
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold"
        >
          Yeni Analiz Yap
        </button>
      </div>
    </div>
  );
}

export default AnalysisResults;

