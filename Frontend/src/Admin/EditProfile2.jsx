import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Navbar from "@/components/Navbar";
import toast from "react-hot-toast";
import debounce from "lodash/debounce";

const EditProfile2 = () => {
    const fileInputRef = useRef();
  

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
    });
const [newEmail, setNewEmail] = useState(""); // Replace emailData.new
const [emailOTP, setEmailOTP] = useState("");
const [emailVerified, setEmailVerified] = useState(false);
const [newPhone, setNewPhone] = useState(""); // Replace emailData.new
const [phoneOTP, setPhoneOTP] = useState("");
const [phoneVerified, setPhoneVerified] = useState(false);
const [typedUsername, setTypedUsername] = useState("");
const [usernameAvailable, setUsernameAvailable] = useState(null);
const [hasTyped, setHasTyped] = useState(false);
const baseURL = import.meta.env.VITE_API_BASE_URL; // ✅ Vite env variable



  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const [profileData, setProfileData] = useState({});
  const [superAdminStatus, setSuperAdminStatus] = useState("not_requested");

  const [showEmailModal, setShowEmailModal] = useState(false);
    const [emailData, setEmailData] = useState({ current: profileData.email, new: "" });
    const [emailAvailable, setEmailAvailable] = useState(null); // null | true | false
      const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [phoneData, setPhoneData] = useState({ current: profileData.email, new: "" });
    const [typedName, setTypedName] = useState(profileData.name || "");

const [typedDob, setTypedDob] = useState(profileData.dob?.split("T")[0] || "");
const [typedGender, setTypedGender] = useState(profileData.gender || "");
const [typedProfession, setTypedProfession] = useState(profileData.profession || "");
const [typedOrganization, setTypedOrganization] = useState(profileData.organisation || "");

   

useEffect(() => {
  const checkEmailAvailability = async () => {
    if (!emailData.new) {
      setEmailAvailable(null);
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/Services/check-email-availability`, {
        email: emailData.new
      });

      if (response.data.available) {
        setEmailAvailable(true);
      } else {
        setEmailAvailable(false);
      }
    } catch (error) {
      setEmailAvailable(false);
    }
  };

  const delayDebounce = setTimeout(() => {
    checkEmailAvailability();
  }, 500);

  return () => clearTimeout(delayDebounce);
}, [emailData.new]);



  const storedObjectString = localStorage.getItem("Admin");
 
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
      const res = await axios.post(`${baseURL}/User/get-profile-data`);
      // Example backend expected to return { status: 'approved' | 'requested' | 'not_requested' }
      setSuperAdminStatus(res.data.status);
    } catch (err) {
      console.error("Could not fetch Super Admin request status.");
    }
  };

  const handleChangePassword = async () => {
  const { current, new: newPassword, confirm } = passwords;

  // Validation: All fields must be filled
  if (!current || !newPassword || !confirm) {
    toast.error("All fields are required.");
    return;
  }

  // Validation: New password and confirm password must match
  if (newPassword !== confirm) {
    toast.error("New password and confirm password do not match.");
    return;
  }

  const payload = {
    username:profileData.username,
    currentPassword: current,
    newPassword: newPassword,
    confirmPassword: confirm,
  };

  try {
    const response = await axios.post(`${baseURL}/User/change-password`, payload);
    toast.success("Password changed successfully!");
    
    // Close modal only after successful response
    setShowPasswordModal(false);
    setPasswords({ current: "", new: "", confirm: "" });
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Failed to change password.";
    toast.error(errorMsg);
  }
};
const sendEmailOTP = async (email) => {
  return await axios.post(`${baseURL}/Services/send-otp`, { email });
};


const handleResendEmailOTP = async () => {
  try {
    const response = await sendEmailOTP(newEmail);
    if (response.data.message === "OTP sent to email") {
      toast.success("OTP resent to email");
    } else {
      toast.error("Failed to resend email OTP");
    }
  } catch (error) {
    console.error(error);
    toast.error("Error resending email OTP");
  }
};

const verifyEmailOTP = async (email, otp) => {
  return await axios.post(`${baseURL}/Services/verify-otp`, { email, otp });
};


const handleEmailOTPVerify = async () => {
  try {
    const response = await verifyEmailOTP(newEmail, emailOTP);
    if (response.data.message === "Email verified successfully") {
      setEmailVerified(true);
      toast.success("Email OTP Verified");
    } else {
      toast.error("Email OTP verification failed");
    }
  } catch (error) {
    console.error(error);
    toast.error("Error verifying Email OTP");
  }
};
//phone otp



const handleChangeEmail = async () => {
  if (!emailVerified) {
    toast.error("Email is not verified yet.");
    return;
  }

  const payload = {
    id: myObject.id,
    currentEmail: myObject.email,
    newEmail,
  };

  try {
    const response = await axios.post(`${baseURL}/User/change-email`, payload);
    toast.success("Email changed successfully!");
    setShowEmailModal(false);
    setNewEmail("");
    setEmailOTP("");
    setEmailVerified(false);
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Failed to change Email.";
    toast.error(errorMsg);
  }
};
const sendPhoneOTP = async (phone) => {
  return await axios.post(`${baseURL}/Services/send-phone-otp`, { phone });
};

const verifyPhoneOTP = async (phone, otp) => {
  return await axios.post(`${baseURL}/Services/verify-phone-otp`, { phone, otp });
};

const handleResendPhoneOTP = async () => {
  try {
    const response = await sendPhoneOTP(newPhone);
    if (response.data.message === "OTP sent to phone") {
      toast.success("OTP resent to phone");
    } else {
      toast.error("Failed to resend phone OTP");
    }
  } catch (error) {
    console.error(error);
    toast.error("Error resending phone OTP");
  }
};

const handlePhoneOTPVerify = async () => {
  try {
    const response = await verifyPhoneOTP(newPhone, phoneOTP);
    if (response.data.message === "Phone verified successfully") {
      setPhoneVerified(true);
      toast.success("Phone OTP Verified");
    } else {
      toast.error("Phone OTP verification failed");
    }
  } catch (error) {
    console.error(error);
    toast.error("Error verifying Phone OTP");
  }
};
const handleProfilePhotoChange = async (e) => {

  const file = e.target.files[0];
  if (!file) return;

  // === STEP 1: Store current profile picture key & URL ===
const oldKey = myObject.profile_picture_key; // or profileData.profile if that's the key
const oldUrl = myObject.profile_picture_url;
console.log("oldkey", oldKey);

  try {
    // === STEP 2: Upload new image to S3 ===
    const formData = new FormData();
    formData.append("file", file);

    const uploadRes = await axios.post(`${baseURL}/Services/upload-pdf`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("ds",uploadRes);

    const newKey = uploadRes.data.filekey;
    const newUrl = uploadRes.data.pdf;

     console.log("jjj",newKey);
     console.log("ll",newUrl);
     console.log("ff", profileData.userId);

    // === STEP 3: Send new key & URL to change-profile-photo ===
    const changeRes = await axios.post(`${baseURL}/User/change-profile-photo`, {
      id: profileData.userId,
      profile_picture_key: newKey,
      profile_picture_url: newUrl,
    });
   

    // === STEP 4: If change success, delete old file ===
    if (changeRes.data.status === "OK") {
      if (oldKey) {
       await axios.delete(`${baseURL}/Services/delete-pdf`, {
        data: { fileKey: oldKey },
      });

        console.log("Old profile picture deleted from S3.");
      }
    } else {
      // === STEP 5: If change failed, delete newly uploaded file ===
      await axios.delete(`${baseURL}/Services/delete-pdf`, {
      data: { fileKey: newKey },
    });

      console.warn("Change failed. New photo rolled back.");
    }
  } catch (error) {
    console.error("Error handling profile photo change:", error);
  }
};


const handleRemoveImage = async () => {
  try {
    await axios.post(`${baseURL}/User/remove-profile-photo`, {
      id: profileData.userId
    });
    toast.success("Profile image removed!");
    setProfileData(prev => ({ ...prev, profile: "" }));
  } catch (error) {
    console.error(error);
    toast.error("Failed to remove image.");
  }
};





const handleChangePhone = async () => {
  if (!phoneVerified) {
    toast.error("Phone is not verified yet.");
    return;
  }

  const payload = {
    id: myObject.id,
    currentPhone: myObject.phone,
    newPhone,
  };

  try {
    const response = await axios.post(`${baseURL}/User/change-phone`, payload);
    toast.success("Phone number changed successfully!");
    setShowPhoneModal(false);
    setNewPhone("");
    setPhoneOTP("");
    setPhoneVerified(false);
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Failed to change Phone number.";
    toast.error(errorMsg);
  }
};
const formatDateToMMDDYYYY = (dateStr) => {
  const date = new Date(dateStr);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};
const handleSaveChanges = async () => {
  if (!myObject?.id) {
    toast.error("Profile ID is missing.");
    return;
  }

  const payload = {
  id: myObject.id,
  name: typedName || "",           // send empty string if not typed
  username: typedUsername || "",
  dob: typedDob ? formatDateToMMDDYYYY(typedDob) : "",
  gender: typedGender || "",
  profession: typedProfession || "",
  organization: typedOrganization || "",
};


  console.log("Sending payload:", payload);

  try {
    const response = await axios.post(
      `${baseURL}/User/change-personal-detail`,
      payload
    );
    toast.success("Profile updated successfully!");
  } catch (error) {
    const msg = error.response?.data?.error || "Failed to update profile.";
    toast.error(msg);
    console.error("Error response:", error.response?.data);
  }
};




useEffect(() => {
  if (profileData.username) {
    setTypedUsername(profileData.username);
  }
  if (profileData.name) {
    setTypedName(profileData.name);
  }
  if (profileData.gender) {
    setTypedGender(profileData.gender);
  }
  if (profileData.dob) {
    setTypedDob(profileData.dob);
  }
  if (profileData.profession) {
    setTypedProfession(profileData.profession);
  }
  if (profileData.organisation) {
    setTypedOrganization(profileData.organisation);
  }
  
}, [profileData]);
useEffect(() => {
  if (!hasTyped || typedUsername.trim() === "") return;

  const delayDebounce = setTimeout(() => {
    axios
      .post(`${baseURL}/Services/check-username-availability`, {
        username: typedUsername.trim(),
      })
      .then((res) => {
        setUsernameAvailable(res.data.available); // true/false expected from backend
      })
      .catch(() => {
        setUsernameAvailable(false); // fallback on error
      });
  }, 500); // debounce for smoother UX

  return () => clearTimeout(delayDebounce);
}, [typedUsername, hasTyped]);



  

  const gradientHover =
    "hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 hover:text-white transition-all duration-300";

 return (
    <>
    <Navbar />
    <div className="w-full max-w-screen-lg mx-auto p-6 bg-white rounded-xl shadow-md text-gray-800">


    {/* Profile Image Section */}
    <h2 className="text-xl font-semibold mb-4">Edit My Profile</h2>
   <div className="flex items-center gap-4 mb-6">
  <img
    src={profileData.profile}
    alt="Profile"
    className="w-20 h-20 rounded-full object-cover border"
  />
  <div>
    {/* Hidden input for file upload */}
    <input
      type="file"
      accept="image/png, image/jpeg, image/jpg, image/gif"
      style={{ display: 'none' }}
      ref={fileInputRef}
      onChange={handleProfilePhotoChange}
    />

    {/* Trigger input via button */}
    <button
      className="bg-black text-white px-4 py-2 rounded-md mr-2"
      onClick={() => fileInputRef.current.click()}
    >
      + Change Image
    </button>

    {/* Remove button */}
    <button
      className="text-sm text-red-500 hover:underline"
      onClick={handleRemoveImage}
    >
      Remove Image
    </button>

    <p className="text-xs text-gray-400 mt-1">
      We support PNGs, JPEGs and GIFs under 2MB
    </p>
  </div>
</div>


    {/* Name Fields */}
    {/* Name Fields */}
<div className="space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Name */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
      <input
        type="text"
        value={typedName}
        onChange={(e) => setTypedName(e.target.value)}
        className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
        placeholder="Enter your name"
      />
    </div>

    {/* Username */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
      <input
        type="text"
        value={typedUsername}
        onChange={(e) => {
          setTypedUsername(e.target.value);
          setHasTyped(true);
        }}
        className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
        placeholder="Choose a username"
      />
      {hasTyped && usernameAvailable === true && (
        <p className="mt-1 text-sm text-green-600">This username is available ✅</p>
      )}
      {hasTyped && usernameAvailable === false && (
        <p className="mt-1 text-sm text-red-600">This username is already taken ❌</p>
      )}
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Gender */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
      <select
        value={typedGender}
        onChange={(e) => setTypedGender(e.target.value)}
        className="block w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>

    {/* Date of Birth */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
      <input
        type="date"
        value={typedDob?.split("T")[0]}
        onChange={(e) => setTypedDob(e.target.value)}
        className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
      />
    </div>

    {/* Profession */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
      <input
        type="text"
        value={typedProfession}
        onChange={(e) => setTypedProfession(e.target.value)}
        className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
        placeholder="Your profession"
      />
    </div>
  </div>

  <div>
    {/* Organization */}
    <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
    <input
      type="text"
      value={typedOrganization}
      onChange={(e) => setTypedOrganization(e.target.value)}
      className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
      placeholder="Your organization"
    />
  </div>

  <div className="flex justify-end">
    <button
      onClick={handleSaveChanges}
      className="inline-flex items-center justify-center rounded-md bg-black px-6 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    >
      Save Changes
    </button>
  </div>
</div>


    {/* Account Security */}
    <hr className="my-6" />
    <h2 className="text-lg font-semibold mb-4">Account Security</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
        <div>
        <label className="text-sm text-gray-600">Email</label>
        <input
            type="email"
            value={profileData.email}
            disabled
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
        />
        </div>
        <button className="bg-gray-100 text-sm px-4 py-2 rounded-md w-fit self-end" onClick={() => setShowEmailModal(true)}>Change email</button>

{showEmailModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
      <h3 className="text-lg font-semibold mb-4">Change Email</h3>

      <label className="text-sm text-gray-600">New Email</label>
      <input
        type="email"
        value={emailData.new}
        onChange={(e) => {
    const updatedEmail = e.target.value;
    setNewEmail(updatedEmail); // For availability + OTP logic
    setEmailData({ ...emailData, new: updatedEmail }); // For form state
    setEmailVerified(false); // Reset OTP verification
  }}
        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
      />

      {/* Availability Status */}
      {emailAvailable === false && (
        <p className="text-red-600 text-sm mt-1">Email is already in use.</p>
      )}
      {emailAvailable === true && (
        <p className="text-green-600 text-sm mt-1">Email is not available.</p>
      )}

      {/* OTP Section */}
      {!emailVerified && (
        <>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => sendEmailOTP(newEmail)}
              className="px-3 py-1 rounded-md bg-blue-500 text-white"
            >
              Send OTP
            </button>
            <button
              onClick={() => handleResendEmailOTP(newEmail)}
              className="px-3 py-1 rounded-md bg-gray-500 text-white"
            >
              Resend OTP
            </button>
          </div>

          <input
            type="text"
            value={emailOTP}
            onChange={(e) => setEmailOTP(e.target.value)}
            placeholder="Enter OTP"
            className="mt-3 w-full px-3 py-2 border border-gray-300 rounded-md"
          />

          <button
            onClick={handleEmailOTPVerify}
            className="mt-2 px-4 py-1 rounded-md bg-green-600 text-white"
          >
            Verify OTP
          </button>
        </>
      )}

      {emailVerified && (
        <p className="text-green-600 text-sm mt-2">Email verified ✅</p>
      )}

      {/* Buttons */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => setShowEmailModal(false)}
          className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            if (!emailAvailable) return toast.error("Email already in use");
            if (!emailVerified) return toast.error("Please verify OTP first");
            handleChangeEmail();
          }}
          className="px-4 py-2 rounded-md text-white bg-black hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}





  <div>
    <label className="text-sm text-gray-600">Password</label>
    <input
      type="password"
      value="********"
      disabled
      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
    />
  </div>
  <button
    className="bg-gray-100 text-sm px-4 py-2 rounded-md w-fit self-end"
    onClick={() => setShowPasswordModal(true)}
  >
    Change password
  </button>

{showPasswordModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
      <h3 className="text-lg font-semibold mb-4">Change Password</h3>
      
      <label className="text-sm text-gray-600">Current Password</label>
      <input
        type="text"
        value={passwords.current}
        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
        className="mt-1 mb-3 w-full px-3 py-2 border border-gray-300 rounded-md"
      />

      <label className="text-sm text-gray-600">New Password</label>
      <input
        type="text"
        value={passwords.new}
        onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
        className="mt-1 mb-3 w-full px-3 py-2 border border-gray-300 rounded-md"
      />

      <label className="text-sm text-gray-600">Confirm Password</label>
      <input
        type="text"
        value={passwords.confirm}
        onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
        className="mt-1 mb-4 w-full px-3 py-2 border border-gray-300 rounded-md"
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowPasswordModal(false)}
          className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
        onClick={handleChangePassword}
        className="px-4 py-2 rounded-md text-white bg-black hover:bg-blue-700"
        >
        Save
        </button>

      </div>
    </div>
  </div>
)}


       <div>
  <label className="text-sm text-gray-600">Current Phone No</label>
  <input
    type="text"
    value={profileData.phone}
    disabled
    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
  />
</div>

<button
  className="bg-gray-100 text-sm px-4 py-2 rounded-md w-fit self-end"
  onClick={() => setShowPhoneModal(true)}
>
  Change Phone No
</button>

{showPhoneModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
      <h3 className="text-lg font-semibold mb-4">Change Phone No</h3>

      <label className="text-sm text-gray-600">New Phone No</label>
      <input
        type="text"
        value={newPhone}
        onChange={(e) => {
          setNewPhone(e.target.value);
          setPhoneVerified(false);
        }}
        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
      />

      {/* OTP Section */}
      {!phoneVerified && (
        <>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => sendPhoneOTP(newPhone)}
              className="px-3 py-1 rounded-md bg-blue-500 text-white"
            >
              Send OTP
            </button>
            <button
              onClick={handleResendPhoneOTP}
              className="px-3 py-1 rounded-md bg-gray-500 text-white"
            >
              Resend OTP
            </button>
          </div>

          <input
            type="text"
            value={phoneOTP}
            onChange={(e) => setPhoneOTP(e.target.value)}
            placeholder="Enter OTP"
            className="mt-3 w-full px-3 py-2 border border-gray-300 rounded-md"
          />

          <button
            onClick={handlePhoneOTPVerify}
            className="mt-2 px-4 py-1 rounded-md bg-green-600 text-white"
          >
            Verify OTP
          </button>
        </>
      )}

      {phoneVerified && (
        <p className="text-green-600 text-sm mt-2">Phone verified ✅</p>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => setShowPhoneModal(false)}
          className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleChangePhone}
          className="px-4 py-2 rounded-md text-white bg-black hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

    </div>

    {/* Save Button */}
    
    </div>
    </>

);

};

export default EditProfile2;
