import React from "react";
import { FiSend } from "react-icons/fi";

const Contact2 = () => (
  <section className="bg-background min-h-screen flex items-center justify-center px-4 py-8">
    <div className="w-full max-w-xl mx-auto">
      {/* Contact Now button */}
      <button className="flex items-center gap-2 bg-primary/80 text-primary-foreground text-xs font-medium rounded-xl px-4 py-2 mb-8 shadow float-left">
        <FiSend className="text-lg" />
        Contact Now
      </button>

      {/* Heading */}
      
      <h1 className=" font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-8 sm:mt-16 mb-6 leading-none">
       Contact Us!
      </h1>

      {/* Subheading */}
      <p className=" text-sm sm:text-base md:text-lg mb-8">
        Let's create something amazing together! Reach out <br className="hidden sm:block" />
        I'd love to hear about your project and ideas.
      </p>

      {/* Divider */}
      <hr className="border-border mb-8" />

      {/* Features */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            +
          </span>
          <span className=" text-base">24/7 Full Time Support</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            +
          </span>
          <span className=" text-base">Available Worldwide</span>
        </div>
      </div>
    </div>
  </section>
);

export default Contact2;
