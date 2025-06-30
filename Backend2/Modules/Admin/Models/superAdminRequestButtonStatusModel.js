import client from "../../../config/sqlDB.js";

export const superAdminRequestButtonStatusModel = async (adminId) => {
  try {
    // Check for existing pending request
    const checkQuery = `SELECT * FROM pending_SA_req WHERE admin_id = $1 AND is_active = TRUE ;`;
    const checkResult = await client.query(checkQuery, [adminId]);
    return checkResult.rowCount == 0 ? true : false;
  } catch (error) {
    throw error;
  }
};
