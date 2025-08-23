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
import Dashboard from "../components/Dashboard";
import AdminDashboard from "../components/AdminDashboard";
import PublishApi from "../components/PublishApi";
import Store from "../components/Store";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminProtectedRoute from "../components/AdminProtectedRoute";
import Market from "../components/Market";

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
        path: "/market",
        element: <Market/>,
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
      {
        path: "/dashboard",
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
      },
      {
        path: "/admin",
        element: <AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>,
      },
      {
        path: "/publish-api",
        element: <AdminProtectedRoute><PublishApi /></AdminProtectedRoute>,
      },
      {
        path: "/store",
        element: <Store />,
      },
    ],
  },
]);
