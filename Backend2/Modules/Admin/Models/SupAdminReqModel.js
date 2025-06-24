import client from "../../../config/sqlDB.js";

export const createSuperAdminRequest = async (adminId) => {
  try {
    // Insert new request if not exists
    const insertQuery = `INSERT INTO pending_SA_req (
      admin_id, approved, is_active, is_delete, created_at, updated_at, deleted_at
    ) VALUES (
      $1, FALSE, TRUE, FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL
    ) RETURNING *;`;
    const insertResult = await client.query(insertQuery, [adminId]);
    if (insertResult.rowCount > 0) {
      return insertResult.rows[0];
    } else {
      throw new Error("No row inserted into pending_SA_req.");
    }
  } catch (error) {
    throw error;
  }
};

export const checkSuperAdminRequest = async (adminId) => {
  try {
    // Check for existing pending request
    const checkQuery = `SELECT 1 FROM pending_SA_req WHERE admin_id = $1 AND is_active = TRUE LIMIT 1;`;
    const checkResult = await client.query(checkQuery, [adminId]);
    return checkResult.rowCount == 0 ? true : false;
  } catch (error) {
    throw error;
  }
};

export const checkApprovedSuperAdminRequest = async (adminId) => {
  try {
    const checkQuery = `SELECT 1 FROM pending_SA_req WHERE admin_id = $1 AND is_active = FALSE AND approved = TRUE LIMIT 1;`;
    const checkResult = await client.query(checkQuery, [adminId]);
    return checkResult.rowCount == 0 ? true : false;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
