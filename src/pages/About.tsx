
import Navbar from "@/components/gym/Navbar";
import AboutSection from "@/components/gym/AboutSection";
import Footer from "@/components/gym/Footer";
import ScrollButton from "@/components/gym/ScrollButton";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="bg-gym-dark text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">ABOUT US</h1>
          <p className="text-xl max-w-3xl">
            Learn more about Kantipur Fitness Center's philosophy, history, and commitment to classic strength training.
          </p>
        </div>
      </div>
      <AboutSection />
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">OUR HISTORY</h2>
            <div className="w-20 h-1 bg-gym-red mb-8"></div>
            <p className="text-lg mb-6">
              Established in 2010, Kantipur Fitness Center was founded by a group of fitness enthusiasts who believed in the power of traditional strength training principles. Our gym started as a small facility with basic equipment but a strong vision.
            </p>
            <p className="text-lg mb-6">
              Over the years, we've expanded our space and upgraded our equipment, but we've never lost sight of our core values: dedication, discipline, and results. We've grown into one of the most respected strength training facilities in the region.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <img 
                src="https://images.unsplash.com/photo-1534258936925-c58bed479fcb" 
                alt="Gym Equipment" 
                className="w-full h-auto rounded-lg"
              />
              <div>
                <h3 className="text-2xl font-bold mb-4">OUR MISSION</h3>
                <div className="w-12 h-1 bg-gym-red mb-4"></div>
                <p className="mb-4">
                  At Kantipur Fitness Center, our mission is to provide a no-nonsense training environment where serious lifters can focus on what truly matters - consistent progress through proven methods.
                </p>
                <p>
                  We believe in creating a community of like-minded individuals who value hard work, proper technique, and sustainable results over flashy trends and quick fixes.
                </p>
                <Button className="mt-6 bg-gym-red hover:bg-red-700">
                  Join Our Community <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollButton />
    </div>
  );
};

export default About;
