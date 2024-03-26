import "./App.css";
import { Route, Routes, useSearchParams } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import OpenRoute from "./components/cors/Auth/OpenRoute";
import Navbar from "./components/common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import ContactForm from "./components/Contactpage/ContactForm";
import DashBoard from "./pages/DashBoard";
import MyProfile from "./components/cors/Dashboard/MyProfile";
import Sidebar from "./components/cors/Dashboard/Sidebar";
import PrivateRoute from "./components/cors/Auth/PrivateRoute";
import Error from "./pages/Error";
import Settings from "./components/cors/Dashboard/Settings/index";
import Cart from "./components/cors/Dashboard/Cart/index";
import EnrolledCourses from "./components/cors/Dashboard/EnrolledCourses";
import { useSelector } from "react-redux";
import AddCourse from "./components/cors/Dashboard/AddCourse";
import MyCourses from "./components/cors/Dashboard/MyCourses";
import EditCourse from "./components/cors/Dashboard/EditCourse/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/viewCourse";
import { ACCOUNT_TYPE } from "./utils/constants";

import VideoDetails from "./components/cors/viewcourse/VideoDetails";
import Instructor from "./components/cors/Dashboard/instructorDashboard/Instructor";
import AdminPage from "./components/Admin/AdminPage";
import AdminVerify from "./components/Admin/AdminVerify";
import CategoryCreate from "./components/Admin/CategoryCreate";
import CoursePage from "./components/Admin/CoursePage";



function App() {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-portal" element={<AdminPage />} />


        {/* specially for admin  */}
        <Route path="/verification-admin" element={<AdminVerify />} />
        <Route  element={<AdminPage />} >
          <Route  path="/admin/admin-portal" element={<CoursePage/>} />
          <Route path="/admin/create-category"  element={<CategoryCreate/>} />

        </Route>



      
        <Route path="/catalog/:catalogName" element={<Catalog />} />
        <Route path="course/:courseId" element={<CourseDetails/>} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactForm />} />

        <Route
          element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/instructor" element={<Instructor />} />


          <Route path="/dashboard/settings" element={<Settings />} />

          {user?.accountType == "Student" && (
            <>
              <Route path="/dashboard/cart" element={<Cart />} />

              <Route
                path="/dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
            </>
          )}
         {
        user?.accountType === "Instructor" && (
          <>
          <Route path="dashboard/add-course" element={<AddCourse />} />
          <Route path="dashboard/my-courses" element={<MyCourses />} />
          <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
          
          </>
        )
      }
        </Route>


        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
          
          element={<VideoDetails />}
           />

         
          </>
        )
      }
        </Route>



        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
