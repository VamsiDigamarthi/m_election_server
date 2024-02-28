import mongodb from "mongodb";
import { getDb } from "../Database/mongoDb.js";
// import PsModel from "../Modals/PsDetails.js";

const ObjectId = mongodb.ObjectId;

export const bulkUpload = async (req, res) => {
  //   console.log(req.body);
  const psModal = getDb().db().collection("ps_details");
  const newArr = req.body?.map((v) => ({ ...v, assign: "no", eassign: "no" }));
  try {
    await psModal.insertMany(newArr);
    res.status(200).json({
      msg: "succefully insert all",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const allDelete = async (req, res) => {
  const psModal = getDb().db().collection("ps_details");
  try {
    await psModal.deleteMany();
    res.status(200).json({
      msg: "succefully delete all",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const allPsDetails = async (req, res) => {
  // const psDetails = [];
  const psModal = getDb().db().collection("ps_details");
  try {
    const result = await psModal.find().toArray();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const psDetailsFilterBasedOnDistrict = async (req, res) => {
  const psModal = getDb().db().collection("ps_details");
  console.log(req.body.selectedDist);
  try {
    const result = await psModal
      .find({
        $or: [
          { State: req.body.selectedState },
          {
            District: req.body.selectedDist,
          },
        ],
      })
      .toArray();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const districtCoordinatorShowStateCoordinator = async (req, res) => {
  const userModal = getDb().db().collection("users");
  try {
    const result = await userModal.findOne(
      {
        $and: [
          { district: req.params.district },
          { state: req.params.state },
          { role: "2" },
        ],
      },
      { _id: 1, name: 1, phone: 1 }
    );
    console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const assignTaskDistrictCoor = async (req, res) => {
  const psStaticTask = getDb().db().collection("district_task");
  try {
    const existTask = await psStaticTask.findOne({
      $and: [
        { task_heading: req.body.selectTask },
        { sub_task: req.body.selectedSubTaskValue },
        { user_id: req.params.id },
      ],
    });
    if (existTask) {
      return res.status(500).json({
        msg: "This Task is Already Assigned .. !",
      });
    } else {
      const doc = {
        task_heading: req.body.selectTask,
        sub_task: req.body.selectedSubTaskValue,
        user_id: req.params.id,
        completed: "no",
      };
      await psStaticTask.insertOne(doc);
      res.status(200).json({ msg: "Task Added Successfully" });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const districtCoorTask = async (req, res) => {
  const psStaticTask = getDb().db().collection("district_task");
  try {
    const result = await psStaticTask
      .find({ user_id: req.params.id })
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};
