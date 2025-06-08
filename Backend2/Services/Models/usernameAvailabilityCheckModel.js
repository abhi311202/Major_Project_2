import client from "../../config/sqlDB.js";

// "SELECT id FROM "active_user_subscription_view_2" WHERE "username" = $1 AND id != $2 AND is_delete = false AND is_active = true"
export async function isUsernameAvailable(username) {
  const queries = [
    "SELECT 1 FROM admin WHERE username = $1 AND is_delete=false LIMIT 1",
    "SELECT 1 FROM super_admin WHERE username = $1 AND is_delete=false LIMIT 1",
    'SELECT 1 FROM "user" WHERE username = $1 AND is_delete=false LIMIT 1',
    "SELECT 1 FROM super_user WHERE username = $1 AND is_delete=false LIMIT 1",
    "SELECT 1 FROM pending_admin_req WHERE username = $1 AND is_delete=false LIMIT 1",
  ];
  for (const query of queries) {
    const result = await client.query(query, [username]);
    if (result.rows.length > 0) {
      return false; // Username found in one of the tables
    }
  }
  return true; // Username not found in any table
}
