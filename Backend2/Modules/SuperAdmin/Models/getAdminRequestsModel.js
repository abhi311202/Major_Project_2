import client from "../../../config/sqlDB.js";

export const getAdminRequests = async () => {
  const query = `SELECT * FROM pending_admin_req WHERE is_delete = FALSE AND approved = FALSE ORDER BY created_at DESC;`;
  const result = await client.query(query);

  if (result.rows.length === 0) {
    console.log(result);
    throw new Error("No Pending Request found!");
  } else {
    return result.rows;
  }
};
