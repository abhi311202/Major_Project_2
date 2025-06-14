import client from "../../../config/sqlDB.js";
export async function sendNewMessageModel(
  ucid,
  sender_id,
  reciever_id,
  message_mongo_uid
) {
  try {
    // const query = `INSERT INTO messages (ucid, sender_id, reciever_id, message_mongo_uid) VALUES ($1, $2, $3, $4)`;
    const query = `INSERT INTO messages (ucid, sender_id, receiver_id, message_mongo_uid) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [ucid, sender_id, reciever_id, message_mongo_uid];
    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      throw new Error("Message Insertion in Messages table failed");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
