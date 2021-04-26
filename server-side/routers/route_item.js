import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../templates/productTemplate.js';
import { userCredentialsAdministrator, userCredentialsAuthenticated } from '../utils.js';


//Variable Declarations - selfcoded
const route_item = express.Router();


//Function for displaying item details - selfcoded
route_item.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const pageLength = 8;
    const pptpage = Number(req.query.pageNumber) || 1;
    const name = req.query.name || '';
    const item_category = req.query.item_category || '';
    const customer_order = req.query.customer_order || '';
    const minimum =
      req.query.minimum && Number(req.query.minimum) !== 0 ? Number(req.query.minimum) : 0;
    const maximum =
      req.query.maximum && Number(req.query.maximum) !== 0 ? Number(req.query.maximum) : 0;
    const user_rating =
      req.query.user_rating && Number(req.query.user_rating) !== 0
        ? Number(req.query.user_rating)
        : 0;

//Search bar filters - reused copied
    const filter_item_names = name ? { name: { $regex: name, $options: 'i' } } : {};
    const filter_item_categories = item_category ? { item_category } : {};
    const filter_item_cost = minimum && maximum ? { cost: { $gte: minimum, $lte: maximum } } : {};
    const filter_item_ratings = user_rating ? { user_rating: { $gte: user_rating } } : {};
    const sortOrder =
      customer_order === 'lowest'
        ? { cost: 1 }
        : customer_order === 'highest'
        ? { cost: -1 }
        : customer_order === 'toprated'
        ? { user_rating: -1 }
        : { _id: -1 };
    //Filter for counting PPTitems for filter results - reused copied
    const count = await Product.count({
      ...filter_item_names,
      ...filter_item_categories,
      ...filter_item_cost,
      ...filter_item_ratings,
    });
    //Function for finding PPTitems by filtered option - reused copied
    const PPTitems = await Product.find({
      ...filter_item_names,
      ...filter_item_categories,
      ...filter_item_cost,
      ...filter_item_ratings,
    })
      .sort(sortOrder)
      .skip(pageLength * (pptpage - 1))
      .limit(pageLength);
    res.send({ PPTitems, pptpage, pages: Math.ceil(count / pageLength) });
  })
);

//Filter for counting PPTitems for filter results - reused copied
route_item.get(
  '/item_categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('item_category');
    res.send(categories);
  })
);

//Function for initialising PPT PPTitems into the web application
route_item.get(
  '/PPTitemlist',
  expressAsyncHandler(async (req, res) => {
    const PPTitems = data.PPTitems.map((item) => ({
        ...item,
        
      }));
      const ppt_products = await Product.insertMany(PPTitems);
      res.send({ ppt_products });

  })
);

route_item.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const item = await Product.findById(req.params.id);
    if (item) {
      res.send(item);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

route_item.post(
  '/',
  userCredentialsAuthenticated,
  userCredentialsAdministrator,
  expressAsyncHandler(async (req, res) => {
    const item = new Product({
      name: 'sample name ' + Date.now(),
      picture: '/images/p1.jpg',
      cost: 0,
      item_category: 'sample item_category',
      productBrand: 'sample productBrand',
      countInStock: 0,
      user_rating: 0,
      numReviews: 0,
      productDescription: 'sample productDescription',
    });
    const createdProduct = await item.save();
    res.send({ message: 'Product Created', item: createdProduct });
  })
);
route_item.put(
  '/:id',
  userCredentialsAuthenticated,
  userCredentialsAdministrator,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const item = await Product.findById(productId);
    if (item) {
      item.name = req.body.name;
      item.cost = req.body.cost;
      item.picture = req.body.picture;
      item.item_category = req.body.item_category;
      item.productBrand = req.body.productBrand;
      item.countInStock = req.body.countInStock;
      item.productDescription = req.body.productDescription;
      const updatedProduct = await item.save();
      res.send({ message: 'Product Updated', item: updatedProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

route_item.delete(
  '/:id',
  userCredentialsAuthenticated,
  userCredentialsAdministrator,
  expressAsyncHandler(async (req, res) => {
    const item = await Product.findById(req.params.id);
    if (item) {
      const deleteProduct = await item.remove();
      res.send({ message: 'Product Deleted', item: deleteProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

route_item.post(
  '/:id/reviews',
  userCredentialsAuthenticated,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const item = await Product.findById(productId);
    if (item) {
      if (item.reviews.find((x) => x.name === req.pptuser.name)) {
        return res
          .status(400)
          .send({ message: 'You already submitted a review' });
      }
      const review = {
        name: req.pptuser.name,
        user_rating: Number(req.body.user_rating),
        comment: req.body.comment,
      };
      item.reviews.push(review);
      item.numReviews = item.reviews.length;
      item.user_rating =
        item.reviews.reduce((a, c) => c.user_rating + a, 0) /
        item.reviews.length;
      const updatedProduct = await item.save();
      res.status(201).send({
        message: 'Review Created',
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

export default route_item;
