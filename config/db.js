import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
// Se crea la conexión a la base de datos mongo con mongoose
const conection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conexión exitosa a la base de datos');
    } catch (error) {
        console.log('Error al conectar a la base de datos: ', error);
    }
};

export default conection;
