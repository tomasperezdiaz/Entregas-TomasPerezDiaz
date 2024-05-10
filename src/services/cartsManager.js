import { cartModel } from "../dao/models/carts.js";

export const getCartByIdService = async (cid) => {
  try {
    return await cartModel.findById(cid).populate("products.id").lean();
  } catch (error) {
    console.log("getCartByIdService ->", error);
    throw error;
  }
};

export const createCartService = async () => {
  try {
    return await cartModel.create({});
  } catch (error) {
    console.log("createCartService ->", error);
    throw error;
  }
};

export const addProductInCartService = async (cid, id) => {
  try {
    const carrito = await cartModel.findById(cid);

    if (!carrito) return null;

    const productInCart = carrito.products.find((p) => p.id.toString() === id);
    
    if (productInCart) productInCart.quantity++;
    else carrito.products.push({ id: id, quantity: 1 });
    carrito.save();

    return carrito;
  } catch (error) {
    console.log("addProdcutInCartService ->", error);
    throw error;
  }
};

export const deleteProductInCartService = async (cid, id) => {
  try {
     return await cartModel.findByIdAndUpdate(
      cid,
      { $pull: { "products": { id: id } } },
      { new: true }
    );
  } catch (error) {
    console.log("deleteProductInCartService ->", error);
    throw error;
  }
};

export const updateProductInCartService = async (cid, id, quantity) => {
  try {
    return await cartModel.findOneAndUpdate(
      { _id: cid, "products.id": id },
      { $set: { "products.$.quantity": quantity } },
      { new: true }
    );
    
  } catch (error) {
    console.log("deleteProductInCartService ->", error);
    throw error;
  }
};

export const deleteCartService = async (cid) => {
    try {
      return await cartModel.findByIdAndUpdate(
        cid,
        { $set: { "products": [] } },
        { new: true }
      );
    } catch (error) {
      console.log("deleteCartService ->", error);
      throw error;
    }
  };