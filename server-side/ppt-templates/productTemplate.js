import mongoose from 'mongoose';
// User template details to be stored in MongoDB using mongooose
const userSchemaReview = new mongoose.Schema(
  { 
  name: { type: String, required: true }, 
  user_comment: { type: String, required: true }, 
  user_rating: { type: Number, required: true }, },
  { timestamps: true,});

// Item template details to be stored in MongoDB using mongooose
const productSchema = new mongoose.Schema(
  { 
  name: { type: String, required: true, unique: true }, 
  picture: { type: String, required: true }, 
  product_brand: { type: String, required: true }, 
  item_category: { type: String, required: true }, 
  item_info: { type: String, required: true }, cost: { type: Number, required: true }, 
  stock_number: { type: Number, required: true }, user_rating: { type: Number, required: true }, 
  review_count: { type: Number, required: true }, reviews: [userSchemaReview], },
  { timestamps: true,});
  
const Item = mongoose.model('Item', productSchema);
export default Item;
