import client from "../../../config/sqlDB.js";

export const softDeleteSuperAdminRequest = async (requestId) => {
  const query = `
    UPDATE pending_sa_req
    SET is_delete = TRUE,
        is_active = FALSE,
        updated_at = CURRENT_TIMESTAMP,
        deleted_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *;
  `;
  const { rows } = await client.query(query, [requestId]);
  if (rows.length === 0) {
    throw new Error("Request not found or already deleted.");
  }
  return rows[0];
};
