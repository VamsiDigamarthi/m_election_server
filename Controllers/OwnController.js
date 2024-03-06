import { getDb } from "../Database/mongoDb.js";

import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

export const onGetAllStatepsDetails = async (req, res) => {
  const psModal = getDb().db().collection("ps_details");
  // console.log("cvbnm,.");
  try {
    const result = await psModal.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const deleteSpecificStateAndDistrictPSs = async (req, res) => {
  const psModal = getDb().db().collection("ps_details");
  try {
    await psModal.deleteMany({
      State: req.params.state,
      District: req.params.district,
    });
    res.status(200).json({ msg: "Records Deleted ....!" });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};
