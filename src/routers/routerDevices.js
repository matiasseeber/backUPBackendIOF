import express from "express";
import { getAllDevices } from "../controllers/controllerDevices.js";

const router = express.Router();

router.route("/")
    .get(getAllDevices)

export default router;