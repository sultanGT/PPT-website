import mongoose from 'mongoose';
//Reused code from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb
// User information template details to be stored in MongoDB using mongooose //https://github.com/basir/amazona/blob/master/backend/models/userModel.js
const customerTemplate = new mongoose.Schema(//edited
{ name: { type: String, required: true }, email: { type: String, required: true, unique: true }, password: { type: String, required: true }, userCredentialsAdministrator: { type: Boolean, default: false, required: true }, },{ timestamps: true, });
const Customer = mongoose.model('Customer', customerTemplate);//edited
export default Customer;//edited
