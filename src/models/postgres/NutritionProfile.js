import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres.js";

export const NutritionProfile = sequelize.define(
    "NutritionProfile",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        height: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },

        weight: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },

        goal: {
            type: DataTypes.ENUM(
                "lose_weight",
                "maintain_weight",
                "gain_muscle"
            ),
            allowNull: false,
        },

        activityLevel: {
            type: DataTypes.ENUM(
                "sedentary",
                "light",
                "moderate",
                "active",
                "very_active"
            ),
            allowNull: false,
        },

        dietType: {
            type: DataTypes.ENUM(
                "standard",
                "vegetarian",
                "vegan",
                "gluten_free",
                "lactose_free"
            ),
            defaultValue: "standard",
        },

        allergies: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
        },
    },
    {
        tableName: "nutrition_profiles",
        timestamps: true,
    }
);