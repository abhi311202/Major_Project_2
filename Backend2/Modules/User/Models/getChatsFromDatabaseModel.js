import client from "../../../config/sqlDB.js";
export async function getChatsFromDatabase(super_user_id) {
  console.log("In Model: " + super_user_id);
  try {
    // const query = 'SELECT * FROM "chat" WHERE party1_superuser_id = $1';
    const query = `SELECT
    c.*,
    a.name AS reciever_name,
    a.username AS reciever_username,
    a.is_active AS reciever_is_active
FROM
    chat c
JOIN
    admin a ON c.party2_admin_id = a.id
WHERE
     c.party1_superuser_id = $1 AND a.is_active = TRUE;`;
    const result = await client.query(query, [super_user_id]);
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
