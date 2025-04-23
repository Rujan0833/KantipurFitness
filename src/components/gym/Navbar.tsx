import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dumbbell, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

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
        
        <div>
          {isLoggedIn ? (
            <Button 
              onClick={handleLogout}
              className="bg-gym-red hover:bg-red-700 transition-colors"
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button className="bg-gym-red hover:bg-red-700 transition-colors">
                Join Now
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
