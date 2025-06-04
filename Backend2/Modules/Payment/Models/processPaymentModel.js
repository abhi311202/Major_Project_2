import client from "../../../config/sqlDB.js";

export const insertOrder = async (order, user_id) => {
  //   console.log(Meta_data);
  try {
    const {
      id,
      amount,
      amount_due,
      amount_paid,
      attempts,
      created_at,
      currency,
      entity,
      notes,
      offer_id,
      receipt,
      status,
    } = order;

    const query = `INSERT INTO orders (
          id,
          user_id,
          amount,
          amount_due,
          amount_paid,
          attempts,
          created_at,
          currency,
          entity,
          status,
          offer_id,
          receipt,
          notes,
          is_pending,
          transaction_date,
          is_active,
          is_delete,
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
       $10,
       $11,
       $12,
       $13,
       TRUE,
       NULL,
       TRUE,
       FALSE,
       CURRENT_TIMESTAMP,
       CURRENT_TIMESTAMP
      )
      RETURNING *;`;

    const values = [
      id,
      user_id,
      amount,
      amount_due,
      amount_paid,
      attempts,
      created_at,
      currency,
      entity,
      status,
      offer_id,
      receipt,
      notes,
    ];

    const result = await client.query(query, values);
    // console.log("Model " + result);
    return result.rows[0];
  } catch (error) {
    console.error("Error inserting order:", error);
    throw error;
  }
};
