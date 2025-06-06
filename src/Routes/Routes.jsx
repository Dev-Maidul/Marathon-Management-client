import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import Root from "../Layouts/Root";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Marathons from "../Pages/Marathons/Marathons";
import ErrorPage from "../components/ErrorPage";
import PrivateRoute from "../Context/PrivateRoute";
import AddMarathon from "../Pages/Marathons/AddMarathon";
import Spinner from "../Components/Spinner";
import MarathonDetails from "../Pages/Marathons/MarathonDetails";
import DashboardLayout from "../components/DashboardLayout";
import MyMarathonList from "../Pages/Marathons/MyMarathonList";
import MyApplyList from "../Pages/Marathons/MyApplyList";
import MarathonRegistration from "../Pages/Marathons/MarathonRegistration";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        hydrateFallbackElement: <Spinner></Spinner>,
        loader: () => fetch("http://localhost:3000/marathons/featured"),
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
        hydrateFallbackElement: <Spinner></Spinner>,
        loader: () =>
          fetch('http://localhost:3000/marathons'),
        element: <PrivateRoute>
          <Marathons></Marathons>
        </PrivateRoute>
      },
      {
        path: "registration/:id",
        hydrateFallbackElement: <Spinner></Spinner>,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/marathons/${params.id}`),
        element: (
          <PrivateRoute>
            <MarathonRegistration></MarathonRegistration>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          {
            path: "add-marathon",
            element: <AddMarathon />,
          },
          {
            path: "my-marathons",
            Component: MyMarathonList,
          },
          {
            path: "my-applies",
            Component: MyApplyList,
          },
        ],
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
