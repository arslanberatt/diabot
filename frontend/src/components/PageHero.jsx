function PageHero({ title, subtitle, ctaText, onCtaClick }) {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-600 to-emerald-600 text-white">
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl" />
      </div>

      <div className="relative container px-6 max-w-7xl mx-auto py-12 text-center">
        <span className="inline-block mb-6 px-4 py-1 text-sm font-semibold rounded-full bg-white/10 backdrop-blur">
          🚀 Sağlıklı Yaşam & Diyabet
        </span>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            {title}
          </span>
        </h1>

        <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed">
          {subtitle}
        </p>

        {ctaText && (
          <button
            onClick={onCtaClick}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-blue-700 font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition"
          >
            {ctaText}
            <span className="text-xl">→</span>
          </button>
        )}
      </div>
    </header>
  );
}

export default PageHero;
