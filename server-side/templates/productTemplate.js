import mongoose from 'mongoose';
// User template details to be stored in MongoDB using mongooose
const userSchemaReview = new mongoose.Schema(
  { name: { type: String, required: true }, userComment: { type: String, required: true }, user_rating: { type: Number, required: true }, },
  { timestamps: true,});
// Product template details to be stored in MongoDB using mongooose
const productSchema = new mongoose.Schema(
  { name: { type: String, required: true, unique: true }, picture: { type: String, required: true }, productBrand: { type: String, required: true }, product_catergory: { type: String, required: true }, productDescription: { type: String, required: true }, price: { type: Number, required: true }, countInStock: { type: Number, required: true }, user_rating: { type: Number, required: true }, numReviews: { type: Number, required: true }, reviews: [userSchemaReview], },
  { timestamps: true,});
const Product = mongoose.model('Product', productSchema);
export default Product;
