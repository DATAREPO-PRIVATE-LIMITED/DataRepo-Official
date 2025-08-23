import React, { useEffect, useState } from "react";
import { useInView } from "./useInView";

const Stats = () => {
  const stats = [
    { number: 500, suffix: "+", label: "Clients" },
    { number: 450, suffix: "+", label: "Positive Reviews" },
    { number: 9.8, suffix: "", label: "Ratings (out of 10)" },
    { number: 500, suffix: "+", label: "Users Satisfied" },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Use the useInView hook to detect when component is visible
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false // Allow multiple triggers
  });

  useEffect(() => {
    // Only start animation when component comes into view and hasn't animated yet
    if (inView && !hasAnimated && !isAnimating) {
      setIsAnimating(true);
      
      const duration = 2000; // 2 seconds
      const startTime = performance.now();
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Update all counts based on progress
        const newCounts = stats.map((stat, index) => {
          const targetValue = stat.number;
          const currentValue = targetValue * progress;
          
          // Format the number properly
          if (stat.number % 1 !== 0) {
            return currentValue.toFixed(1);
          } else {
            return Math.floor(currentValue);
          }
        });
        
        setCounts(newCounts);
        
        // Continue animation if not complete
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Animation complete
          setIsAnimating(false);
          setHasAnimated(true);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [inView, hasAnimated, isAnimating, stats]);

  // Reset animation state when component unmounts/remounts (page switch/reload)
  useEffect(() => {
    setCounts(stats.map(() => 0));
    setIsAnimating(false);
    setHasAnimated(false);
  }, []); // Empty dependency array means this runs every time component mounts

  return (
    <div ref={ref} className="flex flex-col sm:flex-row justify-center text-center gap-8 sm:gap-12 lg:gap-30 mt-20 mb-20 px-4">
      {stats.map((stat, index) => (
        <div key={index} className="mb-6 sm:mb-0">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            {counts[index]}{stat.suffix}
          </h3>
          <p className="text-sm sm:text-base">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats;
