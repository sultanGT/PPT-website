import mongoose from 'mongoose';
// User template details to be stored in MongoDB using mongooose
const userSchema = new mongoose.Schema(
{ 
name: { type: String, required: true }, 
user_email: { type: String, required: true, unique: true }, 
password: { type: String, required: true }, 
userCredentialsAdministrator: { type: Boolean, default: false, required: true }, },
{ timestamps: true, });
const PPTUser = mongoose.model('PPTUser', userSchema);
export default PPTUser;
