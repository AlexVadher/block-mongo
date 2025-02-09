import express from 'express';
import connect from './config/db.js';
import dotenv from 'dotenv';
import router from './routes/routes.blockchain.js';

const app = express();
dotenv.config();
const port = process.env.PORT || 3001;

// middleware para que el servidor entienda json
app.use(express.json());

// middleware para las rutas
app.use('/api', router);

// configuración del servidor
const server = async () => {
    try {
        await connect();
        app.listen(port, () => {
            console.log(`Servidor corriendo en el puerto ${port}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
};

server(); // Se inicia el servidor
