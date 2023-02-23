import express from "express";
import { getAllDeviceStates } from "../controllers/controllerDeviceStates.js";

const router = express.Router();

router.route("/")
    .get(getAllDeviceStates)

export default router;