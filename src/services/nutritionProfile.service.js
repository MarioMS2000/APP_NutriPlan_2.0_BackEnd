import { NutritionProfile } from "../models/postgres/index.js";

export const getMyNutritionProfileService = async (userId) => {
    return await NutritionProfile.findOne({
        where: { userId },
    });
};

export const createNutritionProfileService = async (userId, data) => { // userId -> El ID del usuario autenticado y data -> Los datos del perfil nutricional enviados desde el frontend

    // Busca un perfil cuyo userId sea el usuario actual
    const existingProfile = await NutritionProfile.findOne({
        where: { userId },
    });

    if (existingProfile) {
        const error = new Error("El perfil nutricional ya existe");
        error.statusCode = 409;
        throw error;
    }

    return await NutritionProfile.create({
        ...data, // Copia todas las propiedades del objeto data
        userId,
    });
};

export const updateNutritionProfileService = async (userId, data) => {
    const profile = await NutritionProfile.findOne({
        where: { userId },
    });

    // Sie l perfil no existe o es falso
    if (!profile) {
        const error = new Error("Perfil nutricional no encontrado");
        error.statusCode = 404;
        throw error;
    }

    await profile.update(data);

    return profile; // Devuelves la misma instancia, pero con sus valores ya actualizados
};