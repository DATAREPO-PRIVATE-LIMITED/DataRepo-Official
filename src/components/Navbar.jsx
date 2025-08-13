import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom"; // ✅

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Service", path: "/services" },
    { name: "Contact Us", path: "/contact" }
  ];

  return (
    <nav className="bg-black text-white mb-6 px-6 py-2 border rounded-full mx-auto shadow-lg w-[90%] max-w-6xl flex items-center justify-between">
      {/* Logo */}
      <motion.div
        className="text-teal-400 font-bold text-2xl"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-3xl">lOgo</span>
      </motion.div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center space-x-8">
        {menuItems.map((item, i) => (
          <motion.li
            key={item.name}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={item.path}
              className={`hover:text-teal-400 transition ${
                item.name === "Home" ? "text-teal-400" : "text-gray-300"
              }`}
            >
              {item.name}
            </Link>
          </motion.li>
        ))}
      </ul>

      {/* CTA Button */}
      <motion.div whileHover={{ scale: 1.05 }}>
        <Link
          to="/contact"
          className="hidden md:flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-full hover:border-teal-400 hover:shadow-teal-400/50 transition shadow-md"
        >
          Let&apos;s Talk
          <FiArrowUpRight />
        </Link>
      </motion.div>

      {/* Mobile Menu Icon */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-16 left-0 w-full bg-black p-6 rounded-b-2xl z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`hover:text-teal-400 transition ${
                      item.name === "Home"
                        ? "text-teal-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <Link
                to="/contact"
                className="mt-4 flex items-center justify-center gap-2 px-4 py-2 border border-gray-600 rounded-full hover:border-teal-400 hover:shadow-teal-400/50 transition shadow-md"
                onClick={() => setIsOpen(false)}
              >
                Let&apos;s Talk
                <FiArrowUpRight />
              </Link>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
