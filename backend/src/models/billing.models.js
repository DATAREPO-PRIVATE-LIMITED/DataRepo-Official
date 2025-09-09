const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  billingCycleStart: {
    type: Date,
    required: true,
  },
  billingCycleEnd: {
    type: Date,
    required: true,
  },
  totalAmount: {
    type: Number, // store amount in smallest currency unit (e.g., paisa)
    required: true,
    default: 0,
  },
  razorpayBillId: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update 'updatedAt' on save
billingSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export const Billing = mongoose.model("Billing", billingSchema);


