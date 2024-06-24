import { response, request } from "express";
import { UserRepository } from "../repositories/index.js";

export const loginUsuario = async (req = request, res = response) => {
  try {
    return res.json({ ok: true, msg: "Login usuario" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Hable con el admin" });
  }
};
export const crearUsuario = async (req = request, res = response) => {
  try {
    const result = await UserRepository.registerUser(req.body);
    return res.json({ ok: true, result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Hable con el admin" });
  }
};
