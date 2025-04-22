
import Navbar from "@/components/gym/Navbar";
import FeaturesSection from "@/components/gym/FeaturesSection";
import Footer from "@/components/gym/Footer";
import ScrollButton from "@/components/gym/ScrollButton";
import { CheckCircle } from "lucide-react";

const Features = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="bg-gym-dark text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">GYM FEATURES</h1>
          <p className="text-xl max-w-3xl">
            Discover the top-quality equipment and amenities available at Kantipur Fitness Center.
          </p>
        </div>
      </div>
      <FeaturesSection />
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">ADDITIONAL AMENITIES</h2>
            <div className="w-20 h-1 bg-gym-red mb-8"></div>
            
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-gym-red mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Drinking Water Station</h3>
                  <p className="text-gray-700">
                    Stay hydrated during your workouts with our filtered water station.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-gym-red mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Supplementation Counter</h3>
                  <p className="text-gray-700">
                    Purchase protein shakes, BCAAs, and other supplements to fuel your workouts.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-gym-red mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Free Parking</h3>
                  <p className="text-gray-700">
                    Ample parking space available for all members during gym hours.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-gym-red mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Chalk Station</h3>
                  <p className="text-gray-700">
                    Improve your grip strength with readily available lifting chalk.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-gym-red mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Storage Lockers</h3>
                  <p className="text-gray-700">
                    Secure storage for your personal belongings while you work out.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-gym-red mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Towel Service</h3>
                  <p className="text-gray-700">
                    Fresh towels available for premium and annual members.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-6">GYM POLICIES</h2>
              <div className="w-20 h-1 bg-gym-red mb-8"></div>
              
              <div className="space-y-4">
                <p className="text-lg">
                  <span className="font-bold">Equipment Care:</span> Please return all weights and equipment to their proper places after use.
                </p>
                <p className="text-lg">
                  <span className="font-bold">Attire:</span> Appropriate gym attire and closed-toe athletic shoes are required at all times.
                </p>
                <p className="text-lg">
                  <span className="font-bold">Hygiene:</span> Wiping down equipment after use is mandatory. Towels are available at the front desk.
                </p>
                <p className="text-lg">
                  <span className="font-bold">Conduct:</span> Respectful behavior towards staff and other members is expected at all times.
                </p>
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

export default Features;
