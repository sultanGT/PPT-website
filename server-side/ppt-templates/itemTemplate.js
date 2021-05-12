import mongoose from 'mongoose';
//Reused code from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb
// Review template details to be stored in MongoDB using mongooose //https://github.com/basir/amazona/blob/master/backend/models/productModel.js
const reviewTemplate = new mongoose.Schema(
  { name: { type: String, required: true }, user_comment: { type: String, required: true }, user_rating: { type: Number, required: true }, },{ timestamps: true,});
// Item template details to be stored in MongoDB using mongooose //edited
const itemTemplate = new mongoose.Schema(
  { name: { type: String, required: true, unique: true }, picture: { type: String, required: true }, item_brand: { type: String, required: true }, item_category: { type: String, required: true }, item_info: { type: String, required: true }, cost: { type: Number, required: true }, stock_number: { type: Number, required: true }, user_rating: { type: Number, required: true }, review_count: { type: Number, required: true }, reviews: [reviewTemplate], },{ timestamps: true,});
const Item = mongoose.model('Item', itemTemplate); //edited
export default Item;
