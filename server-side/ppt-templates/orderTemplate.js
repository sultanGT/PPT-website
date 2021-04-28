import mongoose from 'mongoose';

// Item details to be stored in MongoDB using the mongoose library
const orderSchema = new mongoose.Schema(

// Item description for orders
{ items_order: [{ name: { type: String, required: true }, 
    quantity: { type: Number, required: true }, 
    picture: { type: String, required: true }, 
    cost: { type: Number, required: true }, 
    item: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'Item', required: true, }, }, ], 
        delivery_address: { fullName: { type: String, required: true }, 
        address: { type: String, required: true }, 
        city: { type: String, required: true }, 
        postCode: { type: String, required: true }, 
        county: { type: String, required: true }, }, 
        purchase_method: { type: String, required: true }, 
        purchase_complete: { id: String, status: String, update_record: String, pptuser_email: String, }, 
        items_cost: { type: Number, required: true }, 
        delivery_cost: { type: Number, required: true }, 
        tax_cost: { type: Number, required: true }, 
        total_cost: { type: Number, required: true }, 
        pptuser: { type: mongoose.Schema.Types.ObjectId, ref: 'PPTUser', required: true }, 
        purchase_confirmed: { type: Boolean, default: false }, 
        purchase_date: { type: Date }, 
        delivery_confirmed: { type: Boolean, default: false }, 
        deliveryDate: { type: Date }, }, { timestamps: true, });
const PPTOrder = mongoose.model('PPTOrder', orderSchema);
export default PPTOrder;
