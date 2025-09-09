

import Razorpay from "razorpay";
import { User } from "../models/user.models.js";

// Initialize Razorpay instance with keys from env variables
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});



// API to create an order and send order info to frontend
const createOrder = async (req, res) => {
    try {

        const options = {
            amount: 100, // minimal amount, e.g., 1 paisa to get payment authorization
            currency: "INR",
            payment_capture: 0, // manual capture for deferred payment feature
        };

        const order = await razorpay.orders.create(options);

        res.json({ orderId: order.id, key: process.env.RAZORPAY_KEY_ID });
    } catch (error) {
        res.status(500).json({ error: "Failed to create order" });
    }
};


// routes/payment.js
const paymentAuth = async (req, res) => {
  try {
    const { userId, paymentId, orderId, signature } = req.body;

    if (!(userId && paymentId && orderId)) {
      return res.status(400).json({ error: "Missing required payment fields" });
    }

    // Persist minimal authorization state on the user
    await User.findByIdAndUpdate(userId, {
      paymentMethodToken: paymentId,
      isPaymentAuthorized: true,
    });

    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: "Failed to save payment authorization" });
  }
};



export { createOrder, paymentAuth }