import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";

const menuItems = [
  { name: "Home", path: "/" },
  { name: "MarketPlace", path: "/Services" },
  { name: "About Us", path: "/about" },
  
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full flex justify-center ">
              <div className="w-[80%] max-w-6xl bg-card flex items-center justify-between py-2 pl-7 pr-3 rounded-full shadow-lg border border-border relative">
        
        {/* Logo */}
        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
        >
          <svg width="37" height="32" viewBox="0 0 37 32" fill="none">
            <path
              d="M6 24 C9 17, 20 8, 28 11 M28 11 Q33 13, 29 27"
              stroke="#199a8e"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="7" cy="24" r="2.1" fill="#199a8e" />
          </svg>
        
        </motion.div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center flex-1 justify-center">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                end={item.path === "/"}
                                 className={({ isActive }) =>
                   `px-4 py-1 text-[16px] transition ${
                     isActive
                       ? "text-[#199a8e] font-medium"
                       : "text-foreground/90 hover:text-[#199a8e]"
                   }`
                 }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop CTA and Mode Toggle */}
        <div className="hidden md:flex items-center gap-3 ml-2">
          <ModeToggle />
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 0 14px #199a8e55" }}
          >
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                                                `flex items-center gap-2 px-5 py-2 text-[15px] bg-card border rounded-xl transition-colors  duration-200 shadow-[0_2px_10px_0_rgba(25,154,142,0.04)] hover:border-[#199a8e] ${
                     isActive
                       ? "border-[#199a8e] text-[#199a8e] "
                       : "border-border text-foreground  "
                   }`
              }
            >
              Let's Talk
              <FiArrowUpRight className="ml-1" />
            </NavLink>
          </motion.div>
        </div>

        {/* Mobile Menu Toggle */}
                 <button
           className="md:hidden text-2xl text-foreground"
           onClick={() => setIsOpen(!isOpen)}
         >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
                             className="absolute top-14 left-0 w-full bg-card p-6 rounded-b-2xl z-50 md:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.path}
                      end={item.path === "/"}
                                             className={({ isActive }) =>
                         `block w-full transition ${
                           isActive
                             ? "text-[#199a8e] font-medium"
                             : "text-foreground/90 hover:text-[#199a8e]"
                         }`
                       }
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-foreground/70">Theme:</span>
                    <ModeToggle />
                  </div>
                  <NavLink
                    to="/contact"
                                       className={({ isActive }) =>
                       `flex items-center gap-2 px-4 py-2 border rounded-full transition-colors duration-200 hover:border-[#199a8e] hover:shadow-teal-400/50 shadow-md ${
                         isActive
                           ? "border-[#199a8e] text-[#199a8e]"
                           : "border-border text-foreground"
                       }`
                     }
                    onClick={() => setIsOpen(false)}
                  >
                    Let's Talk
                    <FiArrowUpRight />
                  </NavLink>
                </div>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </nav>
  );
};

export default Navbar;
