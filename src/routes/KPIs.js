import { Router } from "express";
import ProductModel from "../models/productsM.js";
import CategoryModel from "../models/categoryM.js";
import TagModel from "../models/tagM.js";
import UserModel from "../models/userM.js";

const router = Router();

router.get("/products", async (req, res) => {
    try {
        const count = await ProductModel.countDocuments();
        res.json({ message: "Product count retrieved successfully", data: count });
    } catch (error) {
        console.error("Error counting products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/tags", async (req, res) => {
    try {
        const count = await TagModel.countDocuments();
        res.json({ message: "Tag count retrieved successfully", data: count });
    } catch (error) {
        console.error("Error counting tags:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get("/categories", async (req, res) => {
    try {
        const count = await CategoryModel.countDocuments();
        res.json({ message: "Category count retrieved successfully", data: count });
    } catch (error) {
        console.error("Error counting tags:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/active-products", async (req, res) => {
    try {
        const count = await ProductModel.countDocuments({ isActive: true });
        res.json({ message: "Count of active products retrieved successfully", data: count });
    } catch (error) {
        console.error("Error retrieving count of active products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get("/users", async (req, res) => {
    try {
        const count = await UserModel.countDocuments();
        res.json({ message: "Count of All Users retrieved successfully", data: count });
    } catch (error) {
        console.error("Error retrieving count of active products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/users-this-week", async (req, res) => {
    try {
        // Calculate the date for the start of the current week (Sunday)
        const currentDate = new Date();
        const currentDay = currentDate.getDay();
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDay);

        // Calculate the date for the end of the current week (Saturday)
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        // Query the database for users created within the current week
        const usersCreatedThisWeek = await UserModel.find({
            createdAt: {
                $gte: startOfWeek,
                $lte: endOfWeek
            }
        });

        // Calculate the number of users created this week
        const numberOfUsersCreatedThisWeek = usersCreatedThisWeek.length;

        res.json({ message: "Number of users created this week retrieved successfully", data: numberOfUsersCreatedThisWeek });
    } catch (error) {
        console.error("Error retrieving number of users created this week:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get("/users-this-month", async (req, res) => {
    try {
        // Calculate the start date of the current month
        const currentDate = new Date();
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        // Calculate the end date of the current month
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        // Query the database for users created within the current month
        const usersCreatedThisMonth = await UserModel.find({
            createdAt: {
                $gte: startOfMonth,
                $lte: endOfMonth
            }
        });

        // Calculate the number of users created this month
        const numberOfUsersCreatedThisMonth = usersCreatedThisMonth.length;

        res.json({ message: "Number of users created this month retrieved successfully", data: numberOfUsersCreatedThisMonth });
    } catch (error) {
        console.error("Error retrieving number of users created this month:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
