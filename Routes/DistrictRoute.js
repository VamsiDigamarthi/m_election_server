import express from "express";
import {
  addRejectedTask,
  addTaskToUser,
  districtCoorPsAcDetailsUsingDropdown,
  exelData,
  notAssignMandalWiseUser,
  paymentInitiatedToUser,
  paymentNotReceviedUser,
  rechechingOnesWithId,
  rejectedAllTaskFromUser,
  rejectedTaskDistrictBased,
  updatedOwnDistrictTask,
  userGetScoreGreaterThanEight,
  usersNotAssignTaskMandalwise,
} from "../Controllers/DistrictController.js";
const router = express.Router();

router.get(
  "/district-coor-ps-ac-number/:district",
  districtCoorPsAcDetailsUsingDropdown
);

router.put("/update/own/task/:id/task/:taskId", updatedOwnDistrictTask);

router.get("/score-user/:district", userGetScoreGreaterThanEight);

router.post("/users/notassigntask/mandalwise", usersNotAssignTaskMandalwise);

router.get(
  "/users/notassigntask/butnotassign/mandal/:district",
  notAssignMandalWiseUser
);

router.post("/add-task-user/:id/name/:name/phone/:phone", addTaskToUser);

router.post("/payment-mode-admin-update/:id", paymentInitiatedToUser);

router.get("/rejected/tasks/district/:district", rejectedAllTaskFromUser);

router.get("/payment/not/received/:district", paymentNotReceviedUser);

router.post(
  "/add-rejected-task-user/:id/name/:name/phone/:phone",
  addRejectedTask
);

router.get("/rejected-task-data/:district", rejectedTaskDistrictBased);

// rechecking

router.put("/rechecking/ones/:id", rechechingOnesWithId);

// Exel Data

router.get("/exeldata/:district", exelData);

export default router;
