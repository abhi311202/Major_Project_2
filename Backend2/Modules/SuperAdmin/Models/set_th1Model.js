import client from "../../../config/sqlDB.js";

export const set_th1 = async (threshold_value, super_admin_id) => {
  try {
    const query = `INSERT INTO threshold_setting_1 (
        super_admin_id,
        threshold_value,
        is_active,
        is_delete,
        created_at,
        modified_at,
        deleted_at
      ) VALUES ($1, $2, TRUE, FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL) RETURNING id`;
    const result = await client.query(query, [super_admin_id, threshold_value]);

    if (result.rowCount > 0) {
      return result.rows[0].id; // Return the inserted row's ID
    } else {
      console.log(result);
      // throw new Error("Error in making new entry...");
      return false;
    }
  } catch (error) {
    throw new Error("Error in making new entry");
  }
};
