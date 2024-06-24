import { Router } from "express";
import { check } from "express-validator";
import { crearUsuario, loginUsuario } from "../controllers/auth.js";
import { validarCampos } from "../middleware/auth.js";
import { existeEmail } from "../helpers/dbValidations.js";

const router = Router();

router.post(
  "/login",
  [
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "Tiene que ser un mail correcto").isEmail(),
    check(
      "password",
      "La password es obligatoria y debe contener al menos 9 caracteres"
    ).isLength({ min: 9 }),
    validarCampos,
  ],
  loginUsuario
);
router.post(
  "/register",
  [
    check("lastName", "El apellido es obligatorio").not().isEmpty(),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "Tiene que ser un mail correcto").isEmail(),
    check("email").custom(existeEmail),
    check(
      "password",
      "La password es obligatoria y debe contener al menos 9 caracteres"
    ).isLength({ min: 9 }),
    validarCampos,
  ],
  crearUsuario
);

export { router as authRouter };
