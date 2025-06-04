import crypto from "crypto";
import client from "../../../config/sqlDB.js";
import { getOrderDetailsById } from "../Models/getOrderDetailsById.js";
import { getUserById } from "../Models/getUserByIdModel.js";
import { insertSuperUser } from "../Models/insertSuperUserModel.js";
import { updateUser } from "../Models/updateUserModel.js";
import { insertSubscription } from "../Models/insertSubscriptionModel.js";
export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  if ((!razorpay_order_id, !razorpay_payment_id, !razorpay_signature)) {
    return res.status(400).json({
      success: false,
      message:
        "razorpay_order_id, razorpay_payment_id, razorpay_signature are required",
    });
  }
  try {
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");
    const isAuthentic = expectedSignature === razorpay_signature;
    if (isAuthentic) {
      client.query("BEGIN");
      const order = await getOrderDetailsById(razorpay_order_id);
      console.log(order);
      // take entry from user table
      const user = await getUserById(order.user_id);
      // insert entry in super user table
      const admin = await insertSuperUser(user);
      // make changes in user table
      const updatedUser = await updateUser(user.id);
      //insert into transaction table
      const result = await insertSubscription(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        order
      );

      if (!result) {
        throw new Error(
          `We are sorry to inform that your verificatin failed Please try to contact our support team. Your Payment ID is ${razorpay_payment_id} and Order ID is ${razorpay_order_id}`
        );
      }
      client.query("COMMIT");
      // response
      res.redirect(
        `http://localhost:5173/paymentSuccess?reference=${razorpay_payment_id}`
      );

      return res.status(200).json({
        success: true,
        message: "Payment Verified Successfully",
      }); // Handle the error and send an appropriate response
    } else {
      throw new Error("Payment Failed");
    }
  } catch (error) {
    client.query("ROLLBACK");
    res.status(400).json({
      success: false,
      message: error.message,
      note: `We are sorry to inform that your verificatin failed Please try to contact our support team. Your Payment ID is ${razorpay_payment_id} and Order ID is ${razorpay_order_id}`,
    }); // Handle the error and send an appropriate response
  }
};
