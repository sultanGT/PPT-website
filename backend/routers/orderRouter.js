import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../templates/orderTemplate.js';
import { isAdmin, isAuth, mailgun, payOrderEmailTemplate,
} from '../utils.js';

const orderRouter = express.Router();
orderRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
 

    const orders = await Order.find({}).populate(
      'user',
      'name'
    );
    res.send(orders);
  })
);
orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderProducts.length === 0) {
      res.status(400).send({ message: 'Cart is empty' });
    } else {
      const order = new Order({
        orderProducts: req.body.orderProducts,
        deliveryAddress: req.body.deliveryAddress,
        paymentPPorS: req.body.paymentPPorS,
        itemsPrice: req.body.itemsPrice,
        deliveryPrice: req.body.deliveryPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: 'New Order Created', order: createdOrder });
    }
  })
);

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put(
  '/:id/pay',
  isAuth,
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
      mailgun().messages().send(
          {
            from: 'ppt-website <ppt-website@pptwebsite.herokuapp.com',
            to: `${order.user.name} <${order.user.userEmail}>`,
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
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      const deleteOrder = await order.remove();
      res.send({ message: 'Order Deleted', order: deleteOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put(
  '/:id/deliver',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.deliveryConfirmed = true;
      order.deliveryDate = Date.now();

      const updatedOrder = await order.save();
      res.send({ message: 'Order Delivered', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

export default orderRouter;
