import { createBrowserRouter } from "react-router-dom";
import About from "../components/About";
import Home from "../components/Home";
import Signin from "../Authentication/Signin";
import SignUp from "../Authentication/SignUp";
import RootLayout from "../Layouts/RootLayout";
import Error from "../components/Error";
import Bills from "../pages/Bills";
import Authentication from "../Authentication/Authentication";
import BillsDetails from "../pages/BillsDetails";
import PrivateRoute from "../Provider/PrivateRoute";
import Profile from "../pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "bills",
        element: (
          <PrivateRoute>
            <Bills />
          </PrivateRoute>
        ),
      },

      {
        path: "bills/:id",
        loader: () => fetch("/bills.json"),
        element: (
          <PrivateRoute>
            <BillsDetails />
          </PrivateRoute>
        ),
      },

      {
        path:"profile",
        element:(
          <PrivateRoute>
            <Profile/>
          </PrivateRoute>
        )
      },
    ],
  },

  {
    path: "/auth",
    element: <Authentication />,
    children: [
      { path: "signin", element: <Signin /> }, 
      { path: "signup", element: <SignUp /> },
    ],
  },

  { path: "/about", element: <About /> },

  { path: "*", element: <Error /> },
]);
