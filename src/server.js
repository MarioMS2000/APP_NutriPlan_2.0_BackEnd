// Archivo que arranca el servidor. Mientras que app.js configura Express, server.js es el que realmente lo pone a escuchar peticiones

import dotenv from "dotenv"; // Importa libreria para cargar las variables que tengas en tu archivo .env
import app from "./app.js"; // Importo la aplicación que cree en app.js y la recuperamos para arrancarla
import { sequelize } from "./config/postgres.js";
import { connectMongoDB } from "./config/mongo.js";

dotenv.config(); // Lee el archivo .env y mete sus variables dentro

const PORT = process.env.PORT || 3000; // Obtenemos el puerto. Usa el puerto definido en .env. Si no existe, usa el 3000 y si exite pues el que hay en el .env

const startServer = async () => {
    try {
        await sequelize.authenticate();

        console.log("✅ PostgreSQL connected");

        await connectMongoDB();

        // Arrancar el servidor
        app.listen(PORT, () => {
            app.listen(5000);
            console.log(
                `🚀 Server running on port ${PORT}`
            );
        });

    } catch (error) {
        console.error("❌ Server error completo:", error.message);
        console.error(error);
        process.exit(1);
    }
};

startServer();