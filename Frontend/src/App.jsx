import Home from "./Home/Home";
import React, { useEffect } from "react";
import { Route, Routes, useLocation, Navigate  } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import UserSignUp from "./components/UserSignUp";
import AdminHome from "./Home/AdminHome";
import AdminSignUp from "./components/AdminSignUp";
import AdminLogin from "./components/AdminLogin";
import SuperAdminHome from "./Home/SuperAdminHome";

import SuperAdminLogin from "./components/SuperAdminLogin";
import { Toaster } from "react-hot-toast";
import UserHome from "./Home/UserHome";
import EditProfile from "./User/EditProfile";
import Services from "./User/Services";
import SearchDocument from "./User/SearchDocument";
import PaymentSuccess from "./components/PaymentSuccess";
import DocumentDetails from "./User/DocumentDetails";
import EditProfile2 from "./Admin/EditProfile2";
import EditProfile3 from "./Admin/EditProfile3";
import { useAuth1 } from "./context/AuthProvider1";
import Notifications from "./Admin/Notifications";
import UserNotifications from "./User/UserNotifications";
import AdminDocumentDetails from "./Admin/AdminDocumentDetails";

const App = () => {
  const [authAdmin] = useAuth1();
 
  const isAdminLoggedIn = localStorage.getItem("Admin") !== null;
  const isSuperAdminLoggedIn = localStorage.getItem("SuperAdmin") !== null;
const isUserLoggedIn = localStorage.getItem("Users") !== null;
  return (
    <>

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#fff",
            color: "#000",
            border: "1px solid #000",
          },
        }}
      />

<Routes>
  {/* Default Routes */}
  <Route
  path="/"
  element={
    isAdminLoggedIn || isSuperAdminLoggedIn || isUserLoggedIn
      ? (
          isAdminLoggedIn
            ? <Navigate to="/AdminHome" replace />
            : isSuperAdminLoggedIn
            ? <Navigate to="/SuperAdminHome" replace />
            : <Navigate to="/UserHome" replace />
        )
      : <Home />
  }
/>

<Route
  path="/Home"
  element={
    isAdminLoggedIn || isSuperAdminLoggedIn || isUserLoggedIn
      ? (
          isAdminLoggedIn
            ? <Navigate to="/AdminHome" replace />
            : isSuperAdminLoggedIn
            ? <Navigate to="/SuperAdminHome" replace />
            : <Navigate to="/UserHome" replace />
        )
      : <Home />
  }
/>


  {/* Login Routes */}
  <Route
  path="/UserLogin"
  element={
    isAdminLoggedIn || isSuperAdminLoggedIn || isUserLoggedIn
      ? (
          isAdminLoggedIn
            ? <Navigate to="/AdminHome" replace />
            : isSuperAdminLoggedIn
            ? <Navigate to="/SuperAdminHome" replace />
            : <Navigate to="/UserHome" replace />
        )
      : <UserLogin />
  }
/>

<Route
  path="/AdminLogin"
  element={
    isAdminLoggedIn || isSuperAdminLoggedIn || isUserLoggedIn
      ? (
          isAdminLoggedIn
            ? <Navigate to="/AdminHome" replace />
            : isSuperAdminLoggedIn
            ? <Navigate to="/SuperAdminHome" replace />
            : <Navigate to="/UserHome" replace />
        )
      : <AdminLogin />
  }
/>

<Route
  path="/SuperAdminLogin"
  element={
    isAdminLoggedIn || isSuperAdminLoggedIn || isUserLoggedIn
      ? (
          isAdminLoggedIn
            ? <Navigate to="/AdminHome" replace />
            : isSuperAdminLoggedIn
            ? <Navigate to="/SuperAdminHome" replace />
            : <Navigate to="/UserHome" replace />
        )
      : <SuperAdminLogin />
  }
/>


  {/* Admin-only Routes */}
  <Route
  path="/AdminHome"
  element={
    isAdminLoggedIn && !isUserLoggedIn && !isSuperAdminLoggedIn
      ? <AdminHome />
      : <Navigate to="/AdminLogin" replace />
  }
/>

<Route
  path="/EditProfile2"
  element={
    isAdminLoggedIn && !isUserLoggedIn && !isSuperAdminLoggedIn
      ? <EditProfile2 />
      : <Navigate to="/AdminLogin" replace />
  }
/>


  {/* SuperAdmin-only Routes */}
  <Route
  path="/SuperAdminHome"
  element={
    isSuperAdminLoggedIn && !isAdminLoggedIn && !isUserLoggedIn
      ? <SuperAdminHome />
      : <Navigate to="/SuperAdminLogin" replace />
  }
/>

<Route
  path="/EditProfile3"
  element={
    isSuperAdminLoggedIn && !isAdminLoggedIn && !isUserLoggedIn
      ? <EditProfile3 />
      : <Navigate to="/SuperAdminLogin" replace />
  }
/>


  {/* Restricted for Admin and SuperAdmin */}
  <Route
  path="/UserHome"
  element={
    isUserLoggedIn && !isAdminLoggedIn && !isSuperAdminLoggedIn
      ? <UserHome />
      : <Navigate to="/UserLogin" replace />
  }
/>

<Route
  path="/UserSignUp"
  element={
    isAdminLoggedIn || isSuperAdminLoggedIn || isUserLoggedIn
      ? (
          isAdminLoggedIn
            ? <Navigate to="/AdminHome" replace />
            : isSuperAdminLoggedIn
            ? <Navigate to="/SuperAdminHome" replace />
            : <Navigate to="/UserHome" replace />
        )
      : <UserSignUp />
  }
/>

<Route
  path="/AdminSignUp"
  element={
    isAdminLoggedIn || isSuperAdminLoggedIn || isUserLoggedIn
      ? (
          isAdminLoggedIn
            ? <Navigate to="/AdminHome" replace />
            : isSuperAdminLoggedIn
            ? <Navigate to="/SuperAdminHome" replace />
            : <Navigate to="/UserHome" replace />
        )
      : <AdminSignUp />
  }
/>

  <Route
    path="/EditProfile"
    element={
      isAdminLoggedIn || isSuperAdminLoggedIn
        ? <Navigate to={isAdminLoggedIn ? "/AdminHome" : "/SuperAdminHome"} replace />
        : <EditProfile />
    }
  />
 <Route
  path="/UserServices"
  element={
    isUserLoggedIn && !isAdminLoggedIn && !isSuperAdminLoggedIn
      ? <Services />
      : <Navigate to="/" replace />
  }
/>
<Route
  path="/SearchDocument"
  element={
    isUserLoggedIn && !isAdminLoggedIn && !isSuperAdminLoggedIn
      ? <SearchDocument />
      : <Navigate to="/" replace />
  }
/>
<Route
  path="/paymentSuccess"
  element={
    isUserLoggedIn && !isAdminLoggedIn && !isSuperAdminLoggedIn
      ? <PaymentSuccess />
      : <Navigate to="/" replace />
  }
/>

<Route
  path="/document-details/:id"
  element={
    isUserLoggedIn && !isAdminLoggedIn && !isSuperAdminLoggedIn
      ? <DocumentDetails />
      : <Navigate to="/" replace />
  }
/>

<Route
  path="/document-details2/:id"
  element={
    !isUserLoggedIn && isAdminLoggedIn && !isSuperAdminLoggedIn
      ? <AdminDocumentDetails />
      : <Navigate to="/" replace />
  }
/>
<Route
  path="/:section"
  element={
    isUserLoggedIn || isAdminLoggedIn || isSuperAdminLoggedIn
      ? <Navigate to={
          isAdminLoggedIn
            ? "/AdminHome"
            : isSuperAdminLoggedIn
            ? "/SuperAdminHome"
            : "/UserHome"
        } replace />
      : <Home />
  }
/>
<Route path="/notifications" element={<Notifications />} />
<Route path="/usernotifications" element={<UserNotifications />} />


</Routes>


    </>
  );
};
export default App;
// this task 7
