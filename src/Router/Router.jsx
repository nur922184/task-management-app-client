import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn/SignIn";
import Error from "../pages/Error/Error";
import MainLayout from "../pages/layouts/MainLayout";
import SignUp from "../pages/SignIn/SignUp/SignUp";
import DashboardLayout from "../pages/layouts/DashboardLayout";
import Profile from "../pages/Dashboard/Profile";


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
        children:[
          {
            path:'/dashboard/profile', 
            element: <Profile></Profile>
          }
        ]
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default Router;