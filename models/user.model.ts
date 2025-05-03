import { model, models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const UserModel = models.User || model("User", userSchema);
export default UserModel;
