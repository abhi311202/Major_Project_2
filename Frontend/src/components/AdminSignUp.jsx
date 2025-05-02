import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const AdminSignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [preview, setPreview] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setProfilePic(file);
    }
  };

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="title">Admin Registration</h2>

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
                  Upload Profile
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
            <label>Name</label>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Enter your Name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="p-2 text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>User Name</label>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Enter your user name"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <span className="p-2 text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <input
                type="email"
                placeholder="Enter your Email"
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
            <label>Gender</label>
            <div className="input-wrapper">
              <select {...register("gender", { required: true })}>
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              {errors.gender && (
                <span className="p-2 text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Organization</label>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Enter your Organization"
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
            <label>Phone</label>
            <div className="input-wrapper">
              <input
                type="phone"
                placeholder="Enter your Phone Number"
                {...register("phone", { required: true })}
              />
              {errors.phone && (
                <span className="p-2 text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper relative">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your Password"
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
                  This field is required
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Profession</label>
            <div className="input-wrapper">
              <select
                {...register("profession", { required: true })}
                className="select select-bordered select-md w-full"
              >
                <option disabled selected>
                  Select Profession
                </option>
                <option value="Lawyer">Lawyer</option>
                <option value="Judge">Judge</option>
                <option value="Student">Student</option>
                <option value="Legal Researcher">Legal Researcher</option>
              </select>
              {errors.profession && (
                <span className="p-2 text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Aadhar Number</label>
            <div className="input-wrapper">
              <input
                type="number"
                placeholder="Enter your Aadhar Number"
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
            <label>Date of Birth</label>
            <div className="input-wrapper">
              <input type="date" {...register("dob", { required: true })} />
              {errors.dob && (
                <span className="p-2 text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
          </div>

          <div className="form-group ml-64">
            <label style={{ visibility: "hidden" }}>Submit</label>
            <button type="submit" className="submit-btn">
              Register
            </button>
          </div>
        </div>
      </form>
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