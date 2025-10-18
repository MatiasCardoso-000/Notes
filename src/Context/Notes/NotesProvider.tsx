import { useEffect, useState } from "react";
import { NotesContext } from "./NotesContext";
import type { Note } from "../../types/notes.type";

interface NotesProviderProps {
  children: React.ReactNode;
}

export const NotesProvider = ({ children }: NotesProviderProps) => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const addNotes = (note: Note) => {
    if (!note.title) {
      alert("Debe agregar un titulo para la nota.");
      return;
    }
    if (!note.content) {
      alert("Debe agregar un contenido para la nota.");
      return;
    }

    if (notes.some((n) => n.title === note.title)) {
      alert("Ya existe una nota con este titulo.");
      return;
    }

    setNotes((prevNotes) => [...prevNotes, note]);
  };

  const editNote = (note: Note) => {
    const notesUpdated = notes.map((n) => {
      if (n.id === note.id) {
        return note;
      }
      return n;
    });
    setNotes(notesUpdated);
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const deleteNote = (id: string) => {
    const notesUpdated = notes.filter((n) => n.id !== id);
    setNotes(notesUpdated);
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        addNotes,
        editNote,
        deleteNote,
        editingNote,
        setEditingNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
