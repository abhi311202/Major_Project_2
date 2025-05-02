import client from "../config/sqlDB.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

export const createUser = async (userData) => {
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
  } = userData;

  // const result = await client.query("", []);

  const pass_hash = await bcryptjs.hash(password_hash, 10);

  const query = `
    INSERT INTO "user" (
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
  console.log(`IN USER MODEL :-->     ${result}`);
  return result.rows[0];
};

export const checkUserExistsByEmail = async (email) => {
  const query = `
    SELECT EXISTS (
      SELECT 1 FROM "user"
      WHERE email = $1 AND is_delete = false
    ) AS user_exists;
  `;

  const result = await client.query(query, [email]);
  return result.rows[0].user_exists; // true or false
};

export const checkUserExistsByAadhar = async (aadhar) => {
  const query = `
    SELECT EXISTS (
      SELECT 1 FROM "user"
      WHERE aadhar = $1 AND is_delete = false
    ) AS user_exists;
  `;

  const result = await client.query(query, [aadhar]);
  return result.rows[0].user_exists; // true or false
};

export const checkUserExistByUsername = async (username) => {
  const query = `SELECT EXISTS (
      SELECT 1 FROM "user"
      WHERE username = $1 AND is_delete = false
    ) AS user_exists;`;

  const result = await client.query(query, [username]);
  return result.rows[0].user_exists;
};

export const getuserbyusername = async (username) => {
  const query = `
    SELECT * FROM "user"
    WHERE username = $1
    LIMIT 1;
  `;

  const result = await client.query(query, [username]);

  // If user exists, return the row; otherwise return null
  return result.rows[0] || null;
};

export const loginUser = async (username, password) => {
  // console.log(password);
  const query = `SELECT * FROM "user"
    WHERE username = $1 AND is_delete = false
    LIMIT 1;`;

  const result = await client.query(query, [username]);

  if (result.rows.length === 0) {
    console.log(result);
    throw new Error("User not found");
  }

  const user = result.rows[0];
  // console.log(result);
  // console.log(user);
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
    { expiresIn: "2h" }
  );

  const { password_hash, ...userWithoutPassword } = user;

  return {
    message: "Login Successful!!",
    user: userWithoutPassword,
    token,
  };
};
