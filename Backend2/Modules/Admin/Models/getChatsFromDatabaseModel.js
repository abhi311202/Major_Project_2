import client from "../../../config/sqlDB.js";
export async function getChatsFromDatabase(admin_id) {
  console.log("In Model: " + admin_id);
  try {
    // const query = 'SELECT * FROM "chat" WHERE party2_admin_id = $1';
    const query = `SELECT
    c.*,
    s.name AS receiver_name,
    s.username AS receiver_username,
    s.profile_picture_url AS receiver_profile_picture_url,
    s.is_active AS receiver_is_active
FROM
    chat c
JOIN
    super_user s ON c.party1_superuser_id = s.id
WHERE
    c.party2_admin_id = $1 AND s.is_active = TRUE;`;
    const result = await client.query(query, [admin_id]);
    if (result.rows.length === 0) {
      return null;
    } else {
      console.log(result.rows);
      return result.rows;
    }
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to be handled at the calling function's catch block
  }
}
