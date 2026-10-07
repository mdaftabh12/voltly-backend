import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../config/database";


// USER TYPES
export type UserRole = "USER" | "OWNER";
export type UserStatus = "ACTIVE" | "DISABLED";

// ============================================
// USER MODEL
// ============================================

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  // Primary key
  declare id: CreationOptional<string>;

  // Basic information
  declare phoneNumber: string;
  declare name: CreationOptional<string | null>;
  declare email: CreationOptional<string | null>;
  declare avatar: CreationOptional<string | null>;

  // Access control
  declare role: CreationOptional<UserRole>;
  declare status: CreationOptional<UserStatus>;

  // Timestamps
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

// ============================================
// USER MODEL DEFINITION
// ============================================

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    // Phone number verified through OTP
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: true,
      unique: true,
    },

    avatar: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    role: {
      type: DataTypes.ENUM("USER", "OWNER"),
      allowNull: false,
      defaultValue: "USER",
    },

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
