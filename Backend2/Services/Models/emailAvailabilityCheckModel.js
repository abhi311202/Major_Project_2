import client from "../../config/sqlDB.js";

export async function isEmailAvailable(email) {
  const queries = [
    "SELECT 1 FROM admin WHERE email = $1 AND is_delete=false LIMIT 1",
    "SELECT 1 FROM super_admin WHERE email = $1 AND is_delete=false LIMIT 1",
    'SELECT 1 FROM "user" WHERE email = $1 AND is_delete=false LIMIT 1',
    "SELECT 1 FROM super_user WHERE email = $1 AND is_delete=false LIMIT 1",
    "SELECT 1 FROM pending_admin_req WHERE email = $1 AND is_delete=false LIMIT 1",
  ];
  for (const query of queries) {
    const result = await client.query(query, [email]);
    if (result.rows.length > 0) {
      return false; // Email found in one of the tables
    }
  }
  return true; // Email not found in any table
}
