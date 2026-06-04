import { Router } from "express"; // Router() sirve para agrupar rutas relacionadas
import { register, login, logout, } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js"; // middleware de autenticación

const router = Router(); // Creas un mini servidor de rutas

// POST http://localhost:3000/api/auth/register
router.post("/register", register);
// POST http://localhost:3000/api/auth/login
router.post("/login", login);
// POST http://localhost:3000/api/auth/logout
router.post("/logout", logout);

// GET http://localhost:3000/api/auth/me
router.get("/me", authMiddleware, (req, res) => {
    res.json({
        user: req.user,
    }); // Devolvemos los datos del user y viene el req.user del middleware
});

export default router;