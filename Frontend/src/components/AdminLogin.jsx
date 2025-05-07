import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
const UserLogin = () => {

  
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleClick = () => {
    navigate("/AdminSignUp");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:4001/Admin/login", {
        username: data.username,
        password_hash: data.password_hash,
      });

      if (response.status === 200) {
        toast.success("Login sucessfull");
        setAuthUser(response.data.Admin);
        navigate("/");
        localStorage.setItem("Admin", JSON.stringify(response.data.Admin));
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response && error.response.status === 401) {
        toast.error("Invalid username or password.");
      } else {
        toast.error("Request has been to SuperAdmin.");
      }
    }
  };

  return (
    <Wrapper>
      <Navbar />
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="title">{t("al")}</h2>

        <div className="form-group">
        <label>{t("username")}</label>
          <div className="input-wrapper">
            <svg height={20} width={20} viewBox="0 0 32 32" fill="currentColor">
              <path d="..." />
            </svg>
            <input
            type="text"
            placeholder={t("usernamePlaceholder")}
            {...register("username", { required: true })}
          />
          </div>
        </div>
        {errors.username && (
          <span className="p-2 text-sm text-red-500">{t("required")}</span>
        )}

        <div className="form-group">
        <label>{t("password")}</label>
          <div className="input-wrapper">
            <svg height={20} width={20} viewBox="0 0 32 32" fill="currentColor">
              <path d="..." />
            </svg>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder={t("passwordPlaceholder")}
              {...register("password_hash", { required: true })}
            />

            <span
              className="eye-icon"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        {errors.password_hash && (
  <span className="p-2 text-sm text-red-500">{t("required")}</span>
)}

        <button type="submit" className="submit-btn">
          {t("login2")}
        </button>

         <p className="text-center">
          {t("noAccount")}{" "}
          <span className="link" onClick={handleClick}>
            {t("signup")}
          </span>
        </p>

        <div className="divider"></div>

        <button className="google-btn">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjzC2JyZDZ_RaWf0qp11K0lcvB6b6kYNMoqtZAQ9hiPZ4cTIOB"
            alt="Google icon"
            height="18"
          />
          {t("google")}
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

  .text-center {
    text-align: center;
    font-size: 0.9rem;
    margin: 15px 0;

    .link {
      color: #2d79f3;
      font-weight: 500;
      cursor: pointer;
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

export default UserLogin;