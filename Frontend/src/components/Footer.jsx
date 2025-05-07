import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer = () => {

  const { t, i18n } = useTranslation();
 
   const changeLanguage = (lng) => {
     i18n.changeLanguage(lng);
   };
  return (
    <footer className="bg-gradient-to-r from-pink-400 via green-400 to-yellow-400 text-white">
      {/* Social Icons */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-6 border-b border-gray-700">
        <h3 className="text-lg font-semibold mb-4 md:mb-0"> {t("cwus")}</h3>
        <div className="flex gap-4">
          {[
            FaFacebookF,
            FaTwitter,
            FaGoogle,
            FaInstagram,
            FaLinkedinIn,
            FaGithub,
          ].map((Icon, index) => (
            <a
              key={index}
              href="#!"
              className="p-3 rounded-full bg-black hover:bg-red-600 transition-colors duration-300 text-lg"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center py-4 text-sm bg-gradient-to-r from-blue-400 via yellow - 400 to-orange-400 text-black">
        © {new Date().getFullYear()}{" "}
        <a
        // href="https://mdbootstrap.com/"
        // className="underline hover:text-indigo-400 transition"
        >
          Legal AI
        </a>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;