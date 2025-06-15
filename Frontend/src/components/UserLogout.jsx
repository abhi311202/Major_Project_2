import React from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { replace, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
function UserLogout() {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const handleLogout = () => {
    try {
      setAuthUser(null);               // Clear auth user state completely
      localStorage.removeItem("Users"); // Remove from localStorage
      toast.success("Logged out successfully");
  
      setTimeout(() => {
        // Navigate to home
        navigate("/", { replace: true });
  
        // Reload page to reset everything
        window.location.reload();
      }, 1000); // Wait 1 second to show toast before reload
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };
  
  return (
    <div>
      <button
        className="bg-black border border-border-700 text-white text-xs sm:text-sm px-2 py-1 sm:px-2 sm:py-[5px] rounded-md hover:bg-black duration-300 cursor-pointer dark:bg-white dark:text-black"
        onClick={handleLogout}
      >
        {t("logout")}
      </button>
    </div>
  );
}

export default UserLogout;
