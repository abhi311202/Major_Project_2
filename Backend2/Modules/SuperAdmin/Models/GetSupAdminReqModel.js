import client from "../../../config/sqlDB.js";

export const getAllSuperAdminRequests = async () => {
  try {
    const query = `
    SELECT 
      req.*, 
      admin.name, admin.username, admin.password_hash, admin.email, admin.phone, admin.dob, admin.gender, admin.aadhar, admin.profession, admin.organization, admin.profile_picture_url
    FROM pending_sa_req req
    JOIN admin ON req.admin_id = admin.id
    WHERE req.approved = FALSE AND req.is_delete = FALSE
    ORDER BY req.created_at DESC
  `;
    const { rows } = await client.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
};
