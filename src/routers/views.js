import { Router } from "express";
import {
  cartView,
  chatView,
  homeView,
  productsView,
  realTimeProductsView,
} from "../controllers/views.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/", homeView);
router.get("/realtimeproducts", auth, realTimeProductsView);
router.get("/chat", auth, chatView);
router.get("/products", auth, productsView);
router.get("/cart/:cid", auth, cartView);


export default router;
