import React from "react";

import { RouterProvider } from "react-router-dom";
import { myRoutes } from "./routes/MyRouter";
import { ThemeProvider } from "./components/ThemeProvider";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "sonner";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <div className="app bg-background">
          <RouterProvider router={myRoutes} />
          <Toaster />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
