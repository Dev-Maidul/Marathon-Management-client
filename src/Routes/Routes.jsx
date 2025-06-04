import {
  createBrowserRouter,
} from "react-router";
import Home from "../Pages/Home/Home";
import Root from "../Layouts/Root";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Marathons from "../Pages/Marathons/Marathons";
import Dashboard from "../components/Dashboard";
import ErrorPage from "../components/ErrorPage";
import PrivateRoute from '../Context/PrivateRoute';
import AddMarathon from "../Pages/Marathons/AddMarathon";


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
        {
            path:'/add-marathon',
            element:<PrivateRoute><AddMarathon></AddMarathon></PrivateRoute>
        }
    ]
    
  },
  {
      path: "/*",
      Component:ErrorPage
    }
]);