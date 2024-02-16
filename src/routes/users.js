import { Router } from "express";
import UserModel from "../models/userM.js";

const router = Router();

router.get("/staff", async (req, res) => {
    try {
        // Query the database for users with group "Admin" or "Staff"
        const users = await UserModel.find({ group: { $in: ["Admin", "Staff"] } });

        res.json({ message: "Users with group 'Admin' or 'Staff' retrieved successfully", data: users });
    } catch (error) {
        console.error("Error retrieving users with group 'Admin' or 'Staff':", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



export default router