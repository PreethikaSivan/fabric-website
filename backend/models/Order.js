// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  clientName: String,
  address: String,
  phone: String,
  status: { 
    type: String, 
    default: "Pending"   // Default to "Pending"
  },
  items: [
    {
      fabricType: String,
      name: String,
      price: String,
      image: String,
      quantity: Number,
      customizationNotes: String,
      referenceImageUrl: String,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
