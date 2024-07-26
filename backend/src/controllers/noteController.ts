import { Request, Response } from "express";
import { NoteService } from "../services/noteService";

export class NoteController {
  static async getNotes(req: Request, res: Response) {
    try {
      const notes = await NoteService.getAllNotes();
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch notes" });
    }
  }

  static async saveNote(req: Request, res: Response) {
    try {
      const { content } = req.body;
      await NoteService.createNote(content);
      res.status(201).json({ message: "Note created" });
    } catch (error) {
      res.status(500).json({ error: "Failed to save note" });
    }
  }

  static async deleteNote(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await NoteService.deleteNote(Number(id));
      res.status(200).json({ message: "Note deleted" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete note" });
    }
  }
}
