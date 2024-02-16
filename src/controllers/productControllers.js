import ProductModel from "../models/productsM.js"

import Razorpay from "razorpay"

export const addProduct = async (req, res) => {
    try {
        console.log("Form Data", req.body); // Use req.body instead of req.data
        console.log("File Data", req.file); // Use req.body instead of req.data

        // Extract data directly from req.body
        const { name, description, price, category, stock, tag } = req.body;

        // Validate required fields
        if (!name || !description || !price) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Save product to the database
        const newProduct = new ProductModel({
            name,
            description,
            price,
            thumbnail: {
                filename: req.file.originalname,
                path: req.file.path
            },
            category,
            stock,
            tag

        });

        const savedProduct = await newProduct.save();

        if (!savedProduct) {
            return res.status(403).json({ message: 'Error while saving the Product' });
        }

        res.status(201).json({ message: 'New Product Added Successfully!', product: savedProduct });

    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


export const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const { name, description, price } = req.body;

        // Extract thumbnail update if any
        let thumbnailUpdate = {};
        if (req.files && req.files.thumbnail && req.files.thumbnail.length > 0) {
            const thumbnailFile = req.files.thumbnail[0]; // Assuming only one thumbnail file is allowed
            thumbnailUpdate = {
                thumbnail: {
                    filename: thumbnailFile.originalname,
                    path: thumbnailFile.path
                }
            };
        }

        // Extract productImgs update if any
        let productImgsUpdate = [];
        if (req.files && req.files.productImgs && req.files.productImgs.length > 0) {
            productImgsUpdate = req.files.productImgs.map(file => ({
                filename: file.originalname,
                path: file.path
            }));
        }

        // Combine the fields to update
        const updateFields = { name, description, price };
        if (Object.keys(thumbnailUpdate).length !== 0) {
            Object.assign(updateFields, thumbnailUpdate);
        }
        if (productImgsUpdate.length > 0) {
            updateFields.productImgs = productImgsUpdate;
        }

        // Perform the update
        const updatedProduct = await ProductModel.findOneAndUpdate(
            { pid: pid },
            updateFields,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product has been updated", data: updatedProduct });

    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


export const getProduct = async (req, res) => {

    try {
        const { pid } = req.params

        const fetchedProduct = await ProductModel.find({ pid: pid })


        if (!fetchedProduct) {
            return res.status(404).json({ message: `Unable to Get The Product with PID - ${pid}}` });
        }

        res.status(200).json({
            message: "Product Fetched!!", data: fetchedProduct
        })

    } catch (error) {

        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }

}


export const deleteProduct = async (req, res) => {

    try {
        const { pid } = req.params

        const deltedProduct = await ProductModel.deleteOne({ pid: pid })
        if (!deleteProduct) {
            return res.status(404).json({ message: `Unable to Get The Product with PID - ${pid}}` });
        }

        const checkIfDeleted = await ProductModel.findOne({ pid: pid })

        if (!checkIfDeleted) {
            return res.status(200).json({ message: `Deleted PID - ${pid}}` });
        }


    } catch (error) {

        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }

}