/* Archivo donde configuras y preparas tu servidor de Express antes de arrancarlo desde server.js o index.js */

import express from "express"; // Framework que utilizarás para crear el servidor y las rutas de tu API
import cors from "cors"; // Permite que el front(React) pueda hacer peticiones al backend aunque este en puertos o dominios distintos
import helmet from "helmet"; // Añade cabeceras HTTP de seguridad automáticamente
import morgan from "morgan"; // Registra en consola todas las peticiones que llegan al backend
import cookieParser from "cookie-parser"; // Leer las cookies enviadas por el navegador
import authRoutes from "./routes/auth.routes.js";

const app = express(); // Creo la app de Express

/* 
app.use() -> Se utiliza para registrar middlewares. Un middleware es una función que se ejecuta antes de llegar a la ruta final 
app.get() -> Se usa para responder peticiones HTTP GET. Normalmente para obtener datos
app.post() -> Se usa para crear datos. Ejem: crear usuario
app.put() -> Se usa para actualizar un recurso completo. Ejem: actualizar usuario
app.patch() -> Actualiza sólo algunos campos
app.delete() -> Elimina datos. Ejem: eliminar usuario
app.all() -> Responde a cualquier método HTTP. Ejem: uncionaría para: GET, POST, PUT, PATCH, DELETE
*/

// Middleware CORS
app.use(
    cors({
        origin: process.env.FRONTEND_URL, // Sólo permites peticiones desde tu frontend
        credentials: true, // Permite enviar Cookies, Headers de autenticación, Información de sesión, Es obligatorio cuando trabajas con login mediante cookies
    })
);

// Middleware Helmet
app.use(helmet()); // Ativas todas las peticiones de Helmet ejecutandose en cada petición

// Middleware Morgan
app.use(morgan("dev")); // Activas Morgan en modo desarrollo

// Middleware Cookie Parser
app.use(cookieParser()); // Hace que Express pueda leer cookies

// Middleware JSON
app.use(express.json()); // Permite que Express entienda JSON enviado desde el frontend

// Comprobamos que el BackEnd esta funcionando
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "NutriPlan API is running",
    });
});

app.use("/api/auth", authRoutes);

export default app;