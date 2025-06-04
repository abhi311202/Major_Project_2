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
    if (myObject) {
      setProfileData({
        userId: myObject.id || "49",
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

      // Optionally: check current Super Admin request status
      fetchSuperAdminStatus(myObject.id || "48");
    }
  }, []);

  const fetchSuperAdminStatus = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:4001/User/check-user-status/${userId}`);
      // Example backend expected to return { status: 'approved' | 'requested' | 'not_requested' }
      setSuperAdminStatus(res.data.status);
    } catch (err) {
      console.error("Could not fetch Super Admin request status.");
    }
  };
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


  

  const gradientHover =
    "hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 hover:text-white transition-all duration-300";

 return (
  <div className="p-6 w-full bg-white text-gray-800 rounded-xl min-h-screen">
    {/* Header */}
    <div className="mb-6">
      <h1 className="text-3xl text-slate-700">Profile</h1>
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
            { label: "Registration Date", value: profileData.created_at?.split("T")[0] },
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
 <div className="bg-white rounded-xl p-6 mt-6 text-left border border-gray-200 shadow-sm">
    <h3 className="text-lg font-semibold mb-4 text-gray-800">{product.name}</h3>
    <div className="space-y-3 text-sm">
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
      className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition"
      onClick={() => checkoutHandler(product.price)}
    >
      Buy Now
    </button>
  </div>



</div>



      
      

      
    </div>
  </div>
);

};

export default UserMyProfileSection;
