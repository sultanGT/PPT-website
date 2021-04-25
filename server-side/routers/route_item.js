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
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const categoryFilter = item_category ? { item_category } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
      customer_order === 'lowest'
        ? { price: 1 }
        : customer_order === 'highest'
        ? { price: -1 }
        : customer_order === 'toprated'
        ? { rating: -1 }
        : { _id: -1 };
    const count = await Product.count({
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    const products = await Product.find({
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageLength * (pptpage - 1))
      .limit(pageLength);
    res.send({ products, pptpage, pages: Math.ceil(count / pageLength) });
  })
);

route_item.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('item_category');
    res.send(categories);
  })
);

route_item.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const products = data.products.map((item) => ({
        ...item,
        
      }));
      const createdProducts = await Product.insertMany(products);
      res.send({ createdProducts });

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
      price: 0,
      item_category: 'sample item_category',
      productBrand: 'sample productBrand',
      countInStock: 0,
      rating: 0,
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
      item.price = req.body.price;
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
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      item.reviews.push(review);
      item.numReviews = item.reviews.length;
      item.rating =
        item.reviews.reduce((a, c) => c.rating + a, 0) /
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
