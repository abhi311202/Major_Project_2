import client from "../../../config/sqlDB.js";

export const updateUser = async (user_id) => {
  //   console.log(Meta_data);
  try {
    const query = `UPDATE user
      SET is_active = false,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *;`;

    const result = await client.query(query, [user_id]);
    // console.log("Model " + result);
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      throw new Error("Unable to Update user table");
    }
  } catch (error) {
    console.error(" Error in updateUser:", error);
    throw error;
  }
};
