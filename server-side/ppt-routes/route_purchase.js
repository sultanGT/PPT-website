import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import PPTOrder from '../ppt-templates/template_pptorder.js';
import { userCredentialsAdministrator, userCredentialsAuthenticated, mailgun, orderCompletionEmail, } from '../utils.js';


//Payment Router for PPT
const route_purchase = express.Router();

//Function for finding customer_order details
route_purchase.get(
  '/', 
userCredentialsAuthenticated, 
userCredentialsAdministrator, 
expressAsyncHandler(async (req, res) => { 
  const ppt_orders = await PPTOrder.find({})
  .populate(
    'pptuser', 
    'name');
res.send(ppt_orders);}));


//Function for authentication user
route_purchase.get(
  '/myaccount', 
userCredentialsAuthenticated, 
expressAsyncHandler(async (req, res) => { 
  const ppt_orders = await PPTOrder.find({ pptuser: req.pptuser._id });
res.send(ppt_orders);}));

//Function for completion of payment
route_purchase.post('/', 
userCredentialsAuthenticated, 
expressAsyncHandler(async (req, res) => {

  if (req.body.items_order.length === 0) {
    res.status(400).send({ message: 'Please Add Items To Your Cart' });} 
    else {

//New customer_order details
const customer_order = new PPTOrder({
  items_order: req.body.items_order, 
  delivery_address: req.body.delivery_address, 
  purchase_method: req.body.purchase_method, 
  items_cost: req.body.items_cost, 
  delivery_cost: req.body.delivery_cost, 
  tax_cost: req.body.tax_cost, 
  total_cost: req.body.total_cost, 
  pptuser: req.pptuser._id,});

//Save customer_order details in datbase
const new_customer_order = await customer_order.save();
// Send message on new customer_order created
res.status(201).send({ message: 'A New Order Has Been Created', customer_order: new_customer_order });}}));

//Function to find customer_order using user id
route_purchase.get('/:id', userCredentialsAuthenticated, expressAsyncHandler(async (req, res) => { const customer_order = await PPTOrder.findById(req.params.id);
if (customer_order) { res.send(customer_order); } else { res.status(404).send({ message: 'PPT Order Cannot Be Found In The PPT Database. For Enquiries Please Contact Admin' });}}));

//Update customer_order details to payment is confirmed once payment has been confirmed
route_purchase.put(
  '/:id/payment',
  userCredentialsAuthenticated,
  expressAsyncHandler(async (req, res) => {
    const customer_order = await PPTOrder.findById(req.params.id).populate(
      'pptuser',
      'email name'
    );
    if (customer_order) {
      customer_order.purchase_confirmed = true;
      customer_order.purchase_date = Date.now();
      customer_order.purchase_complete = {
        id: req.body.id,
        status: req.body.status,
        update_record: req.body.update_record,
        pptuser_email: req.body.pptuser_email,
      };
      const save_customer_order = await customer_order.save();
      // mailgun()
      //   .messages()
      //   .send(
      //     {
      //       from: 'ppt-website <mailing.pptwebsite.co.uk>',
      //       to: `${customer_order.pptuser.name} <${customer_order.pptuser.email}>`,
      //       subject: `New customer_order ${customer_order._id}`,
      //       html: orderCompletionEmail(customer_order),
      //     },
      //     (error, body) => {
      //       if (error) {
      //         console.log(error);
      //       } else {
      //         console.log(body);
      //       }
      //     }
      //   );
      res.send({ message: 'Payment is Succesfull', customer_order: save_customer_order });
    } else {
      res.status(404).send({ message: 'Order Cannot Be Found On The PPT Web Application, Please Contact An Administrator For Help' });
    }
  })
);

//Function for admins to delete an customer_order stored in the database
route_purchase.delete('/:id', 
userCredentialsAuthenticated, 
userCredentialsAdministrator, 
expressAsyncHandler(async (req, res) => {const customer_order = await PPTOrder.findById(req.params.id);
if (customer_order) { 
  const remove_order = await customer_order.remove();
res.send({ 
  message: 'The Order Has Now Been Deleted', 
  customer_order: remove_order });
} else { res.status(404).send({ message: 'Order Cannot Be Found On The PPT Web Application, Please Contact An Administrator For Help' });}}));

//Function to mark and update customer_order as delivered
route_purchase.put('/:id/deliver', userCredentialsAuthenticated, userCredentialsAdministrator, expressAsyncHandler(async (req, res) => {
const customer_order = await PPTOrder.findById(req.params.id);
if (customer_order) { customer_order.delivery_confirmed = true; 
customer_order.delivery_date = Date.now();
const save_customer_order = await customer_order.save();
res.send({ message: 'Order Has Now Been Delivered', customer_order: save_customer_order });
} else { res.status(404).send({ message: 'Order Cannot Be Found On The PPT Web Application, Please Contact An Administrator For Help' });}}));

export default route_purchase;
