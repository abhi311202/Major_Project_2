import client from "../../../config/sqlDB.js";
export async function getChatByIdModel(ucid) {
  try {
    const query = `SELECT * FROM Messages WHERE ucid = $1 ORDER BY timestamp ASC;`;
    const values = [ucid];
    const result = await client.query(query, values);
    return result.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
