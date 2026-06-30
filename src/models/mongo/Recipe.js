import mongoose from "mongoose"; // Importo la librería que permite trabajar con MongoDB

// Estructura que tendrá cada ingrediente
const ingredientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        unit: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { _id: false } // Por defecto MongoDB crea un _id para cada objeto por eso ponemos false para que no se vea
);

const macrosSchema = new mongoose.Schema(
    {
        protein: {
            type: Number,
            required: true,
        },
        carbs: {
            type: Number,
            required: true,
        },
        fat: {
            type: Number,
            required: true,
        },
    },
    { _id: false }
);

const recipeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        image: {
            type: String,
            required: true,
        },

        prepTime: {
            type: Number,
            required: true,
        },

        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            required: true,
        },

        dietType: {
            type: String,
            enum: [
                "standard",
                "vegetarian",
                "vegan",
                "gluten_free",
                "lactose_free",
            ],
            default: "standard",
        },

        calories: {
            type: Number,
            required: true,
        },

        macros: {
            type: macrosSchema,
            required: true,
        },

        ingredients: {
            type: [ingredientSchema],
            required: true,
        },

        steps: {
            type: [String],
            required: true,
        },

        tags: {
            type: [String],
            default: [],
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },
        // Sirve para marcar recetas destacadas
        isFeatured: {
            type: Boolean,
            default: false,
        },

        createdBy: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Recipe = mongoose.model("Recipe", recipeSchema);