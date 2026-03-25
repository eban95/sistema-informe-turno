import e, {Router} from 'express';
import ejecutadosController from '../controllers/ejecutados.js';

const ejecutadosrouter = Router();

ejecutadosrouter.post("/", ejecutadosController.creat);
ejecutadosrouter.get("/",  ejecutadosController.readALL);
ejecutadosrouter.get("/:id", ejecutadosController.read);
ejecutadosrouter.put("/:id", ejecutadosController.update);
ejecutadosrouter.delete("/:id", ejecutadosController.delet);


export default ejecutadosrouter;