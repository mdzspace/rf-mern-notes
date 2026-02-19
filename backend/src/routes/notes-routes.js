import express from "express";
import { createNote, deleteNote, getNoteById, getAllNotes, updateNote } from "../controllers/notes-controllers.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

// It used to look like this without the controllers:
// router.get("/", (req, res) => {
//     res.status(200).send("You have fetched dizz notes!");
// })

export default router;