import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Tutors from "../pages/Tutors/Tutors";
import AvailableTuitions from "../pages/Tuitions/AvailableTuitions";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import UserDashboardHome from "../pages/Dashboard/DashboardHome/UserDashboardHome";
import DashboardLayout from "../layouts/DashboardLayout";
import TuitionsPost from "../pages/Tuitions/TuitionsPost";
import TuitionDetails from "../pages/Tuitions/TuitionDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, element: <Home /> },
      { path: "available-tuitions", element: <AvailableTuitions /> },
      { path: "tutors", element: <Tutors /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ]
  },

  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> }
    ]
  },

  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <UserDashboardHome /> },

      // FIXED: remove dashboard/dashboard prefix
      { path: "post-tuition", element: <TuitionsPost /> },
      {
        path: "available-tuitions",
        element: <AvailableTuitions />,
      },
      {
        path: "tuition/:id",
        element: <TuitionDetails />,
      }
    ]
  }
]);
