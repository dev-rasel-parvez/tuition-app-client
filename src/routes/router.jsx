import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import PrivateRoute from "./PrivateRoute";

import Home from "../pages/Home/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";

import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

import DashboardHome from "../pages/Dashboard/DashboardHome";

import PostTuition from "../pages/UserType/Student/PostTuition";
import StudentProfile from "../pages/UserType/Student/StudentProfile";
import AvailableTuitions from "../pages/UserType/Student/AvailableTuitions";
import TuitionDetails from "../pages/UserType/Student/TuitionDetails";

import Tutors from "../pages/UserType/Tutors/Tutors";
import TutorDetails from "../pages/UserType/Tutors/TutorDetails";
import MyApplications from "../pages/UserType/Tutors/MyApplications";
import TutorProfile from "../pages/UserType/Tutors/TutorProfile";

import UserManagement from "../pages/UserType/Admin/UserManagement";

import Forbidden from "../components/common/Forbidden";
import AdminRegister from "../pages/Auth/AdminRegister/AdminRegister";
import TuitionManagement from "../pages/UserType/Admin/TuitionManagement";
import TuitionDetailsPage from "../pages/UserType/Admin/TuitionDetailsPage ";
import MyTuitions from "../pages/UserType/Student/MyTuitions";
import TuitionAnalyticsPage from "../pages/UserType/Student/TuitionAnalytics/TuitionAnalyticsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "available-tuitions", element: <AvailableTuitions /> },
      { path: "tuitions/:tuitionId", element: <TuitionDetails /> },
      { path: "tutors", element: <Tutors /> },
      { path: "tutors/:id", element: <TutorDetails /> },
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "admin-register", element: <AdminRegister /> }
    ],
  },


  // {
  //   path: "/dashboard",
  //   element: (
  //     <PrivateRoute>
  //       <DashboardLayout />
  //     </PrivateRoute>
  //   ),
  //   children: [
  //     { index: true, element: <DashboardHome /> },

  //     { path: "available-tuitions", element: <AvailableTuitions /> },
  //     { path: "tuitions/:tuitionId", element: <TuitionDetails /> },
  //     { path: "tuitions/:id", element: <TuitionDetailsPage /> },
  //     { path: "tutors", element: <Tutors /> },
  //     { path: "tutors/:id", element: <TutorDetails /> },

  //     // ===== STUDENT =====
  //     { path: "post-tuition", element: <PostTuition /> },
  //     { path: "profile", element: <StudentProfile /> },
  //     { path: "my-tuitions", element: <MyTuitions /> },

  //     // ✅ ANALYTICS (nested under My Tuitions)
  //     {
  //       path: "my-tuitions/:tuitionId/analytics",
  //       element: <TuitionAnalyticsPage />,
  //     },

  //     // ===== TUTOR =====
  //     { path: "tutor/applications", element: <MyApplications /> },
  //     { path: "tutor/profile", element: <TutorProfile /> },

  //     // ===== ADMIN =====
  //     { path: "users", element: <UserManagement /> },
  //     { path: "tuitions", element: <TuitionManagement /> },
  //     { path: "tuitions/:id", element: <TuitionDetailsPage /> },
  //   ],
  // },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },

      // ======================
      // PUBLIC / COMMON
      // ======================
      { path: "available-tuitions", element: <AvailableTuitions /> },

      // Student / Tutor view (by tuitionId like T0001)
      { path: "tuitions/:tuitionId", element: <TuitionDetails /> },

      { path: "tutors", element: <Tutors /> },
      { path: "tutors/:id", element: <TutorDetails /> },

      // ======================
      // STUDENT
      // ======================
      { path: "post-tuition", element: <PostTuition /> },
      { path: "profile", element: <StudentProfile /> },
      { path: "my-tuitions", element: <MyTuitions /> },

      {
        path: "my-tuitions/:tuitionId/analytics",
        element: <TuitionAnalyticsPage />,
      },

      // ======================
      // TUTOR
      // ======================
      { path: "tutor/applications", element: <MyApplications /> },
      { path: "tutor/profile", element: <TutorProfile /> },

      // ======================
      // ADMIN (NAMESPACE FIX)
      // ======================
      { path: "admin/users", element: <UserManagement /> },
      { path: "admin/tuitions", element: <TuitionManagement /> },

      // Admin tuition details (by Mongo _id)
      { path: "admin/tuitions/:id", element: <TuitionDetailsPage /> },
    ],
  },
  { path: "/forbidden", element: <Forbidden /> },
]);

export default router;
