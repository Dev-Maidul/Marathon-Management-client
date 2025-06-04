import {
  createBrowserRouter,
} from "react-router";
import Home from "../Pages/Home/Home";
import Root from "../Layouts/Root";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Marathons from "../Pages/Marathons/Marathons";
import Dashboard from "../components/Dashboard";


export const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    children:[
        {
            index:true,
            Component:Home
        },
        {
            path:'/signup',
            Component:Signup
        },
        {
            path:'/login',
            Component:Login
        },
        {
            path:'/marathons',
            Component:Marathons
        },
        {
            path:'/dashboard',
            Component:Dashboard
        },
    ]
    
  },
  {
      path: "/*",
      element:<h1>Error</h1>
    }
]);