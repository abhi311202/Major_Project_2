import { v4 as uuidv4 } from "uuid";
import client from "../../../config/sqlDB.js";
import Chat from "twilio/lib/rest/Chat.js";

export async function createNewChatInDatabase(super_user_id, admin_id) {
  if (!super_user_id || !admin_id) {
    throw new Error("Both super_user_id and admin_id are required.");
  }
  const ucid = uuidv4();
  const query = `
        INSERT INTO Chat (ucid, party1_superuser_id, party2_admin_id)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
  const values = [ucid, super_user_id, admin_id];
  try {
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    // Unique constraint violation (superuser-admin pair)
    if (error.code === "23505") {
      throw new Error(
        "A chat between this super user and admin already exists."
      );
    }
    // Foreign key violation
    if (error.code === "23503") {
      throw new Error("Invalid super_user_id or admin_id.");
    }
    // Other database errors
    throw new Error("Failed to create chat: " + error.message);
  }
}

export async function checkChat(super_user_id, admin_id) {
  if (!super_user_id || !admin_id) {
    throw new Error("Both super_user_id and admin_id are required.");
  }

  try {
    // const query = `SELECT * FROM Chat WHERE party1_superuser_id = $1 AND party2_admin_id = $2;`;
    const query = `SELECT
    c.*,
    a.name AS reciever_name,
    a.username AS reciever_username,
    a.profile_picture_url AS reciever_profile_picture_url,
    a.is_active AS reciever_is_active
FROM
    chat c
JOIN
    admin a ON c.party2_admin_id = a.id
WHERE
     c.party1_superuser_id = $1 AND c.party2_admin_id = $2 AND a.is_active = TRUE;`;
    const values = [super_user_id, admin_id];
    const result = await client.query(query, values);
    console.log(result);
    if (result.rowCount > 0) {
      return {
        success: true,
        Chat: result.rows[0],
      };
    } else {
      return {
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
