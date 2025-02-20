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
            path:'/dashboard/card', 
            element: <DsCard></DsCard>
          },
          {
            path:'/dashboard/profile', 
            element: <Profile></Profile>
          },
          {
            path:'/dashboard/tasks', 
            element: <Tasks></Tasks>
          },
          {
            path:'/dashboard/list', 
            element: <TaskItem></TaskItem>
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