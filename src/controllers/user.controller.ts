import { Request, Response } from "express";

import User from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

// ============================================
// GET CURRENT USER
// ============================================

const getMe = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    res
      .status(200)
      .json(new ApiResponse(true, "User profile fetched successfully.", user));
  },
);

// ============================================
// GET ALL USERS
// ============================================

const getUsers = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const users = await User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["createdAt", "DESC"]],
    });

    res
      .status(200)
      .json(new ApiResponse(true, "Users fetched successfully.", users));
  },
);

// ============================================
// GET USER BY ID
// ============================================

const getUserById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    res
      .status(200)
      .json(new ApiResponse(true, "User fetched successfully.", user));
  },
);

// ============================================
// UPDATE CURRENT USER PROFILE
// ============================================

const updateProfile = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.user.id;

    const { name, email, avatar } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    // Update only provided fields
    if (name !== undefined) {
      user.name = name;
    }

    if (email !== undefined) {
      user.email = email;
    }

    if (avatar !== undefined) {
      user.avatar = avatar;
    }

    await user.save();

    res.status(200).json(
      new ApiResponse(true, "Profile updated successfully.", {
        id: user.id,
        phoneNumber: user.phoneNumber,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        status: user.status,
      }),
    );
  },
);

// ============================================
// UPDATE USER
// ============================================

const updateUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    const { name, email, avatar, role, status } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    if (name !== undefined) {
      user.name = name;
    }

    if (email !== undefined) {
      user.email = email;
    }

    if (avatar !== undefined) {
      user.avatar = avatar;
    }

    if (role !== undefined) {
      user.role = role;
    }

    if (status !== undefined) {
      user.status = status;
    }

    await user.save();

    res.status(200).json(
      new ApiResponse(true, "User updated successfully.", {
        id: user.id,
        phoneNumber: user.phoneNumber,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        status: user.status,
      }),
    );
  },
);

// ============================================
// UPDATE USER STATUS
// ============================================

const updateUserStatus = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const { status } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    user.status = status;

    await user.save();

    res.status(200).json(
      new ApiResponse(
        true,
        `User ${status === "ACTIVE" ? "enabled" : "disabled"} successfully.`,
        {
          id: user.id,
          status: user.status,
        },
      ),
    );
  },
);

// ============================================
// DELETE USER
// ============================================

const deleteUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    const user = await User.findByPk(userId);

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    await user.destroy();

    res
      .status(200)
      .json(new ApiResponse(true, "User deleted successfully.", null));
  },
);

export {
  getMe,
  getUsers,
  getUserById,
  updateProfile,
  updateUser,
  updateUserStatus,
  deleteUser,
};
