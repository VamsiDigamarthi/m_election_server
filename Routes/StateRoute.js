import express from "express";
import {
  allDelete,
  allDistrictCoorSpecificState,
  allPsDetails,
  assignTaskDistrictCoor,
  bulkUpload,
  districtCoorTask,
  districtCoordinatorShowStateCoordinator,
  onSecondTimeAccepted,
  psDetailsFilterBasedOnDistrict,
  recheckingDocumentBasedOnId,
  staticTaskAccepted,
  staticTaskRejected,
} from "../Controllers/StateController.js";
const router = express.Router();

router.post("/bulk-upload", bulkUpload);
router.get("/all-ps-details-fetch-super-admin/:state", allPsDetails);

router.post("/header-apply-btn-click-psc-data", psDetailsFilterBasedOnDistrict);

router.get(
  "/fetch-district-coordinator/:district/state/:state",
  districtCoordinatorShowStateCoordinator
);

router.post("/assign/task/district/coor/:id", assignTaskDistrictCoor);

router.get("/distrci/task/:id", districtCoorTask);

router.get("/delete/all", allDelete);

router.put("/statictask/accepted/:id", staticTaskAccepted);

router.put("/statictask/rejected/:id", staticTaskRejected);

// second time accepted

router.put("/second/time/accepted/:id", onSecondTimeAccepted);

router.put("/rechecking/documents/:id", recheckingDocumentBasedOnId);

router.get("/all/district/coordinator/:state", allDistrictCoorSpecificState);

export default router;
