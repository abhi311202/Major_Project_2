import client from "../../../config/sqlDB.js";

export const Delete_From_Admin_Table_By_ID = async (id) => {
  const query = `delete from admin where id=$1;`;

  const result = await client.query(query, [id]);

  return result.rowCount > 0 ? true : false;
};
