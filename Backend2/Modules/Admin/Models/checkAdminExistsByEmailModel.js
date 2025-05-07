import client from "../../../config/sqlDB.js";

export const checkAdminExistsByEmail = async (email) => {
  const query = `SELECT source_table
      FROM (
          SELECT 'admin' AS source_table
          FROM admin
          WHERE email = $1 AND is_delete = FALSE
  
          UNION ALL
  
          SELECT 'pending_admin_req' AS source_table
          FROM pending_admin_req
          WHERE email = $1 AND is_delete = FALSE
      ) AS combined
      LIMIT 1;`;

  const result = await client.query(query, [email]);
  return result.rows.length > 0 ? result.rows[0].source_table : false;
};
