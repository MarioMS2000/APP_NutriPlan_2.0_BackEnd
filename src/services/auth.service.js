// Este archivo tiene la parte lógica de auth: comprobar email, buscar rol user, encriptar password, crear usuario, devolver usuario sin password

import bcrypt from "bcrypt"; // Para encriptar contraseñas y compararlas
import { User, Role } from "../models/postgres/index.js";
import { generateToken } from "../utils/jwt.js";

export const registerUserService = async ({ name, email, password, }) => {
    const existingUser = await User.findOne({ where: { email }, }); // Buscamos un usuario existente

    if (existingUser) {
        const error = new Error("El email ya está registrado");
        error.statusCode = 409;
        throw error; // Detiene la ejecución
    }

    const userRole = await Role.findOne({ where: { name: "user" }, }); // Buscamos el rol

    const hashedPassword = await bcrypt.hash(password, 10); // Encriptamos la contraseña

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        roleId: userRole.id,
    }); // Creamos usuario

    return {
        id: user.id,
        name: user.name,
        email: user.email,
    };
};

export const loginUserService = async ({ email, password }) => {
    const user = await User.findOne({
        where: { email },
        include: {
            model: Role,
            attributes: ["name"],
        },
    });

    // Si no encuentra el ususario
    if (!user) {
        const error = new Error("Credenciales incorrectas");
        error.statusCode = 401;
        throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        const error = new Error("Credenciales incorrectas");
        error.statusCode = 401;
        throw error;
    }

    const token = generateToken({
        id: user.id,
        role: user.Role.name,
    });

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.Role.name,
        },
    };
};