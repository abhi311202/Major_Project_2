import client from "../../../config/sqlDB.js";

export const getAdminDetailsById = async (id) => {
  try {
    const query = 'SELECT * FROM admin WHERE id = $1 AND is_delete = FALSE AND is_active= TRUE';
    const result = await client.query(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};