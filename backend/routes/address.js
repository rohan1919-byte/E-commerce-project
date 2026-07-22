import express from "express";
import {getAddressByUserId,saveAddress} from "../controllers/addressController.js"
const router = express.Router();

router.post("/add",saveAddress);
router.get("/:userId",getAddressByUserId)

export default router;