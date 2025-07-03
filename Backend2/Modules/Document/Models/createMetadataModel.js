import client from "../../../config/sqlDB.js";

export const createMetadata = async (Meta_data) => {
  //   console.log(Meta_data);
  const {
    id,
    JUDGEMENT_AUTHOR,
    JUDGEMENT_TYPE,
    LANGUAGE_OF_JUDGEMENT,
    DATE_OF_HEARING,
    DATE_OF_ORDER_PRONOUNCEMENT,
    BENCH_COMPOSITION,
    REFERRED_ACTS,
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
    JUDGEMENT_AUTHOR,
    JUDGEMENT_TYPE,
    LANGUAGE_OF_JUDGEMENT,
    DATE_OF_HEARING,
    DATE_OF_ORDER_PRONOUNCEMENT,
    BENCH_COMPOSITION,
    REFERRED_ACTS,
  ];

  const result = await client.query(query, values);
  //   console.log(result);
  return result.rows[0].doc_id;
};
