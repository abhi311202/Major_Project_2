import React from "react";
import { useNavigate } from "react-router-dom";
// import "..context/DarkModeContext.jsx"; // Import the DarkModeContext if needed
// import { motion } from "framer-motion"; // Import motion for animations
import { useTranslation } from "react-i18next";

function HeroPage() {
  const navigate = useNavigate();
   const { t, i18n } = useTranslation();
  
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-green-400 via-purple-300 to-orange-400 flex items-center justify-center px-6">
      <div className="max-w-4xl text-center space-y-6">
      <h1 className="text-5xl font-extrabold text-gray-800 drop-shadow-sm">
        {t("wt")} {" "}
          <span className="bg-gradient-to-r from-[#FF00CC] via-[#333399] to-[#ff084a] bg-clip-text text-transparent animate-text-gradient">
            Legal AI
          </span>
        </h1>

        <p className="text-lg text-gray-600">
        {t("welcomelegalai")}
        </p>


        <div className="mt-6">
          <button
            onClick={() => navigate("/services")}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#FF00CC] via-[#333399] to-[#00FFFF] text-white font-bold shadow-xl hover:brightness-110 transform hover:scale-105 transition-all  ease-in-out animate-pulse"
          >
            ✨ {t("es")}
          </button>
        </div>
      </div>
    </div>
  );
}

export { HeroPage };