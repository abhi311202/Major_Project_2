import client from "../../../config/sqlDB.js";

export const getAdminRequests = async () => {
  try {
    const query = `SELECT * FROM pending_admin_req WHERE is_delete = FALSE AND approved = FALSE ORDER BY created_at DESC;`;
    const result = await client.query(query);

    return result.rows;
  } catch (error) {
    console.log("Error: " + error);
    throw error;
  }
};
