import client from "../../../config/sqlDB.js";

export async function changeUserEmail({ id, currentEmail, newEmail }) {
  await client.query("BEGIN");
  try {
    // Verify user exists and current email matches
    const checkQuery =
      'SELECT user_type FROM "active_user_subscription_view_2" WHERE id = $1 AND email = $2 AND is_delete = false AND is_active = true';
    const checkResult = await client.query(checkQuery, [id, currentEmail]);
    if (checkResult.rows.length === 0) {
      throw new Error("User not found or current email does not match");
    }
    // Check if new email already exists
    const existsQuery =
      'SELECT 1 FROM "active_user_subscription_view_2" WHERE email = $1';
    const existsResult = await client.query(existsQuery, [newEmail]);
    if (existsResult.rows.length > 0) {
      throw new Error("New email already in use");
    }
    // Update email in user table
    const updateQuery =
      'UPDATE "user" SET email = $1 WHERE id = $2 RETURNING email';
    const updateResult = await client.query(updateQuery, [newEmail, id]);

    if (updateResult.rows.length === 0) {
      throw new Error("Email update failed");
    }

    // update email in super user table

    if (checkResult.rows[0].user_type === "super user") {
      const updateQuery1 =
        'UPDATE "super_user" SET email = $1 WHERE id = $2 RETURNING email';
      const updateResult1 = await client.query(updateQuery1, [newEmail, id]);

      if (
        updateResult.rows[0].email === updateResult1.rows[0].email &&
        updateResult1.rows.length > 0
      ) {
        await client.query("COMMIT");
        return updateResult.rows[0];
      } else {
        throw new Error("Email update failed");
      }
    }

    await client.query("COMMIT");
    return updateResult.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  }
}
