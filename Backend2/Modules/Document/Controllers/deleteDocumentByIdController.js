import Document from "../Mongo_Models/DocUploadModel.js";
import client from "../../../config/sqlDB.js";
import axios from "axios";
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

    if (
      metaData.success &&
      entityData.success &&
      documentOwnerMap.success &&
      documentData.success
    ) {
      // document delete api from python
      // http://13.127.253.239:5004/delete

      const response = await axios.post(`http://${process.env.RAG}/delete`, {
        doc_id: document_id,
      });

      if (response.data.deleted) {
        MongoData = await Document.findByIdAndDelete(Doc.mongodb_uid);
        if (!MongoData) {
          throw new Error("MongoDB Document Deletion Failed");
        }
        client.query("COMMIT");
        res.status(200).json({
          success: true,
          message: "Document deleted successfully",
          data: Doc,
          data_vector: response.data,
        });
      } else {
        throw new Error("Document Deletion from Vector Database Failed");
      }
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
