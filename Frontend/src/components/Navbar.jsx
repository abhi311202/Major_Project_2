import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Logout from "./Logout";
import { useAuth1 } from "../context/AuthProvider1";
import { useAuth2 } from "../context/AuthProvider2";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe, Moon, Sun, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SuperAdminLogout from "./SuperAdminLogout";
// import { useTheme } from "@/components/theme-provider";

const Navbar = () => {
  const [authUser] = useAuth();
  const [authAdmin] = useAuth1();
  const [authAdmin2] = useAuth2();
  const [sticky, setSticky] = useState(false);
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
 
  
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    setTheme(storedTheme);
  }
}, []);


  const navItems = (
    <>
      <li>
        <a href="/" className="text-xs">
        {t("home")}
        </a>
      </li>
      <li>
        <a href="/search" className="text-xs">
        {t("search")}
        </a>
      </li>
      <li>
        <a href="/services" className="text-xs">
        {t("service")}
        </a>
      </li>
      <li>
        <a href="/team" className="text-xs">
        {t("team")}
        </a>
      </li>
      <li>
        <a href="/about" className="text-xs">
        {t("about")}
        </a>
      </li>
    </>
  );

  return (
    <>
      <div
        className={`w-full max-w-none px-4 md:px-5 top-0 left-0 right-0 z-50 font-sans ${
          sticky
            ? "sticky-navbar shadow-md text-white transition-all duration-300 ease-in-out"
            : "bg-white text-black dark:bg-black dark:text-white"
        }`}
      >
        <div className="navbar flex justify-between items-center mx-auto">
          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content text-black bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>

          {/* Logo */}
          <div className="navbar-start">
            <a href="/" className="text-xl font-extrabold tracking-tight">
              Legal AI
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 space-x-4 text-lg font-medium">
              {navItems}
            </ul>
          </div>

          {/* Right Controls */}
          <div className="navbar-end flex items-center gap-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 bg-gray-200 text-black px-2 py-1 rounded-md text-sm">
                <Globe size={20} />
                <ChevronDown size={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => changeLanguage("en")}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage("hi")}>Hindi</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage("bn")}>Bengali</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth Buttons */}
            {authUser || authAdmin ? (
              <div className="flex items-center gap-2">
                <Button onClick={() => navigate("/AdminHome")} size="sm">
                {t("db")}
                </Button>
                <Logout />
              </div>
            ) : authAdmin2 ? (
              <div className="flex items-center gap-2">
                <Button onClick={() => navigate("/SuperAdminHome")} size="sm">
                {t("db")}
                </Button>
                <SuperAdminLogout />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => navigate("/UserLogin")}
                  size="sm"
                  className="text-xs px-3 py-1.5"
                >
                 {t("userLogin")}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" className="text-xs px-3 py-1.5">
                    {t("login")}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => navigate("/AdminLogin")}>
                     {t("al")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/SuperAdminLogin")}
                    >
                     {t("sl")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-300 my-0" />
    </>
  );
};

export default Navbar;