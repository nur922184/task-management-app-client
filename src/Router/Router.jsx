import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn/SignIn";
import Error from "../pages/Error/Error";
import MainLayout from "../pages/layouts/MainLayout";
import SignUp from "../pages/SignIn/SignUp/SignUp";
import DashboardLayout from "../pages/layouts/DashboardLayout";
import Profile from "../pages/Dashboard/Profile";
import Tasks from "../pages/Dashboard/Tasks";
import TaskItem from "../components/TaskItem";
import TaskList from "../components/TaskList";
import DsCard from "../components/DsCard";
import PrivatRoute from "./PrivatRoute";


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
        element: <PrivatRoute><DashboardLayout></DashboardLayout></PrivatRoute> ,
        children:[
          {
            path:'/dashboard/card', 
            element: <PrivatRoute> <DsCard></DsCard></PrivatRoute>
          },
          {
            path:'/dashboard/profile', 
            element: <PrivatRoute><Profile></Profile></PrivatRoute> 
          },
          {
            path:'/dashboard/tasks', 
            element: <PrivatRoute><Tasks></Tasks></PrivatRoute> 
          },
          {
            path:'/dashboard/list', 
            element: <PrivatRoute><TaskItem></TaskItem></PrivatRoute>
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