import client from "../../../config/sqlDB.js";

export const createDocument = async (doc_data) => {
  //   console.log(doc_data);
  const {
    S3_File_name,
    S3_file_key,
    S3_url,
    Access_id,
    Document_Hash,
    MongoDB_UID,
    doc_title,
    serial_no,
    classification,
  } = doc_data;
  const query = `INSERT INTO document (
    s3_file_name,
    s3_file_key,
    s3_url,
    access_id,
    document_hash,
    mongodb_uid,
    doc_title,
    serial_no,
    classification,
    is_active,
    is_delete,
    created_at,
    updated_at,
    deleted_at
) VALUES (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8,
    $9,
    TRUE,
    FALSE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    NULL
)
RETURNING id;`;

  const values = [
    S3_File_name,
    S3_file_key,
    S3_url,
    Access_id,
    Document_Hash,
    MongoDB_UID,
    doc_title,
    serial_no,
    classification,
  ];

  const result = await client.query(query, values);
  return result.rows[0].id;
};
