import ProductModel from "../models/productsM.js"

export const productByTags = async (req, res) => {
    try {

        const { tagName } = req.params
        const products = await ProductModel.find({ tag: tagName })
        if (!products) {
            res.status(404).json({
                message: "Unable to Fetch Data with given Tag"
            })
        }
        res.status(200).json({
            message: `${tagName}'s Tag Product Fetched`,
            data: products
        })


    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
        console.log(error)
    }
}


export const recentlyAddedProductByTags = async (req, res) => {
    try {
        const { tagName } = req.params
        const mensProduct = await ProductModel.find({ tags: tagName })
            .sort({ createdDate: -1 }) // Sort by createdDate in descending order
            .limit(10); // Limit the result to 10 documents

        if (!mensProduct || mensProduct.length === 0) {
            return res.status(404).json({
                message: "Unable to Fetch New Men's Products"
            });
        }

        return res.status(200).json({
            message: "Newly Added Men's Products Fetched",
            data: mensProduct // Return the fetched products
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};


export const productsByCategory = async (req, res) => {
    try {
        const { categoryName } = req.params
        const products = await ProductModel.find({ category: categoryName })
        if (!products || products.length === 0) {
            return res.status(404).json({
                message: "Unable to Fetch New Men's Products"
            });
        }

        return res.status(200).json({
            message: `${categoryName}'s Category has been Fetched`,
            data: products // Return the fetched products
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

