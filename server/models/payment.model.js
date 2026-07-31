import { Schema, model } from "mongoose";

const paymentSchema = new Schema(
  {
    razorpay_payment_id: {
      type: String,
      required: true,
    },

    razorpay_order_id: {
      type: String,
      required: true,
    },

    razorpay_signature: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["success", "failed"],
      default: "success",
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = model("Payment", paymentSchema);

export default Payment;