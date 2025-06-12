import client from "../../../config/sqlDB.js";

export async function deleteDocument(documentId) {
  try {
    const query = "DELETE FROM document WHERE id = $1 RETURNING *";
    const values = [documentId];

    const res = await client.query(query, values);

    if (res.rowCount === 0) {
      throw new Error(`Document with doc_id: ${docId} not found`);
    }

    console.log("Deleted Document :", res.rows[0]);
    return {
      success: true,
      message: "Document deleted successfully",
      data: res.rows[0],
    };
  } catch (error) {
    console.log("Error in the delete Document Model" + error);
    return error;
  }
}
