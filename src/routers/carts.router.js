import { Router } from "express";
import {
  addProductInCart,
  createCart,
  deleteCart,
  deleteProductInCart,
  getCartById,
  updateProductInCart,
} from "../controllers/carts.controller.js";
import { validarJWT } from "../middleware/auth.js";

const router = Router();

router.get("/:cid", validarJWT, getCartById);
router.post("/", validarJWT, createCart);
router.post("/:cid/product/:id", validarJWT, addProductInCart);
router.delete("/:cid/product/:id", validarJWT, deleteProductInCart);
router.delete("/:cid", validarJWT, deleteCart);
router.put("/:cid/product/:id", validarJWT, updateProductInCart);

export { router as cartsRouter };
