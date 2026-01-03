function HeroSection() {
  return (
    <section id="home" className="py-8 md:py-12 lg:py-20 px-4 sm:px-6">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              Her Diyabet İhtiyacı İçin
              <span className="block">
                Güvenilir{" "}
                <span className="text-emerald-600">Diyabet Bakımı</span>
              </span>
            </h1>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 md:mt-8 justify-center md:justify-start">
              <button className="flex items-center rounded-md overflow-hidden shadow-lg w-full sm:w-auto">
                <div className="bg-emerald-300 p-3 sm:p-4 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
                <div className="bg-gray-900 text-white px-6 sm:px-8 py-3 sm:py-4 font-semibold text-sm sm:text-base flex-1 text-center">
                  İletişime Geç
                </div>
              </button>
              <button className="flex items-center rounded-md overflow-hidden shadow-lg w-full sm:w-auto">
                <div className="bg-emerald-300 p-3 sm:p-4 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
                <div className="bg-gray-900 text-white px-6 sm:px-8 py-3 sm:py-4 font-semibold text-sm sm:text-base flex-1 text-center">
                  Doktor Bul
                </div>
              </button>
            </div>
          </div>

          <div className="relative mt-8 md:mt-0">
            <div className="relative">
              <img
                src="hero.webp"
                alt="Doktor"
                className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover rounded-md shadow-xl"
              />

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

              <div className="absolute top-4 right-4 sm:top-8 sm:right-6 md:top-12 md:right-4 bg-white rounded-md sm:rounded-xl p-3 sm:p-4 shadow-xl max-w-[160px] sm:max-w-[180px] md:max-w-[220px]">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-xs sm:text-sm font-semibold text-gray-900">
                    Kan Şekeri
                  </span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 sm:w-6 sm:h-6 text-red-600"
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
                      <span className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600">
                        72
                      </span>
                      <span className="text-xs sm:text-sm text-gray-600">
                        mg/dl
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3 justify-center">
              {[
                "Tip 1 Diyabet",
                "Tip 2 Diyabet",
                "Gestasyonel Diyabet",
                "Prediyabet",
              ].map((diabetesType, index) => (
                <div
                  key={index}
                  className="text-gray-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-emerald-50 transition font-medium text-xs sm:text-sm"
                >
                  {diabetesType}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
