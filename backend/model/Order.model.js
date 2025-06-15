// backend/models/order.model.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  category: {
    type: String
  },
  description: {
    type: String
  },
  id
: {
    type: String
  },
  image: {
    type: String
  },
  name: {
    type: String
  },
  price
: {
    type: String
  },
  rating:{
    type:String
  }
});

export const Order = mongoose.model("Order", orderSchema);
