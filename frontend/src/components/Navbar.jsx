import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiMenu, FiX, FiLogOut, FiUser } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { useAuth } from "../context/AuthContext";

const menuItems = [
  { name: "Home", path: "/" },
  { name: "MarketPlace", path: "/Services" },
  { name: "About Us", path: "/about" },
];

const adminMenuItems = [
  { name: "Home", path: "/admin" },
  { name: "Publish API", path: "/publish-api" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="w-full flex justify-center mt-5">
              <div className="w-[65%] max-w-6xl bg-card flex items-center justify-between py-2 pl-7 pr-3 rounded-full shadow-lg border border-border relative">
        
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
              stroke="currentColor"
              className="text-primary"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="7" cy="24" r="2.1" fill="currentColor" className="text-primary" />
          </svg>
        
        </motion.div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center flex-1 justify-center">
          {(user?.role === 'admin' ? adminMenuItems : menuItems).map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                end={item.path === "/" || item.path === "/admin"}
                                 className={({ isActive }) =>
                   `px-4 py-1 text-[16px] transition ${
                     isActive
                       ? "text-primary font-medium"
                       : "text-foreground/90 hover:text-primary"
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
           {isAuthenticated && (
             <div className="flex items-center gap-3">
               {user?.role !== 'admin' ? (
                 <NavLink
                   to="/dashboard"
                   className="flex items-center gap-2 px-3 py-2 text-sm text-foreground/80 hover:text-primary transition-colors"
                 >
                   <FiUser className="w-4 h-4" />
                   <span>{user?.fullName || user?.email}</span>
                 </NavLink>
               ) : (
                 <div className="flex items-center gap-2 px-3 py-2 text-sm text-foreground/80">
                   <FiUser className="w-4 h-4" />
                   <span>{user?.fullName || user?.email}</span>
                 </div>
               )}
               <motion.button
                 whileHover={{ scale: 1.05 }}
                 onClick={async () => {
                   const result = await logout();
                   if (result.success) {
                     navigate('/');
                   }
                 }}
                 className="flex items-center gap-2 px-4 py-2 text-[15px] bg-card border border-border rounded-xl transition-colors duration-200 shadow-md hover:border-foreground "
               >
                 Logout
                 <FiLogOut className="ml-1" />
               </motion.button>
             </div>
           )}
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 0 14px rgba(var(--primary), 0.3)" }}
          >
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                                                `flex items-center gap-2 px-5 py-2 text-[15px] bg-card border rounded-xl transition-colors  duration-200 shadow-md hover:border-primary ${
                     isActive
                       ? "border-primary text-primary "
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
                 {(user?.role === 'admin' ? adminMenuItems : menuItems).map((item) => (
                   <li key={item.name}>
                     <NavLink
                       to={item.path}
                       end={item.path === "/" || item.path === "/admin"}
                                              className={({ isActive }) =>
                         `block w-full transition ${
                           isActive
                             ? "text-primary font-medium"
                             : "text-foreground/90 hover:text-primary"
                         }`
                       }
                       onClick={() => setIsOpen(false)}
                     >
                       {item.name}
                     </NavLink>
                   </li>
                 ))}
                                 {isAuthenticated && user?.role !== 'admin' && (
                   <li>
                     <NavLink
                       to="/dashboard"
                       className={({ isActive }) =>
                         `block w-full transition ${
                           isActive
                             ? "text-primary font-medium"
                             : "text-foreground/90 hover:text-primary"
                         }`
                       }
                       onClick={() => setIsOpen(false)}
                     >
                       Dashboard
                     </NavLink>
                   </li>
                 )}
                                 <div className="flex items-center justify-between pt-4 border-t border-border">
                   <div className="flex items-center gap-2">
                     <span className="text-sm text-foreground/70">Theme:</span>
                     <ModeToggle />
                   </div>
                   {isAuthenticated && (
                     <div className="flex items-center gap-2">
                       <div className="text-sm text-foreground/80">
                         {user?.fullName || user?.email}
                       </div>
                       <button
                         onClick={async () => {
                           const result = await logout();
                           if (result.success) {
                             navigate('/');
                           }
                           setIsOpen(false);
                         }}
                         className="flex items-center gap-2 px-4 py-2 border rounded-full transition-colors duration-200 hover:text-white shadow-md"
                       >
                         Logout
                         <FiLogOut />
                       </button>
                     </div>
                   )}
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
