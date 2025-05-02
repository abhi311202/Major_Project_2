import client from "../config/sqlDB.js";

export const createDocument = async (doc_data) => {
  //   console.log(doc_data);
  const {
    S3_File_name,
    S3_file_key,
    S3_url,
    Access_id,
    Document_Hash,
    MongoDB_UID,
  } = doc_data;
  const query = `INSERT INTO document (
    s3_file_name,
    s3_file_key,
    s3_url,
    access_id,
    document_hash,
    mongodb_uid,
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
  ];

  const result = await client.query(query, values);
  return result.rows[0].id;
};

export const createMetadata = async (Meta_data) => {
  //   console.log(Meta_data);
  const {
    id,
    Judgement_author,
    Judgement_type,
    Language_of_Judgement,
    Date_of_hearing,
    Date_of_order_pronouncement,
    Bench_Composition,
    Referred_acts,
  } = Meta_data;

  const query = `INSERT INTO document_metadata (
    doc_id,
    judgement_author,
    judgement_type,
    language_of_judgement,
    date_of_hearing,
    date_of_order_pronouncement,
    bench_composition,
    referred_acts
) VALUES (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8
)
RETURNING doc_id;`;

  const values = [
    id,
    Judgement_author,
    Judgement_type,
    Language_of_Judgement,
    Date_of_hearing,
    Date_of_order_pronouncement,
    Bench_Composition,
    Referred_acts,
  ];

  const result = await client.query(query, values);
  //   console.log(result);
  return result.rows[0].doc_id;
};

export const createEntity = async (entity_data) => {
//   console.log(entity_data);

  const {
    id,
    Case_no,
    Case_type,
    Case_status,
    Filing_date,
    Judgement_date,
    Court_no,
    Court_name,
    Bench,
    Petitioner,
    Respondent,
    Adv_of_petitioner,
    Adv_of_respondent,
    Previous_case_citation,
    Penalty_detail,
    Head_note,
  } = entity_data;

  const query = `INSERT INTO document_entities (
    id,
    case_no,
    case_type,
    case_status,
    filing_date,
    judgement_date,
    court_no,
    court_name,
    bench,
    petitioner,
    respondent,
    advocate_of_petitioner,
    advocate_of_respondent,
    previous_case_citation,
    penalty_detail,
    head_note
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
    $10,
    $11,
    $12,
    $13,
    $14,
    $15,
    $16
)
RETURNING id;`;
  const values = [
    id,
    Case_no,
    Case_type,
    Case_status,
    Filing_date,
    Judgement_date,
    Court_no,
    Court_name,
    Bench,
    Petitioner,
    Respondent,
    Adv_of_petitioner,
    Adv_of_respondent,
    Previous_case_citation,
    Penalty_detail,
    Head_note,
  ];
//   console.log(values);
  const result = await client.query(query, values);
  //   console.log(result);
  return result.rows[0].id;
};

export const deleteMetadata = async (metadata_id) => {
  
    const query = ``;
    const values = [metadata_id];

    const result = await client.query(query, values);
    //   console.log(result);
    return result.rows[0].id;
  };
