import { Router } from 'express';
import {checkGrammar} from '../controllers/grammarController.js';

const router = Router();

router.post("/check", checkGrammar);

export default router