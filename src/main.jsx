// React main file:
import React from "react";
import ReactDOM from "react-dom/client";

// Tailwind CSS:
import "./index.css";

// páginas:
import Home from "./App/pages/Home";
import Login from "./App/pages/Login";
import Register from "./App/pages/Register";
import Inventory from "./App/pages/Inventory";
import AccessManager from "./App/pages/Accessmanager";

// Router:
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// functions:
import { checktoken } from "./api/user_requests";

const checkToken = await checktoken();

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Navigate to="/home" />,
    children: [
      {
        path: "/inventory/:id",
        element: checkToken.status ? <Inventory /> : <Navigate to="/login" />,
      },
      {
        path: "/accessmanager/:id",
        element: checkToken.status ? (
          <AccessManager />
        ) : (
          <Navigate to="/login" />
        ),
      },
      {
        path: "/home",
        element: checkToken.status ? <Home /> : <Navigate to="/login" />,
      },
      {
        path: "",
        element: <Navigate to="/home" />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

// Render:
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
