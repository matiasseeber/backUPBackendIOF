import express from "express";
import { getAllLocalities, getLocalityByMunicipalitiesId } from "../controllers/controllerLocalities.js";

const router = express.Router();

router.route("/")
    .get(getAllLocalities)

router.route("/:id")
    .get(getLocalityByMunicipalitiesId)

export default router;