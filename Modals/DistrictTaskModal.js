import mongoose from "mongoose";

const DistrictTaskSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      require: true,
    },
    task_heading: {
      type: String,
      require: true,
    },
    sub_task: {
      type: Array,
      require: true,
    },
    completed: {
      type: String,
      default: "no",
    },
  },
  { timestamps: true }
);

const DistrictTaskModel = mongoose.model("district_task", DistrictTaskSchema);

export default DistrictTaskModel;
