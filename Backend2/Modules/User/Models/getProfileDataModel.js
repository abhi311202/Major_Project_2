import client from "../../../config/sqlDB.js";

export async function getProfileDataById(id) {
  const query = `SELECT name, username, email, phone, dob, gender, aadhar, profession, organization, profile_picture_url, profile_picture_key, user_type, validity_start_date, validity_end_date, last_renewal_date, renewal_status, order_id FROM "active_user_subscription_view_2" WHERE id = $1 AND is_delete = false AND is_active = true LIMIT 1;`;
  const result = await client.query(query, [id]);
  console.log(result.rows[0]);
  if (result.rows.length === 0) {
    throw new Error("User not found");
  }
  return result.rows[0];
}
