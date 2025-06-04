
import client from "../../../config/sqlDB.js";

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