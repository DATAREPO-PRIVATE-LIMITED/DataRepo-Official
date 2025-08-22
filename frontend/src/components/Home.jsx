import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { FiArrowRight } from "react-icons/fi";
import {
  FaBullhorn,
  FaInstagram,
  FaLinkedinIn,
  FaRegComments,
  FaRegFileVideo,
  FaUsers,
} from "react-icons/fa";
import { GiBrain } from "react-icons/gi";

import { NavLink } from "react-router-dom";

import { HiLightningBolt } from "react-icons/hi";
import Services from "./Services";
import Contact2 from "./Contact2";
import Contact from "./Contact";
import Stats from "./Stats";
 import Reviews from "./Reviews";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Home = () => {
  return (
    <>
      {/* Large Teal Text */}
      {/*  */}
      <div className="text-center">
        <h1 className="text-6xl mt-40"> Build Smarter, Launch Faster with </h1>
        <h2 className="text-[50px] text-primary mb-28 ">
          Pay-as-You-Use APIs
        </h2>
      </div>

      {/* Hero Section */}
      <section className=" text-card-foreground max-w-[850px] mx-auto rounded-xl  mb-[-20px] px-8 text-center ">
        {/* Banner */}
        <div className="inline-flex items-center gap-1 bg-card text-card-foreground text-xs rounded-xl px-4 py-1.5 mb-3 font-medium shadow ">
          <HiLightningBolt className="text-green-500" />
          Power Your Products with Next‑Gen APIs 🚀
        </div>

        {/* Headline */}
        <h1 className="text-xl md:text-3xl font-semibold m-0 leading-tight tracking-wider ">
          We help you integrate{" "}
          <span className="text-primary font-semibold mb-8"> reliable APIs </span>
           without the hassle of subscriptions.
        </h1>
      </section>

      {/* Why us  */}
      <Services />



      {/*  contact part 1 and 2 */}
      <section className="contact-us flex flex-col lg:flex-row justify-around mt-10 p-2">
        <div className="w-full lg:w-1/2">
          <Contact2 />
        </div>
        <div className="w-full lg:w-1/2">
          <Contact />
        </div>
      </section>

      <Stats/>
          <Reviews/>
    </>
  );
};

export default Home;
