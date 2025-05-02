import client from "../config/sqlDB.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const checkAdminExistsByEmail = async (email) => {
  const query = `SELECT source_table
    FROM (
        SELECT 'admin' AS source_table
        FROM admin
        WHERE email = $1 AND is_delete = FALSE

        UNION ALL

        SELECT 'pending_admin_req' AS source_table
        FROM pending_admin_req
        WHERE email = $1 AND is_delete = FALSE
    ) AS combined
    LIMIT 1;`;

  const result = await client.query(query, [email]);
  return result.rows.length > 0 ? result.rows[0].source_table : false;
};

export const checkAdminExistsByAadhar = async (aadhar) => {
  const query = `SELECT source_table
    FROM (
        SELECT 'admin' AS source_table
        FROM admin
        WHERE aadhar = $1 AND is_delete = FALSE

        UNION ALL

        SELECT 'pending_admin_req' AS source_table
        FROM pending_admin_req
        WHERE aadhar = $1 AND is_delete = FALSE
    ) AS combined
    LIMIT 1;`;

  const result = await client.query(query, [aadhar]);
  return result.rows.length > 0 ? result.rows[0].source_table : false;
};

export const checkAdminExistByUsername = async (username) => {
  //   const query = `SELECT EXISTS (
  //         SELECT 1 FROM "admin"
  //         WHERE username = $1 AND is_delete = false
  //       ) AS user_exists;`;

  const query = `SELECT source_table
    FROM (
        SELECT 'admin' AS source_table
        FROM admin
        WHERE username = $1 AND is_delete = FALSE

        UNION ALL

        SELECT 'pending_admin_req' AS source_table
        FROM pending_admin_req
        WHERE username = $1 AND is_delete = FALSE
    ) AS combined
    LIMIT 1;`;

  const result = await client.query(query, [username]);
  return result.rows.length > 0 ? result.rows[0].source_table : false;
};

export const createAdminReq = async (adminData) => {
  const {
    name,
    username,
    password_hash,
    email,
    phone,
    dob,
    gender,
    aadhar,
    profession,
    organization,
    profile_picture_url,
  } = adminData;

  // const result = await client.query("", []);

  const pass_hash = await bcryptjs.hash(password_hash, 10);

  const query = `
      INSERT INTO "pending_admin_req" (
        name, username, password_hash, email, phone, dob, gender,
        aadhar, profession, organization, profile_picture_url,
        is_active, is_delete, created_at, updated_at, deleted_at
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,true,false,NOW(),NOW(),NOW()
      )
      RETURNING *;
    `;

  const values = [
    name,
    username,
    pass_hash,
    email,
    phone,
    dob,
    gender,
    aadhar,
    profession,
    organization,
    profile_picture_url,
  ];

  const result = await client.query(query, values);
  console.log(`IN ADMIN MODEL :-->     ${result}`);
  return result.rows[0];
};

export const loginAdmin = async (username, password) => {
  const query = `SELECT * FROM "admin"
      WHERE username = $1 AND is_delete = false
      LIMIT 1;`;

  const result = await client.query(query, [username]);

  if (result.rows.length === 0) {
    console.log(result);
    throw new Error("dmin not found");
  }

  const user = result.rows[0];

  const isMatch = await bcryptjs.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  // console.log(user);

  // Generate JWT token
  const token = jwt.sign(
    {
      userId: user.id,
      username: user.username,
      email: user.email,
      // role: user.role || "user", // if role exists
    },
    process.env.JWT_USER_PASSWORD,
    { expiresIn: "1m" }
  );

  const { password_hash, ...userWithoutPassword } = user;

  return {
    message: "Login Successful!!",
    Admin: userWithoutPassword,
    token,
  };
};

const AdminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  aadhaar: {
    type: Number,
    required: true,
    unique: true,
  },
  profession: {
    type: String,
    required: true,
  },
  organisation: {
    type: String,
    required: true,
  },
  registeredDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  password: {
    type: String,
    required: true,
  },
  docUploaded: {
    type: Number,
    default: 0,
  },
});

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;