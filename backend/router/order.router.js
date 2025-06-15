import express from 'express'
import { addtocart, clearCart, createOrder, fetchCart, getAllOrders, getOrderById, ordersUpdate } from '../controllers/order.js';
const router = express.Router()

router.post('/createOrder', createOrder);
router.get('/getAllOrders', getAllOrders);
router.get('getOrderById/:id', getOrderById);
router.post('/addtocart/:id', addtocart);
router.patch('/updateQuantity/:id', ordersUpdate);
router.get('/fetchCart',fetchCart)
router.delete('/clearCart',clearCart)

export default router;