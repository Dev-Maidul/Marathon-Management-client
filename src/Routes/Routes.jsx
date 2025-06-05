import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import Root from "../Layouts/Root";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Marathons from "../Pages/Marathons/Marathons";
import Dashboard from "../components/Dashboard";
import ErrorPage from "../components/ErrorPage";
import PrivateRoute from "../Context/PrivateRoute";
import AddMarathon from "../Pages/Marathons/AddMarathon";
import Spinner from "../Components/Spinner";
import MarathonDetails from "../Pages/Marathons/MarathonDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        hydrateFallbackElement: <Spinner></Spinner>,
        loader: () => fetch("http://localhost:3000/marathons"),
        Component: Home,
      },
      {
        path: "/signup",
        Component: Signup,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/marathons",
        Component: Marathons,
      },
      {
        path: "/dashboard",
        Component: Dashboard,
      },
      {
        path: "/add-marathon",
        element: (
          <PrivateRoute>
            <AddMarathon></AddMarathon>
          </PrivateRoute>
        ),
      },
      {
        path: "/marathon-details/:id",
        hydrateFallbackElement: <Spinner></Spinner>,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/marathons/${params.id}`),
        element: (
          <PrivateRoute>
            <MarathonDetails></MarathonDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/*",
    Component: ErrorPage,
  },
]);
