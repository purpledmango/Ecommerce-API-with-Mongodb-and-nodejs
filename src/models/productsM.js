import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const productSchema = mongoose.Schema({
    pid: {
        type: String,
        default: () => uuidv4().slice(0, 6),
        unique: true,
    },
    name: {
        type: String,
        // required: true,
    },

    category: String,
    tag: String,
    stock: {
        type: Number,
        default: 0,
    },
    active: {
        type: Boolean,
        default: false,
    },
    review: {
        type: Number,
        max: 5,
        min: 1,
    },
    discountPercentage: {
        type: Number,

    },
    price: {
        type: Number
    },

    decription: {
        type: String,
        min: 5,
        max: 100
    },



    productImgs: [{
        filename: String,
        path: String
    }]



},
    { timestamps: true })

const ProductModel = mongoose.model("product", productSchema);

export default ProductModel;
