import { model, models, Schema } from "mongoose";
import { IOtp } from "@/types";

const otpSchema = new Schema<IOtp>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiredAt: { type: Date },
});

const OtpModel = models.Otp || model("Otp", otpSchema);
export default OtpModel;
