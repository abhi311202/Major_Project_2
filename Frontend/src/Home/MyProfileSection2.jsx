import React, { useEffect, useState} from "react";
import { Pencil } from "lucide-react"; // Optional, for the pencil icon
import axios from "axios";
import { toast } from "react-hot-toast";

const MyProfileSection2 = () => {

  const [profileData, setProfileData] = useState({});
  const [thresholdValue, setThresholdValue] = useState("");
  const [customValue, setCustomValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [expectedValue, setExpectedValue] = useState(null);  
  const baseURL = import.meta.env.VITE_API_BASE_URL; // ✅ Vite env variable

  const predefinedOptions = ["10", "20", "30", "50", "100"];

  const storedObjectString = localStorage.getItem("SuperAdmin");
  const myObject = JSON.parse(storedObjectString);
  console.log(myObject);

  const handleSetThreshold = async () => {
    const valueToSend = customValue !== "" ? customValue : thresholdValue;
  
    if (!valueToSend) {
      toast.error("Please select or enter a threshold value.");
      return;
    }
  
    try {
      const response = await axios.post(`${baseURL}/SuperAdmin/set-threshhold1`, {
        threshold_id: localStorage.getItem("Threshold_Id"),
        threshold_value: valueToSend,
        super_admin_id: myObject?.id, // ✅ Use from your parsed localStorage object
      });
  
      console.log(response.data);
      toast.success("Threshold set successfully!");
    } catch (error) {
      console.error("Error setting threshold:", error);
      toast.error("Failed to set threshold");
    }
  };
  
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
      // docUploaded: myObject.docUploaded,
    //   docUploaded: res.data.docs.length,
    //   registeredDate: myObject.registeredDate,
    });
  }, []);
  console.log(profileData.profile);
  const closeModal = () => {
    setShowModal(false); // Close modal when clicked outside or on close button
  };
  useEffect(() => {
    const fetchExpectedValue = async () => {
      try {
        const response = await axios.get(`${baseURL}/SuperAdmin/get-threshhold1`);
        const expectedValue = response.data.data.threshold_value;
        localStorage.setItem("Threshold_Id", response.data.data.threshold_id);
        console.log("Fetched Expected Value:", expectedValue);
        setExpectedValue(expectedValue);
      } catch (error) {
        console.error("Error fetching expected value:", error);
      }
    };
  
    fetchExpectedValue();
  }, []);

  const gradientHover =
    "hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 hover:text-white transition-all duration-300";
  return (
    <div className="p-6 w-full">
      {/* Top Row Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
      <div
          className={`bg-white p-4 rounded-xl shadow text-center ${gradientHover}`}
        >
          <div className="text-xl font-bold text-black">
            {profileData.created_at?.split("T")[0]}
          </div>
          <div className="text-sm text-black mt-1">Registration Date</div>
        </div>

        <div
          className={`bg-white p-4 rounded-xl shadow text-center ${gradientHover}`}
        >
          <div className="text-xl font-bold text-black">15</div>
          <div className="text-sm text-black mt-1">Incoming Requests
          for Admin</div>
        </div>

        
  <div className={`bg-white p-4 rounded-xl shadow text-center ${gradientHover}`}>
        <div className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
          Threshold <Pencil size={18} onClick={() => setShowModal(true)} />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[280px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Set Threshold</h2>
              <button onClick={closeModal} className="text-gray-600 font-bold">
                &times;
              </button>
            </div>

            {/* Dropdown options */}
            <select
              className="text-black p-3 rounded-lg border-2 border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-black w-[230px]"
              onChange={(e) => setThresholdValue(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Select a threshold</option>
              {predefinedOptions.map((opt, index) => (
                <option key={index} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            <div className="text-sm mb-2">or enter a custom value</div>

            {/* Custom input */}
            <input
              type="number"
              placeholder="Custom value"
              className="text-black p-1 rounded-lg border-2 border-gray-300 w-[230px] mb-6 focus:outline-none focus:ring-2 focus:ring-black"
              onChange={(e) => setCustomValue(e.target.value)}
            />

            {/* Submit button */}
            <button
              onClick={handleSetThreshold}
              className="bg-black text-white font-medium px-5 py-2 rounded-lg shadow-md transition-all duration-300 hover:bg-gradient-to-r hover:from-green-400 hover:via-blue-500 hover:to-purple-600 ml-11"
            >
              Set Threshold
            </button>
          </div>
        </div>
      )}

<div
          className={`bg-white p-4 rounded-xl shadow text-center ${gradientHover}`}
        >
          <div className="text-xl font-bold text-black">3</div>
          <div className="text-sm text-black mt-1 text-center">
            Incoming Requests <br /> for Super Admin
          </div>
        </div>
      </div>

      {/* Profile Picture and Name */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Left Column for Image and Name - Centered & Slightly Lower */}
        <div className="flex flex-col items-center mb-8 group">
  {/* Outer container with border effect */}
  <div className="p-[3px] rounded-full bg-transparent transition-all duration-300 group-hover:border-4 group-hover:border-pink-500">
    {/* Profile image with hover scale */}
    <img
      src={profileData.profile}
      alt="Profile"
      className="w-40 h-40 rounded-full object-cover bg-center transition-transform duration-300 group-hover:scale-105"
    />
  </div>
  <div className="text-2xl font-semibold text-black mt-4">
    {profileData.name}
  </div>
</div>

        {/* Right Side Details */}
        <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
          {[
            { label: "Email", value: profileData.email },
            { label: "Username", value: profileData.username },
            { label: "Gender", value: profileData.gender },
            { label: "DOB", value: profileData.dob?.split("T")[0] },
            { label: "Aadhaar ID", value: profileData.aadhaar },
            { label: "Organization", value: profileData.organisation },
            { label: "Profession", value: profileData.profession },
            { label: "Phone", value: profileData.phone },
          ].map(({ label, value }, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-xl shadow border border-gray-200 hover:bg-gradient-to-r from-pink-400 via-yellow-300 to-purple-400 transition"
            >
              <p className="text-gray-500 mb-1">{label}</p>
              <p className="font-semibold text-gray-800 dark:text-white">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
   
    </div>
  );
};

export default MyProfileSection2;