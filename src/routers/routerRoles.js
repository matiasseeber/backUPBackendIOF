import express from "express";
import { getAllRoles } from "../controllers/controllerRoles.js";

const router = express.Router();

router.route("/")
    .get(getAllRoles)

export default router;