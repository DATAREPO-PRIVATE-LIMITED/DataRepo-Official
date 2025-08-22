import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
// import Stats from "./Stats";
// import Reviews from "./Reviews";

const Layout = () => {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin' || location.pathname === '/publish-api';

  return (
    <div className="bg-background pt-6">
      <Navbar />
      <Outlet />
      {!isAdminPage && (
        <>
          {/* <Stats/>
          <Reviews/> */}
        </>
      )}
      <Footer />
    </div>
  );
};

export default Layout;
