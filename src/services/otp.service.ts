import { Op } from "sequelize";
import Otp from "../models/otp.model";

// ============================================
// DELETE EXPIRED OTPS
// ============================================
const deleteExpiredOtps = async (): Promise<void> => {
  // Remove all OTP records that have expired
  await Otp.destroy({
    where: {
      expiresAt: {
        [Op.lt]: new Date(),
      },
    },
  });
};

export { deleteExpiredOtps };
