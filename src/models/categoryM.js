import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const categorySchema = mongoose.Schema(
    {
        name: String,
        cid: {
            type: String,
            default: () => uuidv4().slice(0, 12),
            unique: true,
        },
        user: {
            type: String,
            ref: "user"
        },
        description: String,
    },
    { timestamps: true } // Corrected spelling of 'timestamps'
);

const CategoryModel = mongoose.model("category", categorySchema); // Changed 'Model' to 'model'
export default CategoryModel;
