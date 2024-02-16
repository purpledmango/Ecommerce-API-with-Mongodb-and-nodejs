import { Router } from "express";
import ProductModel from "../models/productsM.js";

const router = Router();

router.get("/recently-added", async (req, res) => {
    try {
        // Find the last 10 added products sorted by creation date
        const recentlyAddedProducts = await ProductModel.find().sort({ createdAt: -1 }).limit(10);
        res.json({ message: "Recently added products retrieved successfully", data: recentlyAddedProducts });
    } catch (error) {
        console.error("Error retrieving recently added products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
