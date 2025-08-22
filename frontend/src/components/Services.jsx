import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaComments,
  FaDatabase,
  FaRobot,
  FaMoneyCheckAlt,
  FaTools,
} from "react-icons/fa";
import {
  FaCode,
  FaDollarSign,
  FaUsers,
  FaChartLine,
  FaCube,
} from "react-icons/fa";
import { MdWeb } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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

  const services = [
    {
      icon: <FaComments size={24} className="text-white" />,
      title: "Communication APIs",
      desc: "Enable messaging, notifications, and real-time interactions with ease.",
      extra1: "Keep your users connected anytime, anywhere.",
      extra2: "Scale effortlessly across platforms and devices.",
      cost: "0.1",
    },
    {
      icon: <FaDatabase size={24} className="text-white" />,
      title: "Data & Utility APIs",
      desc: "Access, process, and manage essential data for diverse industries.",
      extra1: "Simplify workflows and boost productivity.",
      extra2: "Get reliable, accurate data when you need it most.",
      cost: "0.2",
    },
    {
      icon: <FaRobot size={24} className="text-white" />,
      title: "AI & Machine Learning APIs",
      desc: "Add intelligence with AI models, automation, and smart predictions.",
      extra1: "Build smarter products that adapt and learn.",
      extra2: "Accelerate innovation without reinventing the wheel.",
      cost: "0.1",
    },
    {
      icon: <FaMoneyCheckAlt size={24} className="text-white" />,
      title: "Finance & Business APIs",
      desc: "Power payments, accounting, analytics, and business workflows.",
      extra1: "Enhance efficiency and streamline operations.",
      extra2: "Stay compliant while scaling securely.",
      cost: "0.2",
    },
    {
      icon: <FaTools size={24} className="text-white" />,
      title: "Developer Utility APIs",
      desc: "Tools and services to speed up coding, testing, and integration.",
      extra1: "Focus on building while we handle the heavy lifting.",
      extra2: "Save weeks of development time with ready-to-use solutions.",
      cost: "0.2",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Experience the benefits of our expertise that drives meaningful, game-powered results.
          </p>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow relative overflow-hidden">
              {/* Background detail: gray overlay */}
              <div className="absolute top-4 left-4 right-4 bottom-4 bg-muted/30 rounded-xl opacity-50"></div>

              {/* Icon circle */}
              <CardHeader className="relative z-10">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center border-2 border-primary/30 shadow-lg">
                    {service.icon}
                  </div>
                </div>
                <CardTitle className="text-center text-xl">{service.title}</CardTitle>
              </CardHeader>

              <CardContent className="relative z-10">
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {service.desc}
                </p>
                
                <div className="flex flex-col gap-2 mb-4">
                  <div>
                    <span className="font-bold">Cost: </span>
                    <span className="text-primary">${service.cost}/request</span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleViewDocs}
                >
                  View Docs
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        

      </div>
      
      {/* Sign Up Call to Action */}
      {!user && (
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
      )}
    </div>
  );
};

export default Services;
