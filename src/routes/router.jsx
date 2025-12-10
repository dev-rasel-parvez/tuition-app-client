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

// -------------------------
// TUTOR DASHBOARD COMPONENTS
// -------------------------
import MyApplications from "../pages/TutorDashboard/MyApplications";
import OngoingTuitions from "../pages/TutorDashboard/OngoingTuitions";
import RevenueHistory from "../pages/TutorDashboard/RevenueHistory";
import TutorDetails from "../pages/Tutors/TutorDetails";
import TutorAvailableTuitions from "../pages/TutorDashboard/TutorAvailableTuitions";

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

      // Public tuition details (now uses tuitionId)
      { path: "tuitions/:tuitionId", element: <TuitionDetails /> },
      { path: "tutors/:id", element: <TutorDetails /> }

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

      // --------------------------
      // STUDENT DASHBOARD ROUTES
      // --------------------------
      { path: "post-tuition", element: <TuitionsPost /> },
      { path: "my-tuitions", element: <MyTuitions /> },
      { path: "my-tuitions/:tuitionId", element: <MyTuitionsDetails /> },
      { path: "edit-tuition/:tuitionId", element: <EditTuition /> },
      { path: "applications/:tuitionId", element: <Applications /> },

      // --------------------------
      // TUTOR DASHBOARD ROUTES
      // --------------------------
      { path: "tutor/applications", element: <MyApplications /> },
      { path: "tutor/ongoing-tuitions", element: <OngoingTuitions /> },
      { path: "tutor/revenue", element: <RevenueHistory /> },
      { path: "tutor/available-tuitions", element: <TutorAvailableTuitions /> },
      { path: "tutor/tuitions/:tuitionId", element: <TuitionDetails /> },
    ]
  }

]);
