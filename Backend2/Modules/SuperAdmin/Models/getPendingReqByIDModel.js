import client from "../../../config/sqlDB.js";

export const getPendingReqByID = async (Pending_Request_id) => {
  //   const query = `SELECT * FROM pending_admin_req WHERE id = $1;`;
  const query = `SELECT
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
        profile_picture_url
    FROM pending_admin_req
    WHERE id = $1;`;

  const result = await client.query(query, [Pending_Request_id]);

  return result.rows.length > 0 ? result.rows[0] : false;
};
