import client from "../../../config/sqlDB.js";

export const createEntity = async (entity_data) => {
  //   console.log(entity_data);

  const {
    id,
    CASE_NO,
    CASE_TYPE,
    CASE_STATUS,
    FILING_DATE,
    JUDGEMENT_DATE,
    COURT_NO,
    COURT_NAME,
    BENCH,
    PETITIONER,
    RESPONDENT,
    ADV_OF_PETITIONER,
    ADV_OF_RESPONDENT,
    PREVIOUS_CASE_CITATION,
    PENALTY_DETAIL,
    HEAD_NOTE,
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
    CASE_NO,
    CASE_TYPE,
    CASE_STATUS,
    FILING_DATE,
    JUDGEMENT_DATE,
    COURT_NO,
    COURT_NAME,
    BENCH,
    PETITIONER,
    RESPONDENT,
    ADV_OF_PETITIONER,
    ADV_OF_RESPONDENT,
    PREVIOUS_CASE_CITATION,
    PENALTY_DETAIL,
    HEAD_NOTE,
  ];
  //   console.log(values);
  const result = await client.query(query, values);
  //   console.log(result);
  return result.rows[0].id;
};
