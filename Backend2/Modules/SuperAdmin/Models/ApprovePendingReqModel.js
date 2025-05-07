import client from "../../../config/sqlDB.js";

export const Approve_Pending_Req = async (SuperAdmin_id, pendingReq) => {
  const { id, ...pendingReqWithoutId } = pendingReq;

  const query = `INSERT INTO admin (
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
      approver_id
  ) VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6,
      $7,
      $8,
      $9,
      $10,
      $11,
      TRUE,
      FALSE,
      CURRENT_TIMESTAMP,
      CURRENT_TIMESTAMP,
      '3000-12-31 00:00:00',
      $12 
  ) RETURNING id;`;

  const result = await client.query(query, [
    pendingReqWithoutId.name,
    pendingReqWithoutId.username,
    pendingReqWithoutId.password_hash,
    pendingReqWithoutId.email,
    pendingReqWithoutId.phone,
    pendingReqWithoutId.dob,
    pendingReqWithoutId.gender,
    pendingReqWithoutId.aadhar,
    pendingReqWithoutId.profession,
    pendingReqWithoutId.organization,
    pendingReqWithoutId.profile_picture_url,
    SuperAdmin_id,
  ]);

  return result.rowCount > 0 ? result.rows[0].id : false;
  //   console.log(result.rows[0].id);
};
