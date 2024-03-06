import express from "express";
import {
  downloadCertificate,
  kiStartImgUpload,
  onCompletedCertificateKitFit,
  onInstallationCertificateAndImage,
  rejectedTasks,
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

router.put("/rejected/all/task/:id", rejectedTasks);

router.put("/kit-start-image/upload/:id", kiStartImgUpload);

router.put(
  "/installation-certificate-image/:id",
  onInstallationCertificateAndImage
);

router.put(
  "/completed-certificate-kit-fitting-img/:id",
  onCompletedCertificateKitFit
);

router.put("/download-certificate/:id", downloadCertificate);

export default router;
