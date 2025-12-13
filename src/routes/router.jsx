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
import Admin from "../pages/Auth/Admin/Admin";

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
      { path: "admin", element: <Admin /> },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "post-tuition", element: <PostTuition /> },
      { path: "profile", element: <StudentProfile /> },
      { path: "tutor/applications", element: <MyApplications /> },
      { path: "tutor/profile", element: <TutorProfile /> },
      { path: "users", element: <UserManagement /> },
    ],
  },

  { path: "/forbidden", element: <Forbidden /> },
]);

export default router;
