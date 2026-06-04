import { Role } from "../models/postgres/index.js";

export const seedRoles = async () => {

    const roles = ["user", "admin"];

    for (const roleName of roles) {
        // findOrCreate() -> Método de Sequelize que busca el registro, si existe lo devuelve y si no existe lo créa
        await Role.findOrCreate({
            where: { name: roleName }, // Si existe devuelvemelo
            defaults: { name: roleName }, // Si no encuentra el rol hace un INSERT INTO
        });
    }

    console.log("✅ Roles seeded");
};
