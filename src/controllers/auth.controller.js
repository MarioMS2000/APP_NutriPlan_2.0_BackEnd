// Este archivo se encarga de recibir req, llamar al service, crear/borrar cookie, responder con res

import { registerUserService, loginUserService, } from "../services/auth.service.js";

const cookieOptions = {
    httpOnly: true, // JavaScript no puede leer la cookie
    secure: process.env.NODE_ENV === "production", // En producción → solo HTTPS
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // "none" -> en producción → permite frontend y backend en dominios distintos | "lax" -> en local → suficiente para desarrollo
    maxAge: 24 * 60 * 60 * 1000, // Dura 1 día
};

export const register = async (req, res) => {
    try {
        const user = await registerUserService(req.body); // Llama al service y le pasa los datos del formulario

        res.status(201).json({
            message: "Usuario registrado correctamente",
            user,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message || "Error al registrar usuario",
        });
    }
};

export const login = async (req, res) => {
    try {
        const { token, user } = await loginUserService(req.body); // Llama al service con: { email, password }

        res.cookie("token", token, cookieOptions); // "token" -> Es el nombre de la cookie, token -> valor de la cookie que generamos en jwt.js y  cookieOptions -> configuración de la cookie 

        res.json({
            message: "Login correcto",
            user,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message || "Error al iniciar sesión",
        });
    }
};

export const logout = (req, res) => {
    res.clearCookie("token", cookieOptions); // Borra la cookie

    res.json({
        message: "Sesión cerrada correctamente",
    });
};