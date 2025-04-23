import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { message, plan } = location.state || {};

  if (!plan) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gym-light flex items-center justify-center py-12 px-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Thank You!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-lg">
            {message || "Your payment has been processed successfully!"}
          </p>
          <div className="bg-gray-50 p-4 rounded-lg text-left">
            <h3 className="font-semibold mb-2">Membership Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Plan:</span>
                <span className="font-medium">{plan.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-medium">{plan.duration}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount Paid:</span>
                <span className="font-medium">
                  NPR {plan.admissionFee ? plan.price + plan.admissionFee : plan.price}
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-600">
            A confirmation email has been sent to your registered email address.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            className="bg-gym-red hover:bg-red-700"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentSuccess; 