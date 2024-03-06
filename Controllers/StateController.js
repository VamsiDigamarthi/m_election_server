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
  // console.log(req.params.state);
  const psModal = getDb().db().collection("ps_details");
  try {
    const result = await psModal
      .find({
        State: req.params.state,
      })
      .toArray();
    // console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const psDetailsFilterBasedOnDistrict = async (req, res) => {
  const psModal = getDb().db().collection("ps_details");
  // console.log(req.body.selectedDist);
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
    // console.log(result);
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
        secondAccepted: "no",
        thirdAccepted: "no",
        fouthAccepted: "no",
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

export const staticTaskAccepted = async (req, res) => {
  const psStaticTask = getDb().db().collection("district_task");
  // console.log(req.params.id);
  try {
    await psStaticTask.updateOne(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $set: {
          secondAccepted: "yes",
          thirdAccepted: "yes",
          fouthAccepted: "yes",
        },
      }
    );
    res.status(200).json({ msg: "Accepted Task ....!" });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const staticTaskRejected = async (req, res) => {
  const psStaticTask = getDb().db().collection("district_task");

  try {
    await psStaticTask.updateOne(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $set: { secondAccepted: "yes" },
      }
    );
    res.status(200).json({ msg: "Rejected Task ....!" });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const allDistrictCoorSpecificState = async (req, res) => {
  // console.log(req.params.state);
  const userModal = getDb().db().collection("users");
  try {
    const result = await userModal
      .find({
        $and: [{ state: req.params.state }, { role: "2" }],
      })
      .toArray();

    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const onSecondTimeAccepted = async (req, res) => {
  const psStaticTask = getDb().db().collection("district_task");
  // console.log(req.params.id);
  try {
    await psStaticTask.updateOne(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $set: { fouthAccepted: "yes", thirdAccepted: "yes" },
      }
    );
    res.status(200).json({ msg: "Rechecking Document Rejected ....!" });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const recheckingDocumentBasedOnId = async (req, res) => {
  const psStaticTask = getDb().db().collection("district_task");
  // console.log(req.params.id);
  try {
    await psStaticTask.updateOne(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $set: { thirdAccepted: "no" },
      }
    );
    res.status(200).json({ msg: "Rechecking Document Rejected ....!" });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};
