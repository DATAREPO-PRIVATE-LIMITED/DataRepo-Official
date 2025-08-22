import React, { useContext, useState } from 'react';
import {useAuth} from "../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  FaSearch, 
  FaCode, 
  FaDatabase, 
  FaRobot, 
  FaComments, 
  FaMoneyCheckAlt, 
  FaTools,
  FaCopy,
  FaExternalLinkAlt,
  FaBook,
  FaPlay,
  FaDownload
} from 'react-icons/fa';


const Docs = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

    const { user } = useAuth();

  const handleLogin = () => {
    navigate("/signin");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const categories = [
    { id: 'all', name: 'All APIs', icon: <FaCode /> },
    { id: 'communication', name: 'Communication', icon: <FaComments /> },
    { id: 'data', name: 'Data & Utility', icon: <FaDatabase /> },
    { id: 'ai', name: 'AI & ML', icon: <FaRobot /> },
    { id: 'finance', name: 'Finance', icon: <FaMoneyCheckAlt /> },
    { id: 'devtools', name: 'Developer Tools', icon: <FaTools /> },
  ];

  const apiDocs = [
    {
      id: 'communication',
      title: 'Communication APIs',
      description: 'Enable messaging, notifications, and real-time interactions',
      endpoints: [
        { method: 'POST', path: '/api/v1/messages/send', description: 'Send a message' },
        { method: 'GET', path: '/api/v1/messages/{id}', description: 'Get message details' },
        { method: 'PUT', path: '/api/v1/messages/{id}', description: 'Update message' },
        { method: 'DELETE', path: '/api/v1/messages/{id}', description: 'Delete message' },
      ],
      codeExample: `curl -X POST https://api.datarepo.com/v1/messages/send \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "user@example.com",
    "subject": "Hello World",
    "body": "This is a test message"
  }'`,
      pricing: '$0.1 per request'
    },
    {
      id: 'data',
      title: 'Data & Utility APIs',
      description: 'Access, process, and manage essential data for diverse industries',
      endpoints: [
        { method: 'GET', path: '/api/v1/data/validate', description: 'Validate data format' },
        { method: 'POST', path: '/api/v1/data/transform', description: 'Transform data structure' },
        { method: 'GET', path: '/api/v1/data/analytics', description: 'Get data analytics' },
      ],
      codeExample: `curl -X GET https://api.datarepo.com/v1/data/validate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
      pricing: '$0.2 per request'
    },
    {
      id: 'ai',
      title: 'AI & Machine Learning APIs',
      description: 'Add intelligence with AI models, automation, and smart predictions',
      endpoints: [
        { method: 'POST', path: '/api/v1/ai/analyze', description: 'Analyze text with AI' },
        { method: 'POST', path: '/api/v1/ai/predict', description: 'Get AI predictions' },
        { method: 'POST', path: '/api/v1/ai/classify', description: 'Classify content' },
      ],
      codeExample: `curl -X POST https://api.datarepo.com/v1/ai/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Sample text for analysis",
    "model": "sentiment-analysis"
  }'`,
      pricing: '$0.1 per request'
    },
    {
      id: 'finance',
      title: 'Finance & Business APIs',
      description: 'Power payments, accounting, analytics, and business workflows',
      endpoints: [
        { method: 'POST', path: '/api/v1/finance/calculate', description: 'Calculate financial metrics' },
        { method: 'GET', path: '/api/v1/finance/reports', description: 'Get financial reports' },
        { method: 'POST', path: '/api/v1/finance/validate', description: 'Validate financial data' },
      ],
      codeExample: `curl -X POST https://api.datarepo.com/v1/finance/calculate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "roi",
    "investment": 10000,
    "returns": 12000
  }'`,
      pricing: '$0.2 per request'
    },
    {
      id: 'devtools',
      title: 'Developer Utility APIs',
      description: 'Tools and services to speed up coding, testing, and integration',
      endpoints: [
        { method: 'POST', path: '/api/v1/dev/test', description: 'Test API endpoints' },
        { method: 'GET', path: '/api/v1/dev/status', description: 'Check API status' },
        { method: 'POST', path: '/api/v1/dev/webhook', description: 'Create webhook' },
      ],
      codeExample: `curl -X GET https://api.datarepo.com/v1/dev/status \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      pricing: '$0.2 per request'
    }
  ];

  const filteredDocs = apiDocs.filter(doc => 
    (activeCategory === 'all' || doc.id === activeCategory) &&
    (searchQuery === '' || 
     doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     doc.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6">
            API <span className="text-primary">Documentation</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Comprehensive guides
            {/* <span>examples, and reference for all our APIs and services</span> */}
          </p>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              onClick={handleSignup}
              size="lg"
              className="text-lg px-8 py-4 h-auto"
            >
              Get API Key
            </Button>
            {
              !user ? (<Button
              onClick={handleLogin}
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 h-auto"
            >
              Login to Access
            </Button>):("")
            }
            
          </div>
        </div>

        {/* Search and Filter
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative mb-6">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search APIs, endpoints, or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-lg py-3"
            />
          </div> */}
          
          {/* Category Filter */}
          {/* <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="flex items-center gap-2"
              >
                {category.icon}
                {category.name}
              </Button>
            ))}
          </div>
        </div> */}

        {/* API Documentation Grid */}
        {/* <div className="grid gap-8 max-w-6xl mx-auto">
          {filteredDocs.map((doc) => (
            <Card key={doc.id} className="overflow-hidden">
              <CardHeader className="bg-muted/30">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{doc.title}</CardTitle>
                    <p className="text-muted-foreground">{doc.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Pricing</div>
                    <div className="text-lg font-bold text-primary">{doc.pricing}</div>
                  </div>
                </div>
              </CardHeader> */}
              
              <CardContent className="p-6">
                {/* Endpoints */}
                {/* <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <FaCode />
                    API Endpoints */}
                  {/* </h3> */}
                  {/* <div className="space-y-2">
                    {doc.endpoints.map((endpoint, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                        <span className={`px-2 py-1 rounded text-xs font-mono ${
                          endpoint.method === 'GET' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {endpoint.method}
                        </span>
                        <code className="text-sm font-mono bg-background px-2 py-1 rounded">
                          {endpoint.path}
                        </code>
                        <span className="text-muted-foreground text-sm">
                          {endpoint.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div> */}

                {/* Code Example */}
                {/* <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <FaPlay />
                    Code Example
                  </h3>
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{doc.codeExample}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(doc.codeExample)}
                    >
                      <FaCopy className="w-4 h-4" />
                    </Button>
                  </div>
                </div> */}

                {/* Quick Actions */}
                {/* <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <FaBook />
                    Full Documentation
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <FaPlay />
                    Try it Live
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <FaDownload />
                    SDK Download
                  </Button>
                </div> */}
              </CardContent>
          {/* /  </Card>
          ))} */}
        </div>

        {/* Additional Resources */}
        {/* <div className="max-w-4xl mx-auto mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">Need More Help?</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Explore our comprehensive resources to get the most out of our APIs
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <FaBook />
                  API Reference
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <FaPlay />
                  Interactive Examples
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <FaExternalLinkAlt />
                  Community Forum
                </Button>
              </div>
            </CardContent>
          </Card>
        </div> */}
      </div>
    // </div>
  );
};

export default Docs;
