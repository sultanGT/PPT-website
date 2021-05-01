import mongoose from 'mongoose';
// Review template details to be stored in MongoDB using mongooose
const pptReviewModel = new mongoose.Schema(
  { 
  name: { type: String, required: true }, 
  user_comment: { type: String, required: true }, 
  user_rating: { type: Number, required: true }, },
  { timestamps: true,});

// Item template details to be stored in MongoDB using mongooose
const pptItemModel = new mongoose.Schema(
  { 
  name: { type: String, required: true, unique: true }, 
  picture: { type: String, required: true }, 
  item_brand: { type: String, required: true }, 
  item_category: { type: String, required: true }, 
  item_info: { type: String, required: true }, cost: { type: Number, required: true }, 
  stock_number: { type: Number, required: true }, user_rating: { type: Number, required: true }, 
  review_count: { type: Number, required: true }, reviews: [pptReviewModel], },
  { timestamps: true,});
  
const Item = mongoose.model('Item', pptItemModel);
export default Item;
