import { createContext } from "react";
import type { Note } from "../../types/notes.type";

interface NotesContextType {
  notes: Note[];
  storageNotes: Note[];
  addNotes: (note:Note) => void;
  editNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  editingNote: Note | null;
  setEditingNote: (editingNote:Note) => void;
}

export const NotesContext = createContext<NotesContextType>({
  notes: [],
  storageNotes: [],
  addNotes: () => {},
  editNote: () => {},
  deleteNote: () => {},
  editingNote: {} as Note,
  setEditingNote: () => {},
});
