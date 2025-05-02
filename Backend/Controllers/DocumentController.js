import Document from "../Mongo_Models/DocUploadModel.js";
import mongoose from "mongoose";
import client from "../config/sqlDB.js";
import {
  createDocument,
  createMetadata,
  createEntity,
} from "../Models/Document_Model.js";
// import { Client } from "pg";

export const DocUpload = async (req, res) => {
  let createdDocument = null;
  let doc_id = null;
  let metadata_id = null;
  let entity_id = null;
  console.log(req.body);
  const { Key_Entities, Metadata, MongoDB, Doc } = req.body;
  try {
    // Mongo Upload Some Data In Mongo DB and recieve some from mongo db
    // console.log(req.body);

    const title = MongoDB.Doc_Title;
    const serialnum = MongoDB.Serial_No;
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
        Doc_Title: title,
        Serial_No: serialnum,
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
        await client.query("COMMIT");
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
      //   console.log("Deleted" + deleted);
    }
    await client.query("ROLLBACK");
  }
};
