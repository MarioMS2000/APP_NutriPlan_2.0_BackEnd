import { DataTypes } from "sequelize"; // contiene todos los tipos de datos que puede usar Sequelize. Ejm: DataTypes.STRING, DataTypes.INTEGER, DataTypes.BOOLEAN, DataTypes.DATE, DataTypes.UUID
import { sequelize } from "../../config/postgres.js"; // Importas la instancia de Sequelize que ya está conectada a PostgreSQL

export const Role = sequelize.define(
    "Role",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        name: {
            type: DataTypes.ENUM("user", "admin"),
            allowNull: false, // No permite valores nulos
        },
    },
    {
        tableName: "roles",
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ["name"],
            }, // Impedimos duplicados para que solo sea o user o admin
        ],
    }
);
