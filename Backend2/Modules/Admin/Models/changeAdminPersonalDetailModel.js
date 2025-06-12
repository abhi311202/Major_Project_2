import client from "../../../config/sqlDB.js";

export async function changeAdminPersonalDetailModel({
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
    // Check if username already exists for another admin
    // Update user details
    const updateResult = await client.query(
      'UPDATE "admin" SET "name" = $1, "username" = $2, "dob" = $3, "gender" = $4, "profession" = $5, "organization" = $6 WHERE id = $7 RETURNING "name", "username", "dob", "gender", "profession", "organization"',
      [name, username, dob, gender, profession, organization, id]
    );

    if (updateResult.rows.length === 0) {
      throw new Error("Admin not found or update failed");
    }
    // console.log( updateResult.rows[0]);
    await client.query("COMMIT");
    return { success: true, data: updateResult.rows[0] };
  } catch (err) {
    await client.query("ROLLBACK");
    console.log("Error in Change Admin Personal Details Controller: " + err);
    return err;
  }
}
