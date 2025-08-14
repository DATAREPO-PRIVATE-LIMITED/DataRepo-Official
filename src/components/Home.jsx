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

import { HiLightningBolt } from "react-icons/hi";
import Services from "./Services";
import Contact2 from "./Contact2";
import Contact from "./Contact";



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
      <div className="text-center  mt-12 mb-12 px-4">
        <h1
          className="
     
      font-medium 
      text-5xl 
      sm:text-6xl 
      md:text-7xl 
      lg:text-8xl 
      leading-tight
    "
        >
          Data
          <span
            className="
        text-teal-400 
        font-semibold
        text-5xl 
        sm:text-6xl 
        md:text-7xl 
        lg:text-8xl
      "
          >
            Repo
          </span>
        </h1>
      </div>

      {/* Hero Section */}
      <section className="bg-card text-card-foreground max-w-[850px] mx-auto rounded-xl  mb-[-20px] px-8 text-center">
        {/* Banner */}
        <div className="inline-flex items-center gap-1 bg-card text-card-foreground text-xs rounded-xl px-4 py-1.5 mb-5 font-medium shadow">
          <HiLightningBolt className="text-green-500" />
          Get ready to level up your digital presence 🚀
        </div>

        {/* Headline */}
        <h1 className="text-3xl md:text-4xl font-normal m-0 leading-tight">
          We Create <span className="text-teal-400 font-medium">Websites</span>{" "}
          that Sell &amp; <span className="text-teal-400 font-medium">Ads</span>{" "}
          that Convert
        </h1>
      </section>

      {/* Why us  */}
      <Services />

      {/*  contact part 1 and 2 */}
      <section className="contact-us flex flex-col lg:flex-row justify-around">
        <div className="w-full lg:w-1/2">
          <Contact2 />
        </div>
        <div className="w-full lg:w-1/2">
          <Contact />
        </div>
      </section>

    </>
  );
};

export default Home;
