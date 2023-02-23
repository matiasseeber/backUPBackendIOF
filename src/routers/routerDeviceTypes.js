import express from "express";
import { getAllDeviceTypes } from "../controllers/controllerDeviceTypes.js";

const router = express.Router();

router.route("/")
    .get(getAllDeviceTypes)

export default router;