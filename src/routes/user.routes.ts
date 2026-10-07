import { Router } from "express";

import {
  getMe,
  getUsers,
  getUserById,
  updateProfile,
  updateUser,
  updateUserStatus,
  deleteUser,
} from "../controllers/user.controller";

import { validate } from "../middlewares/validate.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

import {
  userIdParamSchema,
  updateProfileSchema,
  updateUserSchema,
} from "../validators/user.validator";

const router = Router();

// ============================================
// AUTHENTICATED USER
// ============================================

router.get("/me", authMiddleware, getMe);

router.patch(
  "/me",
  authMiddleware,
  validate(updateProfileSchema),
  updateProfile,
);

// ============================================
// USER MANAGEMENT
// ============================================

// Admin middleware later add karna
router.get("/", authMiddleware, getUsers);

router.get(
  "/:userId",
  authMiddleware,
  validate(userIdParamSchema),
  getUserById,
);

router.patch(
  "/:userId",
  authMiddleware,
  validate(updateUserSchema),
  updateUser,
);

router.patch(
  "/:userId/status",
  authMiddleware,
  validate(updateUserSchema),
  updateUserStatus,
);

router.delete(
  "/:userId",
  authMiddleware,
  validate(userIdParamSchema),
  deleteUser,
);

export default router;
