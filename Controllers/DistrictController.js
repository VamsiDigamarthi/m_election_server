import { getDb } from "../Database/mongoDb.js";
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

export const districtCoorPsAcDetailsUsingDropdown = async (req, res) => {
  const psModal = getDb().db().collection("ps_details");
  //   console.log(req.params.district);
  try {
    const details = await psModal
      .find({ District: req.params.district })
      .toArray();
    // console.log(details);
    return res.status(200).json(details);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const updatedOwnDistrictTask = async (req, res) => {
  const psModal = getDb().db().collection("district_task");
  try {
    await psModal.updateOne(
      {
        $and: [
          { user_id: req.params.id },
          { _id: new ObjectId(req.params.taskId) },
        ],
      },
      {
        $set: { completed: "yes" },
      }
    );
    res.status(200).json("Updated Your Task..!");
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const userGetScoreGreaterThanEight = async (req, res) => {
  const userModal = getDb().db().collection("users");
  try {
    const result = await userModal
      .find({
        $and: [{ score: { $gte: 8 } }, { district: req.params.district }],
      })
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const usersNotAssignTaskMandalwise = async (req, res) => {
  const userModal = getDb().db().collection("users");
  // console.log(req.body.district);
  // console.log(req.body.mandal);
  // console.log(req.body.district);
  // console.log(req.body.district);
  try {
    const result = await userModal
      .find({
        $and: [
          { district: req.body.district },
          { mandal: req.body.mandal?.toLowerCase() },
          { role: "3" },
          { assign_task: "no" },
          { score: { $gte: 8 } },
        ],
      })
      .project({ name: 1, phone: 1 })
      .toArray();
    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const notAssignMandalWiseUser = async (req, res) => {
  const userModal = getDb().db().collection("users");
  // console.log("cvhjkl");
  try {
    const result = await userModal
      .find({
        $and: [
          { district: req.params.district },
          { role: "3" },
          { assign_task: "no" },
          { score: { $gte: 8 } },
        ],
      })
      .toArray();
    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

const userTableUpdate = async (req, res) => {
  const userModal = getDb().db().collection("users");
  try {
    await userModal.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          assign_task: "yes",
        },
      }
    );
    // console.log("third");
    res.status(200).json("task added successfully..!");
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

const updateUserTaskAddedToPsDetails = async (req, res) => {
  const psModal = getDb().db().collection("ps_details");
  try {
    await psModal.updateMany(
      {
        Location: req.body["taskOpenFilterData"][0]?.Location,
      },
      {
        $set: { assign: "yes" },
      }
    );
    // console.log("second");
    userTableUpdate(req, res);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const addTaskToUser = async (req, res) => {
  var values = [];

  const taskModal = getDb().db().collection("tasks");
  for (let i of req.body["taskOpenFilterData"]) {
    values.push({
      PS_name: i.PS_Name_and_Address,
      AC_name: i.AC_Name,
      PS_No: i.PS_No,
      AC_No: i.AC_No,
      district: i.District,
      mandal: i.Mandal,
      location: i.Location,
      kit_start: "",
      kit_end: "",
      InstallationCertificate: "",
      CompletedCertificate: "",
      installationImage: "",
      rejected_dist_assign_new_user: "no",
      action: "initiated",
      user_id: req.params.id,
    });
  }
  try {
    await taskModal.insertMany(values);
    // console.log("first");
    updateUserTaskAddedToPsDetails(req, res);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const paymentInitiatedToUser = async (req, res) => {
  const userModal = getDb().db().collection("users");
  try {
    await userModal.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          pay_mode_admin: "true",
          payment_method: req.body.method,
          payment_client: req.body.client,
        },
      }
    );
    res.status(200).json("payment Updated Successfully ...!");
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const rejectedAllTaskFromUser = async (req, res) => {
  const taskModal = getDb().db().collection("tasks");
  try {
    const result = await taskModal
      .find({
        $and: [
          { action: "rejected" },
          { rejected_dist_assign_new_user: "no" },
          { district: req.params.district },
        ],
      })
      .toArray();
    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const paymentNotReceviedUser = async (req, res) => {
  const userModal = getDb().db().collection("users");
  try {
    const result = await userModal
      .find({
        $and: [{ pay_mode_admin: "true" }, { district: req.params.district }],
      })
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

const updatedOldTaskDistrictAssign = async (req, res) => {
  const taskModal = getDb().db().collection("tasks");
  // console.log(req.body._id);
  try {
    await taskModal.updateOne(
      { _id: new ObjectId(req.body._id) },
      { $set: { rejected_dist_assign_new_user: "yes" } }
    );
    userTableUpdate(req, res);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const addRejectedTask = async (req, res) => {
  const taskModal = getDb().db().collection("tasks");
  // console.log(req.body);
  try {
    const docs = {
      PS_name: req.body.PS_name,
      AC_name: req.body.AC_name,
      PS_No: req.body.PS_No,
      AC_No: req.body.AC_No,
      district: req.body.district,
      mandal: req.body.mandal,
      location: req.body.location,
      kit_start: "",
      kit_end: "",
      InstallationCertificate: "",
      CompletedCertificate: "",
      installationImage: "",
      rejected_dist_assign_new_user: "no",
      action: "initiated",
      user_id: req.params.id,
    };
    // console.log(docs);
    await taskModal.insertOne(docs);
    updatedOldTaskDistrictAssign(req, res);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const rejectedTaskDistrictBased = async (req, res) => {};
