
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="py-16 bg-gym-dark text-white relative">
      <div className="absolute inset-0 bg-black opacity-70"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}>
      </div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl font-bold mb-6">READY TO START YOUR JOURNEY?</h2>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          Join Kantipur Fitness Center today and experience the difference of a classic training environment
          focused on real results.
        </p>
        <Button className="bg-gym-red hover:bg-red-700 text-white px-10 py-6 text-lg">
          Join Now
        </Button>
      </div>
    </section>
  );
};

export default CtaSection;
