import client from "../../../config/sqlDB.js";

export const insertSuperUser = async (user) => {
  //   console.log(Meta_data);
  try {
    const query = `INSERT INTO super_user (
        id, name, username, password_hash, email, phone, dob, gender, aadhar, profession, organization, profile_picture_url, is_active, is_delete, created_at, updated_at, deleted_at, profile_picture_key
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, $13
      ) RETURNING *;`;

    const values = [
      user.id,
      user.name,
      user.username,
      user.password_hash,
      user.email,
      user.phone,
      user.dob,
      user.gender,
      user.aadhar,
      user.profession,
      user.organization,
      user.profile_picture_url,
      user.profile_picture_key,
    ];

    const result = await client.query(query, values);
    // console.log("Model " + result);
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      throw new Error(
        "Unable to make entry in super_user table"
      );
    }
  } catch (error) {
    console.error(" Error in insertSuperUserModel:", error);
    throw error;
  }
};
