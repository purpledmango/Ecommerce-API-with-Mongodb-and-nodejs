import { Router } from "express";
import { checkOrder, placeOder, updateOrder } from "../controllers/orderControllers.js";

const router = Router();

router.post("/place-order", placeOder)
router.get("/check-order/:oid", checkOrder)
router.put("/update-order/:oid", updateOrder)


export default router