import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

const cartSchema = new Schema({
    pid: { type: String, ref: "product" },
    quantity: { type: Number, default: 1 },
});

const userSchema = new Schema({
    uid: { type: String, default: uuidv4().slice(0, 6), unique: true, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: String,
    profilePic: { type: String, default: 'default-profile-pic.jpg' },
    active: { type: Boolean, default: false },
    group: { type: String, enum: ["Admin", "Staff", "User"], default: "User" },
    reviews: [{ type: String, ref: 'review' }],
    contactNo: {
        type: String,
        validate: {
            validator: value => /^\d{10}$/.test(value),
            message: 'Contact number should be a 10-digit number',
        },
    },
    cart: [cartSchema],  // Use the cart schema here
}, { timestamps: true });

// // Hash the password before saving
// userSchema.pre('save', async function (next) {
//     if (this.isModified('passwordHash')) {
//         this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
//     }
//     next();
// });

const UserModel = model("user", userSchema);

export default UserModel;
