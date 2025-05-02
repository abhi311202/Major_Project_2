import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth2 } from "../context/AuthProvider2";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing Font Awesome icons for eye toggle
import toast from "react-hot-toast";

const SuperAdminLogin = () => {
  const [authUser, setAuthUser] = useAuth2();
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4001/SuperAdmin/login",
        {
          username: data.username,
          password_hash: data.password_hash,
        }
      );

      if (response.status === 200) {
        toast.success("Login successful");
        setAuthUser(response.data.SuperAdmin);
        navigate("/Home2");
        localStorage.setItem(
          "SuperAdmin",
          JSON.stringify(response.data.SuperAdmin)
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Invalid username or password.");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <Wrapper>
      <div className="navbar-wrapper">
        <Navbar />
      </div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="title">Super Admin Login</h2>

        <div className="form-group">
          <label>User Name</label>
          <div className="input-wrapper">
            <svg height={20} width={20} viewBox="0 0 32 32" fill="currentColor">
              <path d="..." />
            </svg>
            <input
              type="text"
              placeholder="Enter your Email"
              {...register("username", { required: true })}
            />
          </div>
        </div>
        {errors.username && (
          <span className="p-2 text-sm text-red-500">
            This field is required
          </span>
        )}

        <div className="form-group">
          <label>Password</label>
          <div className="input-wrapper">
            <svg height={20} width={20} viewBox="0 0 32 32" fill="currentColor">
              <path d="..." />
            </svg>
            <input
              type={passwordVisible ? "text" : "password"} // Toggle password visibility
              placeholder="Enter your Password"
              {...register("password_hash", { required: true })}
            />
            <span
              className="eye-icon"
              onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility on click
            >
              {passwordVisible ? (
                <FaEyeSlash /> // Eye Slash when password is visible
              ) : (
                <FaEye /> // Eye when password is hidden
              )}
            </span>
          </div>
        </div>
        {errors.password_hash && (
          <span className="p-2 text-sm text-red-500">
            This field is required
          </span>
        )}

        <button type="submit" className="submit-btn">
          Log In
        </button>

        <div className="divider"></div>

        <button className="google-btn">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjzC2JyZDZ_RaWf0qp11K0lcvB6b6kYNMoqtZAQ9hiPZ4cTIOB"
            alt="Google icon"
            height="18"
          />
          Continue with Google
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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
  overflow-y: scroll;

  .navbar-wrapper {
    width: 100%;
    border-bottom: 1px solid #ccc;
    background: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .form {
    margin-top: 50px;
    background: white;
    padding: 30px 35px;
    border-radius: 16px;
    width: 100%;
    max-width: 420px;
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
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      padding: 10px;
      background: #fafafa;
      transition: all 0.3s ease;
      position: relative;

      svg {
        margin-right: 10px;
        color: #888;
      }

      input {
        border: none;
        background: transparent;
        width: 100%;
        font-size: 1rem;
        padding: 6px 0;
        outline: none;
      }

      &:hover {
        border-image: linear-gradient(45deg, #6a11cb, #2575fc) 1;
        border-width: 2px;
        border-style: solid;
      }

      .eye-icon {
        position: absolute;
        right: 10px;
        cursor: pointer;
        color: #888;
      }
    }
  }

  .submit-btn {
    width: 100%;
    background: black;
    color: white;
    padding: 12px;
    border-radius: 10px;
    border: none;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.03);
      background: linear-gradient(to right, #6a11cb, #2575fc);
      color: white;
    }
  }

  .divider {
    text-align: center;
    margin: 15px 0;
    font-size: 0.85rem;
    color: #aaa;
    position: relative;
  }

  .divider::before,
  .divider::after {
    content: "";
    height: 1px;
    background: #ddd;
    position: absolute;
    top: 50%;
    width: 40%;
  }

  .divider::before {
    left: 0;
  }

  .divider::after {
    right: 0;
  }

  .google-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: white;
    border: 2px solid #ddd;
    padding: 12px;
    width: 100%;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 500;
    transition: border 0.3s ease;

    img {
      height: 18px;
    }

    &:hover {
      border-image: linear-gradient(45deg, #6a11cb, #2575fc) 1;
      border-width: 2px;
      border-style: solid;
    }
  }
`;

export default SuperAdminLogin;