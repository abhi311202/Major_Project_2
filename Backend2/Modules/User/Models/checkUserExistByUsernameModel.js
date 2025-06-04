import client from "../../../config/sqlDB.js";

export const checkUserExistByUsername = async (username) => {
  const query = `SELECT EXISTS (
        SELECT 1 FROM "user"
        WHERE username = $1 AND is_delete = false
      ) AS user_exists;`;

  const result = await client.query(query, [username]);
  return result.rows[0].user_exists;
};
