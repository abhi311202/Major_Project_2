import client from "../../../config/sqlDB.js";

export async function changeProfilePhoto({
  id,
  profile_picture_url,
  profile_picture_key,
}) {
  try {
    await client.query("BEGIN");
    const updateResult = await client.query(
      'UPDATE "user" SET "profile_picture_url" = $1, "profile_picture_key" = $2 WHERE id = $3 RETURNING id, "profile_picture_url", "profile_picture_key"',
      [profile_picture_url, profile_picture_key, id]
    );
    if (updateResult.rowCount === 0) {
      // await client.query("ROLLBACK");
      throw new Error("User not found or update failed");
    }

    // check user type and update profile photo details in super user table if it is super user

    const user_type = await client.query(
      'SELECT user_type FROM "active_user_subscription_view_2" WHERE id = $1 AND is_delete = false AND is_active = true',
      [id]
    );
    if (user_type.rows[0].user_type === "super user") {
      const updateResult1 = await client.query(
        'UPDATE "user" SET "profile_picture_url" = $1, "profile_picture_key" = $2 WHERE id = $3 RETURNING id, "profile_picture_url", "profile_picture_key"',
        [profile_picture_url, profile_picture_key, id]
      );
      if (updateResult1.rowCount === 0) {
        // await client.query("ROLLBACK");
        throw new Error("User not found or update failed");
      }
    }

    await client.query("COMMIT");
    return { success: true, data: updateResult.rows[0] };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  }
}
