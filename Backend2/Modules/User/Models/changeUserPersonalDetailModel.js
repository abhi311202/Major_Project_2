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
      'SELECT id FROM "active_user_subscription_view_2" WHERE "username" = $1 AND id != $2 AND is_delete = false AND is_active = true',
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

    // check user type Update user details in super_user table
    const user_type = await client.query(
      'SELECT user_type FROM "active_user_subscription_view_2" WHERE id = $1 AND is_delete = false AND is_active = true',
      [id]
    );
    if (user_type.rows[0].user_type === "super user") {
      const updateResult1 = await client.query(
        'UPDATE "super_user" SET "name" = $1, "username" = $2, "dob" = $3, "gender" = $4, "profession" = $5, "organization" = $6 WHERE id = $7 RETURNING "name", "username", "dob", "gender", "profession", "organization"',
        [name, username, dob, gender, profession, organization, id]
      );
      if (updateResult1.rows.length === 0) {
        throw new Error("Super User not found or update failed");
      }
    }

    // console.log( updateResult.rows[0]);
    await client.query("COMMIT");
    return { success: true, data: updateResult.rows[0] };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  }
}
