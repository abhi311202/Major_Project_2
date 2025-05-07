import client from "../../../config/sqlDB.js";

export const checkUserExistsByAadhar = async (aadhar) => {
  const query = `
      SELECT EXISTS (
        SELECT 1 FROM "user"
        WHERE aadhar = $1 AND is_delete = false
      ) AS user_exists;
    `;

  const result = await client.query(query, [aadhar]);
  return result.rows[0].user_exists; // true or false
};
