import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

  userName: {   
    type: String
  },

  items: [
    {
      name: String,
      price: Number,
      qty: Number,
      image: String
    }
  ],

  amount: Number,

  address: {
    firstName: String,
    lastName: String,
    email: String,
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    phone: String
  },

  status: {
    type: String,
    default: "Pending"
  }

}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;