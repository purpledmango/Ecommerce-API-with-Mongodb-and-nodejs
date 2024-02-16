import { Router } from "express";
import TagModel from "../models/tagM.js";
// import { checkOrder, placeOder, updateOrder } from "../controllers/orderControllers.js";

const router = Router();
router.post("/add", async (req, res) => {
    try {
        const { name, description, user } = req.body;

        const categoryExists = await TagModel.findOne({ name: name });
        if (categoryExists) {
            return res.status(403).json({ message: "A tag with the name already exists" });
        }


        const newCategory = new TagModel({ name, description, user });


        const savedCategory = await newCategory.save();

        // Return success response
        res.status(201).json({ message: "New tag Added", data: savedCategory });

    } catch (error) {
        // Handle any errors
        console.error("Error adding tag:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});
router.put("/update/:tid", async (req, res) => {
    try {
        const { tid } = req.params;
        const newData = req.body;

        // Find the tag and update it
        const updatedCategory = await TagModel.findOneAndUpdate(
            { tid: tid }, // Filter criteria
            newData, // Update data
            { new: true } // Return the updated document
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "tag not found" });
        }

        // Return success response
        res.status(200).json({ message: "tag updated successfully", data: updatedCategory });
    } catch (error) {
        // Handle any errors
        console.error("Error updating tag:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});
// router.put("/delte/:tid", updateOrder)
router.get("/all", async (req, res) => {
    try {
        const allTags = await TagModel.find({}); // Await the query execution 

        res.status(200).json({ message: "Fetched all tag", data: allTags });
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

router.delete("/delete/:tid", async (req, res) => {
    try {
        const { tid } = req.params;

        // Find the tag and delete it
        const deletedCategory = await TagModel.findOneAndDelete({ tid: tid });

        if (!deletedCategory) {
            return res.status(404).json({ message: "tag not found" });
        }

        // Return success response
        res.status(200).json({ message: "tag deleted successfully", data: deletedCategory });
    } catch (error) {
        // Handle any errors
        console.error("Error deleting tag:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

router.get("/all", async (req, res) => {
    try {
        const allCategories = await TagModel.find({}); // Await the query execution

        res.status(200).json({ message: "Fetched all tags", data: allCategories });
    } catch (error) {
        console.error("Error fetching Tags:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

export default router