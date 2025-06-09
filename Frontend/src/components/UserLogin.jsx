import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-hot-toast";

const UserLogin = () => {
  const [authUser, setAuthUser] = useAuth();
  const baseURL = import.meta.env.VITE_API_BASE_URL; // ✅ Vite env variable
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/UserSignUp"); // opens the new page
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${baseURL}/User/login`, {
        username: data.username,
        password_hash: data.password_hash,
      });

      // If login is successful, you get a token and user info in response.data
      if (response.status === 200) {
        // toast.success('Login successful!');
        toast.success("Login sucessful");
        setAuthUser(response.data.user);
        navigate("/UserHome"); // ✅ Redirect to home/dashboard
        localStorage.setItem("Users", JSON.stringify(response.data.user));
        // console.log(response, "sans")
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response && error.response.status === 401) {
        // toast.error('Invalid credentials!');
        alert("Invalid username or password.");
      } else {
        // toast.error('Something went wrong during login');
        alert("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <Wrapper>
      <Navbar />

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="title">User Login</h2>

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
              type="password"
              placeholder="Enter your Password"
              {...register("password_hash", { required: true })}
            />
          </div>
        </div>
        {errors.password_hash && (
          <span className="p-2 text-sm text-red-500">
            This field is required
          </span>
        )}

        {/* <div className="form-extra">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <span className="link">Forgot password?</span>
        </div> */}

        <button type="submit" className="submit-btn">
          Log In
        </button>

        <p className="text-center">
          Don't have an account?{" "}
          <span className="link" onClick={handleClick}>
            Sign Up
          </span>
        </p>

        <div className="divider">or</div>

        <button className="google-btn">
          <svg width={20} viewBox="0 0 512 512">
            <path d="..." />
          </svg>
          Continue with Google
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  background: #f9fafb;
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
    font-size: 1.8rem;
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

      &:focus-within {
        border-color: #2d79f3;
      }
    }
  }

  .form-extra {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    margin-bottom: 20px;

    .link {
      color: #2d79f3;
      cursor: pointer;
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
    transition: background 0.2s ease;

    &:hover {
      background: rgb(43, 42, 42);
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
    border: 1px solid #ddd;
    padding: 12px;
    width: 100%;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 500;

    &:hover {
      border-color: #2d79f3;
    }

    svg {
      fill: #2d79f3;
    }
  }
`;

export default UserLogin;
