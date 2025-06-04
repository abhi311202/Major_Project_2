import Document from "../Mongo_Models/DocUploadModel.js";

import client from "../../../config/sqlDB.js";

import { createDocument } from "../Models/createDocumentModel.js";
import { createMetadata } from "../Models/createMetadataModel.js";
import { createEntity } from "../Models/createEntityModel.js";
import { docOwnerMap } from "../Models/docOwnerMapModel.js";

export const DocUpload = async (req, res) => {
  let createdDocument = null;
  let doc_id = null;
  let metadata_id = null;
  let entity_id = null;
  console.log(req.body);
  const { Key_Entities, Metadata, MongoDB, Doc, owner_id, owner_type } =
    req.body;
  try {
    // Mongo Upload Some Data In Mongo DB and recieve some from mongo db
    // console.log(req.body);

    const title = MongoDB.Doc_Title;
    const serialnum = MongoDB.Serial_No;
    const classification1 = MongoDB.Classification;
    const doc = await Document.findOne({ Doc_Title: title });
    const doc1 = await Document.findOne({ Serial_No: serialnum });
    if (doc) {
      return res
        .status(400)
        .json({ message: "Document with the same title already exists." });
    } else if (doc1) {
      return res.status(400).json({
        message: "Document with the same serial number already exists.",
      });
    } else {
      createdDocument = new Document({
        Doc_Title: MongoDB.Doc_Title,
        Serial_No: MongoDB.Serial_No,
        Classification: MongoDB.Classification,
        Classification_reason: MongoDB.Classification_reason,
        Summary: MongoDB.Summary,
        Document_Content: MongoDB.Document_Content,
      });
      await createdDocument.save();
    }

    // save to Document table...
    const doc_data = {
      ...Doc,
      MongoDB_UID: createdDocument._id.toString(),
      doc_title: title,
      serial_no: serialnum,
      classification: classification1,
    };

    await client.query("BEGIN");

    doc_id = await createDocument(doc_data);

    // throw new Error("Could not make entry in Entity or Metadata Table");

    if (doc_id) {
      const Meta_data = {
        id: doc_id,
        ...Metadata,
      };

      const entity_data = {
        id: doc_id,
        ...Key_Entities,
      };

      //   console.log(entity_data);

      metadata_id = await createMetadata(Meta_data);

      entity_id = await createEntity(entity_data);

      console.log(metadata_id, entity_id);

      if (metadata_id && entity_id) {
        try {
          const doc_owner_map_id = await docOwnerMap(
            doc_id,
            owner_id,
            owner_type
          );
          if (doc_owner_map_id) {
            await client.query("COMMIT");
            return res.status(200).json({
              message: "Document Uploaded Successfully",
              Doc_id: doc_id,
              Meta_data: metadata_id,
              Entity_id: entity_id,
            });
          } else {
            throw new Error("Could not make entry in document_owner_map table");
          }
        } catch (error) {
          console.log("Error in DocUploadController: "+error);
          throw error;
        }
      } else {
        throw new Error("Could not make entry in Entity or Metadata Table");
      }
    } else {
      throw new Error("Could not make entry in document table");
    }
  } catch (error) {
    console.log(error);
    if (createdDocument) {
      //   roll back logic of mongodb
      //   console.log(createdDocument._id);
      //   console.log(createdDocument._id.toString());
      const deleted = await Document.findByIdAndDelete(
        createdDocument._id.toString()
      );
      // console.log("Deleted" + deleted);
    }
    await client.query("ROLLBACK");
    return res.status(500).json({ message: error.message || error });
  }
};
