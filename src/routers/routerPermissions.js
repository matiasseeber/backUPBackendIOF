import express from 'express';
import { getAllPermissions } from '../controllers/controllerPermissions.js';

const router = express.Router();

router.route("/")
    .get(getAllPermissions);

export default router;