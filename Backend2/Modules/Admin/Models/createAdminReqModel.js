import client from "../../../config/sqlDB.js";
import bcryptjs from "bcryptjs";

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
