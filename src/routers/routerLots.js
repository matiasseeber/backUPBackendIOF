import express from "express";
import { getAllLots } from "../controllers/controllerLots.js";

const router = express.Router();

router.route("/")
    .get(getAllLots)

export default router;