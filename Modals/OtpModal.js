import mongoose from "mongoose";

const OTPSchema = mongoose.Schema(
  {
    phone: {
      type: String,
      require: true,
    },
    otp_value: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const OTPModel = mongoose.model("otp", OTPSchema);

export default OTPModel;
