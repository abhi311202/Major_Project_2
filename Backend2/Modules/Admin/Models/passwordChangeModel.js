import client from "../../../config/sqlDB.js";
import bcryptjs from "bcryptjs";

export const changeAdminPassword = async ({
  id,
  currentPassword,
  newPassword,
}) => {
  try {
    // Check if admin exists and current password matches
    const checkQuery = `SELECT * FROM "admin" WHERE id = $1 AND is_active = true AND is_delete = false`;
    const checkResult = await client.query(checkQuery, [id]);
    if (checkResult.rows.length === 0) {
      throw new Error("Invalid username/email.");
    }

    const isMatch = await bcryptjs.compare(
      currentPassword,
      checkResult.rows[0].password_hash
    );

    if (!isMatch) {
      throw new Error("Invalid current password.");
    }

    const currNewPassMatch = await bcryptjs.compare(
      newPassword,
      checkResult.rows[0].password_hash
    );

    if (currNewPassMatch) {
      throw new Error("New password cannot be same as current password.");
    }

    // Hash the new password
    const newPassword1 = await bcryptjs.hash(newPassword, 10);
    // Update password
    client.query("BEGIN");
    const updateQuery = `UPDATE "admin" SET password_hash = $1 WHERE id = $2`;
    await client.query(updateQuery, [newPassword1, id]);
    client.query("COMMIT");
  } catch (error) {
    client.query("ROLLBACK");
    throw error;
  }
};

// const pass_hash = await bcryptjs.hash(password_hash, 10)
// const isMatch = await bcryptjs.compare(password, user.password_hash);
