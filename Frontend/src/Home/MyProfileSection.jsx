import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

const MyProfileSection = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const baseURL = import.meta.env.VITE_API_BASE_URL; // ✅ Vite env variable

  const [profileData, setProfileData] = useState({});
  const [superAdminStatus, setSuperAdminStatus] = useState("not_requested");

  const storedObjectString = localStorage.getItem("Admin");
  const myObject = JSON.parse(storedObjectString);
  console.log(myObject)

  useEffect(() => {
    if (myObject?.id) {
      fetchAdminDetails(myObject.id);
      fetchSuperAdminStatus(myObject.id); // Optional
    }
  }, []);
  
  const fetchAdminDetails = async (adminId) => {
    try {
      const response = await axios.post(`${baseURL}/Admin/get-admin-details`, {
        id: adminId,
      });
  
      console.log("API response:", response.data); // Add this to debug
      const data = response.data.admin; // or data.result / data[0] based on what you see
  
      setProfileData({
        adminId: data.id,
        profile: data.profile_picture_url,
        name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone,
        dob: data.dob,
        gender: data.gender,
        aadhaar: data.aadhar,
        profession: data.profession,
        organisation: data.organization,
        created_at: data.created_at,
      });
    } catch (error) {
      console.error("Failed to fetch admin details:", error);
    }
  };
  
  

  const fetchSuperAdminStatus = async (adminId) => {
    try {
      const res = await axios.get(`${baseURL}/Admin/check-super-admin-status/${adminId}`);
      // Example backend expected to return { status: 'approved' | 'requested' | 'not_requested' }
      setSuperAdminStatus(res.data.status);
    } catch (err) {
      console.error("Could not fetch Super Admin request status.");
    }
  };

  const handleSuperAdminRequest = async () => {
    try {
      const response = await axios.post(`${baseURL}/Admin/apply-super-admin`, {
        adminId: profileData.adminId,
      });

      if (response.status === 201) {
        setSuperAdminStatus("requested");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setSuperAdminStatus("requested");
        alert("Request already exists in pending queue.");
      } else {
        console.error("Failed to request super admin:", error);
        alert("Something went wrong! Try again later.");
      }
    }
  };

  const getSuperAdminButtonText = () => {
    switch (superAdminStatus) {
      case "approved":
        return t("You are SuperAdmin");
      case "requested":
        return t("Requested for SuperAdmin");
      default:
        return t("Request For SuperAdmin");
    }
  };

  const gradientHover =
    "hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 hover:text-white transition-all duration-300";

  return (
    <div className="p-6 w-full bg-gradient-to-br from-[#e0c3fc] via-[#8ec5fc] to-[#ffffff] rounded-xl">
      {/* Profile Image and Name */}
      <div className="flex flex-col items-center mb-8 group">
        <div className="p-[3px] rounded-full bg-transparent transition-all duration-300 group-hover:border-4 group-hover:border-pink-500">
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

      {/* Top Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className={`bg-white p-4 rounded-xl dark:bg-black dark:text-white shadow text-center ${gradientHover}`}>
          <div className="text-xl font-bold text-black dark:text-white">
          {myObject.created_at?.split("T")[0]}

          </div>
          <div className="text-sm text-black mt-1 dark:text-white">{t("Registration Date")}</div>
        </div>
        <div className={`bg-white p-4 rounded-xl shadow text-center dark:bg-black dark:text-white ${gradientHover}`}>
          <div className="text-xl font-bold text-black dark:text-white">15</div>
          <div className="text-sm text-black mt-1 dark:text-white">{t("Doc Uploaded")}</div>
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
            className="bg-white p-4 rounded-xl shadow border border-gray-200 hover:bg-gradient-to-r from-pink-400 via-yellow-300 to-purple-400 transition dark:bg-black"
          >
            <p className="text-gray-500 mb-1">{t(label)}</p>
            <p className="font-semibold text-gray-800 dark:text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 pl-4 mt-4">
        
        <button
          className="bg-black text-white font-medium px-5 py-2 rounded-lg shadow-md transition-all duration-300 hover:bg-gradient-to-r hover:from-green-400 hover:via-blue-500 hover:to-purple-600"
          onClick={handleSuperAdminRequest}
          disabled={superAdminStatus !== "not_requested"}
        >
          {getSuperAdminButtonText()}
        </button>
      </div>
    </div>
  );
};

export default MyProfileSection;
