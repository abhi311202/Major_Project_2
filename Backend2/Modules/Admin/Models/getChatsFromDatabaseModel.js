import client from "../../../config/sqlDB.js";
export async function getChatsFromDatabase(admin_id) {
  console.log("In Model: " + admin_id);
  try {
    const query = 'SELECT * FROM "chat" WHERE party2_admin_id = $1';
    const result = await client.query(query, [admin_id]);
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
