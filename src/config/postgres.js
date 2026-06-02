// Archivo  que realiza la conexión entre tu aplicación Node.js y PostgreSQL usando Sequelize

import { Sequelize } from "sequelize"; // Clase que se encarga de crear la conexión con la base de datos
import dotenv from "dotenv"; // Leer las variables del archivo .env

dotenv.config(); // Hace que Sequelize pueda leer -> DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT

// Crea la conexión. Creando una instancia de Sequelize y la exporta
export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    // Objeto de configuración
    {
host: process.env.DB_HOST,
port: process.env.DB_PORT,
dialect: "postgres", // Le dice a Sequelize qué base de datos estás usando
logging: false, // Controla si Sequelize muestra las consultas SQL en consola
    }
); 