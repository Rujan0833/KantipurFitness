import Navbar from "@/components/gym/Navbar";
import HeroSection from "@/components/gym/HeroSection";
import AboutSection from "@/components/gym/AboutSection";
import MembershipSection from "@/components/gym/MembershipSection";
import FeaturesSection from "@/components/gym/FeaturesSection";
import CtaSection from "@/components/gym/CtaSection";
import Footer from "@/components/gym/Footer";
import ScrollButton from "@/components/gym/ScrollButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MembershipSection />
      <FeaturesSection />
      <CtaSection />
      <Footer />
      <ScrollButton />
    </div>
  );
};

export default Index;
