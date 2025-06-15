import { Cart } from "../model/Cart.js";
import { Order } from "../model/Order.model.js";

export const createOrder = async (req,res)=>{
    try {
        // console.log(req.body);
        const data = new Order(req.body);
        const dataToBeSaved = await data.save();
        res.status(200).json({dataToBeSaved});
    } catch (error) {
         res.status(500).send(error);
    }
}



export const getAllOrders = async (req,res)=>{
    try {
        // const data = new Order(req.body);
        const orders = await Order.find();
        res.status(200).send({orders,msg:"You have got the data" });
    } catch (error) {
           console.log(error);
           
    }
}

export const getOrderById = async (req,res)=>{
    try {
        // const data = new Order(req.body);
        const orders = await Order.findById(req.params.id);
        if(!orders){
            res.status(404).send({msg:"Order not found"})
        }
        res.status(200).json({orders });
    } catch (error) {
          res.status(500).json({ message: err.message });
    }
}


export const addtocart = async (req, res) => {
  try {
    const orderId = req.params.id;

    // 1. Fetch the item from the Order collection
    const existingItem = await Order.findById(orderId);

    if (!existingItem) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 2. Check if item with same orderId already exists in Cart
    const cartItem = await Cart.findOne({ orderId });

    if (cartItem) {
      // If item exists, increase quantity
      cartItem.quantity += 1;
      await cartItem.save();
      return res.status(200).json({ message: "Item quantity updated in cart", item: cartItem });
    } else {
      // If not, create new Cart item
      const newCartItem = new Cart({
        name: existingItem.name,
        category: existingItem.category,
        price: existingItem.price,
        image: existingItem.image,
        description: existingItem.description,
        rating: existingItem.rating,
        orderId: existingItem._id, // used for checking duplicates
        quantity: 1 // new item starts with quantity 1
      });

      const savedItem = await newCartItem.save();
      return res.status(201).json({ message: "Item added to cart", item: savedItem });
    }
  } catch (error) {
    console.error("Error in addtocart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const ordersUpdate = async (req, res) => {
  try {
    const orderUpdate = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } 
        );

    if (!orderUpdate) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order updated successfully', order: orderUpdate });
  } catch (error) {
    console.error("Error in ordersUpdate:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const fetchCart = async (req,res)=>{
    try {
        const cart = await Cart.find()
        console.log(cart);
        
        res.send(cart)        
    } catch (error) {
        console.log(error);
        
    }
}

// controller/cartController.js
export const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany(); // This removes all cart items
    res.status(200).send({ message: "Cart has been emptied" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


