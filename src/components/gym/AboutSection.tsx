
import { Dumbbell, Users, Clock } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">CLASSIC GYM TRAINING</h2>
          <div className="w-20 h-1 bg-gym-red mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6">Why Choose Kantipur Fitness Center?</h3>
            <p className="text-lg mb-6 text-gray-700">
              At Kantipur Fitness Center, we believe in the fundamentals of bodybuilding and strength training. 
              We've created a space where serious lifters can focus on what matters - 
              results through proven methods.
            </p>
            <p className="text-lg mb-6 text-gray-700">
              No fads, no shortcuts, just classic training principles that have stood the test of time.
              Our gym harnesses the spirit of the golden era of bodybuilding with modern equipment.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gym-light flex items-center justify-center mb-4">
                  <Dumbbell className="h-8 w-8 text-gym-red" />
                </div>
                <h4 className="font-bold mb-2">Quality Equipment</h4>
                <p className="text-sm text-gray-600">Premium free weights and machines</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gym-light flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-gym-red" />
                </div>
                <h4 className="font-bold mb-2">Expert Trainers</h4>
                <p className="text-sm text-gray-600">Experienced in classic training methods</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gym-light flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-gym-red" />
                </div>
                <h4 className="font-bold mb-2">Extended Hours</h4>
                <p className="text-sm text-gray-600">Train on your schedule</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -left-4 -top-4 w-full h-full border-2 border-gym-red"></div>
            <img 
              src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
              alt="Classic Gym Training" 
              className="w-full h-auto relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
