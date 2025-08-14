import React from "react";
import {
  FaCode,
  FaDollarSign,
  FaUsers,
  FaRobot,
  FaChartLine,
  FaCube,
  FaSearch,
} from "react-icons/fa";
import { MdWeb } from "react-icons/md";

const Services = () => {
  const services = [
    {
      icon: <FaCode size={40} className="text-teal-500" />,
      title: "Micro SaaS Development",
      desc: "DataRepo focuses on building lightweight, niche-specific software solutions that are scalable, cost-effective, and easy to deploy. Our Micro SaaS products help businesses streamline operations, enhance productivity, and generate recurring revenue with minimal infrastructure. Whether it’s automation, workflow optimization, or industry-specific tools, we create tailored solutions to meet your needs.",
    },
    {
      icon: <MdWeb size={40} className="text-teal-500" />,
      title: "Application Development",
      desc: "DataRepo focuses on building dynamic, scalable, and high-performance applications tailored to business needs. We create intuitive, secure, and responsive solutions, ensuring seamless user experiences and efficient workflow automation. From simple websites to complex platforms, we help businesses thrive in the digital world.",
    },
    {
      icon: <FaCube size={40} className="text-teal-500" />,
      title: "2D & 3D Website Development",
      desc: "DataRepo brings innovation to web experiences by designing interactive, visually immersive, and highly functional websites. Whether it’s a sleek 2D interface or an engaging 3D environment, we craft responsive, user-friendly websites that enhance engagement and set businesses apart in the digital space.",
    },
    {
      icon: <FaRobot size={40} className="text-teal-500" />,
      title: "Custom AI Development",
      desc: "DataRepo focuses on building AI-powered solutions tailored to automate workflows, enhance decision-making, and optimize business processes. From AI agents that streamline operations to API-based AI solutions, we create intelligent systems that drive efficiency and innovation.",
    },
    {
      icon: <FaChartLine size={40} className="text-teal-500" />,
      title: "Digital Marketing",
      desc: "Boost your brand’s online presence with DataRepo’s result-driven digital marketing solutions. From SEO and SMO to targeted ads and content marketing, we help you connect with your audience, increase visibility, and drive measurable growth. Let’s turn clicks into customers.",
    },
    {
      icon: <FaSearch size={40} className="text-teal-500" />,
      title: "SEO Service",
      desc: "Boost your website's visibility and drive organic traffic with DataRepo's comprehensive SEO services. We optimize your content, improve search engine rankings, and implement strategic keyword optimization to help your business reach the top of search results and attract qualified leads.",
    },
  ];

  return (
    <div className=" min-h-screen p-6 sm:p-12">
      {/* Benefits Section */}

      <div className="text-center mb-12 p-5 flex flex-col gap-3">
        <div>
          <span className=" text-center bg-teal-500/20 text-teal-400 px-4 py-1 rounded-full text-sm">
            Why Us
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold mt-4">
          Experience The Benefits <br /> Of Our Expertise
        </h2>
        <p className=" mt-2">
          That drives meaningful, game-powered results.
        </p>
      </div>

      {/* Services Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-card rounded-2xl p-6 text-center shadow-lg hover:shadow-teal-500/20 transition"
          >
            <div className="mb-4 flex justify-center">{service.icon}</div>
            <h3 className="font-semibold text-lg mb-2 text-white">{service.title}</h3>
            <p className="text-gray-400 text-sm">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
