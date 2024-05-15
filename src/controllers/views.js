import { request, response } from "express";
import { getProductsService } from "../services/productsManager.js";
import { getCartByIdService } from "../services/cartsManager.js";

export const homeView = async (req = request, res = response) => {
  const limit = 100;
  const { payload } = await getProductsService({ limit });

  const user = req.session.user;
  return res.render("home", {
    product: payload,
    styles: "styles.css",
    title: "Inicio",
    user,
  });
};

export const realTimeProductsView = async (req = request, res = response) => {
  const user = req.session.user;
  return res.render("realTimeProducts", { styles: "styles.css", user });
};

export const chatView = (req, res) => {
  const user = req.session.user;
  return res.render("chat", { styles: "styles.css", user });
};

export const productsView = async (req, res) => {
  const user = req.session.user;
  const result = await getProductsService({ ...req.query });
  return res.render("products", {
    title: "productos",
    result,
    styles: "styles.css",
    user,
  });
};

export const cartView = async (req, res) => {
  const user = req.session.user;
  const { cid } = req.params;
  const carrito = await getCartByIdService(cid);
  return res.render("cart", {
    title: "cart",
    carrito,
    styles: "styles.css",
    user,
  });
};

export const loginView = async (req, res) => {
  const isAuthenticated = req.session.user !== undefined;

  if (isAuthenticated) return res.redirect("/");
  return res.render("login", { title: "Login", styles: "styles.css" });
};

export const registerView = async (req, res) => {
  const isAuthenticated = req.session.user !== undefined;

  if (isAuthenticated) return res.redirect("/");
  return res.render("register", { title: "Registro", styles: "styles.css" });
};

export const registerPostView = async (req, res) => {
  if (!req.user) return res.redirect("/register");

  return res.redirect("/login");
};

export const loginPostView = async (req, res) => {
  if (!req.user) return res.redirect("/login");

  req.session.user = {
    name: req.user.name,
    lastName: req.user.lastName,
    email: req.user.email,
    rol: req.user.rol,
    image: req.user.image,
  };
  return res.redirect("/");
};

export const logOut = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.send({ status: false, body: err });
    else return res.redirect("/login");
  });
};
