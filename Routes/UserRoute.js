import express from "express";
import {
  kiStartImgUpload,
  onCompletedCertificateKitFit,
  onInstallationCertificateAndImage,
  scoreDataWheneUserOpenLearning,
  updateScoreOfUser,
  updateTask,
  userFetchTask,
  userGetOwnProfile,
  userProfileUpdate,
} from "../Controllers/UserController.js";
const router = express.Router();

router.get("/user-get-profile/:id", userGetOwnProfile);

router.put("/update-profile/:id", userProfileUpdate);

router.get("/only-score/:id", scoreDataWheneUserOpenLearning);

router.put("/update-score/:id", updateScoreOfUser);

router.get("/fetch-task/:id", userFetchTask);

router.put("/update-task/:id", updateTask);

router.put("/kit-start-image/upload/:id", kiStartImgUpload);

router.put(
  "/installation-certificate-image/:id",
  onInstallationCertificateAndImage
);

router.put(
  "/completed-certificate-kit-fitting-img/:id",
  onCompletedCertificateKitFit
);

export default router;
