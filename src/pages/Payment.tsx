import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Wallet, CreditCard, Banknote } from "lucide-react";

// Define Khalti types
interface KhaltiConfig {
  publicKey: string;
  productIdentity: string;
  productName: string;
  productUrl: string;
  amount: number;
  eventHandler: {
    onSuccess: (payload: KhaltiPayload) => void;
    onError: (error: Error) => void;
    onClose: () => void;
  };
  paymentPreference: string[];
}

interface KhaltiPayload {
  idx: string;
  amount: number;
  mobile: string;
  product_identity: string;
  product_name: string;
  token: string;
  status: string;
}

interface KhaltiError {
  code: string;
  message: string;
}

interface KhaltiCheckout {
  show: (options: { amount: number }) => void;
}

declare global {
  interface Window {
    KhaltiCheckout: new (config: KhaltiConfig) => KhaltiCheckout;
    checkout?: KhaltiCheckout;
  }
}

// Khalti live public key
const KHALTI_PUBLIC_KEY = "live_public_key_71fabdea54e44b29b43d251efe68b2fb";

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "khalti",
    name: "Khalti",
    icon: <img src="/payment/khalti-seeklogo.svg" alt="Khalti" className="h-8 w-auto" />,
    description: "Pay using Khalti digital wallet"
  },
  {
    id: "esewa",
    name: "eSewa",
    icon: <img src="/payment/esewa-seeklogo.svg" alt="eSewa" className="h-8 w-auto" />,
    description: "Pay using eSewa digital wallet"
  },
  {
    id: "cash",
    name: "Cash on Location",
    icon: <img src="/payment/file.svg" alt="Cash on Delivery" className="h-8 w-auto" />,
    description: "Pay at the gym during your first visit"
  }
];

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState<string>("khalti");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isKhaltiReady, setIsKhaltiReady] = useState(false);

  // Get plan details from location state
  const plan = location.state?.plan;

  // Load Khalti SDK script
  useEffect(() => {
    const loadKhaltiScript = async () => {
      try {
        // Check if script is already loaded
        if (document.querySelector('script[src*="khalti-checkout.iffe.js"]')) {
          setIsKhaltiReady(true);
          return;
        }

        const script = document.createElement('script');
        script.src = "https://khalti.s3.ap-south-1.amazonaws.com/KPG/dist/2020.12.22.0.0.0/khalti-checkout.iffe.js";
        script.async = true;
        
        script.onload = () => {
          console.log("Khalti SDK loaded successfully");
          setIsKhaltiReady(true);
        };
        
        script.onerror = () => {
          console.error("Failed to load Khalti SDK");
          toast({
            title: "Payment System Error",
            description: "Failed to load payment system. Please try again later.",
            variant: "destructive",
          });
          setIsKhaltiReady(false);
        };

        document.body.appendChild(script);
      } catch (error) {
        console.error("Error loading Khalti SDK:", error);
        setIsKhaltiReady(false);
      }
    };

    loadKhaltiScript();

    return () => {
      const script = document.querySelector('script[src*="khalti-checkout.iffe.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [toast]);

  // Initialize Khalti
  useEffect(() => {
    if (!window.KhaltiCheckout) return;

    try {
      // Initialize Khalti configuration
      const config: KhaltiConfig = {
        publicKey: KHALTI_PUBLIC_KEY,
        productIdentity: "KF-GYM-001",
        productName: plan?.name || "Gym Membership",
        productUrl: "https://kantipurfitness.com",
        amount: plan ? (plan.admissionFee ? plan.price + plan.admissionFee : plan.price) * 100 : 0,
        eventHandler: {
          onSuccess: (payload: KhaltiPayload) => {
            console.log("Payment successful:", payload);
            navigate('/payment-success', {
              state: {
                message: "Your payment has been processed successfully!",
                plan: plan,
                transactionId: payload.idx
              }
            });
          },
          onError: (error: Error) => {
            console.error("Payment error:", error);
            toast({
              title: "Payment Failed",
              description: error.message || "There was an error processing your payment. Please try again.",
              variant: "destructive",
            });
            setIsProcessing(false);
          },
          onClose: () => {
            console.log("Khalti widget closed");
            setIsProcessing(false);
          }
        },
        paymentPreference: ["KHALTI"]
      };

      // Create new Khalti checkout instance
      const checkout = new window.KhaltiCheckout(config);
      window.checkout = checkout;

    } catch (error) {
      console.error("Error initializing Khalti:", error);
      toast({
        title: "Payment System Error",
        description: "Failed to initialize payment system. Please try again later.",
        variant: "destructive",
      });
    }
  }, [plan, navigate, toast]);

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center">No plan selected. Please choose a membership plan first.</p>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-gym-red hover:bg-red-700"
              onClick={() => navigate('/')}
            >
              Go Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const handlePayment = async () => {
    if (selectedMethod === "khalti") {
      if (!window.checkout) {
        toast({
          title: "Payment System Error",
          description: "Payment system not initialized. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      try {
        window.checkout.show({ amount: plan ? (plan.admissionFee ? plan.price + plan.admissionFee : plan.price) * 100 : 0 });
      } catch (error) {
        console.error('Payment error:', error);
        toast({
          title: "Payment Failed",
          description: "There was an error processing your payment. Please try again.",
          variant: "destructive",
        });
      }
    } else if (selectedMethod === "esewa") {
      // TODO: Implement eSewa integration
      toast({
        title: "eSewa Coming Soon",
        description: "eSewa integration will be available soon!",
      });
      setIsProcessing(false);
      
    } else if (selectedMethod === "cash") {
      // Handle cash payment
      navigate('/payment-success', { 
        state: { 
          message: "Please visit our gym with your ID to complete the registration.",
          plan: plan
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gym-light py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader className="space-y-2">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-center">Complete Your Payment</CardTitle>
            <CardDescription className="text-center text-sm sm:text-base">
              Secure payment for your membership
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 sm:space-y-8">
            {/* Plan Summary */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-4">Plan Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span>Plan:</span>
                  <span className="font-medium">{plan.name}</span>
                </div>
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span>Duration:</span>
                  <span className="font-medium">{plan.duration}</span>
                </div>
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span>Amount:</span>
                  <span className="font-medium">NPR {plan.price.toLocaleString()}</span>
                </div>
                {plan.admissionFee && (
                  <div className="flex justify-between items-center text-sm sm:text-base">
                    <span>Admission Fee:</span>
                    <span className="font-medium">NPR {plan.admissionFee.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between items-center font-bold text-base sm:text-lg">
                    <span>Total:</span>
                    <span>NPR {(plan.admissionFee ? plan.price + plan.admissionFee : plan.price).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-4">Select Payment Method</h3>
              <RadioGroup
                value={selectedMethod}
                onValueChange={setSelectedMethod}
                className="grid grid-cols-1 gap-4"
              >
                {paymentMethods.map((method) => (
                  <div 
                    key={method.id} 
                    className={`relative flex items-center rounded-lg border p-3 sm:p-4 transition-all
                      ${selectedMethod === method.id ? 'border-gym-red bg-red-50' : 'border-gray-200'}
                      hover:border-gym-red hover:bg-red-50`}
                  >
                    <RadioGroupItem value={method.id} id={method.id} className="absolute right-3 sm:right-4" />
                    <Label 
                      htmlFor={method.id} 
                      className="flex items-center space-x-3 sm:space-x-4 cursor-pointer w-full"
                    >
                      <div className="p-2 bg-white rounded-md shadow-sm flex items-center justify-center min-w-[48px] sm:min-w-[56px]">
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm sm:text-base">{method.name}</div>
                        <div className="text-xs sm:text-sm text-gray-500">{method.description}</div>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Terms and Conditions */}
            <div className="text-xs sm:text-sm text-gray-600">
              By proceeding with the payment, you agree to our{" "}
              <a href="/terms" className="text-gym-red hover:underline">
                Terms and Conditions
              </a>
              .
            </div>
          </CardContent>
          <CardFooter className="px-4 sm:px-6">
            <Button 
              className="w-full bg-gym-red hover:bg-red-700 py-6 text-base sm:text-lg"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                `Pay NPR ${(plan.admissionFee ? plan.price + plan.admissionFee : plan.price).toLocaleString()}`
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Payment;