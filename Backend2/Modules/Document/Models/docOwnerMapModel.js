import client from "../../../config/sqlDB.js";

export const docOwnerMap = async (doc_id, owner_id, owner_type) => {
  try {
    const values = [doc_id, owner_id, owner_type];
    const query = `INSERT INTO document_owner_map (
        doc_id,
        owner_id,
        owner_type,
        is_active,
        is_delete,
        created_at,
        updated_at,
        deleted_at
      ) VALUES (
        $1, $2, $3, TRUE, FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL
      )
      RETURNING *;
`;

    const result = await client.query(query, values);
    return result.rowCount > 0 ? result.rows[0].doc_id : false;
  } catch (error) {
    console.log("In DocOwnerMapModel: " + error);
    throw error;
  }
};
