import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../templates/orderTemplate.js';
import { userCredentialsAdministrator, userCredentialsAuthenticated, mailgun, orderCompletionEmail, } from '../utils.js';


//Payment Router for PPT
const route_Paid = express.Router();

//Function for finding customer_order details
route_Paid.get(
  '/', 
userCredentialsAuthenticated, 
userCredentialsAdministrator, 
expressAsyncHandler(async (req, res) => { 
  const orders = await Order.find({})
  .populate(
    'user', 
    'name');
res.send(orders);}));

//Function for authentication user
route_Paid.get(
  '/mine', 
userCredentialsAuthenticated, 
expressAsyncHandler(async (req, res) => { 
  const orders = await Order.find({ user: req.user._id });
res.send(orders);}));

//Function for completion of payment
route_Paid.post('/', 
userCredentialsAuthenticated, 
expressAsyncHandler(async (req, res) => {
  if (req.body.orderProducts.length === 0) {
    res.status(400).send({ message: 'Cart is Currently Empty' });} 
    else {
//New customer_order details
const customer_order = new Order({orderProducts: req.body.orderProducts, deliveryAddress: req.body.deliveryAddress, paymentPPorS: req.body.paymentPPorS, itemsPrice: req.body.itemsPrice, deliveryPrice: req.body.deliveryPrice, taxPrice: req.body.taxPrice, totalPrice: req.body.totalPrice, user: req.user._id,});
//Save customer_order details in datbase
const createdOrder = await customer_order.save();
// Send message on new customer_order created
res.status(201).send({ message: 'A New Order Has Been Created', customer_order: createdOrder });}}));

//Function to find customer_order using user id
route_Paid.get('/:id', userCredentialsAuthenticated, expressAsyncHandler(async (req, res) => { const customer_order = await Order.findById(req.params.id);
if (customer_order) { res.send(customer_order); } else { res.status(404).send({ message: 'Order Has Not Been Found' });}}));
//Update customer_order details to payment is confirmed once payment has been confirmed
route_Paid.put(
  '/:id/pay',
  userCredentialsAuthenticated,
  expressAsyncHandler(async (req, res) => {
    const customer_order = await Order.findById(req.params.id).populate(
      'user',
      'user_email name'
    );
    if (customer_order) {
      customer_order.paymentConfirmed = true;
      customer_order.paymentDate = Date.now();
      customer_order.paymentComplete = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        userEmail_address: req.body.userEmail_address,
      };
      const updatedOrder = await customer_order.save();
      mailgun()
        .messages()
        .send(
          {
            from: 'ppt-website <mailing.pptwebsite.co.uk>',
            to: `${customer_order.user.name} <${customer_order.user.user_email}>`,
            subject: `New customer_order ${customer_order._id}`,
            html: orderCompletionEmail(customer_order),
          },
          (error, body) => {
            if (error) {
              console.log(error);
            } else {
              console.log(body);
            }
          }
        );
      res.send({ message: 'Order Paid', customer_order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Has Not Been Found' });
    }
  })
);

//Function for admins to delete an customer_order stored in the database
route_Paid.delete('/:id', userCredentialsAuthenticated, userCredentialsAdministrator, expressAsyncHandler(async (req, res) => {const customer_order = await Order.findById(req.params.id);
if (customer_order) { const deleteOrder = await customer_order.remove();
res.send({ message: 'The Order Has Now Been Deleted', customer_order: deleteOrder });
} else { res.status(404).send({ message: 'Order Has Not Been Found' });}}));

//Function to mark and update customer_order as delivered
route_Paid.put('/:id/deliver', userCredentialsAuthenticated, userCredentialsAdministrator, expressAsyncHandler(async (req, res) => {
const customer_order = await Order.findById(req.params.id);
if (customer_order) { customer_order.deliveryConfirmed = true; 
customer_order.deliveryDate = Date.now();
const updatedOrder = await customer_order.save();
res.send({ message: 'Order Has Now Been Delivered', customer_order: updatedOrder });
} else { res.status(404).send({ message: 'Order Has Not Been Found' });}}));

export default route_Paid;
