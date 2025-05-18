import client from "../../../config/sqlDB.js";

export async function getProfileDataById(id) {
  const query = `SELECT name, username, email, phone, dob, gender, aadhar, profession, organization, profile_picture_url, profile_picture_key FROM "user" WHERE id = $1 AND is_delete = false AND is_active = true LIMIT 1;`;
  const result = await client.query(query, [id]);
  if (result.rows.length === 0) {
    throw new Error("User not found");
  }
  return result.rows[0];
}