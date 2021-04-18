import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../templates/orderTemplate.js';
import { adminConfirmed, authenticationConfirmed, mailgun, payOrderEmailTemplate, } from '../utils.js';


//Payment Router for PPT
const paymentRouter = express.Router();

//Function for finding order details
paymentRouter.get('/', authenticationConfirmed, adminConfirmed, expressAsyncHandler(async (req, res) => { const orders = await Order.find({}).populate('user', 'name');
res.send(orders);}));

//Function for authentication user
paymentRouter.get('/mine', authenticationConfirmed, expressAsyncHandler(async (req, res) => { const orders = await Order.find({ user: req.user._id });
res.send(orders);}));

//Function for completion of payment
paymentRouter.post('/', authenticationConfirmed, expressAsyncHandler(async (req, res) => {if (req.body.orderProducts.length === 0) {res.status(400).send({ message: 'Cart is Currently Empty' });} else {
//New order details
const order = new Order({orderProducts: req.body.orderProducts, deliveryAddress: req.body.deliveryAddress, paymentPPorS: req.body.paymentPPorS, itemsPrice: req.body.itemsPrice, deliveryPrice: req.body.deliveryPrice, taxPrice: req.body.taxPrice, totalPrice: req.body.totalPrice, user: req.user._id,});
//Save order details in datbase
const createdOrder = await order.save();
// Send message on new order created
res.status(201).send({ message: 'A New Order Has Been Created', order: createdOrder });}}));

//Function to find order using user id
paymentRouter.get('/:id', authenticationConfirmed, expressAsyncHandler(async (req, res) => { const order = await Order.findById(req.params.id);
if (order) { res.send(order); } else { res.status(404).send({ message: 'Order Has Not Been Found' });}}));
//Update order details to payment is confirmed once payment has been confirmed
paymentRouter.put(
  '/:id/pay',
  authenticationConfirmed,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'userEmail name'
    );
    if (order) {
      order.paymentConfirmed = true;
      order.paymentDate = Date.now();
      order.paymentComplete = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        userEmail_address: req.body.userEmail_address,
      };
      const updatedOrder = await order.save();
      mailgun()
        .messages()
        .send(
          {
            from: 'ppt-website <ppt-website@mg.pptwebsite.co.uk>',
            to: `${order.user.name} <${order.user.email}>`,
            subject: `New order ${order._id}`,
            html: payOrderEmailTemplate(order),
          },
          (error, body) => {
            if (error) {
              console.log(error);
            } else {
              console.log(body);
            }
          }
        );
      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Has Not Been Found' });
    }
  })
);

//Function for admins to delete an order stored in the database
paymentRouter.delete('/:id', authenticationConfirmed, adminConfirmed, expressAsyncHandler(async (req, res) => {const order = await Order.findById(req.params.id);
if (order) { const deleteOrder = await order.remove();
res.send({ message: 'The Order Has Now Been Deleted', order: deleteOrder });
} else { res.status(404).send({ message: 'Order Has Not Been Found' });}}));

//Function to mark and update order as delivered
paymentRouter.put('/:id/deliver', authenticationConfirmed, adminConfirmed, expressAsyncHandler(async (req, res) => {
const order = await Order.findById(req.params.id);
if (order) { order.deliveryConfirmed = true; 
order.deliveryDate = Date.now();
const updatedOrder = await order.save();
res.send({ message: 'Order Has Now Been Delivered', order: updatedOrder });
} else { res.status(404).send({ message: 'Order Has Not Been Found' });}}));

export default paymentRouter;
