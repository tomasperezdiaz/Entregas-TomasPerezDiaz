import { Router } from "express";
import {
  cartView,
  chatView,
  homeView,
  productsView,
  realTimeProductsView,
  loginView,
  registerView,
  loginPostView,
  registerPostView,
  logOut,
} from "../controllers/views.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/", homeView);
router.get("/realtimeproducts", auth, realTimeProductsView);
router.get("/chat", auth, chatView);
router.get("/products", auth, productsView);
router.get("/cart/:cid", auth, cartView);
router.post("/register", registerPostView);
router.get("/login", loginView);
router.get("/register", registerView);
router.post("/login", loginPostView);
router.get("/logout", logOut);

export default router;
