/** @module Routes/FileRoutes */
import { Router } from 'express';
import { sendSingleFile } from '../controllers/file-controllers.js';

const router = Router();

router.get('/:user/:filename', sendSingleFile);

export default router;
