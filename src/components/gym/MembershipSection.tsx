
import { Check, BadgeDollarSign, BadgePercent, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const MembershipSection = () => {
  return (
    <section id="memberships" className="py-20 bg-gym-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">MEMBERSHIP OPTIONS</h2>
          <div className="w-20 h-1 bg-gym-red mx-auto mb-6"></div>
          <p className="text-lg max-w-3xl mx-auto">
            Choose a membership plan that fits your training goals and commitment.
            All memberships include full access to our facilities and equipment.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Standard Membership */}
          <Card className="border border-gray-200 transition-all duration-300 hover:border-gym-red hover:shadow-lg hover:-translate-y-2">
            <CardHeader className="text-center border-b pb-6">
              <CardTitle className="text-2xl font-bold">Standard</CardTitle>
              <CardDescription>Monthly Membership</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex justify-center items-end mb-6">
                <span className="text-4xl font-bold">NPR 1,500</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-gym-red mr-2" />
                  <span>Full gym access</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-gym-red mr-2" />
                  <span>Basic fitness assessment</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-gym-red mr-2" />
                  <span>Locker access</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-gym-red mr-2" />
                  <span>NPR 1,000 admission fee</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gym-red hover:bg-red-700">
                Select Plan
              </Button>
            </CardFooter>
          </Card>
          
          {/* 3 Months */}
          <Card className="border border-gray-200 transition-all duration-300 hover:border-gym-red hover:shadow-lg hover:-translate-y-2">
            <CardHeader className="text-center border-b pb-6">
              <CardTitle className="text-2xl font-bold">3 Months</CardTitle>
              <CardDescription>Value Pack</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex justify-center items-end mb-6">
                <span className="text-4xl font-bold">NPR 4,000</span>
                <span className="text-gray-500 ml-2">/3 months</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-gym-red mr-2" />
                  <span>Full gym access</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-gym-red mr-2" />
                  <span>Fitness assessment</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-gym-red mr-2" />
                  <span>Locker access</span>
                </div>
                <div className="flex items-center">
                  <BadgePercent className="h-5 w-5 text-gym-red mr-2" />
                  <span>Save NPR 500</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gym-red hover:bg-red-700">
                Select Plan
              </Button>
            </CardFooter>
          </Card>
          
          {/* 6 Months */}
          <Card className="border-2 border-gym-red hover:shadow-lg transition-all duration-300 hover:-translate-y-2 relative">
            <div className="absolute top-0 right-0 bg-gym-red text-white px-4 py-1 text-sm font-bold">
              POPULAR
            </div>
            <CardHeader className="text-center border-b pb-6">
              <CardTitle className="text-2xl font-bold">6 Months</CardTitle>
              <CardDescription>Premium Pack</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex justify-center items-end mb-6">
                <span className="text-4xl font-bold">NPR 7,000</span>
                <span className="text-gray-500 ml-2">/6 months</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-gym-red mr-2" />
                  <span>Full gym access</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-gym-red mr-2" />
                  <span>Complete fitness assessment</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-gym-red mr-2" />
                  <span>Locker access</span>
                </div>
                <div className="flex items-center">
                  <BadgePercent className="h-5 w-5 text-gym-red mr-2" />
                  <span>Save NPR 2,000</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gym-red hover:bg-red-700">
                Select Plan
              </Button>
            </CardFooter>
          </Card>
          
          {/* 12 Months */}
          <Card className="border border-gray-200 transition-all duration-300 hover:border-gym-red hover:shadow-lg hover:-translate-y-2">
            <CardHeader className="text-center border-b pb-6">
              <CardTitle className="text-2xl font-bold">12 Months</CardTitle>
              <CardDescription>Annual Pack</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex justify-center items-end mb-6">
                <span className="text-4xl font-bold">NPR 13,000</span>
                <span className="text-gray-500 ml-2">/year</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-gym-red mr-2" />
                  <span>Full gym access</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-gym-red mr-2" />
                  <span>Advanced fitness assessment</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-gym-red mr-2" />
                  <span>Premium locker access</span>
                </div>
                <div className="flex items-center">
                  <BadgePercent className="h-5 w-5 text-gym-red mr-2" />
                  <span>Save NPR 5,000</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gym-red hover:bg-red-700">
                Select Plan
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-12 bg-white p-6 border border-gray-200 rounded-lg max-w-3xl mx-auto">
          <div className="flex items-start">
            <BadgeDollarSign className="h-10 w-10 text-gym-red mr-4 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold mb-2">One-time Admission Fee</h3>
              <p className="text-gray-700">
                All new members pay a one-time admission fee of <span className="font-bold">NPR 1,000</span> to 
                join Ironclad Gym. This fee covers your account setup and initial fitness consultation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
