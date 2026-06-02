// Archivo  que realiza la conexión entre tu aplicación Node.js y MongoDB usando Mongoose

import mongoose from "mongoose"; // Librería que permite a Node.js comunicarse con MongoDB

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); // Conéctate a la base de datos cuya URL está en MONGO_URI

        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error(
            "❌ MongoDB connection error:",
            error.message
        );

        process.exit(1); // Termina el programa inmediatamente porque algo ha fallado
    }
};

