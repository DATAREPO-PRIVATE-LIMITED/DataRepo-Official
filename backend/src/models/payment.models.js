const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  billId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bill",
    required: true,
  },
  razorpayPaymentId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number, // Store amount in smallest currency unit (e.g., paisa)
    required: true,
  },
  status: {
    type: String,
    enum: ["authorized", "captured", "failed"],
    default: "authorized",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Middleware to update 'updatedAt' on each save
paymentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export const Payment = mongoose.model("Payment", paymentSchema);


