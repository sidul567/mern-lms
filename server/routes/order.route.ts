import express from 'express';
import { authorizedRoles, isAuthenticate } from '../middleware/auth';
import { createOrder, getAllOrders } from '../controllers/order.controller';
import { updateAccessToken } from '../controllers/user.controller';

const orderRouter = express.Router();

// Create order
orderRouter.post('/order/create', updateAccessToken, isAuthenticate, createOrder);

// Get all orders -- admin
orderRouter.get('/orders', updateAccessToken, isAuthenticate, authorizedRoles("admin"), getAllOrders);

export default orderRouter;