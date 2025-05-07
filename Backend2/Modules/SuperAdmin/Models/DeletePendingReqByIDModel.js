import client from "../../../config/sqlDB.js";

export const Delete_Pending_Req_By_ID = async (Pending_Request_id) => {
  //   const query = `SELECT * FROM pending_admin_req WHERE id = $1;`;
  const query = `UPDATE pending_admin_req SET approved = true WHERE id = $1;`;

  const result = await client.query(query, [Pending_Request_id]);

  console.log(result);
  return result.rowCount > 0 ? true : false;
};
