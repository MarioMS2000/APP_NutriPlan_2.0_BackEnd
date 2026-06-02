import { DataTypes } from "sequelize"; // contiene todos los tipos de datos que puede usar Sequelize. Ejm: DataTypes.STRING, DataTypes.INTEGER, DataTypes.BOOLEAN, DataTypes.DATE, DataTypes.UUID
import { sequelize } from "../../config/postgres.js"; // Importas la instancia de Sequelize que ya está conectada a PostgreSQL

export const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        isActive: {// Indica si el usuario está activo
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        tableName: "users",
        timestamps: true,
    }
);