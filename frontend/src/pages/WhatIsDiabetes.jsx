import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import AboutDiabetesSection from "../components/AboutDiabetesSection";
import DiabetesTypesSection from "../components/DiabetesTypesSection";
import DiabetesSymptomsSection from "../components/DiabetesSymptomsSection";

function WhatIsDiabetes() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        title="Diyabet Nedir?"
        subtitle="Diyabet, vücudunuzun kan şekerini (glikoz) nasıl kullandığını etkileyen kronik bir sağlık durumudur."
      />

      <main className="py-12 md:py-20">
        <AboutDiabetesSection />
        <DiabetesTypesSection />
        <DiabetesSymptomsSection />
      </main>

      <Footer />
    </div>
  );
}

export default WhatIsDiabetes;
