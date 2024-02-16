import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const reviewSchema = mongoose.Schema({
    rid: {
        type: String,
        default: () => uuidv4().slice(0, 6),
        required: true
    },
    uid: {
        type: String,
        ref: "user" // Assuming the referenced model is named "User"
    },
    pid: {
        type: String,
        ref: "product" // Assuming the referenced model is named "Product"
    },

    review: {
        type: String,
        max: 200
    },
    active: {
        type: Boolean,
        default: true
    }
});

const ReviewModel = mongoose.model("review", reviewSchema);

export default ReviewModel;
