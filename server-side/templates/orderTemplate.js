import mongoose from 'mongoose';
// Product details to be stored in MongoDB using mongooose
const orderSchema = new mongoose.Schema(
// Product description for orders
{ orderProducts: [{ name: { type: String, required: true }, 
    quantity: { type: Number, required: true }, 
    picture: { type: String, required: true }, 
    price: { type: Number, required: true }, 
    item: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', required: true, }, }, ], 
        deliveryAddress: { fullName: { type: String, required: true }, 
        address: { type: String, required: true }, 
        city: { type: String, required: true }, 
        postCode: { type: String, required: true }, 
        county: { type: String, required: true }, }, 
        paymentPPorS: { type: String, required: true }, 
        paymentComplete: { id: String, status: String, update_time: String, userEmail_address: String, }, 
        itemsPrice: { type: Number, required: true }, 
        deliveryPrice: { type: Number, required: true }, 
        taxPrice: { type: Number, required: true }, 
        totalPrice: { type: Number, required: true }, 
        pptuser: { type: mongoose.Schema.Types.ObjectId, ref: 'PPTUser', required: true }, 
        paymentConfirmed: { type: Boolean, default: false }, 
        paymentDate: { type: Date }, 
        deliveryConfirmed: { type: Boolean, default: false }, 
        deliveryDate: { type: Date }, }, { timestamps: true, });
const Order = mongoose.model('Order', orderSchema);
export default Order;
