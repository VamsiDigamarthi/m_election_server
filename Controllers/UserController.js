import mongodb from "mongodb";
import { getDb } from "../Database/mongoDb.js";

const ObjectId = mongodb.ObjectId;

export const userGetOwnProfile = async (req, res) => {
  const userModal = getDb().db().collection("users");
  try {
    const user = await userModal.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(500).json({ msg: "user not found" });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const userProfileUpdate = async (req, res) => {
  const userModal = getDb().db().collection("users");

  try {
    await userModal.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          name: req.body.username,
          phone: req.body.phone,
          phonepe: req.body.phonepe,
          address: req.body.address,
        },
      }
    );
    res.status(200).json({
      resp: true,
      msg: "updates user successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const scoreDataWheneUserOpenLearning = async (req, res) => {
  const userModal = getDb().db().collection("users");

  try {
    const result = await userModal.findOne({
      _id: new ObjectId(req.params.id),
    });
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const updateScoreOfUser = async (req, res) => {
  const userModal = getDb().db().collection("users");
  try {
    await userModal.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { score: req.body.score } }
    );
    res.status(200).json({
      resp: true,
      msg: "updates the Score details",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const userFetchTask = async (req, res) => {
  const userModal = getDb().db().collection("tasks");
  try {
    const result = await userModal.find({ user_id: req.params.id }).toArray();
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

const onUpdatePsDetailsRejectedUser = async (req, res) => {
  const psModal = getDb().db().collection("ps_details");
  try {
    await psModal.updateOne(
      { _id: new ObjectId(req.body.taskId) },
      {
        $set: { eassign: "rejected" },
      }
    );
    res.status(200).json("updated task successfully ...!");
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const updateTask = async (req, res) => {
  const taskModal = getDb().db().collection("tasks");
  console.log(req.body);
  try {
    await taskModal.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { action: req.body.action } }
    );
    onUpdatePsDetailsRejectedUser(req, res);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const kiStartImgUpload = async (req, res) => {
  const taskModal = getDb().db().collection("tasks");
  try {
    await taskModal.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: { kit_start: req.body.image },
      }
    );
    res.status(200).json("image uploaded successfully...!");
  } catch (error) {
    return res.status(500).json({
      msg: "something went wrong please try again ....",
    });
  }
};

export const onInstallationCertificateAndImage = async (req, res) => {
  const taskModal = getDb().db().collection("tasks");
  try {
    await taskModal.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          InstallationCertificate: req.body.instaCer,
          installationImage: req.body.instaImg,
        },
      }
    );
    res.status(200).json("image uploaded successfully...!");
  } catch (error) {
    return res.status(500).json({
      msg: "something went wrong please try again ....",
    });
  }
};

export const onCompletedCertificateKitFit = async (req, res) => {
  const taskModal = getDb().db().collection("tasks");
  try {
    await taskModal.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          CompletedCertificate: req.body.completedCer,
          kit_end: req.body.kitFit,
        },
      }
    );
    res.status(200).json("image uploaded successfully...!");
  } catch (error) {
    return res.status(500).json({
      msg: "something went wrong please try again ....",
    });
  }
};

export const downloadCertificate = async (req, res) => {
  const userModal = getDb().db().collection("users");
  // console.log(req.body.data);
  try {
    await userModal.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          download_cer: req.body.data,
        },
      }
    );
    res.status(200).json("download certificated successfully ...!");
  } catch (error) {
    return res.status(500).json({
      msg: "something went wrong please try again ....",
    });
  }
};
