import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import PPTOrder from '../ppt-templates/purchaseTemplate.js';
import { userCredentialsAdministrator, userCredentialsAuthenticated, orderCompletionEmail, } from '../utils.js';


//Payment Router for PPT
const routePurchase = express.Router();

//Function for finding customer_purchase details
routePurchase.get(
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
routePurchase.get(
  '/myaccount', 
userCredentialsAuthenticated, 
expressAsyncHandler(async (req, res) => { 
  const ppt_orders = await PPTOrder.find({ pptuser: req.pptuser._id });
res.send(ppt_orders);}));

//Function for completion of payment
routePurchase.post('/', 
userCredentialsAuthenticated, 
expressAsyncHandler(async (req, res) => {

  if (req.body.items_order.length === 0) {
    res.status(400).send({ message: 'Please Add Items To Your Cart' });} 
    else {

//New customer_purchase details
const customer_purchase = new PPTOrder({
  items_order: req.body.items_order, 
  delivery_address: req.body.delivery_address, 
  purchase_method: req.body.purchase_method, 
  items_cost: req.body.items_cost, 
  delivery_cost: req.body.delivery_cost, 
  total_cost: req.body.total_cost, 
  pptuser: req.pptuser._id,});

//Save customer_purchase details in datbase
const new_customer_order = await customer_purchase.save();
// Send message on new customer_purchase created
res.status(201).send({ message: 'A New Order Has Been Created', customer_purchase: new_customer_order });}}));

//Function to find customer_purchase using user id
routePurchase.get('/:id', userCredentialsAuthenticated, expressAsyncHandler(async (req, res) => { const customer_purchase = await PPTOrder.findById(req.params.id);
if (customer_purchase) { res.send(customer_purchase); } else { res.status(404).send({ message: 'PPT Order Cannot Be Found In The PPT Database. For Enquiries Please Contact Admin' });}}));

//Update customer_purchase details to payment is confirmed once payment has been confirmed
routePurchase.put(
  '/:id/payment',
  userCredentialsAuthenticated,
  expressAsyncHandler(async (req, res) => {
    const customer_purchase = await PPTOrder.findById(req.params.id).populate(
      'pptuser',
      'email name'
    );
    if (customer_purchase) {
      customer_purchase.purchase_confirmed = true;
      customer_purchase.purchase_date = Date.now();
      customer_purchase.purchase_complete = {
        id: req.body.id,
        status: req.body.status,
        update_record: req.body.update_record,
        pptuser_email: req.body.pptuser_email,
      };
      const save_customer_order = await customer_purchase.save();
      res.send({ message: 'Payment is Succesfull', customer_purchase: save_customer_order });
    } else {
      res.status(404).send({ message: 'Order Cannot Be Found On The PPT Web Application, Please Contact An Administrator For Help' });
    }
  })
);

//Function for admins to delete an customer_purchase stored in the database
routePurchase.delete('/:id', 
userCredentialsAuthenticated, 
userCredentialsAdministrator, 
expressAsyncHandler(async (req, res) => {const customer_purchase = await PPTOrder.findById(req.params.id);
if (customer_purchase) { 
  const removePurchase = await customer_purchase.remove();
res.send({ 
  message: 'The Order Has Now Been Deleted', 
  customer_purchase: removePurchase });
} else { res.status(404).send({ message: 'Order Cannot Be Found On The PPT Web Application, Please Contact An Administrator For Help' });}}));

//Function to mark and update customer_purchase as delivered
routePurchase.put('/:id/deliver', userCredentialsAuthenticated, userCredentialsAdministrator, expressAsyncHandler(async (req, res) => {
const customer_purchase = await PPTOrder.findById(req.params.id);
if (customer_purchase) { customer_purchase.delivery_confirmed = true; 
customer_purchase.delivery_date = Date.now();
const save_customer_order = await customer_purchase.save();
res.send({ message: 'Order Has Now Been Delivered', customer_purchase: save_customer_order });
} else { res.status(404).send({ message: 'Order Cannot Be Found On The PPT Web Application, Please Contact An Administrator For Help' });}}));

export default routePurchase;
