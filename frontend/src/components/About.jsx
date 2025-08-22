import React from "react";

export default function About() {
  return (
    <section className="bg-background min-h-screen flex items-center justify-center mt-8">
      <div className="max-w-2xl w-full py-12 px-6 md:px-0 p-5">
        <h2 className="text-foreground font-semibold text-3xl mb-4">
          ABOUT US
        </h2>
        <div className=" leading-relaxed text-base mb-4">
          <span className=" ">
            <span className="font-bold">ApiMarket</span> is a modern API
            marketplace created to help developers, startups, and businesses
          </span>

          <span className="font-bold">
            {" "}
            save time, reduce development effort, and scale faster.{" "}
          </span>
          <span>
            Instead of reinventing the wheel, our customers can access
            ready-to-use APIs for every essential feature of their apps and
            software.
          </span>
        </div>
        <div className=" mb-4">
          <span>
            {" "}
            We believe in{" "}
            <span className="font-bold">
              flexibility, transparency, and developer-first solutions.
            </span>{" "}
            That’s why we operate on a
            <span className="font-bold"> Pay-as-You-Use</span> model with no
            hidden costs, no fixed subscriptions, and complete usage
            transparency
          </span>
        </div>
        <div className="mb-4">
          <div className="text-lg  mb-2 mt-6 font-semibold">
            Api Catagories:
          </div>
          <ul className="space-y-1 ml-4">
            <li>
              <span className="text-primary font-semibold">
                Communication APIs
              </span>
              <span className=" ml-2">
                Enable seamless messaging, notifications, and real-time
                interactions.
              </span>
            </li>
            <li>
              <span className="text-primary font-semibold">
                Data & Utility APIs
              </span>
              <span className=" ml-2">
                Custom-built, high-performance applications for various
                industries.
              </span>
            </li>
            <li>
              <span className="text-primary font-semibold">
                AI & Machine Learning APIs
              </span>
              <span className=" ml-2">
                Stunning and interactive websites, including 3D experiences for
                an immersive UI.
              </span>
            </li>
            <li>
              <span className="text-primary font-semibold">
                Finance & Business APIs
              </span>
              <span className=" ml-2">
                AI-powered automation, workflow optimization, and API
                development to enhance business operations.
              </span>
            </li>
          </ul>
        </div>

        <div className="text-lg  mb-2 font-semibold">Why Choose Us?</div>
        <ul className="ml-6 mb-3 list-disc space-y-1">
          <li>
            <span className="font-bold">Developer-Friendly:</span>{" "}
            <span className="text-md">
              Simple integration, clear documentation.
            </span>
          </li>
          <li>
            <span className="font-bold">Transparent Pricing:</span>{" "}
            <span className="text-md">Only pay for what you use.</span>
          </li>
          <li>
            <span className="font-bold">Secure & Reliable:</span>{" "}
            <span className="text-md ">
              99.9% uptime and encrypted requests.
            </span>
          </li>
          <li>
            <span className="font-bold">Faster Development:</span>{" "}
            <span className="text-md">Reduce project build time by weeks.</span>
          </li>
          <li>
            <span className="font-bold">Scalable for Everyone:</span>{" "}
            <span className="text-md">
              From individual developers to enterprises.
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
