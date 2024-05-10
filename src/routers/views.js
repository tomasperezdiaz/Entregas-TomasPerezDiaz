import { Router } from "express";
import { getProductsService } from "../services/productsManager.js";
import { getCartByIdService } from "../services/cartsManager.js";

const router = Router();

router.get("/", async (req, res) => {
  const { payload } = await getProductsService({});
  return res.render("home", { product: payload, styles: "styles.css" }, );
});

router.get("/realtimeproducts", (req, res) => {
  return res.render("realTimeProducts", {styles: "styles.css"});
});

router.get("/chat", (req, res) => {
  return res.render("chat", {styles: "styles.css"});
});

router.get("/products", async (req, res) => {
  const result = await getProductsService({ ...req.query });
  return res.render("products", { title: "productos", result, styles: "styles.css" });
});

router.get("/cart/:cid", async (req, res) => {
  const { cid } = req.params;
  const carrito = await getCartByIdService(cid);
  return res.render("cart", { title: "cart", carrito, styles: "styles.css" });
});

export default router;
