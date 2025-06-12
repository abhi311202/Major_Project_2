import client from "../../../config/sqlDB.js";

export async function getDocument(documentId) {
  try {
    const result = await client.query("SELECT * FROM document WHERE id = $1", [
      documentId,
    ]);

    if (result.rows.length === 0) {
      throw new Error(`Document with id: ${documentId} not found`);
    }
    return result.rows[0];
  } catch (error) {
    console.log("Error in the get Document Model" + error);
    return error;
  }
}
