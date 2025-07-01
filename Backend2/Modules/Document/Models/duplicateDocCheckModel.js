import client from "../../../config/sqlDB.js";

export const duplicateDocCheckModel = async (DocHash) => {
  try {
    const duplicateDoc = await client.query(
      "SELECT * FROM document WHERE document_hash = $1",
      [DocHash]
    );
    return duplicateDoc.rowCount > 0 ? false : true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
