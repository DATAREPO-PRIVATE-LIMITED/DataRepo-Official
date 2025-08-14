import { createBrowserRouter } from "react-router-dom";
import About from "../components/About";
import Home from "../components/Home";
import Layout from "../components/Layout";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Services from "../components/Services"
import Privacy from "../components/Privacy"
import Terms from "../components/Terms"
import MarketPlace from "../components/MarketPlace"

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
        path: "/contact",
        element: <Contact />,
      },
      {
        path:"/services",
        element:<Services/>
      },
      {
        path:"/terms",
        element:<Terms/>
      },
      {
        path:"/privacy",
        element:<Privacy/>
      },
      {
        path:"/marketplace",
        element:<MarketPlace/>
      }
    ],
  },
]);
