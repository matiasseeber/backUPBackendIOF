import express from 'express';
import { getSilobags } from '../controllers/controllerSilobags.js';

const router = express.Router();

router.route("/")
    .get(getSilobags);

router.route("/:id")
    .get(getSilobags);

export default router;