
import Navbar from "@/components/gym/Navbar";
import HeroSection from "@/components/gym/HeroSection";
import CtaSection from "@/components/gym/CtaSection";
import Footer from "@/components/gym/Footer";
import ScrollButton from "@/components/gym/ScrollButton";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">WELCOME TO KANTIPUR FITNESS CENTER</h2>
            <div className="w-20 h-1 bg-gym-red mx-auto mb-6"></div>
            <p className="text-lg max-w-3xl mx-auto">
              Your destination for serious training. We focus on classic strength training principles that produce real results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 hover:shadow-lg transition-shadow rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                alt="About Us"
                className="w-full h-48 object-cover rounded-md mb-6"
              />
              <h3 className="text-xl font-bold mb-3">OUR STORY</h3>
              <p className="text-gray-700 mb-4">
                Learn about our history, mission, and the principles that drive our fitness philosophy.
              </p>
              <Link to="/about" className="text-gym-red font-medium flex items-center justify-center hover:underline">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="text-center p-6 hover:shadow-lg transition-shadow rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                alt="Memberships"
                className="w-full h-48 object-cover rounded-md mb-6"
              />
              <h3 className="text-xl font-bold mb-3">MEMBERSHIP OPTIONS</h3>
              <p className="text-gray-700 mb-4">
                Explore our flexible membership options designed to fit your schedule and budget.
              </p>
              <Link to="/memberships" className="text-gym-red font-medium flex items-center justify-center hover:underline">
                View Plans <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="text-center p-6 hover:shadow-lg transition-shadow rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                alt="Features"
                className="w-full h-48 object-cover rounded-md mb-6"
              />
              <h3 className="text-xl font-bold mb-3">GYM FEATURES</h3>
              <p className="text-gray-700 mb-4">
                Discover our high-quality equipment, dedicated training areas, and premium amenities.
              </p>
              <Link to="/features" className="text-gym-red font-medium flex items-center justify-center hover:underline">
                See Features <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button className="bg-gym-red hover:bg-red-700">
              Join Now
            </Button>
          </div>
        </div>
      </section>
      
      <CtaSection />
      <Footer />
      <ScrollButton />
    </div>
  );
};

export default Index;
