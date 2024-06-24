import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProducts,
  getProductsById,
  updateProduct,
} from "../controllers/products.controller.js";
import { validarJWT } from "../middleware/auth.js";

const router = Router();

router.get("/",validarJWT, getProducts);
router.get("/:id",validarJWT, getProductsById);
router.post("/",validarJWT, addProduct);
router.put("/:id",validarJWT, updateProduct);
router.delete("/:id",validarJWT, deleteProduct);

export { router as productsRouter };
