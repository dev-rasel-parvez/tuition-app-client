import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";

import Home from "../pages/Home/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Tutors from "../pages/Tutors/Tutors";

import AvailableTuitions from "../pages/Tuitions/AvailableTuitions";
import TuitionDetails from "../pages/Tuitions/TuitionDetails";
import EditTuition from "../pages/Tuitions/EditTuition";
import MyTuitions from "../pages/Tuitions/MyTuitions";
import MyTuitionsDetails from "../pages/Tuitions/MyTuitionsDetails";
import Applications from "../pages/Tuitions/Applications";

import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

import DashboardLayout from "../layouts/DashboardLayout";
import UserDashboardHome from "../pages/Dashboard/DashboardHome/UserDashboardHome";
import TuitionsPost from "../pages/Tuitions/TuitionsPost";

export const router = createBrowserRouter([

  // ============================================
  // PUBLIC WEBSITE ROUTES
  // ============================================
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, element: <Home /> },
      { path: "available-tuitions", element: <AvailableTuitions /> },
      { path: "tutors", element: <Tutors /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },

      // Public tuition details (now uses tuitionId, NOT _id)
      { path: "tuitions/:tuitionId", element: <TuitionDetails /> }

    ]
  },

  // ============================================
  // AUTH ROUTES
  // ============================================
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ]
  },

  // ============================================
  // DASHBOARD ROUTES
  // ============================================
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <UserDashboardHome /> },

      // Post Tuition
      { path: "post-tuition", element: <TuitionsPost /> },

      // My Tuitions
      { path: "my-tuitions", element: <MyTuitions /> },

      // Single my tuition details (uses tuitionId)
      { path: "my-tuitions/:tuitionId", element: <MyTuitionsDetails /> },

      // Edit tuition (uses tuitionId)
      { path: "edit-tuition/:tuitionId", element: <EditTuition /> },

      // Applications (uses tuitionId)
      { path: "applications/:tuitionId", element: <Applications /> },
    ]
  }

]);
