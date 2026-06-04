import jwt from "jsonwebtoken"; // Importas la librería y permite Crear tokens (sign), Verificar tokens (verify), Decodificar información del usuario

export const generateToken = (payload) => { // payload -> información que quieres guardar dentro del token
    // jwt.sign() genera un token JWT firmado digitalmente utilizando una clave secreta. Dentro del token almaceno información como el id o el rol del usuario y configuro una fecha de expiración
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d", }); // payload -> info que guardas, process.env.JWT_SECRET -> clave secreta y expiresIn -> expira en 1 día
};

export const verifyToken = (token) => { // Hace varias comprobaciones: ¿Está firmado correctamente?, ¿Ha sido modificado? y ¿Ha caducado?
    // jwt.verify() comprueba que el token no ha sido manipulado, que fue firmado con la clave correcta y que no ha expirado. Si todo es válido devuelve la información almacenada en el payload
    return jwt.verify(token, process.env.JWT_SECRET);
};