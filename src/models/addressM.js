import mongoose, { mongo } from "mongoose";
import { v4 as uuidv4 } from "uuid"
const addressSchema = mongoose.Schema({
    aid: {
        type: String,
        default: () => { uuidv4().slice(0, 6) },
        unique: true,
    },

    uid: {
        type: String,
        ref: "user"
    },
    contactNo: {
        type: Number,
        max: [10, "Should be max 10 characters"]
    },
    roomNo: {
        type: String,
        max: [50, "Should be max 50 characters"]
    },
    street: {
        type: String,
        max: [50, "Should be max 50 characters"]
    },
    city: {
        type: String,
        max: [50, "Should be max 50 characters"]
    },
    pincode: {
        type: [Number, "Should be in Numbers"],
        max: [50, "Should be max 50 characters"]
    },

    state: {
        type: String,
        required: true,

    },
    country: {
        type: String,
        required: true,

    }
})

const AddressModel = mongoose.Model("address", AddressModel)

export default AddressModel;