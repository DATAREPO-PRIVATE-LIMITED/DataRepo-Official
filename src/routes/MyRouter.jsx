import { createBrowserRouter } from "react-router-dom";
import About from "../components/About";
import Home from "../components/Home";
import Layout from "../components/Layout";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Services from "../components/Services";
import Privacy from "../components/Privacy";
import Terms from "../components/Terms";
import Refund from "../components/Refund";
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import ForgotPassword from "../components/ForgotPassword";
import Docs from "../components/Docs";

export const myRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/refund",
        element: <Refund />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/docs",
        element: <Docs />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/privacy",
        element: <Privacy />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
]);
