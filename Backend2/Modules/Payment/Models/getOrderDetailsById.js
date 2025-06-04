import client from "../../../config/sqlDB.js";

export const getOrderDetailsById = async (razorpay_order_id) => {
  //   console.log(Meta_data);
  try {
    const query = `SELECT * FROM orders
WHERE id = $1;`;

    const result = await client.query(query, [razorpay_order_id]);
    // console.log("Model " + result);
    if(result.rows.length > 0){
      return result.rows[0];
    }
    throw new Error("No order found");
  } catch (error) {
    console.error("Error retrieving  order:", error);
    throw error;
  }
};
