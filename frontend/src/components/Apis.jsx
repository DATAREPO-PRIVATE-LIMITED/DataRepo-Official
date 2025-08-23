import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ExternalLink, Zap, Globe, BookOpen, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";

const Apis = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStoreRedirect = () => {
    navigate("/store");
  };

  const handleDocumentation = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyUrl = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      // You could add a toast notification here if you have one
      console.log('URL copied to clipboard');
    } catch (err) {
      console.error('Failed to copy URL: ', err);
    }
  };

  // Sample API data
  const sampleApis = [
    {
      id: 1,
      name: "Weather API",
      category: "Weather & Climate",
      description:
        "Get real-time weather data, forecasts, and historical weather information for any location worldwide.",
      features: [
        "Current weather",
        "5-day forecast",
        "Historical data",
        "Multiple locations",
      ],
      baseUrl: "https://api.weather.example.com",
      version: "2.1.0",
      pricing: "Free",
      costPerRequest: "$0.00",
      documentation: "https://docs.weather.example.com",
    },
    {
      id: 2,
      name: "Payment Gateway API",
      category: "Finance & Payments",
      description:
        "Secure payment processing with support for multiple payment methods and currencies.",
      features: [
        "Credit cards",
        "Digital wallets",
        "Bank transfers",
        "Multi-currency",
      ],
      baseUrl: "https://api.payments.example.com",
      version: "1.5.2",
      pricing: "Pay Per Use",
      costPerRequest: "$0.5",
      documentation: "https://docs.payments.example.com",
    },
    {
      id: 3,
      name: "AI Chatbot API",
      category: "Artificial Intelligence",
      description:
        "Advanced conversational AI with natural language processing and context awareness.",
      features: [
        "Natural language",
        "Context memory",
        "Multi-language",
        "Custom training",
      ],
      baseUrl: "https://api.chatbot.example.com",
      version: "3.0.1",
      pricing: "Pay Per Use",
      costPerRequest: "$0.03",
      documentation: "https://docs.chatbot.example.com",
    },
  ];
  return (
    <>
      {/* API Cards Section */}
      <div className="mt-20 w-[90%] mx-auto mb-15">
        <h2 className="text-3xl font-bold text-center mb-8">Available APIs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleApis.map((api) => (
            <Card
              key={api.id}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{api.name}</CardTitle>
                    <Badge variant="secondary" className="mb-2">
                      {api.category}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    v{api.version}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {api.description}
                </p>

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Key Features
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {api.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* API Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Base URL:</span>
                    <span className="font-mono text-xs break-all flex-1">
                      {api.baseUrl}
                    </span>
                    <Button
                      onClick={() => handleCopyUrl(api.baseUrl)}
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-muted"
                      title="Copy URL"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Pricing:</span>
                    <Badge variant="default" className="text-xs">
                      {api.pricing}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Cost/Request:</span>
                    <Badge variant="secondary" className="text-xs">
                      {api.costPerRequest}
                    </Badge>
                  </div>
                </div>

                {/* Documentation & Try Now */}
                <div className="pt-2 space-y-3">
                  <Button
                    onClick={() => handleDocumentation(api.documentation)}
                    variant="outline"
                    className="w-full"
                    size="sm"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Documentation
                  </Button>
                  <Button
                    onClick={handleStoreRedirect}
                    className="w-full"
                    size="sm"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Try Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Apis;
