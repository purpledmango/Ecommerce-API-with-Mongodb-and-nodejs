import { Router } from "express";
import { addItems } from "../controllers/cartControllers.js";


const router = Router();

router.post("/add-items/:uid", addItems)
// router.get("/get-cart/:uid", updateOrder)
// router.put("/get-cart/:cid", checkOrder)
// router.put("/delete-cart/:cid", checkOrder)


export default router