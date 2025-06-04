import client from "../../../config/sqlDB.js";

export const insertSubscription = async (
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  order
) => {
  //   console.log(Meta_data);
  try {
    const query = `INSERT INTO subscription (
        superuser_id, order_id, amount, validity_start_date, validity_end_date, last_renewal_date, renewal_status, razorpay_payment_id, razorpay_signature, is_active, is_delete, created_at, updated_at, deleted_at
      ) VALUES (
        $1, $2, $3, CURRENT_DATE, CURRENT_DATE + INTERVAL '3 months', CURRENT_DATE, 'Active', $4, $5, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL
      ) RETURNING *;`;

    const values = [
      razorpay_order_id,
      order.id,
      order.amount,
      razorpay_payment_id,
      razorpay_signature,
    ];

    const result = await client.query(query, values);
    // console.log("Model " + result);
    if(result.rows.length > 0){
      return result.rows[0];
    }
    else{
      throw new Error ("Insertion in Subscription table failed");
    }
  } catch (error) {
    console.error("Error inseting in subscription table:", error);
    throw error;
  }
};
