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
import passport from "passport";

const router = Router();

router.get("/", homeView);
router.get("/realtimeproducts", auth, realTimeProductsView);
router.get("/chat", auth, chatView);
router.get("/products", auth, productsView);
router.get("/cart/:cid", auth, cartView);
router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/register" }),
  registerPostView
);
router.get("/login", loginView);
router.get("/register", registerView);
router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/login" }),
  loginPostView
);
router.get("/logout", logOut);
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/login-github-callack",
  passport.authenticate("github", { failureRedirect: "/register" }), loginPostView
);

export default router;
