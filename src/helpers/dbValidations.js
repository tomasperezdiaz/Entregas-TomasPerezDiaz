import { UserRepository } from "../repositories/index.js";

export const existeEmail = async (email) => {
  const emailExitiste = await UserRepository.getUserEmail(email);
  if (emailExitiste) throw new error(`El email ${email} ya esta registrado`);
};
