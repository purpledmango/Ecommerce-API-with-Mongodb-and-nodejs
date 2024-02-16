import { Router } from "express";
import { addProduct, deleteProduct, getProduct, updateProduct } from "../controllers/productControllers.js";

import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "product-imgs/");
    },
    filename: function (req, file, cb) {
        // Remove the original file extension from the image name
        const originalname = file.originalname.replace(/\.[^/.]+$/, "");

        // Add the original file extension and timestamp to the filename
        const extension = file.originalname.slice((file.originalname.lastIndexOf(".") - 1 >>> 0) + 2);
        cb(null, `${originalname}-${Date.now().toLocaleString()}.${extension}`);
    }
});

const upload = multer({ storage: storage });

const router = Router();

router.post("/add-product", upload.single("thumbnail"), addProduct)
router.put("/update-product/:pid", upload.fields([
    { name: "productImgs1", maxCount: 1 }, // Up to 5 images with the field name "productImgs"
    { name: "productImgs2", maxCount: 1 }, // Up to 5 images with the field name "productImgs"
    { name: "productImgs3", maxCount: 1 }, // Up to 5 images with the field name "productImgs"
    { name: "thumbnail", maxCount: 1 } // 1 thumbnail image with the field name "thumbnail"
]), updateProduct);
router.get("/get-product/:pid", getProduct)
router.delete("/delete-product/:pid", deleteProduct)

export default router;