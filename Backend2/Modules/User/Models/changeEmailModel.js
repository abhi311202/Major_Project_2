import client from "../../../config/sqlDB.js";

export async function changeUserEmail({ id, currentEmail, newEmail }) {
  await client.query('BEGIN');
  try {
    // Verify user exists and current email matches
    const checkQuery = 'SELECT email FROM "user" WHERE id = $1 AND email = $2 AND is_delete = false AND is_active = true';
    const checkResult = await client.query(checkQuery, [id, currentEmail]);
    if (checkResult.rows.length === 0) {
      throw new Error('User not found or current email does not match');
    }
    // Check if new email already exists
    const existsQuery = 'SELECT 1 FROM "user" WHERE email = $1';
    const existsResult = await client.query(existsQuery, [newEmail]);
    if (existsResult.rows.length > 0) {
      throw new Error('New email already in use');
    }
    // Update email
    const updateQuery = 'UPDATE "user" SET email = $1 WHERE id = $2 RETURNING email';
    const updateResult = await client.query(updateQuery, [newEmail, id]);
    await client.query('COMMIT');
    return updateResult.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  }
}