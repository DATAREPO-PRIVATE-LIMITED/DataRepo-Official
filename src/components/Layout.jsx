import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Stats from "./Stats";
import Reviews from "./Reviews";

const Layout = () => {
  return (
    <div className="bg-background pt-6">
      <Navbar />
      <Outlet />
      <Stats/>
      <Reviews/>
      <Footer />
    </div>
  );
};

export default Layout;
