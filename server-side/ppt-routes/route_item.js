import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Item from '../ppt-templates/template_pptitem.js';
import { userCredentialsAdministrator, userCredentialsAuthenticated } from '../utils.js';


// Variable Declarations - selfcoded
const route_item = express.Router();

// Function for displaying item details - selfcoded
route_item.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const pageLength = 8;
    const pptpage = Number(req.query.pageNumber) || 1;
    const name = req.query.name || '';
    const item_category = req.query.item_category || '';
    const item_brand = req.query.item_brand || '';
    const customer_order = req.query.customer_order || '';
    const minimum =
      req.query.minimum && Number(req.query.minimum) !== 0 ? Number(req.query.minimum) : 0;
    const maximum =
      req.query.maximum && Number(req.query.maximum) !== 0 ? Number(req.query.maximum) : 0;
    const user_rating =
      req.query.user_rating && Number(req.query.user_rating) !== 0
        ? Number(req.query.user_rating)
        : 0;
// Search bar filters - reused copied
    const filter_item_names = name ? { name: { $regex: name, $options: 'i' } } : {};
    const filter_item_categories = item_category ? { item_category } : {};
    const filter_item_brands = item_brand ? { item_brand } : {};
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
// Filter for counting PPTitems for filter results - reused copied
    const count = await Item.count({
      ...filter_item_names,
      ...filter_item_categories,
      ...filter_item_brands,
      ...filter_item_cost,
      ...filter_item_ratings,
      
    });
// Function for finding PPTitems by filtered option - reused copied
    const PPTitems = await Item.find({
      ...filter_item_names,
      ...filter_item_categories,
      ...filter_item_brands,
      ...filter_item_cost,
      ...filter_item_ratings,
    })
      .sort(sortOrder)
      .skip(pageLength * (pptpage - 1))
      .limit(pageLength);
    res.send({ PPTitems, pptpage, pages: Math.ceil(count / pageLength) });
  })
);

// Filter for counting PPTitems for filter results - reused copied
route_item.get(
  '/item_categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Item.find().distinct('item_category');
    res.send(categories);
  })
);

// Filter for counting PPTitems for filter results - reused copied
route_item.get(
  '/item_brands',
  expressAsyncHandler(async (req, res) => {
    const brands = await Item.find().distinct('item_brand');
    res.send(brands);
  })
);

// Function for initialising PPT PPTitems into the web application
route_item.get(
  '/PPTitemlist',
  expressAsyncHandler(async (req, res) => {
    const PPTitems = data.PPTitems.map((item) => ({
        ...item,
        
      }));
      const ppt_products = await Item.insertMany(PPTitems);
      res.send({ ppt_products });

  })
);

// Function for getting item by item id
route_item.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (item) {
      res.send(item);
    } else {
      res.status(404).send({ message: 'Item cannot be found on the PPT web application' });
    }
  })
);

// API for creating a new item in the PPT web app
route_item.post(
  '/',
  userCredentialsAuthenticated,
  userCredentialsAdministrator,
  expressAsyncHandler(async (req, res) => {
    const item = new Item({
      name: 'Example: Karate Suit... ' + Date.now(),
      picture: '/images/p1.jpg',
      cost: 0,
      item_category: 'Example: Suits...',
      item_brand: 'Example: Adidas...',
      stock_number: 0,
      user_rating: 0,
      review_count: 0,
      item_info: 'Example: This product is an excellent...',
    });
    const new_item = await item.save();
    res.send({ message: 'New PPT Item Has Now Been Created', item: new_item });
  })
);

// API for updating PPT Items
route_item.put(
  '/:id',
  userCredentialsAuthenticated,
  userCredentialsAdministrator,
  expressAsyncHandler(async (req, res) => {
    const item_id = req.params.id;
    const item = await Item.findById(item_id);
    if (item) {
      item.name = req.body.name;
      item.cost = req.body.cost;
      item.picture = req.body.picture;
      item.item_category = req.body.item_category;
      item.item_brand = req.body.item_brand;
      item.stock_number = req.body.stock_number;
      item.item_info = req.body.item_info;
      const item_ammended = await item.save();
      res.send({ message: 'Item Has Now Been Updated On the PPT Web App', item: item_ammended });
    } else {
      res.status(404).send({ message: 'Item Cannot Be Found On The PPT Web App' });
    }
  })
);

// API for deleting PPT Items
route_item.delete(
  '/:id',
  userCredentialsAuthenticated,
  userCredentialsAdministrator,
  expressAsyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (item) {
      const item_deleted = await item.remove();
      res.send({ message: 'Item Has Now Been Deleted From The PPT Web App', item: item_deleted });
    } else {
      res.status(404).send({ message: 'Item Cannot Be Found On The PPT Web App' });
    }
  })
);

//API for user review and rating PPT Items
route_item.post(
  '/:id/reviews',
  userCredentialsAuthenticated,
  expressAsyncHandler(async (req, res) => {
    const item_id = req.params.id;
    const item = await Item.findById(item_id);
    if (item) {
      const review = {
        name: req.pptuser.name,
        user_rating: Number(req.body.user_rating),
        user_comment: req.body.user_comment,
      };
      item.reviews.push(review);
      item.review_count = item.reviews.length;
      item.user_rating =
        item.reviews.reduce((a, c) => c.user_rating + a, 0) /
        item.reviews.length;
      const item_ammended = await item.save();
      res.status(201).send({
        message: 'Item Review and Rating Has Now Been Published',
        review: item_ammended.reviews[item_ammended.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: 'Item Cannot Be Found On The PPT Web App' });
    }
  })
);

export default route_item;
