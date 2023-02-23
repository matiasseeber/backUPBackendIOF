import express from 'express';
import { getAllOrganizations, getOrganizationById } from '../controllers/controllerOrganizations.js';

const router = express.Router();

router.route("/")
    .get(getAllOrganizations);

router.route("/:id")
    .get(getOrganizationById);

export default router;