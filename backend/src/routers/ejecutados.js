import { Router } from "express";
import ejecutadosController from "../controllers/ejecutados.js";

const ejecutadosrouter = Router();

ejecutadosrouter.post("/", ejecutadosController.create);
ejecutadosrouter.get("/", ejecutadosController.readAll);
ejecutadosrouter.get("/:id", ejecutadosController.read);
ejecutadosrouter.put("/:id", ejecutadosController.update);
ejecutadosrouter.delete("/:id", ejecutadosController.delete);

export default ejecutadosrouter;
