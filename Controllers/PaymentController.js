import mongodb from "mongodb";
import { getDb } from "../Database/mongoDb.js";

const ObjectId = mongodb.ObjectId;

export const initialPaymentAdminInitiatedDetails = async (req, res) => {
  const userModal = getDb().db().collection("users");
  try {
    const result = await userModal.findOne(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        projection: {
          pay_mode_admin: 1,
          pay_mode_user: 1,
          payment_text_user: 1,
        },
      }
    );
    //   .project({ pay_mode_admin: 1, pay_mode_user: 1, payment_text_user: 1 });
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const onPaymentModeAccepted = async (req, res) => {
  const userModal = getDb().db().collection("users");
  try {
    await userModal.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          pay_mode_user: req.body.paymentmode,
          payment_text_user: req.body.paymentText,
        },
      }
    );
    res.status(200).json("Payment Details Updated Successfully ...!");
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const paymnetNotReceived = async (req, res) => {
  const userModal = getDb().db().collection("users");
  // console.log(req.body);
  // console.log(req.params.id);
  try {
    await userModal.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          pay_mode_user: req.body.paymentuserMode,
          payment_text_user: req.body.paymentText,
        },
      }
    );
    res.status(200).json("Your Complaint Accepted ");
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const paymentModeConfirm = async (req, res) => {
  // console.log("dfvgbhjkml;");
  const userModal = getDb().db().collection("users");
  try {
    await userModal.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: { pay_mode_user: req.body.paymentuserMode },
      }
    );
    res.status(200).json("Your Complaint Accepted ");
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};
