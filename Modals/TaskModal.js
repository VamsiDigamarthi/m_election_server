import mongoose from "mongoose";

const TaskSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      require: true,
    },
    action: {
      type: String,
      default: "initiated",
    },
    PS_name: {
      type: String,
      require: true,
    },
    AC_name: {
      type: String,
      require: true,
      //   default: false,
    },
    PS_No: {
      type: String,
      require: true,
    },
    AC_No: {
      type: String,
      require: true,
    },
    district: {
      type: String,
      require: true,
    },
    mandal: {
      type: String,
      require: true,
    },
    kit_start: {
      type: String,
    },
    kit_end: {
      type: String,
    },
    InstallationCertificate: {
      type: String,
    },
    CompletedCertificate: {
      type: String,
    },
    installationImage: {
      type: String,
    },
    location: {
      type: String,
      require: true,
    },
    rejected_dist_assign_new_user: {
      type: String,
      default: "no",
    },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("tasks", TaskSchema);

export default TaskModel;
