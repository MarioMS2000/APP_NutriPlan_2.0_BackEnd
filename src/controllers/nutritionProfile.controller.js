import { getMyNutritionProfileService, createNutritionProfileService, updateNutritionProfileService } from "../services/nutritionProfile.service.js";

export const getMyNutritionProfile = async (req, res) => { // ecibir la petición HTTP (req) y Enviar una respuesta al cliente (res)
    // req -> GET /api/nutrition-profile/me 
    try {
        const profile = await getMyNutritionProfileService(req.user.id); // Envía el ID del user autenticado al service

        res.json({ profile }); // res es lo que utilizas para enviar información al frontend
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message || "Error al obtener perfil nutricional",
        });
    }
};

export const createNutritionProfile = async (req, res) => {
    try {
        const profile = await createNutritionProfileService(req.user.id, req.body);

        res.status(201).json({
            message: "Perfil nutricional creado correctamente",
            profile,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message || "Error al crear perfil nutricional",
        });
    }
};

export const updateNutritionProfile = async (req, res) => {
    try {
        const profile = await updateNutritionProfileService(req.user.id, req.body);

        res.json({
            message: "Perfil nutricional actualizado correctamente",
            profile,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message || "Error al actualizar perfil nutricional",
        });
    }
};