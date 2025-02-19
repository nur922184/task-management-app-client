import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn/SignIn";
import Error from "../pages/Error/Error";
import MainLayout from "../pages/layouts/MainLayout";
import SignUp from "../pages/SignIn/SignUp/SignUp";
import DashboardLayout from "../pages/layouts/DashboardLayout";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout></DashboardLayout>,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default Router;