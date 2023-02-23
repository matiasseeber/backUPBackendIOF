import express from "express";
import { getMeasurementsByEUI } from "../controllers/controllerMeasurements.js";

const router = express.Router();

router.route("/:eui")
    .get(getMeasurementsByEUI)

export default router;