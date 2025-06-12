import Document from "../Mongo_Models/DocUploadModel.js";
import client from "../../../config/sqlDB.js";
import { getDocument } from "../Models/getDocumentTableModel.js";
import { deleteMetadata } from "../Models/deleteMetadataModel.js";
import { deleteEntity } from "../Models/deleteEntityModel.js";
import { deleteDocumentOwnerMap } from "../Models/deleteDocumentOwnerMapModel.js";
import { deleteDocument } from "../Models/deleteDocumentModel.js";

export const deleteDocumentByIdController = async (req, res) => {
  let MongoData = null;
  try {
    const { document_id } = req.body;
    // get document information from document table
    const Doc = await getDocument(document_id);
    // delete from metadata
    const metaData = await deleteMetadata(document_id);
    // delete from entity
    const entityData = await deleteEntity(document_id);
    // document owner map
    const documentOwnerMap = await deleteDocumentOwnerMap(document_id);
    // delete from document
    const documentData = await deleteDocument(document_id);
    // save temp data from mongo db and delete the mongo data
    MongoData = await Document.findByIdAndDelete(Doc.mongodb_uid);

    if (
      metaData.success &&
      entityData.success &&
      documentOwnerMap.success &&
      MongoData &&
      documentData.success
    ) {
      client.query("COMMIT");
      res.status(200).json({
        success: true,
        message: "Document deleted successfully",
        data: Doc,
      });
    } else {
      throw new Error("Document Deletion Failed");
    }
  } catch (error) {
    client.query("ROLLBACK");
    res.status(500).json({
      success: false,
      message: error.message,
      note: "Document Deletion Failed",
    });
  }
};
