import client from "../../../config/sqlDB.js";

export const getuserbyusername = async (username) => {
  const query = `
      SELECT * FROM "user"
      WHERE username = $1
      LIMIT 1;
    `;

  const result = await client.query(query, [username]);

  // If user exists, return the row; otherwise return null
  return result.rows[0] || null;
};
