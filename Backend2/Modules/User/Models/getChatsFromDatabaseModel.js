import client from "../../../config/sqlDB.js";
export async function getChatsFromDatabase(super_user_id) {
  console.log("In Model: " + super_user_id);
  try {
    const query = 'SELECT * FROM "chat" WHERE party1_superuser_id = $1';
    const result = await client.query(query, [super_user_id]);
    if (result.rows.length === 0) {
      return null;
    } else {
      return result.rows;
    }
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to be handled at the calling function's catch block
  }
}
