
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import ejecutadosrouter from './routers/ejecutados.js';
import ordenesRouter from './routers/ordenes.js';
// importaciones para acceder a las rutas del front - configurar el acceso al front
import path from "path";
import { fileURLToPath } from "url";


const server = express();
const PORT = process.env.PORT || 3000;
// configuraciones para acceder al front
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


connectDB();

server.use(cors());
server.use(express.json());
server.use('/ejecutados', ejecutadosrouter);
server.use('/ordenes', ordenesRouter);

server.use(express.static(path.join(__dirname, "public")));

// Ruta principal para servir index.html
server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

