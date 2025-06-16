import client from "../../../config/sqlDB.js";
import Document from "../Mongo_Models/DocUploadModel.js";

export async function getDocumentByOwnerIdModel(owner_id) {
  try {
    const result = await client.query(
      "SELECT * FROM view_full_document_details WHERE owner_id = $1",
      [owner_id]
    );
    // console.log(result);
    if (result.rows.length === 0) {
      throw new Error(`Document with owner_id: ${owner_id}, not found`);
    }
    const documents = await Promise.all(
      result.rows.map(async (row) => {
        let mongoDoc = null;
        if (row.mongodb_uid) {
          mongoDoc = await Document.findById(row.mongodb_uid).lean();
        }
        return {
          MongoDB: mongoDoc
            ? {
                Doc_Title: mongoDoc.Doc_Title,
                Serial_No: String(mongoDoc.Serial_No),
                Document_Content: mongoDoc.Document_Content,
                Summary: mongoDoc.Summary,
                Classification: mongoDoc.Classification,
                Classification_reason: mongoDoc.Classification_reason,
              }
            : {
                mongoDB_uid: row.mongodb_uid,
                Doc_Title: row.doc_title,
                Serial_No: String(row.serial_no),
                Document_Content: row.document_content, // Make sure this field exists in your view
                Summary: row.summary, // Make sure this field exists in your view
                Classification: row.classification,
                Classification_reason: row.classification_reason, // Make sure this field exists in your view
              },
          Key_Entities: {
            Case_no: row.case_no,
            Case_type: row.case_type,
            Case_status: row.case_status,
            Filing_date: row.filing_date
              ? new Date(row.filing_date).toLocaleDateString("en-GB")
              : null,
            Judgement_date: row.judgement_date
              ? new Date(row.judgement_date).toLocaleDateString("en-GB")
              : null,
            Court_name: row.court_name,
            Court_no: row.court_no,
            Bench: row.bench,
            Petitioner: row.petitioner,
            Respondent: row.respondent,
            Adv_of_petitioner: row.advocate_of_petitioner,
            Adv_of_respondent: row.advocate_of_respondent,
            Previous_case_citation: row.previous_case_citation,
            Penalty_detail: row.penalty_detail,
            Head_note: row.head_note,
          },
          // ... add Metadata and Doc sections as needed

          Metadata: {
            Judgement_author: row.judgement_author,
            Judgement_type: row.judgement_type,
            Language_of_Judgement: row.language_of_judgement,
            Date_of_hearing: row.date_of_hearing,
            Date_of_order_pronouncement: row.date_of_order_pronouncement,
            Bench_Composition: row.bench_composition,
            Referred_acts: row.referred_acts,
          },
          Doc: {
            doc_id: row.document_id,
            owner_id: row.owner_id,
            owner_type: row.resolved_owner_type,
            S3_url: row.s3_url,
            S3_file_key: row.s3_file_key,
            S3_file_name: row.s3_file_name,
            Document_Hash: row.document_hash,
            access_id: row.access_id,
            is_active: row.document_is_active,
            is_delete: row.document_is_delete,
            created_at: row.document_created_at,
            updated_at: row.document_updated_at,
            deleted_at: row.document_deleted_at,
          },
        };
      })
    );
    return { success: true, documents };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
