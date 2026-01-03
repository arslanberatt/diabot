function AboutUsSection() {
  return (
    <section className="py-12 md:py-20 bg-white px-12 max-w-8xl mx-auto overflow-hidden">
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="grid grid-cols-1 gap-3">
              <div className="col-span-1 w-full h-full">
                <img
                  src="diyabet.jpg"
                  alt="Patient Care"
                  className="w-full h-full object-cover rounded-md "
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Size için en iyi <span className="text-emerald-600">diyabet</span>{" "}
              tedavisini sunuyoruz
            </h2>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Diyabet ve sağlık; tıbbi tedaviler, koruyucu bakım, zihinsel
              sağlık ve fitness gibi konuları kapsayan geniş bir alandır.
            </p>

            {/* Founder Card */}
            <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src="otistik.webp"
                  alt="Founder"
                  className="w-14 h-auto rounded-md object-contain"
                />
                <div>
                  <p className="font-bold text-gray-900">
                    Prof. Dr. Murat Demir
                  </p>
                  <p className="text-sm text-gray-600">Diyabet Uzmanı</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">
                  Yardıma mı ihtiyacınız var?
                </p>
                <p className="text-lg font-bold text-gray-900">
                  (212) 555-0111
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsSection;
