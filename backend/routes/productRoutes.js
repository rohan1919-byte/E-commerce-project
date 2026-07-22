import express from "express";
const router = express.Router();
import {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

//create product
router.post("/create", createProduct);

//get all product
router.get("/", getProduct);

//update product
router.put("/update/:id", updateProduct);

//delete product
router.delete("/delete/:id", deleteProduct);

export default router;
