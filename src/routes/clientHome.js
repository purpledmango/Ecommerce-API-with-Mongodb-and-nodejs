import Router from "express";
import { productByTags, productsByCategory, recentlyAddedProductByTags } from "../controllers/clientSideControllers.js"

const router = Router();

router.get("/tag/:tagName", productByTags)
router.get("/category/:categoryName", productsByCategory)
router.get("/products/:tagName", recentlyAddedProductByTags)

export default router;