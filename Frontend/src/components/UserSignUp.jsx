import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
// import toast from "react-hot-toast";
import { useState } from 'react'; // ✅ Fix this


const UserSignUp = () => {
    const [profilePic, setProfilePic] = useState(null); // file object
    const [profilePicUrl, setProfilePicUrl] = useState(""); // cloudinary image URL
    // const [name, setName] = useState("");
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const [email, setEmail] = useState("");
    // const [orginsation, setOrginsation] = useState("");
    // const [dob, setDob] = useState("");
    // const [aadhar, setAadhar]=useState("");
    // const [phone, setPhone] = useState("");
    // const [gender, setGender] = useState("");
    // const [profession, setProfession] = useState("");


    
// Upload handler (you can replace this with Cloudinary, S3, etc.)
const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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
        // setLoading(true);
      
        try {
          let uploadedImageUrl = profilePicUrl;
      
          // Upload image to Cloudinary only if a file is selected
          if (profilePic) {
            const formData = new FormData();
            formData.append("file", profilePic);
            formData.append("upload_preset", "sanskar");
            formData.append("cloud_name", "dbvwkqrol");
      
            const res = await fetch("https://api.cloudinary.com/v1_1/dbvwkqrol/image/upload", {
              method: "POST",
              body: formData,
            });
      
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
      
          const response = await axios.post("http://localhost:4001/User/register", userInfo);
      
          alert("Signup successful!");
          navigate("http://localhost:5173/UserLogin");
      
        } catch (err) {
          console.error(err);
          alert("Registration failed!");
        }
      
        // setLoading(false);
      };
      
  return (
    <Wrapper>
      <Navbar />
<form className="form" onSubmit={handleSubmit(onSubmit)}>
  <h2 className="title">User Registration</h2>

  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Upload Profile Picture</span>
  </div>
  
  <input
    type="file"
    // value={profilePicUrl}
    
    accept="image/*"
    className="file-input file-input-bordered w-full"
    onChange={handleImageChange}
  />
</label>

{/* Image Preview */}
<div className="mt-4">
  
</div>



  <div className="form-grid">
    <div className="form-group">
      <label>Name</label>
      <div className="input-wrapper">
        <input type="text"
        // value={name}

        // onChange={(e)=>setName(e.target.value)}
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
        <input type="text"
        // value={username}
         placeholder="Enter your user name"
        // onChange={(e) => setUsername(e.target.value)}
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
        <input type="email"
        // value={email}
         placeholder="Enter your Email" 
        // onChange={(e) => setEmail(e.target.value)}
        {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, // No uppercase allowed
              message: "Email must be in lowercase only",
            },
            validate: (value) =>
              value === value.toLowerCase() || "Email must be in lowercase only",
          })}
        />
        {errors.email && (
            <span className="p-2 text-sm text-red-500">
              This field is required
            </span>
        )}
      </div>
      
    </div>
    

    <div className="form-group">
      <label>Gender</label>
      <div className="input-wrapper">
        <select 
        {...register("gender", { required: true })}
        // value={gender}
        // onChange={(e) => setGender(e.target.value)}
        >
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
        <input type="text" placeholder="Enter your Organization" 
        // value={orginsation}
        // onChange={(e) => setOrginsation(e.target.value)}
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
        <input type="phone" placeholder="Enter your Phone Number"
        // value={phone}
        // onChange={(e) => setPhone(e.target.value)}
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
      <div className="input-wrapper">
        <input type="password" placeholder="Enter your Password"
        // value={password}
        // onChange={(e) => setPassword(e.target.value)}
        {...register("password", { required: true })}
        />
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
            className="select select-bordered select-md w-full flex gap-2"
            // value={profession}
            {...register("profession", { required: true })}
            // onChange={(e) => setProfession(e.target.value)}
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
        type="number" placeholder="Enter your Aadhar Number" maxLength={12}
        // value={aadhar} 
        {...register("aadhaar", {
            required: true,
            pattern: /^[0-9]{12}$/, // Validates exactly 12 digits
        })}
        // onChange={(e) => setAadhar(e.target.value)}
        />
        {errors.aadhaar && (
            <span className="p-2 text-sm text-red-500">
              Aaddhar card must be 12 digits
            </span>
             )
            }
      </div>
    </div>
    

    <div className="form-group">
      <label>Date of Birth</label>
      <div className="input-wrapper">
        <input type="date"
        // value={dob}
        {...register("dob", { required: true })}
        // onChange={(e) => setDob(e.target.value)}
        />
        {errors.dob && (
            <span className="p-2 text-sm text-red-500">
              This field is required
            </span>
        )}
      </div>
    </div>
    

    <div className="form-group">
      <label style={{ visibility: 'hidden' }}>Submit</label>
      <button type="submit" className="submit-btn">Register</button>
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
  flex: 0 0 48%; /* 2 columns */
}

  min-height: 100vh;
  background: #f9fafb;
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
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
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

      input, select {
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
      background:rgb(43, 42, 42);
    }
  }
`;

export default UserSignUp;
