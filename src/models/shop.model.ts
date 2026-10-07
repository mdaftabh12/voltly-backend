import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../config/database";

// ============================================
// 🏪 SHOP MODEL
// ============================================
class Shop extends Model<InferAttributes<Shop>, InferCreationAttributes<Shop>> {
  // Primary key
  declare id: CreationOptional<string>;

  // Owner relationship
  declare ownerId: string;

  // Basic shop information
  declare phoneNumber: string;
  declare shopName: string;
  declare ownerName: CreationOptional<string>;
  declare address: CreationOptional<string>;
  declare city: CreationOptional<string>;
  declare logo: CreationOptional<string>;

  // Shop status
  declare status: CreationOptional<"ACTIVE" | "DISABLED">;

  // Timestamps
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

// ============================================
// 🏪 SHOP MODEL DEFINITION
// ============================================
Shop.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    // ========================================
    // 👤 SHOP OWNER
    // ========================================
    ownerId: {
      type: DataTypes.UUID,
      allowNull: false,
       unique: true,
    },

    // ========================================
    // 📱 SHOP CONTACT NUMBER
    // ========================================
    // This number comes from the verified user.
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    // ========================================
    // 🏪 SHOP INFORMATION
    // ========================================
    shopName: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    ownerName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    address: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    logo: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    // ========================================
    // 🔐 SHOP STATUS
    // ========================================
    status: {
      type: DataTypes.ENUM("ACTIVE", "DISABLED"),
      allowNull: false,
      defaultValue: "ACTIVE",
    },

    // ========================================
    // 🕒 TIMESTAMPS
    // ========================================
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "shops",
    modelName: "Shop",
    timestamps: true,

    indexes: [
      {
        unique: true,
        fields: ["ownerId"],
      },
      {
        fields: ["phoneNumber"],
      },
      {
        fields: ["city"],
      },
      {
        fields: ["status"],
      },
    ],
  },
);

export default Shop;
