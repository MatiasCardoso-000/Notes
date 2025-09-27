import { useContext } from "react";
import { NotesContext } from "../Context/Notes/NotesContext";

export const useNotes = () => {
  const context = useContext(NotesContext);

  if (!context) {
    throw new Error("useNotes must be within a provider");
  }

  return context;
};
