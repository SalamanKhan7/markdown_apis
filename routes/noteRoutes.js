
import { Router } from 'express';
import { createNote, listNotes, renderMarkdown } from '../controllers/noteController.js';



const router = Router();

router.post("/", createNote);
router.get("/", listNotes);
router.get("/:id/render", renderMarkdown);

export default router;