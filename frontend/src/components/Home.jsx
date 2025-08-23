import {
  FaDatabase,
  FaRobot,
  FaMoneyCheckAlt,
  FaTools,
  FaComments,
  FaCube,
} from "react-icons/fa";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { HiLightningBolt } from "react-icons/hi";
import Services from "./Services";
import Contact2 from "./Contact2";
import Contact from "./Contact";
import Stats from "./Stats";
import Reviews from "./Reviews";
import Marquee from "./Marquee";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Home = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render home content if user is authenticated (will redirect)
  if (user) {
    return null;
  }

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
    {
      icon: <FaCube size={24} className="text-white" />,
      title: "Cloud & Infrastructure APIs",
      desc: "Deploy, scale, and manage cloud resources and infrastructure seamlessly.",
      extra1: "Optimize performance and reduce operational overhead.",
      extra2: "Build resilient systems that grow with your business.",
      cost: "0.15",
    },
  ];

    const handleViewDocs = () => {
      navigate("/docs");
    };

  return (
    <>
      {/* Large Teal Text */}
      {/*  */}
      <div className="text-center">
        <h1 className="text-6xl mt-40"> Build Smarter, Launch Faster with </h1>
        <h2 className="text-[50px] text-primary mb-10 ">Pay-as-You-Use APIs</h2>
      </div>

      {/* Hero Section */}
      <section className=" text-card-foreground max-w-[850px] mx-auto rounded-xl mb-40 px-8 text-center ">
        {/* Banner */}
        <div className="inline-flex items-center gap-1 bg-card text-card-foreground text-xs rounded-xl px-4 py-1.5 mb-3 font-medium shadow ">
          <HiLightningBolt className="text-green-500" />
          Power Your Products with Next‑Gen APIs 🚀
        </div>

        {/* Headline */}
        <h1 className="text-sm md:text-2xl font-semibold m-0 leading-tight tracking-wider ">
          We help you integrate{" "}
          <span className="text-primary font-semibold mb-8">
            {" "}
            reliable APIs{" "}
          </span>
          without the hassle of subscriptions.
        </h1>

      </section>

     

        <Marquee/>
        
      {/* Why us  */}

      
      <Services />

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto mb-4">
        {services.map((service, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-shadow relative overflow-hidden"
          >
            {/* Background detail: gray overlay */}
            <div className="absolute top-4 left-4 right-4 bottom-4 bg-muted/30 rounded-xl opacity-50"></div>

            {/* Icon circle */}
            <CardHeader className="relative z-10">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center border-2 border-primary/30 shadow-lg">
                  {service.icon}
                </div>
              </div>
              <CardTitle className="text-center text-xl">
                {service.title}
              </CardTitle>
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

      {/*  contact part 1 and 2 */}
      <section className="contact-us flex flex-col lg:flex-row justify-around mt-10 p-2">
        <div className="w-full lg:w-1/2">
          <Contact2 />
        </div>
        <div className="w-full lg:w-1/2">
          <Contact />
        </div>
      </section>

      <Stats />
      <Reviews />
    </>
  );
};

export default Home;
