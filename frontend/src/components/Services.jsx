
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ExternalLink, Tag, Zap, Globe, BookOpen } from "lucide-react";

const Services = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogin = () => {
    navigate("/signin");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleViewDocs = () => {
    navigate("/docs");
  };





  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center ">
          <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Experience the benefits of our expertise that drives meaningful, game-powered results.
          </p>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            {!user ? (
              <>
                <Button
                  onClick={handleSignup}
                  size="lg"
                  className="text-lg px-8 py-4 h-auto"
                >
                  Get Started
                </Button>
                <Button
                  onClick={handleLogin}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 h-auto"
                >
                  Login to Access
                </Button>
              </>
            ) : (
              <Button
                onClick={handleViewDocs}
                size="lg"
                className="text-lg px-8 py-4 h-auto"
              >
                View Docs
              </Button>
            )}
          </div>
        </div>

      

      </div>
      
      {/* Sign Up Call to Action */}
      {/* {!user && (
        <Card className="text-center w-[50%] mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to Start Building?</CardTitle>
            <p className="text-muted-foreground">
              Join thousands of developers using our APIs to build amazing applications and services.
            </p>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleSignup}
              size="lg"
            >
              Start Building Today
            </Button>
          </CardContent>
        </Card>
      )} */}
    </div>
  );
};

export default Services;
