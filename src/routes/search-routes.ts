/** @module Routes/SearchRoutes */
import { Router } from 'express';
import { sendSearchResults } from '../controllers/search-controllers.js';

const router = Router();

router.get('/', sendSearchResults);

export default router;
