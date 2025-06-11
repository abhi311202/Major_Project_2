import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

const UserMyProfileSection = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL; // ✅ Vite env variable
  const { t, i18n } = useTranslation();
  

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const [profileData, setProfileData] = useState({});
  const [superAdminStatus, setSuperAdminStatus] = useState("not_requested");

  const storedObjectString = localStorage.getItem("Users");
 
  const myObject = JSON.parse(storedObjectString);
  console.log(myObject);
  
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const storedObjectString = localStorage.getItem("Users");
        const myObject = JSON.parse(storedObjectString);
  
        if (!myObject?.id) return console.error("User ID not found in localStorage");
  
        const payload = { id: myObject.id };
        const res = await axios.post(`${baseURL}/User/get-profile-data`, payload);
  
        console.log("✅ Profile Data Response from Backend:", res.data);
  
        // ✅ Access only the 'data' inside res.data
        const profile = res.data.data;
  
        setProfileData({
          userId: profile.id,
          profile: profile.profile_picture_url,
          name: profile.name,
          username: profile.username,
          email: profile.email,
          phone: profile.phone,
          dob: profile.dob,
          gender: profile.gender,
          aadhaar: profile.aadhar,
          profession: profile.profession,
          organisation: profile.organization,
          created_at: profile.created_at,
          validity_start_date: profile.validity_start_date,
          validity_end_date: profile.validity_end_date,
          user_type: profile.user_type,
          order_id: profile.order_id,

        });
  
      } catch (error) {
        console.error("❌ Error fetching profile data:", error);
      }
    };
  
    fetchProfileData();
  }, []);
  
  
  
const product = {
  name: "Product Name",
  price: 999,
  availability: "In Stock"
};

const checkoutHandler = async (amount) => {
  try {
    const { data: keyData } = await axios.get(`${baseURL}/Payments/get-key`);
    const { key } = keyData;
    const { data: orderData } = await axios.post(`${baseURL}/Payments/process`, {
      id : myObject.id,
      amount,
    });

    const { order } = orderData;

    const options = {
      key,
      amount,
      currency: 'INR',
      name: myObject.name || 'Default Name',
      description: 'Razorpay Integration Module',
      order_id: order.id,
      callback_url: `${baseURL}/Payments/payment-verification`,
      prefill: {
        name: myObject.name || '',
        email: myObject.email || '',
        contact: myObject.phone || '',
      },
      theme: {
        color: '#F37254',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (error) {
    console.error("Payment initialization error:", error);
  }
};
const isExpiringSoon = (expiryDate) => {
  if (!expiryDate) return false;

  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffInTime = expiry.getTime() - today.getTime();
  const diffInDays = diffInTime / (1000 * 3600 * 24);

  return diffInDays < 7;
};


  

  const gradientHover =
    "hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 hover:text-white transition-all duration-300";

 return (
  <div className="p-6 w-full bg-white text-gray-800 rounded-xl min-h-screen">
    {/* Header */}
    <div className="mb-6">
    <h1 className="text-3xl text-slate-700">
  {profileData.user_type === "super user" ? "Super User" : "User"} Profile
</h1>

      <p className="text-gray-500">View all your profile details here.</p>
    </div>

    {/* Main layout: Left image + name | Right details */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
        
      <div className="bg-gray-100 rounded-xl p-6 h-full border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Bio & other details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 text-sm">
          {[
            { label: "Username", value: profileData.username },
            { label: "Email", value: profileData.email },
            { label: "Phone", value: profileData.phone },
            { label: "Gender", value: profileData.gender },
            { label: "DOB", value: profileData.dob?.split("T")[0] },
            { label: "Profession", value: profileData.profession },
            { label: "Organization", value: profileData.organisation },
            { label: "Aadhaar ID", value: profileData.aadhaar },
            { label: "Registration Date", value: myObject.created_at?.split("T")[0] },
          ].map(({ label, value }, i) => (
            <div key={i}>
             <p className="text-gray-500">{t(label)}</p>
             <p className="font-medium text-slate-700">{value}</p>

            </div>
          ))}
        </div>

        
      </div>
      
{/* Right Column: Profile image */}
<div>
<div className="bg-gray-100 rounded-xl p-6 text-center border border-gray-200 shadow-sm">

    <div className="flex flex-col items-center">
      <img
        src={profileData.profile}
        alt="Profile"
        className="w-40 h-40 rounded-full object-cover mb-4 border-4 border-[#2dd4bf]"
      />
      <h2 className="text-2xl font-semibold">{profileData.name}</h2>
      <span className="text-emerald-500 text-sm mt-1">Premium User</span>
    </div>
  </div>

  {/* ⬇️ New separate box BELOW the profile image card */}
  <div
  className={`rounded-xl p-6 mt-6 text-left shadow-md transition-all duration-800 
    ${
      profileData.user_type === "super user"
        ? "border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 shadow-yellow-400 hover:shadow-2xl animate-pulse"
        : "border border-gray-200 bg-white"
    }`}
>
  {profileData.user_type === "super user" ? (
    <>
      <h3 className="text-xl font-semibold mb-4 text-yellow-700 flex items-center gap-2">
        👑 Premium Plan
      </h3>
      <div className="space-y-4 text-sm text-gray-700">
        <div className="flex justify-between">
          <p className="text-gray-600">Purchase Date</p>
          <p className="font-medium">
            {profileData.validity_start_date?.split("T")[0] || "N/A"}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Expiry Date</p>
          <p
            className={`font-medium ${
              isExpiringSoon(profileData.validity_end_date)
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {profileData.validity_end_date?.split("T")[0] || "N/A"}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Order ID</p>
          <p className="font-medium text-blue-600">
            {profileData.order_id || "N/A"}
          </p>
        </div>
      </div>
    </>
  ) : (
    <>
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{product.name}</h3>
      <div className="space-y-4 text-sm text-gray-700">
        <div className="flex justify-between">
          <p className="text-gray-600">Price</p>
          <p className="font-medium text-green-700">₹{product.price}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Availability</p>
          <p className="font-medium text-green-600">{product.availability}</p>
        </div>
      </div>
      <button
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-all duration-300"
        onClick={() => checkoutHandler(product.price)}
      >
        Buy Now
      </button>
    </>
  )}
</div>





</div>



      
      

      
    </div>
  </div>
);

};

export default UserMyProfileSection;
