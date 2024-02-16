import OrderModel from "../models/ordersM.js";


export const placeOder = async (req, res) => {
    try {

        const newOrderData = req.body

        const newOrder = new OrderModel(
            newOrderData
        )

        await newOrder.save()

        if (!newOrder) {
            res.status(404).json({ message: "Failed While placing the order" })
        }

        res.status(201).json({ message: "Your order has been Placed", data: newOrder._doc })

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error })
        console.log(error)
    }
}

export const checkOrder = async (req, res) => {
    try {
        const { oid } = req.params;

        // Check if an order with the given oid already exists
        const existingOrder = await OrderModel.find({ oid });
        existingOrder.viewed = true
        existingOrder.save();

        if (existingOrder) {
            return res.status(200).json({ message: "Order already exists", data: existingOrder });
        } else {
            return res.status(404).json({ message: "Order not found" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
export const updateOrder = async (req, res) => {
    try {
        const { oid } = req.params;
        const newOrderData = req.body;


        const updatedOrder = await OrderModel.findOneAndUpdate(
            { oid: oid },
            newOrderData,
            { new: true }
        );


        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found or update failed" });
        }

        res.status(200).json({ message: "Order has been updated", data: updatedOrder._doc });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};