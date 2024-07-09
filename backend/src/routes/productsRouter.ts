import express from "express";
import ProductsController from "../controllers/productController";

const router = express.Router();
const productsController = new ProductsController();

router.get("/", (req, res) => productsController.getProducts(req, res));

export { router };
