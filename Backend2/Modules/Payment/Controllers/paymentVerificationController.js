import crypto from "crypto";

export const paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest("hex");
        const isAuthentic = expectedSignature === razorpay_signature;
        if (isAuthentic) {
            return res.redirect(`http://localhost:5173/paymentSuccess?reference=${razorpay_payment_id}`
            )
        }
        else {
            res.status(400).json({
                success: false,
                message: "Payment Failed",
            }); // Handle the error and send an appropriate response
        }
    res.status(200).json({
        success: true,
        message: "Payment Verified Successfully",
    }); // Handle the error and send an appropriate response
};
