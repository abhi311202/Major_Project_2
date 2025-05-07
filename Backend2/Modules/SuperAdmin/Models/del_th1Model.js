import client from "../../../config/sqlDB.js";
export const del_th1 = async (threshold_id) => {
  try {
    const query = `UPDATE threshold_setting_1
  SET
      is_active = FALSE,
      is_delete = TRUE,
      modified_at = CURRENT_TIMESTAMP,
      deleted_at = CURRENT_TIMESTAMP
  WHERE id = $1;`;

    const result = await client.query(query, [threshold_id]);
    console.log(result);
    if (result.rowCount > 0) {
      return true; // Deletion successful
    } else {
      return false; // No row found with the given id
    }
  } catch (error) {
    throw new Error("Error in deleting the past entry");
  }
};
