import client from "../../../config/sqlDB.js";

export async function changeUserPhone({ id, currentPhone, newPhone }) {
  try {
    await client.query("BEGIN");
    // Verify user and current phone
    const result = await client.query(
      `SELECT id FROM "user" WHERE id = $1 AND phone = $2 AND is_delete = FALSE AND is_active = TRUE`,
      [id, currentPhone]
    );

    if (result.rowCount === 0) {
      throw new Error("Invalid user or current phone, please try again");
    }
    if (currentPhone === newPhone) {
      throw new Error(
        "New phone number cannot be same as old phone number, please try using different phone number"
      );
    }
    // Check if new phone already exists for another user
    const result1 = await client.query(
      `SELECT id FROM "user" WHERE phone = $1 AND is_delete = FALSE AND is_active = TRUE`,
      [newPhone]
    );

    if (result1.rowCount > 0) {
      throw new Error(
        "New phone number already in use, please use another phone number"
      );
    }

    // Update phone
    const result2 = await client.query(
      `UPDATE "user" SET phone = $1 WHERE id = $2 AND phone = $3 RETURNING phone`,
      [newPhone, id, currentPhone]
    );
    if (result2.rowCount === 0) {
      throw new Error("Failed to update phone, please try again");
    }
    await client.query("COMMIT");
    return { phone: result2.rows[0].phone };
  } catch (err) {
    await client.query("ROLLBACK");
    console.log(err);
    throw err;
  }
}
