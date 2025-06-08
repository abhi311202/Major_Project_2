import client from "../../../config/sqlDB.js";
import bcryptjs from "bcryptjs";

export const changeUserPassword = async ({
  username,
  email,
  currentPassword,
  newPassword,
}) => {
  try {
    // Identify user by username or email
    const identifierField = username ? "username" : "email";
    const identifierValue = username || email;
    // Check if user exists and current password matches
    const checkQuery = `SELECT * FROM "active_user_subscription_view_2" WHERE ${identifierField} = $1 AND is_active = true AND is_delete = false`;
    const checkResult = await client.query(checkQuery, [identifierValue]);
    console.log(checkQuery, [identifierValue, currentPassword], checkResult);
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
    newPassword = await bcryptjs.hash(newPassword, 10);
    // Update password
    client.query("BEGIN");
    const updateQuery = `UPDATE "user" SET password_hash = $1 WHERE ${identifierField} = $2`;
    await client.query(updateQuery, [newPassword, identifierValue]);

    if (checkResult.rows[0].user_type === "super user") {
      const updateQuery1 = `UPDATE "super_user" SET password_hash = $1 WHERE ${identifierField} = $2`;
      await client.query(updateQuery1, [newPassword, identifierValue]);
    }
    // console.log(updateQuery, updateQuery1);
    client.query("COMMIT");
    return true;
  } catch (error) {
    client.query("ROLLBACK");
    throw error;
  }
};

// const pass_hash = await bcryptjs.hash(password_hash, 10)
// const isMatch = await bcryptjs.compare(password, user.password_hash);
