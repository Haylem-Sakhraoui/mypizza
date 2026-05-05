import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ClosedBanner } from "./components/ClosedBanner";
import { MenuNav } from "./components/MenuNav";
import { FrenchTacosSection } from "./components/FrenchTacosSection";
import { PizzaSection } from "./components/PizzaSection";
import { SnacksSection } from "./components/SnacksSection";
import { KinderMenuSection } from "./components/KinderMenuSection";
import { BurgersSection } from "./components/BurgersSection";
import { GetraenkeSection } from "./components/GetraenkeSection";
import { NachtischSection } from "./components/NachtischSection";
import { SpecialOffers } from "./components/SpecialOffers";
import { LocationContact } from "./components/LocationContact";
import { Footer } from "./components/Footer";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AllergeneModal } from "./components/AllergeneModal";
import { useStoreStatus } from "./lib/useBusinessHours";

export default function App() {
  const { open, reason } = useStoreStatus();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {!open && <ClosedBanner reason={reason} />}
      <Hero />
      <MenuNav />
      <KinderMenuSection />
      <ErrorBoundary><PizzaSection /></ErrorBoundary>
      <ErrorBoundary><FrenchTacosSection /></ErrorBoundary>
      <ErrorBoundary><SnacksSection /></ErrorBoundary>
      <ErrorBoundary><BurgersSection /></ErrorBoundary>
      <ErrorBoundary><GetraenkeSection /></ErrorBoundary>
      <ErrorBoundary><NachtischSection /></ErrorBoundary>
      <SpecialOffers />
      <LocationContact />
      <Footer />
      {/* Allergen modal — self-contained, opens via openAllergenModal() from anywhere */}
      <AllergeneModal />
    </div>
  );
}
