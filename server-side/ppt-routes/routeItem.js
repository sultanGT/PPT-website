import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Item from '../ppt-templates/itemTemplate.js';
import { userCredentialsAdministrator, userCredentialsAuthenticated } from '../utils.js'; //edited

//https://github.com/basir/amazona/blob/master/backend/routers/productRouter.js
//Reused code from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb

const routeItem = express.Router(); //edited
// Function for displaying item details 
routeItem.get('/', expressAsyncHandler(async (req, res) => {
    const pageLength = 8; 
    const page = Number(req.query.page_number) || 1;
    const name = req.query.name || '';
    const item_category = req.query.item_category || '';//edited
    const item_brand = req.query.item_brand || ''; //self coded
    const customer_purchase = req.query.customer_purchase || '';//edited
    const minimum = req.query.minimum && Number(req.query.minimum) !== 0 ? Number(req.query.minimum) : 0;
    const maximum = req.query.maximum && Number(req.query.maximum) !== 0 ? Number(req.query.maximum) : 0;
    const user_rating = req.query.user_rating && Number(req.query.user_rating) !== 0 ? Number(req.query.user_rating) : 0;
// Search bar filters - reused copied
    const filter_item_names = name ? { name: { $regex: name, $options: 'i' } } : {};
    const filter_item_categories = item_category ? { item_category } : {};
    const filter_item_brands = item_brand ? { item_brand } : {}; //selfcoded
    const filter_item_cost = minimum && maximum ? { cost: { $gte: minimum, $lte: maximum } } : {};
    const filter_item_ratings = user_rating ? { user_rating: { $gte: user_rating } } : {};
    const sortOrder = customer_purchase === 'lowest' ? { cost: 1 } : customer_purchase === 'highest' ? { cost: -1 }
        : customer_purchase === 'toprated' ? { user_rating: -1 } : { _id: -1 };
// Filter for counting PPTitems for filter results - reused copied
    const count = await Item.count({
      ...filter_item_names,
      ...filter_item_categories,
      ...filter_item_brands, //self coded
      ...filter_item_cost, //self coded
      ...filter_item_ratings,
    });
// Function for finding PPTitems by filtered option - reused copied
    const PPTitems = await Item.find({
      ...filter_item_names,
      ...filter_item_categories,
      ...filter_item_brands,  //self coded
      ...filter_item_cost,//self coded
      ...filter_item_ratings,
    })
      .sort(sortOrder)
      .skip(pageLength * (page - 1))
      .limit(pageLength);
    res.send({ PPTitems, page, pages: Math.ceil(count / pageLength) });
  })
);

// Filter for counting PPTitems for filter results - reused 
routeItem.get('/item_categories',expressAsyncHandler(async (req, res) => { const categories = await Item.find().distinct('item_category');
    res.send(categories);
  })
);

// Filter for counting PPTitems for filter results - self coded
routeItem.get(
  '/our_products',
  expressAsyncHandler(async (req, res) => 
  {
  const our_products = await Item.find()
  .distinct('item_brand', 
  {"item_brand" : "Peak Performance"});
  res.send(our_products);
  })
);

// Filter for counting PPTitems for filter results - self coded
routeItem.get( 
'/item_brands', 
expressAsyncHandler(async (req, res) => 
{ 
const brands = await Item.find()
.distinct('item_brand'); 
res.send(brands);
}));

// Function for initialising PPT PPTitems into the web application //edited
routeItem.get(
'/PPTitemlist',expressAsyncHandler(async (req, res) => {const PPTitems = data.PPTitems.map((item) => ({...item,}));
const ppt_products = await Item.insertMany(PPTitems);
res.send({ ppt_products });

  })
);

//find item by item id - edited
routeItem.get('/:id',expressAsyncHandler(async (req, res) => {
const item = await Item.findById(req.params.id);
    if (item) {res.send(item);} else {es.status(404).send({ message: 'Item cannot be found on the PPT web application' });
    }
  })
);

// API for creating a new item in the PPT web app //edited
routeItem.post('/',userCredentialsAuthenticated,userCredentialsAdministrator, expressAsyncHandler(async (req, res) => {
  const item = new Item({ name: 'Example: Karate Suit... ' + Date.now(), picture: '/images/p1.jpg', cost: 0, item_category: 'Example: Suits...', item_brand: 'Example: Adidas...', stock_number: 0, user_rating: 0, review_count: 0, item_info: 'Example: This product is an excellent...',
      });
    const new_item = await item.save();
    res.send({ message: 'New PPT Item Has Now Been Created',
    item: new_item });
    })
  );

// API for updating PPT Items - edited code
routeItem.put('/:id', userCredentialsAuthenticated, userCredentialsAdministrator, expressAsyncHandler(async (req, res) => {
const itemId = req.params.id;
const item = await Item.findById(itemId);
if (item) { item.name = req.body.name; item.cost = req.body.cost; item.picture = req.body.picture; item.item_category = req.body.item_category; item.item_brand = req.body.item_brand; item.stock_number = req.body.stock_number; item.item_info = req.body.item_info; const item_amended = await item.save();
res.send({ message: 'Item Has Now Been Updated On the PPT Web App', item: item_amended }); } else {
res.status(404).send({ message: 'Item Cannot Be Found On The PPT Web App' });
}
})
);

// API for deleting PPT Items -- edited
routeItem.delete( '/:id',userCredentialsAuthenticated,userCredentialsAdministrator, expressAsyncHandler(async (req, res) => {
const item = await Item.findById(req.params.id);
    if (item) {const removeItem = await item.remove();
      res.send({ message: 'Item Has Now Been Deleted From The PPT Web App', item: removeItem }); } else {
      res.status(404).send({ message: 'Item Cannot Be Found On The PPT Web App' });
    }
  })
);

//API for user review and rating PPT Items - edited
routeItem.post('/:id/reviews',userCredentialsAuthenticated,expressAsyncHandler(async (req, res) => {
const itemId = req.params.id;
const item = await Item.findById(itemId);
    if (item) {
      const review = {name: req.customer.name,user_rating: Number(req.body.user_rating),user_comment: req.body.user_comment,
      };
      item.reviews.push(review);
      item.review_count = item.reviews.length;
      item.user_rating = item.reviews.reduce((a, c) => c.user_rating + a, 0) / item.reviews.length;
      const item_amended = await item.save();
      res.status(201).send({ message: 'Item Review and Rating Has Now Been Published',review: item_amended.reviews[item_amended.reviews.length - 1],
      });
    } else { res.status(404).send({ message: 'Item Cannot Be Found On The PPT Web App' });
    }
  })
);
export default routeItem;
