import client from "../../../config/sqlDB.js";

export const getUserById = async (user_id) => {
  //   console.log(Meta_data);
  try {
    const query = `SELECT * FROM user
WHERE id = $1;`;

    const result = await client.query(query, [user_id]);
    // console.log("Model " + result);
    if(result.rows.length > 0){
      return result.rows[0];
    }
    throw new Error("No user found with the given ID: " + user_id);
  } catch (error) {
    console.error("Error retrieving  user info:", error);
    throw error;
  }
};
