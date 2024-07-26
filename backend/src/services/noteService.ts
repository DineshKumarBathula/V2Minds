import { db } from "../config";
import { Note } from "../models/noteModel";
import { RowDataPacket } from "mysql2";

export class NoteService {
  static async getAllNotes(): Promise<Note[]> {
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM notes");
    return rows as Note[];
  }

  static async createNote(content: string): Promise<void> {
    await db.query("INSERT INTO notes (content) VALUES (?)", [content]);
  }

  static async deleteNote(id: number): Promise<void> {
    await db.query("DELETE FROM notes WHERE id = ?", [id]);
  }
}
