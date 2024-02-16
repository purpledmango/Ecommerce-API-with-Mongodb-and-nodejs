import { Router } from "express";
import CategoryModel from "../models/categoryM.js";
// import { checkOrder, placeOder, updateOrder } from "../controllers/orderControllers.js";

const router = Router();
router.post("/add", async (req, res) => {
    try {
        const { name, description, user } = req.body;

        const categoryExists = await CategoryModel.findOne({ name: name });
        if (categoryExists) {
            return res.status(403).json({ message: "A category with the name already exists" });
        }


        const newCategory = new CategoryModel({ name, description, user });


        const savedCategory = await newCategory.save();

        // Return success response
        res.status(201).json({ message: "New Category Added", data: savedCategory });

    } catch (error) {
        // Handle any errors
        console.error("Error adding category:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});
router.put("/update/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const newData = req.body;

        // Find the category and update it
        const updatedCategory = await CategoryModel.findOneAndUpdate(
            { cid: cid }, // Filter criteria
            newData, // Update data
            { new: true } // Return the updated document
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Return success response
        res.status(200).json({ message: "Category updated successfully", data: updatedCategory });
    } catch (error) {
        // Handle any errors
        console.error("Error updating category:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});
// router.put("/delte/:cid", updateOrder)
router.get("/all", async (req, res) => {
    try {
        const allCategories = await CategoryModel.find({}); // Await the query execution

        res.status(200).json({ message: "Fetched all Categories", data: allCategories });
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

router.delete("/delete/:cid", async (req, res) => {
    try {
        const { cid } = req.params;

        // Find the category and delete it
        const deletedCategory = await CategoryModel.findOneAndDelete({ cid: cid });

        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Return success response
        res.status(200).json({ message: "Category deleted successfully", data: deletedCategory });
    } catch (error) {
        // Handle any errors
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

router.get("/all", async (req, res) => {
    try {
        const allCategories = await CategoryModel.find({}); // Await the query execution

        res.status(200).json({ message: "Fetched all Categories", data: allCategories });
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

export default router