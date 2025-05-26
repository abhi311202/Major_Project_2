import Razorpay from "razorpay";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

export const processPayment = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
    // receipt: "receipt#1",
  };

  const order = await instance.orders.create(options);

  if (!order) return res.status(500).send("Some error occured");


  res.status(200).json({
    success: true,
    order,
  });
};
