import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const UserSignUp = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL; // ✅ Vite env variable
  const [profilePic, setProfilePic] = useState(null);
  const [file, setFile] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [preview, setPreview] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [enteredOTP, setEnteredOTP] = useState("");
  const [serverOTP, setServerOTP] = useState("");
  const [pendingData, setPendingData] = useState(null);
  const [emailForVerification, setEmailForVerification] = useState("");
  const [formDataCache, setFormDataCache] = useState(null);
  const [phoneForVerification, setPhoneForVerification] = useState("");
  const [enteredPhoneOTP, setEnteredPhoneOTP] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [PdfUrl, setPdfUrl] = useState("");
  const [fileKey, setFileKey] = useState("");

  
  useEffect(() => {
    if (emailVerified && phoneVerified) {
      onSubmit(formDataCache);
      setShowOTPModal(false);
      toast.success("Both OTPs Verified!");
    }
  }, [emailVerified, phoneVerified]);
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setProfilePic(file);
    }
  };

    const { t, i18n } = useTranslation();
  
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };
  
    const handleClick = () => {
      navigate("/UserSignUp");
    };

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   let fileK, url;
  // const Helper = async (title) => {
  //   try {
  //     if (file) {
  //       const formData = new FormData();
  //       formData.append("title", title);
  //       formData.append("file", file);
  //       console.log(title, file);
  //       const result = await axios.post(
  //         "http://localhost:4001/Services/upload-pdf",
  //         formData,
  //         { headers: { "Content-Type": "multipart/form-data" } }
  //       );
  //       setPdfUrl(result.data.pdf);
  //       setFileKey(result.data.filekey);
  //       fileK = result.data.filekey;
  //       url = result.data.pdf;
  //       console.log("Upload success:", result.data.pdf);
  //       return true;
  //     }
  //   } catch (error) {
  //     console.error("Upload error:", error);
  //     return false;
  //   }
  // };



  const handleResendEmailOTP = async () => {
    try {
      const response = await sendEmailOTP(emailForVerification);
      if (response.data.message === "OTP sent to email") {
        toast.success("OTP sent to email again");
      } else {
        toast.error("Failed to resend email OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error resending email OTP");
    }
  };

  // Trigger Phone OTP resend
  const handleResendPhoneOTP = async () => {
    try {
      const response = await sendPhoneOTP(phoneForVerification);
      if (response.data.message === "OTP sent to phone") {
        toast.success("OTP sent to phone again");
      } else {
        toast.error("Failed to resend phone OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error resending phone OTP");
    }
  };

  // Verify Email OTP
const handleEmailOTPVerify = async () => {
  try {
    const response = await verifyEmailOTP(emailForVerification, enteredOTP);
    if (response.data.message === "Email verified successfully") {
      setEmailVerified(true);
      toast.success("Email OTP Verified");

      if (phoneVerified) {
        await onSubmit(formDataCache); // Auto-submit if phone already verified
        setShowOTPModal(false);
        toast.success("Both OTPs Verified! Submitted");
      }
    } else {
      toast.error("Email OTP verification failed");
    }
  } catch (error) {
    console.error(error);
    toast.error("Error verifying Email OTP");
  }
};

// Verify Phone OTP
const handlePhoneOTPVerify = async () => {
  try {
    const response = await verifyPhoneOTP(phoneForVerification, enteredPhoneOTP);
    if (response.data.message === "Phone verified successfully") {
      setPhoneVerified(true);
      toast.success("Phone OTP Verified");

      if (emailVerified) {
        await onSubmit(formDataCache); // Auto-submit if email already verified
        setShowOTPModal(false);
        toast.success("Both OTPs Verified! Submitted");
      }
    } else {
      toast.error("Phone OTP verification failed");
    }
  } catch (error) {
    console.error(error);
    toast.error("Error verifying Phone OTP");
  }
};


  // Initial submit (call OTP modal)
  const handleInitialSubmit = async (data) => {
    try {
      const emailResponse = await sendEmailOTP(data.email);
      const phoneResponse = await sendPhoneOTP(data.phone);

      if (
        emailResponse.data.message === "OTP sent to email" &&
        phoneResponse.data.message === "OTP sent to phone"
      ) {
        setEmailForVerification(data.email);
        setPhoneForVerification(data.phone);
        setFormDataCache(data);
        setShowOTPModal(true);
        toast.success("OTPs sent to email and phone");
      } else {
        toast.error("Failed to send one or both OTPs");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error sending OTPs");
    }
  };





  // Send Email OTP
const sendEmailOTP = async (email) => {
  return await axios.post(`${baseURL}/Services/send-otp`, { email });
};

// Send Phone OTP
const sendPhoneOTP = async (phone) => {
  return await axios.post(`${baseURL}/Services/send-phone-otp`, { phone });
};

// Verify Email OTP
const verifyEmailOTP = async (email, otp) => {
  return await axios.post(`${baseURL}/Services/verify-otp`, { email, otp });
};

// Verify Phone OTP
const verifyPhoneOTP = async (phone, otp) => {
  return await axios.post(`${baseURL}/Services/verify-phone-otp`, { phone, otp });
};

  



  // const onSubmit = async (data) => {
  //   try {
  //     let uploadedImageUrl = profilePicUrl;

  //     if (profilePic) {
  //       const formData = new FormData();
  //       formData.append("file", profilePic);
  //       formData.append("upload_preset", "sanskar");
  //       formData.append("cloud_name", "dbvwkqrol");

  //       const res = await fetch(
  //         "https://api.cloudinary.com/v1_1/dbvwkqrol/image/upload",
  //         {
  //           method: "POST",
  //           body: formData,
  //         }
  //       );

  //       const result = await res.json();
  //       uploadedImageUrl = result.url;
  //     }

  //     const userInfo = {
  //       profile_picture_url: uploadedImageUrl,
  //       username: data.username,
  //       name: data.name,
  //       email: data.email,
  //       phone: data.phone,
  //       dob: data.dob,
  //       gender: data.gender,
  //       aadhar: data.aadhaar,
  //       profession: data.profession,
  //       organization: data.organisation,
  //       password_hash: data.password,
  //       type:"WelcomeUserEmail",
  //       profile_picture_url: PdfUrl ? PdfUrl : url,
  //       profile_picture_key: fileKey ? fileKey : fileK,
  //     };

  //     await axios.post("http://localhost:4001/User/register", userInfo);
  //     toast.success("Signup successful!");
  //     navigate("/UserLogin");
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Registration failed!");
  //   }
  // };


  let fileK, url, imgK, imgUrl;

const uploadPDF = async (title) => {
  try {
    if (file) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("file", file);
      const result = await axios.post(
        `${baseURL}/Services/upload-pdf`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      fileK = result.data.filekey;
      url = result.data.pdf;
      console.log("PDF upload success:", url);
      return true;
    }
  } catch (error) {
    console.error("PDF Upload error:", error);
    return false;
  }
};

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file); // Not 'pdf'
  try {
    const response = await axios.post(
      `${baseURL}/Services/upload-pdf`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    console.log(response, "Abhiiii");
    imgK = response.data.filekey;
    imgUrl = response.data.pdf;
    return true;
  } catch (error) {
    console.error('Image upload error:', error);
    return false;
  }
};



const onSubmit = async (data) => {
  try {
    // Upload only profile picture
    const imageUploadSuccess = await uploadImage(profilePic);
    if (!imageUploadSuccess) return toast.error("Image upload failed!");

    const userInfo = {
      profile_picture_url: imgUrl || "",
      profile_picture_key: imgK || "",
      username: data.username,
      name: data.name,
      email: data.email,
      phone: data.phone,
      dob: data.dob,
      gender: data.gender,
      aadhar: data.aadhaar,
      profession: data.profession,
      organization: data.organisation,
      password_hash: data.password,
      type: "WelcomeUserEmail",
    };

    await axios.post(`${baseURL}/User/register`, userInfo);
    toast.success("Signup successful!");
    navigate("/UserLogin");
  } catch (err) {
    console.error(err);
    toast.error("Registration failed!");
  }
};



  return (
    <Wrapper>
      <Navbar />
      <form className="form" onSubmit={handleSubmit(handleInitialSubmit)}>

        <h2 className="title">{t("r")}</h2>

        <div className="form-control w-full max-w-xs items-center gap-4 ">
          <label htmlFor="profile-upload" className="cursor-pointer">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                {t("up")}
                </div>
              )}
            </div>
          </label>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>{t("name")}</label>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder={t("name")}
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="p-2 text-sm text-red-500">
                  {t("required")}
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>{t("un")}</label>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder={t("eyun")}
                {...register("username", { required: true })}
              />
              {errors.username && (
                <span className="p-2 text-sm text-red-500">
                  {t("required")}
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>{t("email")}</label>
            <div className="input-wrapper">
              <input
                type="email"
                placeholder={t("email")}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Email must be in lowercase only",
                  },
                  validate: (value) =>
                    value === value.toLowerCase() ||
                    "Email must be in lowercase only",
                })}
              />
              {errors.email && (
                <span className="p-2 text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>
      

          </div>

          <div className="form-group">
            <label>{t("g")}</label>
            <div className="input-wrapper">
              <select {...register("gender", { required: true })}>
                <option value="">{t("sg")}</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              {errors.gender && (
                <span className="p-2 text-sm text-red-500">
                  {t("required")}
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>{t("o")}</label>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder={t("eyo")}
                {...register("organisation", { required: true })}
              />
              {errors.organisation && (
                <span className="p-2 text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>{t("pn")}</label>
            <div className="input-wrapper">
              <input
                type="phone"
                placeholder={t("eypn")}
                {...register("phone", { required: true })}
              />
              {errors.phone && (
                <span className="p-2 text-sm text-red-500">
                  {t("required")}
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>{t("p")}</label>
            <div className="input-wrapper relative">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder={t("eyp")}
                {...register("password", { required: true })}
              />
              <span
                className="toggle-icon"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                👁
              </span>
              {errors.password && (
                <span className="p-2 text-sm text-red-500">
                 {t("required")}
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>{t("profession")}</label>
            <div className="input-wrapper">
              <select
                {...register("profession", { required: true })}
                className="select select-bordered select-md w-full"
              >
                <option disabled selected>
                {t("selectProfession")}
                </option>
                <option value="Lawyer">Lawyer</option>
                <option value="Judge">Judge</option>
                <option value="Student">Student</option>
                <option value="Legal Researcher">Legal Researcher</option>
              </select>
              {errors.profession && (
                <span className="p-2 text-sm text-red-500">
                  {t("required")}
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>{t("aadhaar")}</label>
            <div className="input-wrapper">
              <input
                type="number"
                placeholder={t("aadhaar")}
                maxLength={12}
                {...register("aadhaar", {
                  required: true,
                  pattern: /^[0-9]{12}$/,
                })}
              />
              {errors.aadhaar && (
                <span className="p-2 text-sm text-red-500">
                  Aadhar card must be 12 digits
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>{t("dob")}</label>
            <div className="input-wrapper">
              <input type="date" {...register("dob", { required: true })} />
              {errors.dob && (
                <span className="p-2 text-sm text-red-500">
                  {t("required")}
                </span>
              )}
            </div>
          </div>

          <div className="form-group ml-64">
            <label style={{ visibility: "hidden" }}>Submit</label>
            <button type="submit" className="submit-btn">
            {t("r")}
            </button>
          </div>
        </div>
      </form>
      {showOTPModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-8 rounded-lg shadow-xl w-96 max-w-md">
      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">Enter OTPs</h2>

      {/* Email OTP Section */}
      <div className="mb-6">
        <label htmlFor="emailOTP" className="block text-gray-600 mb-2">Email OTP</label>
        <input
          id="emailOTP"
          type="text"
          value={enteredOTP}
          onChange={(e) => setEnteredOTP(e.target.value)}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Email OTP"
        />
        <button
          onClick={handleEmailOTPVerify}
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          disabled={emailVerified}
        >
          {emailVerified ? "Email Verified" : "Verify Email OTP"}
        </button>
        <button
          onClick={handleResendEmailOTP}
          className="w-full mt-2 bg-gray-300 text-gray-800 py-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
        >
          Resend Email OTP
        </button>
      </div>

      {/* Phone OTP Section */}
      <div className="mb-6">
        <label htmlFor="phoneOTP" className="block text-gray-600 mb-2">Phone OTP</label>
        <input
          id="phoneOTP"
          type="text"
          value={enteredPhoneOTP}
          onChange={(e) => setEnteredPhoneOTP(e.target.value)}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Phone OTP"
        />
        <button
          onClick={handlePhoneOTPVerify}
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          disabled={phoneVerified}
        >
          {phoneVerified ? "Phone Verified" : "Verify Phone OTP"}
        </button>
        <button
          onClick={handleResendPhoneOTP}
          className="w-full mt-2 bg-gray-300 text-gray-800 py-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
        >
          Resend Phone OTP
        </button>
      </div>

    </div>
  </div>
)}



    </Wrapper>
  );
};

const Wrapper = styled.div`
  .form-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
  }

  .form-group {
    flex: 0 0 48%;
  }

  min-height: 100vh;
  background: linear-gradient(
    135deg,
    rgb(222, 195, 181),
    rgb(207, 225, 238),
    rgb(202, 169, 226)
  );
  display: flex;
  flex-direction: column;
  align-items: center;

  .form {
    margin-top: 50px;
    background: white;
    padding: 30px 35px;
    border-radius: 16px;
    width: 100%;
    max-width: 1120px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  }

  .title {
    text-align: center;
    margin-bottom: 25px;
    font-size: 2rem;
    font-weight: 800;
    color: #222;
  }

  .form-group {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      font-size: 0.95rem;
    }

    .input-wrapper {
      display: flex;
      align-items: center;
      border: 1px solid #dcdfe4;
      border-radius: 10px;
      padding: 10px;
      background: #fafafa;
      transition: border 0.2s ease;
      position: relative;

      input,
      select {
        border: none;
        background: transparent;
        width: 100%;
        font-size: 1rem;
        padding: 6px 0;
        outline: none;
      }

      &:focus-within {
        border-color: #2d79f3;
      }
    }

    .toggle-icon {
      position: absolute;
      right: 12px;
      font-size: 1.2rem;
      cursor: pointer;
      color: #666;
      user-select: none;
    }
  }

  .submit-btn {
    width: 100%;
    background: black;
    color: white;
    padding: 18px;
    border-radius: 10px;
    border: none;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      transform: scale(1.03);
      background: linear-gradient(to right, #6a11cb, #2575fc);
      color: white;
    }
  }
`;

export default UserSignUp;