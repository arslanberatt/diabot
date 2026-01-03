function AuthInfoCards() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 to-emerald-800 p-12 items-center justify-center">
      <div className="max-w-lg">
        <div className="text-white mb-12">
          <h2 className="text-5xl font-bold mb-4 leading-tight">
            Diyabet
            <br />
            Yönetimi
            <br />
            <span className="text-emerald-200">Geleceği</span>
          </h2>
          <p className="text-emerald-100 text-lg">
            Blog yazın, bilgi paylaşın ve diyabet farkındalığı yaratın
          </p>
        </div>

        {/* Info Cards */}
        <div className="space-y-4">
          <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-6 md:bottom-12 md:left-8 bg-white rounded-md sm:rounded-xl p-3 sm:p-4 shadow-xl max-w-[160px] sm:max-w-[180px] md:max-w-[200px]">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-xs sm:text-sm font-semibold text-gray-900">
                Kan Şekeri
              </span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
              <div>
                <div className="flex items-baseline space-x-1">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-600">
                    4.4
                  </span>
                  <span className="text-xs sm:text-sm text-gray-600">
                    mmol/L
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* HbA1c Card */}
          <div className="bg-white rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">HbA1c Seviyesi</div>
                  <div className="text-2xl font-bold text-gray-900">
                    5.5 <span className="text-sm text-gray-500">%</span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-400">Son ölçüm</div>
            </div>
            <div className="text-xs text-gray-500">
              Hedef: &lt; 7.0% (Diyabetli için)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthInfoCards;
