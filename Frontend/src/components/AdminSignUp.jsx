import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const AdminSignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [preview, setPreview] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [enteredOTP, setEnteredOTP] = useState("");
  const [serverOTP, setServerOTP] = useState("");
  const [pendingData, setPendingData] = useState(null);



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
      navigate("/AdminSignUp");
    };

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleInitialSubmit = async (data) => {
  try {
    // Send only email to backend to trigger OTP send
    const response = await axios.post("http://localhost:4001/send-otp", {
      email: data.email,
    });

    if (response.data.otp) {
      setServerOTP(response.data.otp); // Only for demo, remove this on production
      setShowOTPModal(true);
      setPendingData(data); // Save data to submit after OTP verified
      toast.success("OTP sent to your email");
    } else {
      toast.error("Failed to send OTP");
    }
  } catch (error) {
    console.error(error);
    toast.error("Error sending OTP");
  }
};

const handleOTPVerify = async () => {
  try {
    const response = await axios.post("http://localhost:4001/Admin/verify-otp", {
      email: emailForVerification,
      otp: enteredOTP,
    });

    if (response.data.verified) {
      // ✅ OTP verified – proceed to registration
      await onSubmit(formDataCache);
      setShowOTPModal(false); // Close the modal
      toast.success("OTP Verified! Registration complete.");
    } else {
      // ❌ OTP is incorrect
      toast.error("OTP not verified. Please try again.");
    }
  } catch (error) {
    console.error("OTP verification failed", error);
    toast.error("An error occurred while verifying OTP.");
  }
};



  const onSubmit = async (data) => {
    try {
      let uploadedImageUrl = profilePicUrl;

      if (profilePic) {
        const formData = new FormData();
        formData.append("file", profilePic);
        formData.append("upload_preset", "sanskar");
        formData.append("cloud_name", "dbvwkqrol");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dbvwkqrol/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await res.json();
        uploadedImageUrl = result.url;
      }

      const userInfo = {
        profile_picture_url: uploadedImageUrl,
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
      };

      await axios.post("http://localhost:4001/Admin/register", userInfo);
      toast.success("Signup successful!");
      navigate("/AdminLogin");
    } catch (err) {
      console.error(err);
      toast.error("Registration failed!");
    }
  };

  return (
    <Wrapper>
      <Navbar />
      <form className="form" onSubmit={handleSubmit(handleInitialSubmit)}>

        <h2 className="title">{t("ar")}</h2>

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
    <div className="bg-white p-6 rounded-md shadow-lg w-96">
      <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
      <input
        type="text"
        value={enteredOTP}
        onChange={(e) => setEnteredOTP(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter OTP"
      />
      <button
        onClick={handleOTPVerify}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Verify
      </button>
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

export default AdminSignUp;