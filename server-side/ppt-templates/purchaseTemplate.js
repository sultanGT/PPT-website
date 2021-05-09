import mongoose from 'mongoose';
//Reused code from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb
// Order details to be stored in MongoDB using the mongoose library //https://github.com/basir/amazona/blob/master/backend/models/orderModel.js
const pptPurchaseModel = new mongoose.Schema(
// Item and User details for PPT orders
 //purchase complete information template 
{ items_order: [{ name: { type: String, required: true }, quantity: { type: Number, required: true }, picture: { type: String, required: true }, cost: { type: Number, required: true }, item: {type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true, }, }, ], delivery_address: { fullName: { type: String, required: true }, address: { type: String, required: true }, city: { type: String, required: true }, post_code: { type: String, required: true }, county: { type: String, required: true },contactNumber: { type: String, required: true }, },purchase_method: { type: String, required: true }, purchase_complete: { id: String, status: String, update_record: String, pptuser_email: String, }, items_cost: { type: Number, required: true }, delivery_cost: { type: Number, required: true }, total_cost: { type: Number, required: true }, pptuser: { type: mongoose.Schema.Types.ObjectId, ref: 'PPTUser', required: true }, purchase_confirmed: { type: Boolean, default: false }, purchase_date: { type: Date }, delivery_confirmed: { type: Boolean, default: false }, delivery_date: { type: Date }, }, { timestamps: true, });
const PPTOrder = mongoose.model('PPTOrder', pptPurchaseModel);//edited
export default PPTOrder;//edited
