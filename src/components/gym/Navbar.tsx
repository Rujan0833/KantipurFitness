
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dumbbell } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white py-4 px-6 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Dumbbell className="h-8 w-8 text-gym-red" />
          <Link to="/" className="text-2xl font-bold">KANTIPUR FITNESS CENTER</Link>
        </div>
        
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="font-medium hover:text-gym-red transition-colors">
            Home
          </Link>
          <Link to="/about" className="font-medium hover:text-gym-red transition-colors">
            About
          </Link>
          <Link to="/memberships" className="font-medium hover:text-gym-red transition-colors">
            Memberships
          </Link>
          <Link to="/features" className="font-medium hover:text-gym-red transition-colors">
            Features
          </Link>
        </div>
        
        <Button className="bg-gym-red hover:bg-red-700 transition-colors">
          Join Now
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
