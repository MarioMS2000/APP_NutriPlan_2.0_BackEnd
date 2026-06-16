import { Router } from "express"; // Router() sirve para agrupar rutas relacionadas
import { getMyNutritionProfile, createNutritionProfile, updateNutritionProfile, } from "../controllers/nutritionProfile.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";
import { nutritionProfileValidation } from "../validations/nutritionProfile.validation.js";

const router = Router(); // Creas un mini servidor de rutas

router.get("/me", authMiddleware, getMyNutritionProfile);

router.post("/", authMiddleware, nutritionProfileValidation, validationMiddleware, createNutritionProfile);

router.put("/", authMiddleware, nutritionProfileValidation, validationMiddleware, updateNutritionProfile);

export default router;