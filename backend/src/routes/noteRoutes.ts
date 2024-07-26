import express, { Request, Response } from "express";
import mysql from "mysql2/promise";

const router = express.Router();
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "DineshMYSQL123",
  database: "examtasks",
});
router.delete("/notes/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await db.execute("DELETE FROM notes WHERE id = ?", [id]);
    res.status(204).end(); // No content
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Failed to delete note" });
  }
});

router.get("/notes", async (req: Request, res: Response) => {
  try {
    const [rows] = await db.execute("SELECT * FROM notes");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

router.post("/notes", async (req: Request, res: Response) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO notes (content) VALUES (?)",
      [content]
    );
    res.status(201).json({ id: (result as any).insertId, content });
  } catch (error) {
    console.error("Error saving note:", error);
    res.status(500).json({ error: "Failed to save note" });
  }
});

export default router;
