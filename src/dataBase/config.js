import mongoose from "mongoose";

export const dbConecction = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://tomasperezdiaz03:789456123@database.dy0snpa.mongodb.net/ecommerce",
      console.log("base de datos online")
    );
  } catch (error) {
    console.log("Error al levantar la base de datos");
    process.exit(1);
  }
};
