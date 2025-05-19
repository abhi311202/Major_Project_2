import client from "../../../config/sqlDB.js";

export async function changeUserPersonalDetail({
  id,
  name,
  username,
  dob,
  gender,
  profession,
  organization,
}) {
  try {
    await client.query("BEGIN");
    // Check if username already exists for another user
    const usernameCheck = await client.query(
      'SELECT id FROM "user" WHERE "username" = $1 AND id != $2 AND is_delete = false AND is_active = true',
      [username, id]
    );
    if (usernameCheck.rowCount > 0) {
      throw new Error("Username already in use by another user");
    }
    // Update user details
    const updateResult = await client.query(
      'UPDATE "user" SET "name" = $1, "username" = $2, "dob" = $3, "gender" = $4, "profession" = $5, "organization" = $6 WHERE id = $7 RETURNING "name", "username", "dob", "gender", "profession", "organization"',
      [name, username, dob, gender, profession, organization, id]
    );
    if (updateResult.rows.length === 0) {
      throw new Error("User not found or update failed");
    }
    await client.query("COMMIT");
    return {  success: true, data : updateResult.rows[0] };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  }
}
