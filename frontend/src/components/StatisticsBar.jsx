function StatisticsBar() {
  return (
    <section className="bg-blue-50 py-12">
      <div className="container px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">30M+</div>
            <div className="text-sm text-gray-600">Küresel Kullanıcı</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">%30</div>
            <div className="text-sm text-gray-600">Tasarruf Oranı</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">$100M</div>
            <div className="text-sm text-gray-600">Toplanan Sermaye</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">60+</div>
            <div className="text-sm text-gray-600">Ekip Üyesi</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatisticsBar

