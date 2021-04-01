import mongoose from 'mongoose';
// User template details to be stored in MongoDB using mongooose
const userSchema = new mongoose.Schema(
{ name: { type: String, required: true }, userEmail: { type: String, required: true, unique: true }, password: { type: String, required: true }, adminConfirmed: { type: Boolean, default: false, required: true }, },
{ timestamps: true, });
const User = mongoose.model('User', userSchema);
export default User;
