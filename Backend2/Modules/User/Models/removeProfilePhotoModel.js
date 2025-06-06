import client from "../../../config/sqlDB.js";

export async function removeProfilePhoto({ id }) {
  try {
    await client.query("BEGIN");
    const updateResult = await client.query(
      'UPDATE "user" SET "profile_picture_url" = default, "profile_picture_key" = default WHERE id = $1 RETURNING id',
      [id]
    );
    if (updateResult.rows.length === 0) {
      // await client.query("ROLLBACK");
      // return false;
      throw new Error("Profile photo deletion failed");
    }

    const user_type = await client.query(
      'SELECT user_type FROM "active_user_subscription_view_2" WHERE id = $1 AND is_delete = false AND is_active = true',
      [id]
    );
    if (user_type.rows[0].user_type === "super user") {
      const updateResult1 = await client.query(
        'UPDATE "super_user" SET "profile_picture_url" = default, "profile_picture_key" = default WHERE id = $1 RETURNING id',
        [id]
      );
      if (updateResult1.rows.length === 0) {
        throw new Error("Profile photo deletion failed");
      }
    }

    await client.query("COMMIT");
    return true;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  }
}
