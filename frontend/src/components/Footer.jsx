import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-foreground py-6 px-4 flex flex-col gap-3">
      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-semibold">
       
        <Link to="/refund" className="hover:text-primary transition">
          Refund Policy
        </Link>

        <Link to="/privacy" className="hover:text-primary transition">
          PRIVACY POLICY
        </Link>
        
        <Link to="/terms" className="hover:text-primary transition">
          TERMS & CONDITIONS
        </Link>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs sm:text-sm mt-4 ">
        © All rights reserved by{" "}
        <span className="text-primary font-medium">
          DataRepo Private Limited
        </span>
      </div>

      {/* GST Info */}
      <div className="text-center text-xs sm:text-sm mt-1">
        "Proudly registered under GST – GSTIN:{" "}
                 <span className="text-foreground font-semibold">09AALCD4840P1ZZ</span>"
      </div>
    </footer>
  );
};

export default Footer;
