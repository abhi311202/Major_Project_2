import Razorpay from "razorpay";
import { insertOrder } from "../Models/processPaymentModel.js";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

export const processPayment = async (req, res) => {
  try {
    const { id, amount } = req.body;
    if (!id || !amount)
      throw new Error("Please provide all the required fields");
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    console.log(options);
    const order = await instance.orders.create(options);
    console.log(order);
    if (!order) {
      throw new Error("Some error occured while creating order");
    }

    const result = await insertOrder(order, id);

    console.log(result);
    res.status(200).json({
      success: true,
      order,
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
