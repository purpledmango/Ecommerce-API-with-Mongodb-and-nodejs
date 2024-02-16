import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const orderSchema = mongoose.Schema({
    oid: {
        type: String,
        default: () => uuidv4().slice(0, 12),
        unique: true,
    },

    user: {
        type: String,
        ref: "user"
    },

    address: {
        type: String,
        ref: "address"
    },
    discountAmount: Number,
    couponCode: String,
    products: [{
        pid: {
            type: String,
            ref: "product",
        },
        quantity: Number
    }],
    delivered: {
        type: Boolean,
        default: false,
    },
    orderStatus: {
        type: String,
        default: "Order Placed",
        enum: ["Order Placed", "Dispatched", "Delivered"]
    },
    notes: String,
    refund: {
        amount: Number,
        status: String,
    },
    viewed: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true });

const OrderModel = mongoose.model("order", orderSchema);

export default OrderModel;
