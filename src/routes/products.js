import { Router } from "express";
import { addProduct, deleteProduct, getProduct, updateProduct, addImageToProduct } from "../controllers/productControllers.js";

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

router.post("/add-product", addProduct)
router.put("/update-product/:pid", updateProduct);
router.patch("/update-image/:pid", upload.single('imgFile'), addImageToProduct);

router.get("/get-product/:pid", getProduct)
router.delete("/delete-product/:pid", deleteProduct)

export default router;