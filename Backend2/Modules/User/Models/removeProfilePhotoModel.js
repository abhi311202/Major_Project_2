import client from "../../../config/sqlDB.js";

export async function removeProfilePhoto({ id }) {
  try {
    await client.query("BEGIN");
    const updateResult = await client.query(
      'UPDATE "user" SET "profile_picture_url" = default, "profile_picture_key" = default WHERE id = $1 RETURNING id',
      [id]
    );
    if (updateResult.rows.length === 0) {
      await client.query("ROLLBACK");
      return false;
    }
    await client.query("COMMIT");
    return true;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  }
}
