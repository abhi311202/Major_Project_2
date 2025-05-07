import React from "react";
import { useAuth2 } from "../context/AuthProvider2";
import toast from "react-hot-toast";
import { replace, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
function SuperAdminLogout() {
    const { t, i18n } = useTranslation();
  
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };
  const [authAdmin2, setAuthAdmin2] = useAuth2();
  const handleLogout = () => {
    try {
      setAuthAdmin2({
        ...authAdmin2,
        user: null,
      });
      localStorage.removeItem("SuperAdmin");
      toast.success("Logged out successfully");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
      window.history.replaceState(null, "", "/Home2");
      // navigate("/", { replace: true });
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div>
      <button
        className="bg-black border border-black-700 text-white text-xs sm:text-sm px-2 py-1 sm:px-2 sm:py-[5px] rounded-md hover:bg-black-600 duration-300 cursor-pointer"
        onClick={handleLogout}
      >
     {t("logout")}
      </button>
    </div>
  );
}

export default SuperAdminLogout;
