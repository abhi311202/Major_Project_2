import client from "../../../config/sqlDB.js";

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
