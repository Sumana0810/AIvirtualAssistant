// backend/routes/aiRoutes.js
import express from 'express';
import { askToAssistant } from '../controllers/aiController.js';

const router = express.Router();

// POST /api/ai/chat
router.post('/chat', askToAssistant);

export default router;