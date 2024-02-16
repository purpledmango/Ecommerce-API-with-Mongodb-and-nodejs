import UserModel from "../models/userM.js";

export const addItems = async (req, res) => {
    try {
        const { uid } = req.params;
        const { pid, quantity } = req.body;

        const user = await UserModel.findOne({ uid: uid });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const existingCartItem = user.cart.find(item => item.pid === pid);

        if (existingCartItem) {
            existingCartItem.quantity += quantity || 1;
        } else {
            user.cart.push({ pid, quantity: quantity || 1 });
        }

        await user.save();

        res.status(200).json({ message: "Item added to cart", data: user.cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
