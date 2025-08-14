import React from "react";

export default function About() {
  return (
    <section className="bg-background min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full py-12 px-6 md:px-0">
        <h2 className="text-foreground font-semibold text-3xl mb-4">ABOUT US</h2>
        <div className=" leading-relaxed text-base mb-4">
          <span className="font-bold ">At DataRepo</span>, we specialize in
          <span className="font-semibold "> Micro SaaS Development, Web Application Development, Website Development (2D &amp; 3D)</span>, and
          <span className="font-semibold "> Custom AI Development</span> to help businesses streamline their operations and scale efficiently. Our expertise lies in building innovative <span className="text-teal-400 font-semibold">AI-powered solutions, automation tools, and dynamic web applications</span> tailored to modern business needs.
        </div>
        <div className=" mb-4">
          With a commitment to <span className="font-semibold ">cutting-edge technology</span> and user-centric design, we empower startups, enterprises, and professionals with scalable and efficient digital solutions. Whether it’s AI-driven workflow automation, API development, or immersive <span className="font-semibold ">3D websites</span>, DataRepo ensures top-tier performance and seamless user experiences.
        </div>
        <div className="mb-4">
          <div className="text-lg  mb-2 mt-6 font-semibold">OUR CORE SERVICES:</div>
          <ul className="space-y-1 ml-4">
            <li>
              <span className="text-teal-400 font-semibold">Micro SaaS Development</span>
              <span className=" ml-2">
                Scalable and lightweight SaaS solutions tailored for niche business needs.
              </span>
            </li>
            <li>
              <span className="text-teal-400 font-semibold">Application Development</span>
              <span className=" ml-2">
                Custom-built, high-performance applications for various industries.
              </span>
            </li>
            <li>
              <span className="text-teal-400 font-semibold">Website Development (2D &amp; 3D)</span>
              <span className=" ml-2">
                Stunning and interactive websites, including 3D experiences for an immersive user interface.
              </span>
            </li>
            <li>
              <span className="text-teal-400 font-semibold">Custom AI Development</span>
              <span className=" ml-2">
                AI-powered automation, workflow optimization, and API development to enhance business operations.
              </span>
            </li>
          </ul>
        </div>
        <div className=" mt-4 mb-5">
          We are committed to <span className="font-semibold">delivering high-quality, user-centric solutions</span> that drive growth and innovation. Whether you need <span className="font-semibold text-teal-400">AI-driven workflow automation, API integration, or immersive 3D websites</span>, DataRepo ensures top-tier performance and seamless user experiences.
        </div>
        <div className="text-lg  mb-2 font-semibold">WHY CHOOSE DATAREPO?</div>
        <ul className="list-disc ml-6  space-y-1 mb-3">
          <li>Industry-focused digital solutions</li>
          <li>A client-first and results-driven approach</li>
          <li>Custom-built platforms tailored to unique business goals</li>
          <li>Experienced team with a commitment to excellence</li>
          <li>Affordable pricing with premium service delivery</li>
        </ul>
        <div className="mt-4 ">
          We believe in <span className="font-semibold">delivering high-quality, tailored solutions</span> that drive efficiency and success for our clients. <span className="font-semibold text-teal-400">Partner with us to transform your ideas into reality!</span>
        </div>
      </div>
    </section>
  );
}
