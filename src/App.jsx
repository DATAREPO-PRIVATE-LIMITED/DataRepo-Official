import React from "react";

import { RouterProvider } from "react-router-dom";
import { myRoutes } from "./routes/MyRouter";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from "sonner";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="app bg-background">
        <RouterProvider router={myRoutes} />
        <Toaster />
      </div>
    </ThemeProvider>
  );
};

export default App;
