import {
  createBrowserRouter,
} from "react-router";
import Home from "../Pages/Home/Home";
import Root from "../Layouts/Root";
import Signup from "../components/Signup";
import Login from "../components/Login";


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
    ]
    
  },
  {
      path: "/*",
      element:<h1>Error</h1>
    }
]);