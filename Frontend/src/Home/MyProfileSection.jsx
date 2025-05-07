import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
const MyProfileSection = () => {
  const { t, i18n } = useTranslation();
    
  const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
  };
  const [profileData, setProfileData] = useState({});

  const storedObjectString = localStorage.getItem("Admin");
  const myObject = JSON.parse(storedObjectString);

  useEffect(() => {
    setProfileData({
      profile: myObject.profile_picture_url,
      name: myObject.name,
      username: myObject.username,
      email: myObject.email,
      phone: myObject.phone,
      dob: myObject.dob,
      gender: myObject.gender,
      aadhaar: myObject.aadhar,
      profession: myObject.profession,
      organisation: myObject.organization,
      created_at: myObject.created_at,
    });
  }, []);
  console.log(profileData.profile);

  const gradientHover =
    "hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 hover:text-white transition-all duration-300";

  return (
    <div className="p-6 w-full bg-gradient-to-br from-[#e0c3fc] via-[#8ec5fc] to-[#ffffff] rounded-xl">
      {/* Profile Image and Name with Hover Gradient Ring */}
      <div className="flex flex-col items-center mb-8 group">
  {/* Outer container with border effect */}
  <div className="p-[3px] rounded-full bg-transparent transition-all duration-300 group-hover:border-4 group-hover:border-pink-500">
    {/* Profile image with hover scale */}
    <img
      src={profileData.profile}
      alt={t("Profile")}
      className="w-40 h-40 rounded-full object-cover bg-center transition-transform duration-300 group-hover:scale-105"
    />
  </div>
  <div className="text-2xl font-semibold text-black mt-4">
    {profileData.name}
  </div>
</div>


      {/* Top Row Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div
          className={`bg-white p-4 rounded-xl shadow text-center ${gradientHover}`}
        >
          <div className="text-xl font-bold text-black">
            {profileData.created_at?.split("T")[0]}
          </div>
          <div className="text-sm text-black mt-1">{t("Registration Date")}e</div>
        </div>
        <div
          className={`bg-white p-4 rounded-xl shadow text-center ${gradientHover}`}
        >
          <div className="text-xl font-bold text-black">15</div>
          <div className="text-sm text-black mt-1">{t("Doc Uploaded")}</div>
        </div>
        <div
          className={`bg-white p-4 rounded-xl shadow text-center ${gradientHover}`}
        >
          <div className="text-xl font-bold text-black">5</div>
          <div className="text-sm text-black mt-1">{t("Rating")}</div>
        </div>
      </div>

      {/* Profile Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 text-sm sm:text-base">
        {[
          { label: "Email", value: profileData.email },
          { label: "Username", value: profileData.username },
          { label: "Gender", value: profileData.gender },
          { label: "DOB", value: profileData.dob?.split("T")[0] },
          { label: "Aadhaar ID", value: profileData.aadhaar },
          { label: "Profession", value: profileData.profession },
          { label: "Organization", value: profileData.organisation },
          { label: "Phone", value: profileData.phone },
        ].map(({ label, value }, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow border border-gray-200 hover:bg-gradient-to-r from-pink-400 via-yellow-300 to-purple-400 transition"
          >
            <p className="text-gray-500 mb-1">{t(label)}</p>
            <p className="font-semibold text-gray-800 dark:text-white">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 pl-4 mt-4">
        {["Change Password", "Edit Profile", "Request For SuperAdmin"].map(
          (btn, i) => (
            <button
              key={i}
              className="bg-black text-white font-medium px-5 py-2 rounded-lg shadow-md transition-all duration-300 hover:bg-gradient-to-r hover:from-green-400 hover:via-blue-500 hover:to-purple-600"
            >
              {t(btn)}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default MyProfileSection;