// import OTPModel from "../Modals/OtpModal.js";
// import UserModel from "../Modals/UserModal.js";

import { getDb } from "../Database/mongoDb.js";

export const signUp = async (req, res) => {
  // const { mandal } = req.body;
  // console.log(mandal);
  const userModal = getDb().db().collection("users");
  let mandals = req.body.mandal;
  mandals = mandals.toString().toLowerCase();
  try {
    const doc = {
      state: req.body.state,
      district: req.body.dist,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      phonepe: req.body.phonepe,
      address: req.body.address,
      voteridnumber: req.body.voteridnumber,
      adharnumber: req.body.adharnumber,
      voteridurl: req.body.voterIdImage,
      adharidurl: req.body.adharIdImage,
      mandal: mandals,
      password: req.body.password,
      role: req.body.role,
      score: "",
      pay_mode_admin: "false",
      pay_mode_user: "false",
      payment_text_user: "false",
      assign_task: "no",
    };
    await userModal.insertOne(doc);
    return res.status(200).json({
      resp: true,
      msg: "Registration Successfully ..!",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const login = async (req, res) => {
  // console.log(req.body.phone);
  const userModal = getDb().db().collection("users");
  try {
    const result = await userModal.findOne({ phone: req.body.phone });
    if (result) {
      // console.log(result);
      return res.status(200).json(result);
    } else {
      return res.status(500).json({ msg: "User Does't Exist" });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};
//
//
//
//
//
export const sendOtp = async (req, res) => {
  const { phone } = req.body;
  getDb()
    .db()
    .collection("users")
    .findOne({
      phone,
    })
    .then((user) => {
      if (user) {
        return res.status(500).json({
          resp: true,
          msg: "User Already Exist",
        });
      } else {
        getDb()
          .db()
          .collection("otp")
          .findOne({ phone: phone })
          .then((otpUser) => {
            if (otpUser) {
              var otp = Math.floor(1000 + Math.random() * 9000);
              fetch(
                `https://pgapi.vispl.in/fe/api/v1/multiSend?username=btrak.trans&password=H6pxA&unicode=false&from=BTRACK&to=91${phone}&dltPrincipalEntityId=1201159541316676305&dltContentId=1207161517681422152&text=Dear Maruthi Your OTP is. ${otp} Regards, Brihaspathi Technologies`
              )
                .then(() => {
                  getDb()
                    .db()
                    .collection("otp")
                    .updateOne({ phone: phone }, { $set: { otp_value: otp } })
                    .then(() => {
                      return res
                        .status(200)
                        .json({ msg: "otp send updated db" });
                    })
                    .catch((err) => {
                      return res.status(500).json({
                        msg: err,
                      });
                    });
                })
                .catch((err) =>
                  console.log("otp  sending existing user some err")
                );
            } else {
              var otp = Math.floor(1000 + Math.random() * 9000);
              const doc = { phone: phone, otp_value: otp };
              fetch(
                `https://pgapi.vispl.in/fe/api/v1/multiSend?username=btrak.trans&password=H6pxA&unicode=false&from=BTRACK&to=91${phone}&dltPrincipalEntityId=1201159541316676305&dltContentId=1207161517681422152&text=Dear Maruthi Your OTP is. ${otp} Regards, Brihaspathi Technologies`
              )
                .then(() => {
                  getDb()
                    .db()
                    .collection("otp")
                    .insertOne(doc)
                    .then(() => {
                      return res.status(200).json({ msg: "otp send" });
                    })
                    .catch((err) => {
                      return res.status(500).json({
                        msg: err,
                      });
                    });
                })
                .catch((err) =>
                  console.log("otp  sending existing user some err")
                );
            }
          })
          .catch((err) => {
            return res.status(500).json({ msg: err });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: err });
    });
};

// verify otp when sign in
export const verifyOtp = async (req, res) => {
  let mandals = req.body.mandal;
  mandals = mandals.toLowerCase();

  const {
    phone,
    name,
    email,
    state,
    dist,
    address,
    phonepe,
    voteridnumber,
    adharnumber,
    voterIdImage,
    adharIdImage,
    password,
    otp,
    role,
  } = req.body;

  // const { phone, otp } = req.body;

  const otoModal = getDb().db().collection("otp");

  const userModal = getDb().db().collection("users");

  const result = await otoModal.findOne({ phone: phone });
  if (result) {
    if (result.otp_value.toString() === otp) {
      const doc = {
        state: state,
        district: dist,
        name: name,
        email: email,
        phone: phone,
        phonepe: phonepe,
        address: address,
        voteridnumber: voteridnumber,
        adharnumber: adharnumber,
        voteridurl: voterIdImage,
        adharidurl: adharIdImage,
        mandal: mandals,
        password: password,
        role: role,
        score: "",
        pay_mode_admin: "false",
        pay_mode_user: "false",
        payment_text_user: "false",
        assign_task: "no",
      };

      await userModal.insertOne(doc);
      return res.status(200).json({
        resp: true,
        msg: "Registration Successfully ..!",
      });
      // INSERT USERS DATA
    } else {
      return res.status(500).json({
        msg: "Otp Invalid",
      });
    }
  } else {
    return res.status(500).json({
      msg: "User Not Found",
    });
  }
};

export const loginOtp = async (req, res) => {
  const { phone } = req.body;

  const otoModal = getDb().db().collection("otp");
  const userModal = getDb().db().collection("users");

  const existUser = await userModal.findOne({ phone: phone });
  if (existUser) {
    // console.log(existUser);
    var otp = Math.floor(1000 + Math.random() * 9000);
    fetch(
      `https://pgapi.vispl.in/fe/api/v1/multiSend?username=btrak.trans&password=H6pxA&unicode=false&from=BTRACK&to=91${phone}&dltPrincipalEntityId=1201159541316676305&dltContentId=1207161517681422152&text=Dear Maruthi Your OTP is. ${otp} Regards, Brihaspathi Technologies`
    )
      .then(() => {
        otoModal
          .updateOne({ phone: phone }, { $set: { otp_value: otp } })
          .then(() => {
            return res.status(200).json({ msg: "otp send updated db" });
          })
          .catch((err) => {
            return res.status(500).json({
              msg: err,
            });
          });
      })
      .catch((e) => console.log(e));
  } else {
    return res.status(500).json({ msg: "User Does't Exist" });
  }
};

export const loginVerifyOtp = async (req, res) => {
  const { phone, otp } = req.body;
  const otoModal = getDb().db().collection("otp");
  const userModal = getDb().db().collection("users");
  const result = await otoModal.findOne({ phone: phone });

  if (result) {
    // send user data
    if (result.otp_value.toString() === otp) {
      const user = await userModal.findOne({ phone: phone });
      return res.status(200).json(user);
    } else {
      return res.status(500).json({
        msg: "Otp Invalid",
      });
    }
  }
};
