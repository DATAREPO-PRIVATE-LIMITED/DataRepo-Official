import React from "react";

const Stats = () => {
  const stats = [
    { number: "500+", label: "Clients" },
    { number: "450+", label: "Positive Reviews" },
    { number: "9.8", label: "Ratings (out of 10)" },
    { number: "500+", label: "Users Satisfied" },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-center text-center  gap-8 sm:gap-12 lg:gap-30 mt-20 mb-20  px-4">
      {stats.map((stat, index) => (
        <div key={index} className="mb-6 sm:mb-0">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">{stat.number}</h3>
          <p className=" text-sm sm:text-base">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats;
