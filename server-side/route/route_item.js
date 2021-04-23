import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../templates/productTemplate.js';
import { userCredentialsAdministrator, userCredentialsAuthenticated } from '../utils.js';

//Variable Declarations
const route_item = express.Router();

//Function for displaying item details - reused
route_item.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const page_length = 4;
    const pptpage = Number(req.query.pageNumber) || 1;
    const name = req.query.name || '';
    const product_catergory = req.query.product_catergory || '';
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
    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const categoryFilter = product_catergory ? product_catergory : {};
    const priceFilter = minimum && maximum ? { price: { $gte: minimum, $lte: maximum } } : {};
    const ratingFilter = user_rating ? { user_rating: { $gte: user_rating } } : {};
    const sortOrder =
    customer_order === 'lowest'
        ? { price: 1 }
        : customer_order === 'highest'
        ? { price: -1 }
        : customer_order === 'toprated'
        ? { user_rrating: -1 }
        : { _id: -1 };
//Filter for counting items for filter results - reused copied
    const count = await Product.count({
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
//Function for finding items by filtered option - reused copied
    const products = await Product.find({
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(page_length * (pptpage - 1))
      .limit(page_length);
    res.send({ products, pptpage, pages: Math.ceil(count / page_length) });
  })
);

//Function for finding items by catergory 
route_item.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('product_catergory');
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
      product_catergory: 'sample product_catergory',
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
      item.price = req.body.price;
      item.picture = req.body.picture;
      item.product_catergory = req.body.product_catergory;
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
      if (item.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'You already submitted a review' });
      }
      const review = {
        name: req.user.name,
        user_rating: Number(req.body.use_r_rating),
        userComment: req.body.userComment,
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
