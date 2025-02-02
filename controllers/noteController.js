import Note from "../models/Note.js";
import MarkdownIt from "markdown-it";
import { marked } from 'marked';


const md = new MarkdownIt();

export const createNote = async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: " content is required" });

  try {
    const note = await Note.create({ content });
    res.status(201).json({message:"Note created successfully", note});
  } catch (err) {
    res.status(500).json({ error: "Failed to save note" });
  }
};

export const listNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve notes" });
  }
};

export const renderMarkdown = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    res.send({ content: note.content,html: marked(note.content) });
  } catch (err) {
    res.status(500).json({ error: "Failed to render markdown" });
  }
};
