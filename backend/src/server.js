
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import ejecutadosrouter from './routers/ejecutados.js';
import ordenesRouter from './routers/ordenes.js';

const server = express();
const PORT = process.env.PORT || 3000;

connectDB();

server.use(cors());
server.use(express.json());
server.use('/ejecutados', ejecutadosrouter);
server.use('/ordenes', ordenesRouter);

server.get('/', (req, res) => {
    res.status(204).send();
});


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

