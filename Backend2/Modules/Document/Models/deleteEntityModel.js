import client from "../../../config/sqlDB.js";

export async function deleteEntity(documentId) {
  try {
    const query = "DELETE FROM document_entities WHERE id = $1 RETURNING *";
    const values = [documentId];

    const res = await client.query(query, values);

    if (res.rowCount === 0) {
      throw new Error(`Document Entity with id: ${docId} not found`);
    }

    console.log("Deleted document metadata:", res.rows[0]);
    return {
      success: true,
      message: "Document Entity deleted successfully",
      data: res.rows[0],
    };
  } catch (error) {
    console.log("Error in the delete Entity Model" + error);
    return error;
  }
}
