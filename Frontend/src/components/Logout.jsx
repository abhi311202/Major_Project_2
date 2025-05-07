import React from "react";
import { useAuth1 } from "../context/AuthProvider1";
import toast from "react-hot-toast";
import { replace, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
function Logout() {
  const [authUser, setAuthUser] = useAuth1();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const handleLogout = () => {
    try {
      setAuthUser({
        ...authUser,
        user: null,
      });
      localStorage.removeItem("Admin");
      toast.success("Logged out successfully");
    //   toast.success("Logged out successfully");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
      // window.location.href = "/";
      window.history.replaceState(null, "", "/");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error("Error: " + error.message);
      setTimeout(() => {}, 3000);
    }
  };
  return (
    <div>
      <button
        className="bg-black border border-border-700 text-white text-xs sm:text-sm px-2 py-1 sm:px-2 sm:py-[5px] rounded-md hover:bg-black duration-300 cursor-pointer"
        onClick={handleLogout}
      >
        {t("logout")}
      </button>
    </div>
  );
}

export default Logout;
