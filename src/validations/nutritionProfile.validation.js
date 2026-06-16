import { body } from "express-validator"; // Sirve para validar campos que llegan en: req.body

export const nutritionProfileValidation = [
    body("age")
        .notEmpty()
        .withMessage("La edad es obligatoria")
        .isInt({ min: 10, max: 120 })
        .withMessage("La edad debe estar entre 10 y 120 años"),

    body("height")
        .notEmpty()
        .withMessage("La altura es obligatoria")
        .isFloat({ min: 0.5, max: 2.5 })
        .withMessage("La altura debe ser válida"),

    body("weight")
        .notEmpty()
        .withMessage("El peso es obligatorio")
        .isFloat({ min: 20, max: 300 })
        .withMessage("El peso debe ser válido"),

    body("goal")
        .notEmpty()
        .withMessage("El objetivo es obligatorio")
        .isIn(["lose_weight", "maintain_weight", "gain_muscle"])
        .withMessage("Objetivo no válido"),

    body("activityLevel")
        .notEmpty()
        .withMessage("El nivel de actividad es obligatorio")
        .isIn(["sedentary", "light", "moderate", "active", "very_active"])
        .withMessage("Nivel de actividad no válido"),

    body("dietType")
        .optional()
        .isIn(["standard", "vegetarian", "vegan", "gluten_free", "lactose_free"])
        .withMessage("Tipo de dieta no válido"),

    body("allergies")
        .optional()
        .isArray()
        .withMessage("Las alergias deben ser una lista"),
];
