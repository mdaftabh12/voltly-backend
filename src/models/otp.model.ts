import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../config/database";

// ============================================
// OTP MODEL
// ============================================
class Otp extends Model<InferAttributes<Otp>, InferCreationAttributes<Otp>> {
  // Primary key
  declare id: CreationOptional<string>;

  // OTP verification data
  declare phoneNumber: string;
  declare otp: string;
  declare expiresAt: Date;

  // OTP security state
  declare attempts: CreationOptional<number>;
  declare isUsed: CreationOptional<boolean>;

  // Timestamps
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

// ============================================
// OTP MODEL DEFINITION
// ============================================
Otp.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    // Phone number associated with the OTP
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    otp: {
      type: DataTypes.STRING(6),
      allowNull: false,
    },

    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    // Number of failed verification attempts
    attempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    // Indicates whether the OTP has already been used
    isUsed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    tableName: "otps",
    modelName: "Otp",
    timestamps: true,

    // DATABASE INDEXES
    indexes: [
      {
        fields: ["phoneNumber"],
      },
      {
        fields: ["expiresAt"],
      },
    ],
  },
);

export default Otp;
