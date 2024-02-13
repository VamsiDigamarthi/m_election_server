import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    state: {
      type: String,
      require: true,
    },
    district: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      //   default: false,
    },
    phone: {
      type: String,
      require: true,
    },
    phonepe: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    voteridnumber: {
      type: String,
      require: true,
    },
    adharnumber: {
      type: String,
      require: true,
    },
    voteridurl: {
      type: String,
      require: true,
    },
    adharidurl: {
      type: String,
      require: true,
    },
    mandal: {
      type: String,
      require: true,
    },
    password: {
      type: String,
    },
    score: {
      type: Number,
    },
    role: {
      type: Number,
      default: 3,
    },
    pay_mode_admin: {
      type: Boolean,
      default: false,
    },
    pay_mode_user: {
      type: Boolean,
      default: false,
    },
    payment_text_user: {
      type: Boolean,
      default: false,
    },
    assign_task: {
      type: String,
      default: "no",
    },
    payment_method: {
      type: String,
    },
    payment_client: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
