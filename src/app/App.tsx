import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { MenuNav } from "./components/MenuNav";
import { FrenchTacosSection } from "./components/FrenchTacosSection";
import { PizzaSection } from "./components/PizzaSection";
import { SnacksSection } from "./components/SnacksSection";
import { KinderMenuSection } from "./components/KinderMenuSection";
import { BurgersSection } from "./components/BurgersSection";
import { SpecialOffers } from "./components/SpecialOffers";
import { SaucesSection } from "./components/SaucesSection";
import { BuildYourPizza } from "./components/BuildYourPizza";
import { LocationContact } from "./components/LocationContact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <MenuNav />
      <FrenchTacosSection />
      <PizzaSection />
      <SpecialOffers />
      <SnacksSection />
      <KinderMenuSection />
      <BurgersSection />
      <SaucesSection />
      <BuildYourPizza />
      <LocationContact />
      <Footer />
    </div>
  );
}
