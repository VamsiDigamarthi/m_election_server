import express from "express";
import {
  deleteSpecificStateAndDistrictPSs,
  onGetAllStatepsDetails,
} from "../Controllers/OwnController.js";

const router = express.Router();

router.get("/allstates/ps/details", onGetAllStatepsDetails);

router.delete(
  "/all/delete/state/:state/district/:district",
  deleteSpecificStateAndDistrictPSs
);

export default router;
