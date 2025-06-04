import client from "../../../config/sqlDB.js";

export const get_th1 = async () => {
  const query = `SELECT * FROM threshold_setting_1 WHERE is_delete = FALSE AND is_active = TRUE ORDER BY created_at ASC;`;
  const result = await client.query(query);
  console.log(result);

  if (result.rowCount === 0) {
    console.log(result);
    throw new Error("No Active Threshold entry found!!!");
  } else if (result.rowCount > 1) {
    console.log(result);
    throw new Error("Ambiguous Thresholds found!!!");
  } else {
    return result.rows[0];
  }
};
