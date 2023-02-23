import express from "express";
import { getAllDeviceNetTypes } from "../controllers/controllerDevicesNetTypes.js";

const router = express.Router();

router.route("/")
    .get(getAllDeviceNetTypes)

export default router;