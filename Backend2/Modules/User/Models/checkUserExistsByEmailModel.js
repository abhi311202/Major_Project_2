import client from "../../../config/sqlDB.js";

export const checkUserExistsByEmail = async (email) => {
  const query = `
      SELECT EXISTS (
        SELECT 1 FROM "user"
        WHERE email = $1 AND is_delete = false
      ) AS user_exists;
    `;

  const result = await client.query(query, [email]);
  return result.rows[0].user_exists; // true or false
};
