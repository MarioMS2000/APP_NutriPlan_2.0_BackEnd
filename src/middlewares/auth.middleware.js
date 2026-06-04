// Este archivo Comprobar si el usuario está autenticado, Verificar el JWT, Buscar el usuario en la BD, Guardar el usuario en req.user, Permitir acceder a la ruta

import { verifyToken } from "../utils/jwt.js";
import { User, Role } from "../models/postgres/index.js";

export const authMiddleware = async (req, res, next) => { // req -> Lo que recibe el servidor, res -> Lo que envía el servidor, next -> Pasar a la siguiente función
    try {
        const token = req.cookies.token; // Obtener token

        if (!token) { // No hay cookie o usuario no logueado
            return res.status(401).json({
                message: "No autenticado",
            });
        }

        // Verificar token
        const decoded = verifyToken(token); // Firma correcta, No expirado, No manipulado

        // Buscar usuario
        const user = await User.findByPk(decoded.id, {
            attributes: ["id", "name", "email", "isActive"],
            include: {
                model: Role,
                attributes: ["name"],
            },
        });

        if (!user || !user.isActive) { // si el usuario borrado o usuario desactivado
            return res.status(401).json({
                message: "Usuario no válido",
            });
        }

        // Crear req.user
        req.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.Role.name,
        };

        next(); // Usuario autenticado, continua
    } catch (error) {
        res.status(401).json({
            message: "Token inválido o expirado",
        });
    }
};