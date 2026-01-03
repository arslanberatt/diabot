function DiabetesAnalysisForm({ formData, handleChange, handleSubmit, loading }) {
  return (
    <div className="relative bg-white rounded-lg shadow-lg p-8 md:p-12 mb-8 overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full -mr-32 -mt-32 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100 rounded-full -ml-32 -mb-32 opacity-20 blur-3xl"></div>
      
      <div className="relative z-10">

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="group">
              <label className="flex text-gray-700 font-semibold mb-2 items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Cinsiyet
              </label>
              <div className="relative">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-3 pl-10 border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-all appearance-none cursor-pointer hover:bg-gray-100 text-sm"
                  required
                >
                  <option value="Male">Erkek</option>
                  <option value="Female">Kadın</option>
                  <option value="Other">Diğer</option>
                </select>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="group">
              <label className="flex text-gray-700 font-semibold mb-2 items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Yaş
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-3 py-3 pl-10 border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-all hover:bg-gray-100 text-sm"
                  placeholder="Örn: 45"
                  min="0"
                  max="120"
                  required
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="group">
              <label className="flex text-gray-700 font-semibold mb-2 items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                BMI
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="bmi"
                  value={formData.bmi}
                  onChange={handleChange}
                  className="w-full px-3 py-3 pl-10 border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-all hover:bg-gray-100 text-sm"
                  placeholder="Örn: 25.5"
                  step="0.1"
                  min="0"
                  required
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="group">
              <label className="flex text-gray-700 font-semibold mb-2 items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                HbA1c (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="HbA1c_level"
                  value={formData.HbA1c_level}
                  onChange={handleChange}
                  className="w-full px-3 py-3 pl-10 border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-all hover:bg-gray-100 text-sm"
                  placeholder="Örn: 5.7"
                  step="0.1"
                  min="0"
                  required
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="group">
              <label className="flex text-gray-700 font-semibold mb-2 items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Kan Şekeri
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="blood_glucose_level"
                  value={formData.blood_glucose_level}
                  onChange={handleChange}
                  className="w-full px-3 py-3 pl-10 border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-all hover:bg-gray-100 text-sm"
                  placeholder="Örn: 100"
                  min="0"
                  required
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="group md:col-span-2 lg:col-span-2">
              <label className="flex text-gray-700 font-semibold mb-2 items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Sigara Geçmişi
              </label>
              <div className="relative">
                <select
                  name="smoking_history"
                  value={formData.smoking_history}
                  onChange={handleChange}
                  className="w-full px-3 py-3 pl-10 border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-all appearance-none cursor-pointer hover:bg-gray-100 text-sm"
                  required
                >
                  <option value="never">Hiç İçmedim</option>
                  <option value="former">Eskiden İçtim</option>
                  <option value="current">Halen İçiyorum</option>
                  <option value="not_current">Şu An İçmiyorum</option>
                  <option value="no_info">Bilgi Yok</option>
                </select>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <label className="group relative flex items-center p-4 border-2 border-gray-200 rounded-md cursor-pointer transition-all hover:border-blue-300 hover:bg-blue-50 hover:shadow-md">
              <input
                type="checkbox"
                name="hypertension"
                checked={formData.hypertension === 1}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer transition-all"
              />
              <div className="ml-3 flex-1">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-900 font-semibold text-sm">Hipertansiyon</span>
                </div>
              </div>
            </label>

            <label className="group relative flex items-center p-4 border-2 border-gray-200 rounded-md cursor-pointer transition-all hover:border-blue-300 hover:bg-blue-50 hover:shadow-md">
              <input
                type="checkbox"
                name="heart_disease"
                checked={formData.heart_disease === 1}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer transition-all"
              />
              <div className="ml-3 flex-1">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-gray-900 font-semibold text-sm">Kalp Rahatsızlığı</span>
                </div>
              </div>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="relative w-full bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white px-8 py-4 rounded-md font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Analiz Yapılıyor...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Analiz Et</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default DiabetesAnalysisForm;
