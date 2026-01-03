function DiabetesTypesSection() {
  const types = [
    {
      id: 1,
      title: "Tip 1 Diyabet",
      description:
        "Vücudunuzun hiç insülin üretmediği otoimmün bir hastalıktır. Genellikle çocukluk veya ergenlik döneminde ortaya çıkar ve yaşam boyu insülin tedavisi gerektirir.",
      iconColor: "bg-blue-100",
      iconTextColor: "text-blue-600",
      bulletColor: "text-blue-600",
    },
    {
      id: 2,
      title: "Tip 2 Diyabet",
      description:
        "Vücudunuzun insülini etkili bir şekilde kullanamadığı veya yeterince üretemediği durumdur. En yaygın diyabet türüdür ve genellikle yetişkinlerde görülür.",
      iconColor: "bg-green-100",
      iconTextColor: "text-green-600",
      bulletColor: "text-green-600",
    },
    {
      id: 3,
      title: "Gestasyonel Diyabet",
      description:
        "Hamilelik sırasında ortaya çıkan bir diyabet türüdür. Genellikle doğumdan sonra kaybolur, ancak gelecekte Tip 2 diyabet riskini artırabilir.",
      iconColor: "bg-purple-100",
      iconTextColor: "text-purple-600",
      bulletColor: "text-purple-600",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <h2 className="text-4xl font-boldtext-gray-900 mb-12 text-center">
        Diyabet Türleri
      </h2>
      <div className="grid md:grid-cols-3 max-w-7xl mx-auto gap-8">
        {types.map((type) => (
          <div key={type.id} className="bg-white rounded-xl shadow-lg p-8">
            <div
              className={`w-16 h-16 ${type.iconColor} rounded-full flex items-center justify-center mb-6`}
            >
              <svg
                className={`w-8 h-8 ${type.iconTextColor}`}
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
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {type.title}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              {type.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DiabetesTypesSection;
