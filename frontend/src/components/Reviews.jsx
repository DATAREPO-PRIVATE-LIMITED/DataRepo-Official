import { h1 } from "framer-motion/client";
import React from "react";

const Reviews = () => {
    
  const reviews = [
    {
      name: "Tamara Patel",
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, ipsam?",
    },
    {
      name: "Riyash, Cloud Crew",
      review:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur velit qui assumenda!",
    },
    {
      name: "Priya H., Founder of NextGen Coaching",
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, provident repellendus?",
    },
  ];

  return (
    <div className="mb-16 mt-16">
      {/* Reviews Header */}
      <div className="text-center mb-8 ">
        <span className="bg-primary/20 text-primary px-4 py-1 rounded-full text-sm">
          Reviews
        </span>
        <h2 className="text-2xl  sm:text-3xl font-bold mt-2">
          Our Customers Reviews
        </h2>
      </div>

   

      {/* Reviews Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 ml-4 mr-4 px-2 py-2 ">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-card p-6 rounded-2xl shadow-lg hover:shadow-primary/20 transition"
          >
            <p className="text-gray-300 mb-4">⭐️⭐️⭐️⭐️⭐️</p>
            <p className="text-gray-400 text-sm mb-4">"{review.review}"</p>
            <p className="text-primary text-sm font-semibold">{review.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
