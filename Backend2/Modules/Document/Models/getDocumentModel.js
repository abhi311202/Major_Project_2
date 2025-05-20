import client from "../../../config/sqlDB.js";

export async function getDocuments() {
  try {
    const result = await client.query(
      "SELECT * FROM view_full_document_details"
    );
    return { success: true, documents: result.rows };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
