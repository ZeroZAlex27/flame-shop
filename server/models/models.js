const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Basket = sequelize.define("basket", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Basket_To_Device = sequelize.define("basket_to_device", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Device = sequelize.define("device", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
    img: { type: DataTypes.STRING },
});

const Type = sequelize.define("type", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Brand = sequelize.define("brand", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Rating = sequelize.define("rating", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER, allowNull: false },
});

const DeviceInfo = sequelize.define("device_info", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
});

const TypeToBrand = sequelize.define("type_to_brand", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasOne(Basket, { foreignKey: "user_id" });
Basket.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Rating, { foreignKey: "user_id" });
Rating.belongsTo(User, { foreignKey: "user_id" });

Basket.hasMany(Basket_To_Device, { foreignKey: "basket_id" });
Basket_To_Device.belongsTo(Basket, { foreignKey: "basket_id" });

Type.hasMany(Device, { foreignKey: "type_id" });
Device.belongsTo(Type, { foreignKey: "type_id" });

Device.hasMany(Rating, { foreignKey: "device_id" });
Rating.belongsTo(Device, { foreignKey: "device_id" });

Device.hasMany(Basket_To_Device, { foreignKey: "device_id" });
Basket_To_Device.belongsTo(Device, { foreignKey: "device_id" });

Device.hasMany(DeviceInfo, { foreignKey: "device_id", as: "info" });
DeviceInfo.belongsTo(Device, { foreignKey: "device_id" });

Type.belongsToMany(Brand, { through: TypeToBrand, foreignKey: "type_id" });
Brand.belongsToMany(Type, { through: TypeToBrand, foreignKey: "brand_id" });

module.exports = {
    User,
    Basket,
    Basket_To_Device,
    Device,
    Type,
    Brand,
    Rating,
    TypeToBrand,
    DeviceInfo,
};
