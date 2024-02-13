import mongoose from "mongoose";

const PSSchema = mongoose.Schema(
  {
    State: {
      type: String,
      require: true,
    },
    District: {
      type: String,
      require: true,
    },
    PS_No: {
      type: String,
      require: true,
    },
    PS_Name_and_Address: {
      type: String,
      require: true,
    },
    AC_No: {
      type: String,
      require: true,
    },
    AC_Name: {
      type: String,
      require: true,
    },
    assign: {
      type: String,
      default: "no",
    },
    Location: {
      type: String,
      require: true,
    },
    Mandal: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const PsModel = mongoose.model("ps_details", PSSchema);

export default PsModel;
