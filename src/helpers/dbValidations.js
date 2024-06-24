import { UserRepository } from "../repositories/index.js";

export const existeEmail = async (email) => {
  const emailExitiste = await UserRepository.getUserEmail(email);
  if (emailExitiste) throw new Error(`El email ${email} ya esta registrado`);
};
