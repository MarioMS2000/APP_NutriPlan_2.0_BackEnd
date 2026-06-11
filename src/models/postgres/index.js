import { Role } from "./Role.js";
import { User } from "./User.js";

Role.hasMany(User, {
    foreignKey: "roleId",
});

User.belongsTo(Role, {
    foreignKey: "roleId",
});

User.hasOne(NutritionProfile, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

NutritionProfile.belongsTo(User, {
    foreignKey: "userId",
});

export { Role, User, NutritionProfile };