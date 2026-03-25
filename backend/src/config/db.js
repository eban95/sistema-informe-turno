import mongoose from 'mongoose';

const connectDB = async () => {
    try {
       await mongoose.connect(process.env.DB_CONNECTION_STRING);
       console.log("conectado a la base de datos de MongoDB");  
    } catch (error) {
       console.error("Error al conectar a la base de datos:", error); 
    }
}

export default connectDB;