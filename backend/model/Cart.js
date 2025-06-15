// backend/models/order.model.js
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
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
  },
  quantity:{
    type:Number
  },
  orderId:{
    type:String
  }
});

export const Cart = mongoose.model("Cart", cartSchema);
