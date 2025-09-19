import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    userId: {type: String, required: true, ref: "user"},
    items:[{
        product: {type:String, require: true, ref: "product"},
        quantity: {type:Number, require: true},
    }],
    amount: {type:Number, require: true},
    address: {type:String,  ref: "address", require: true},
    statuse: {type:String, require: true, default:"order Placed"},
    date: {type:Number, require: true},
})
const Order = mongoose.models.order || mongoose.model("order", orderSchema)
export default Order