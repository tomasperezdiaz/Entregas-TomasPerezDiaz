import { request, response } from "express";
import {
  addProductInCartService,
  createCartService,
  deleteCartService,
  deleteProductInCartService,
  getCartByIdService,
  updateProductInCartService,
} from "../services/cartsManager.js";

export const getCartById = async (req = request, res = response) => {
  try {
    const { cid } = req.params;
    const carrito = await getCartByIdService(cid);

    if (carrito) return res.json({ carrito });

    return res.status(404).json({ msg: "El carrito con ese ID no existe" });
  } catch (error) {
    return res.status(500).json({ msg: "Hablar con admin" });
  }
};

export const createCart = async (req = request, res = response) => {
  try {
    const carrito = await createCartService();
    return res.json({ msg: "Carrito creado", carrito });
  } catch (error) {
    console.log("createCart ->", error);
    return res.status(500).json({ msg: "Hablar con admin" });
  }
};

export const addProductInCart = async (req = request, res = response) => {
  try {
    const { cid, id } = req.params;

    const carrito = await addProductInCartService(cid, id);

    if (!carrito)
      return res.status(404).json({ msg: "El carrito con ese ID no existe" });

    return res.json({ msg: "Carrito actualizado", carrito });
  } catch (error) {
    return res.status(500).json({ msg: "Hablar con admin" });
  }
};

export const deleteProductInCart = async (req = request, res = response) => {
  try {
    const { cid, id } = req.params;
    const carrito = await deleteProductInCartService(cid, id);
    if (!carrito)
      return res.status(404).json({ msg: "No se pudo realizar la operacion" });
    return res.json({ msg: "Producto eliminado del carrito", carrito });
  } catch (error) {
    return res.status(500).json({ msg: "Hablar con admin" });
  }
};

export const updateProductInCart = async (req = request, res = response) => {
  try {
    const { cid, id } = req.params;
    const { quantity } = req.body;

    if (!quantity || !Number.isInteger(quantity))
      return res.status(404).json({
        msg: "La propiedad quantity es obligatoria y debe ser un numero entero",
      });

    const carrito = await updateProductInCartService(cid, id, quantity);
    console.log(carrito);
    if (!carrito)
      return res.status(404).json({ msg: "No se pudo realizar la operacion" });

    return res.json({ msg: "Producto actualizado", carrito });
  } catch (error) {
    return res.status(500).json({ msg: "Hablar con admin" });
  }
};

export const deleteCart = async (req = request, res = response) => {
  try {
    const { cid } = req.params;

    const carrito = await deleteCartService(cid);
    if (!carrito)
      return res.status(404).json({ msg: "No se pudo realizar la operacion" });
    return res.json({ msg: "Producto actualizado", carrito });
  } catch (error) {
    return res.status(500).json({ msg: "Hablar con admin" });
  }
};
