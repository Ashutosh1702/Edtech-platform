// models/Order.js
const mongoose = require('mongoose');

const paypalOrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },

    paypal_order_id: {
      type: String,
      required: true,
    },

    paypal_capture_id: {
      type: String,
      default: null,
    },

    paypal_payer_id: {
      type: String,
    },

    paypal_email: {
      type: String,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: 'USD',
    },

    status: {
      type: String,
      enum: ['pending', 'success', 'failed', 'refunded'],
      default: 'pending',
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paymentMethod: {
      type: String,
      default: 'paypal',
    },
  },
  { timestamps: true }
);

const PayPalOrder = mongoose.model('PayPalOrder', paypalOrderSchema);
module.exports = PayPalOrder;
