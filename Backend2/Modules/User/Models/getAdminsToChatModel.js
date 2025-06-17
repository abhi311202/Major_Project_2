import client from "../../../config/sqlDB.js";
export const getAdminsToChatModel = async (req, res) => {
  try {
    const query = `SELECT id, name, username, profile_picture_url FROM admin WHERE is_active = TRUE AND is_delete = FALSE`;
    const admins = await client.query(query);
    return admins.rows; // Return the result of the query
  } catch (error) {
    console.log("Error fetching admins:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};
