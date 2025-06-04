import client from "../../../config/sqlDB.js";
import bcryptjs from "bcryptjs";

export const createUser = async (userData) => {
  try {
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
      profile_picture_key,
    } = userData;

    // const result = await client.query("", []);

    const pass_hash = await bcryptjs.hash(password_hash, 10);

    const query = `
        INSERT INTO "user" (
          name, username, password_hash, email, phone, dob, gender,
          aadhar, profession, organization, profile_picture_url, profile_picture_key,
          is_active, is_delete, created_at, updated_at, deleted_at
        ) VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,true,false,NOW(),NOW(),NULL
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
      profile_picture_key,
    ];

    const result = await client.query(query, values);
    console.log(`IN USER MODEL :-->     ${result}`);
    return result.rows[0];
  } catch (error) {
    console.error("Error in Create User Model:", error);
    throw error;
  }
};
