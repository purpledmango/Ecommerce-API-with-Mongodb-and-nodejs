import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const tagSchema = mongoose.Schema(
    {
        name: String,
        tid: {
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

const TagModel = mongoose.model("tag", tagSchema); // Changed 'Model' to 'model'
export default TagModel;
