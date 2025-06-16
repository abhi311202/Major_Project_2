import client from "../../../config/sqlDB.js";

export async function deleteMetadata(documentId) {
  try {
    const query = "DELETE FROM document_metadata WHERE doc_id = $1 RETURNING *";
    const values = [documentId];

    const res = await client.query(query, values);

    if (res.rowCount === 0) {
      throw new Error(`Document metadata with id: ${docId} not found`);
    }

    console.log("Deleted document metadata:", res.rows[0]);
    return {
      success: true,
      message: "Document Metadata deleted successfully",
      data: res.rows[0],
    };
  } catch (error) {
    console.log("Error in the delete Metadata Model" + error);
    return error;
  }
}
