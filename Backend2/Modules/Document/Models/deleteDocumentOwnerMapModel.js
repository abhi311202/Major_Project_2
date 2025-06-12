import client from "../../../config/sqlDB.js";

export async function deleteDocumentOwnerMap(documentId) {
  try {
    const query =
      "DELETE FROM document_owner_map WHERE doc_id = $1 RETURNING *";
    const values = [documentId];

    const res = await client.query(query, values);

    if (res.rowCount === 0) {
      throw new Error(`Document Owner Mapping with doc_id: ${docId} not found`);
    }

    console.log("Deleted Document Owner Mapping:", res.rows[0]);
    return {
      success: true,
      message: "Document Owner Mapping deleted successfully",
      data: res.rows[0],
    };
  } catch (error) {
    console.log("Error in the delete Document Owner Mapping Model" + error);
    return error;
  }
}
