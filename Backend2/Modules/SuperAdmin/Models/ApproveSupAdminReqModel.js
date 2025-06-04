import client from "../../../config/sqlDB.js";

export const approveSuperAdminRequest = async (requestId) => {
  // Approve the request in the database
  try {
    const updateQuery = `
    UPDATE pending_sa_req
    SET approved = TRUE, updated_at = CURRENT_TIMESTAMP, is_active = FALSE
    WHERE id = $1 AND approved = FALSE AND is_delete = FALSE AND is_active = TRUE
    RETURNING approved;
  `;
    const updateResult = await client.query(updateQuery, [requestId]);
    if (updateResult.rows.length === 0) {
      throw new Error("Request not found or already approved/deleted.");
    }
    return updateResult.rows[0].approved;
  } catch (error) {
    console.error("Error approving request:", error);
    throw error;
  }
};

export const getAdminID = async (requestID) => {
  try {
    const query = `
      SELECT admin_id FROM pending_sa_req
      WHERE id = $1 AND is_active = TRUE AND is_delete = FALSE AND approved = FALSE
    `;
    const result = await client.query(query, [requestID]);
    if (result.rowCount === 0) {
      throw new Error("No active, pending, non-deleted request found...");
    }
    return result.rows[0].admin_id;
  } catch (error) {
    console.error("Error fetching admin ID:", error);
    throw error;
  }
};

export const getAdminData = async (adminId) => {
  try {
    const query = `
      SELECT id,name, username, password_hash, email, phone, dob, gender, aadhar, profession, organization, profile_picture_url
      FROM admin
      WHERE id = $1 AND is_active = TRUE AND is_delete = FALSE
    `;
    const result = await client.query(query, [adminId]);

    if (result.rowCount === 0) {
      throw new Error("Admin not found or inactive/deleted.");
    }
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching admin data:", error);
    throw error;
  }
};

export const putSuperAdminData = async (adminData, superAdminId) => {
  try {
    const {
      id,
      name,
      username,
      password_hash,
      email,
      phone,
      dob,
      gender,
      aadhar,
      profession,
      organization,
      profile_picture_url,
    } = adminData;
    const values = [
      id,
      name,
      username,
      password_hash,
      email,
      phone,
      dob,
      gender,
      aadhar,
      profession,
      organization,
      profile_picture_url,
      superAdminId,
    ];
    const query = `
    INSERT INTO super_admin (
      id,
      name,
      username,
      password_hash,
      email,
      phone,
      dob,
      gender,
      aadhar,
      profession,
      organization,
      profile_picture_url,
      is_active,
      is_delete,
      created_at,
      updated_at,
      deleted_at,
      approver
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, 
      $10, $11, $12, TRUE , FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, $13
    ) RETURNING is_active;
  `;

    const result = await client.query(query, values);
    // console.log(result);
    if (result.rowCount === 0) {
      throw new Error("Insetion in Super Admin Table failed");
    }
    console.log(result);
    return result.rows[0].is_active;
  } catch (error) {
    console.error("Error inserting data into super_admin table:", error);
    throw error;
  }
};

export const deactivateAdmin = async (adminid) => {
  try {
    const query = ` UPDATE admin
    SET is_active = FALSE,
        updated_at = CURRENT_TIMESTAMP WHERE id = $1
    RETURNING is_active;
 `;
    const result = await client.query(query, [adminid]);
    if (result.rowCount === 0) {
      throw new Error("Deactivation in Admin Table failed");
    }
    return result.rows[0].is_active;
  } catch (error) {
    console.error("Error deactivating admin:", error);
    throw error;
  }
};
