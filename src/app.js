import express from "express";
import "dotenv/config";

import { authRouter, productsRouter, cartsRouter } from "./routers/index.js";
import __dirname from "./utils.js";
import { dbConecction } from "./dataBase/config.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

await dbConecction();

app.listen(PORT, () => {
  console.log(`Corriendo aplicacion en el puerto ${PORT}`);
});
