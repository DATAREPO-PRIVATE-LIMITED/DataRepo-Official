import React from "react";

import { RouterProvider } from "react-router-dom";
import { myRoutes } from "./routes/MyRouter";

const App = () => {
  return (
    <div className="app bg-black">
      <RouterProvider router={myRoutes} />
    </div>
  );
};

export default App;
