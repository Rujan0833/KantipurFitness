
import Navbar from "@/components/gym/Navbar";
import MembershipSection from "@/components/gym/MembershipSection";
import Footer from "@/components/gym/Footer";
import ScrollButton from "@/components/gym/ScrollButton";
import { Button } from "@/components/ui/button";

const Memberships = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="bg-gym-dark text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">MEMBERSHIP PLANS</h1>
          <p className="text-xl max-w-3xl">
            Find the perfect membership option for your fitness journey at Kantipur Fitness Center.
          </p>
        </div>
      </div>
      <MembershipSection />
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">MEMBERSHIP FAQ</h2>
            <div className="w-20 h-1 bg-gym-red mb-8"></div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-2">How do I sign up for a membership?</h3>
                <p>
                  You can sign up for a membership by visiting our gym during operating hours or by contacting us via phone. Our staff will guide you through the registration process, explain the available options, and help you choose the best plan for your needs.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2">Can I freeze my membership?</h3>
                <p>
                  Yes, members can freeze their membership for up to 30 days per year due to medical reasons or extended travel. A small administrative fee may apply. Please contact our front desk for more information.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2">Is there a minimum contract period?</h3>
                <p>
                  Our monthly membership requires no long-term commitment. For 3-month, 6-month, and 12-month memberships, you are committing to the full duration of the plan. Early cancellations may be subject to a fee.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2">Do you offer family discounts?</h3>
                <p>
                  Yes, we offer a 10% discount on the second and subsequent family memberships when purchased together. Both members must reside at the same address and provide proof of residence.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button className="bg-gym-red hover:bg-red-700 px-8 py-6 text-lg">
                Join Kantipur Fitness Today
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollButton />
    </div>
  );
};

export default Memberships;
