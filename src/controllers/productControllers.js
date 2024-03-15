import ProductModel from "../models/productsM.js"


export const addProduct = async (req, res) => {
    try {

        const { name, description, price, category, stock, tag, active } = req.body;

        // Validate required fields
        if (!name || !description || !price) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Save product to the database
        const newProduct = new ProductModel({
            name,
            description,
            price,
            category,
            stock,
            tag,
            active

        });

        const savedProduct = await newProduct.save();

        if (!savedProduct) {
            return res.status(403).json({ message: 'Error while saving the Product' });
        }

        res.status(201).json({ message: 'New Product Added Successfully!', data: savedProduct });

    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


export const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const { name, description, price, stock, active, category, tag } = req.body;

        // Extract thumbnail update if any
        // This depends on how you handle thumbnail updates

        // Combine the fields to update


        // Perform the update   
        const updatedProduct = await ProductModel.findOneAndUpdate(
            { pid: pid },
            {
                name,
                description,
                price,
                stock,
                active,
                category,
                tag
            },
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
export const addImageToProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        console.log("The uploaded Image file", req.file)
        // Find the product by its ID
        const productExist = await ProductModel.findOne({ pid });
        if (!productExist) {
            return res.status(404).json({ message: "Unable to find the product you are trying to update." });
        }

        // Create a new image object
        const newImage = {
            filename: req.file.originalname,
            path: req.file.path,
        };

        // Push the new image to the product's images array
        productExist.productImgs.push(newImage);

        // Save the updated product
        await productExist.save();

        // Send a success response
        return res.status(201).json({ message: "Image sent to the backend successfully!", data: productExist });
    } catch (error) {
        // Handle errors
        console.error("Error adding image to product:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
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