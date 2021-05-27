/** @module Routes/SearchRoutes */
import { Router } from 'express';
import {
    sendSearchResults,
    sendPopularTags,
} from '../controllers/search-controllers.js';

const router = Router();

router.get('/', sendSearchResults);
router.get('/tags', sendPopularTags);

export default router;
