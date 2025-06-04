import {
  createBrowserRouter,
} from "react-router";
import Home from "../Pages/Home/Home";


export const router = createBrowserRouter([
  {
    path: "/",
    Component:Home,
    children:[
        {
            index:true,
            Component:Home
        }
    ]
    
  },
  {
      path: "/*",
      element:<h1>Error</h1>
    }
]);