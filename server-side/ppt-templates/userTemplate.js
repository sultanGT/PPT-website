import mongoose from 'mongoose';
// User template details to be stored in MongoDB using mongooose
const pptUserModel = new mongoose.Schema(
{ 
name: { type: String, required: true }, 
email: { type: String, required: true, unique: true }, 
password: { type: String, required: true }, 
userCredentialsAdministrator: { type: Boolean, default: false, required: true }, },
{ timestamps: true, });
const PPTUser = mongoose.model('PPTUser', pptUserModel);
export default PPTUser;
