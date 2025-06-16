import client from "../../../config/sqlDB.js";
export async function changeAdminEmail({ id, currentEmail, newEmail }) {
  await client.query("BEGIN");
  try {
    // Check if new email already exists
    const existsQuery = 'SELECT 1 FROM "admin_type_view" WHERE email = $1';
    const existsResult = await client.query(existsQuery, [newEmail]);
    if (existsResult.rows.length > 0) {
      throw new Error("New email already in use");
    }
    // Update email in user table
    const updateQuery =
      'UPDATE "admin" SET email = $1 WHERE id = $2 AND email=$3 RETURNING email';
    const updateResult = await client.query(updateQuery, [
      newEmail,
      id,
      currentEmail,
    ]);

    if (updateResult.rows.length === 0) {
      throw new Error("Email update failed");
    }

    await client.query("COMMIT");
    return updateResult.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  }
}
