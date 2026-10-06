import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../config/database";

// ============================================
// 👤 USER MODEL
// ============================================
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  // Primary key
  declare id: CreationOptional<string>;

  // Basic user information
  declare phoneNumber: string;
  declare name: CreationOptional<string>;
  declare email: CreationOptional<string>;
  declare gender: CreationOptional<"MALE" | "FEMALE">;
  declare age: CreationOptional<number>;
  declare avatar: CreationOptional<string>;

  // User access
  declare role: CreationOptional<"USER" | "OWNER">;
  declare status: CreationOptional<"ACTIVE" | "DISABLED">;

  // Timestamps
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

// ============================================
// 👤 USER MODEL DEFINITION
// ============================================
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    // Mobile number verified through OTP
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },

    // Optional profile information
    // These fields can be completed after registration
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: true,
      unique: true,
    },

    gender: {
      type: DataTypes.ENUM("MALE", "FEMALE"),
      allowNull: true,
    },

    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    avatar: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    // USER  → Normal application user
    // OWNER → User who owns a shop
    role: {
      type: DataTypes.ENUM("USER", "OWNER"),
      allowNull: false,
      defaultValue: "USER",
    },

    // Account status
    status: {
      type: DataTypes.ENUM("ACTIVE", "DISABLED"),
      allowNull: false,
      defaultValue: "ACTIVE",
    },

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
    tableName: "users",
    modelName: "User",
    timestamps: true,

    // DATABASE INDEXES
    indexes: [
      {
        unique: true,
        fields: ["phoneNumber"],
      },
      {
        unique: true,
        fields: ["email"],
      },
      {
        fields: ["role"],
      },
      {
        fields: ["status"],
      },
    ],
  },
);

export default User;
