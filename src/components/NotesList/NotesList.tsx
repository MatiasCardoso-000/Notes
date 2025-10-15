import {
  useId,
  useState,
  type FormEvent,
} from "react";
import { useNotes } from "../../hooks/useNotes";
import NoteCard from "../NoteCard/NoteCard";
import type { Note } from "../../types/notes.type";

const NotesList = () => {
  const { storageNotes, editingNote, editNote, setEditingNote } = useNotes();
  const [noteId, setNoteId] = useState("");
  const [openEditor, setOpenEditor] = useState(false);
  const [updatedColor, setUpdatedColor] = useState("");

  const yellowID = useId()
  const blueID = useId()
  const violetID = useId()
  const orangeID = useId()

  const handleUpdateColorNote = (e: React.MouseEvent<HTMLInputElement>) => {
    const colorValue = e.currentTarget.value;
    console.log(colorValue);

    setUpdatedColor(colorValue);
  };

  const editNotes = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("titleEdit") as string;
    const content = formData.get("contentEdit") as string;

    editNote({
      title,
      content,
      id: noteId,
      colorNote: updatedColor,
    });
  };

  return (
    <>
      {/* Formulario de Búsqueda */}
      <div className="mb-8">
        <form>
          <input
            type="search"
            name="search"
            placeholder="Buscar notas por título o contenido..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </form>
      </div>

      {/* Lista de Notas */}
      <div className="notes-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {storageNotes.map((note: Note) => (
          <NoteCard
            key={note.id}
            {...note}
            setNoteId={setNoteId}
            setOpenEditor={setOpenEditor}
            openEditor={openEditor}
          />
        ))}
      </div>
      <div
        className={
          openEditor && storageNotes.some((n) => n.id === noteId)
            ? " note-card shadow border-t-8 border-blue-500  px-4 py-6 mt-8 flex flex-col gap-3 cursor-pointer"
            : "hidden"
        }
      >
        <form
          className="flex flex-col justify-center gap-4"
          onSubmit={editNotes}
        >
          <input
            type="text"
            name="titleEdit"
            onChange={(e) =>
              setEditingNote({ ...editingNote!, title: e.target.value })
            }
            value={editingNote?.title}
            className="w-full max-w-md p-2 border border-gray-300 rounded-md"
          />
          <textarea
            maxLength={200}
            name="contentEdit"
            onChange={(e) =>
              setEditingNote({ ...editingNote!, content: e.target.value })
            }
            value={editingNote?.content}
            className="w-full max-w-md p-2 border border-gray-300 rounded-md pb-20 overflow-hidden"
          />

          <ul className="w-1/2">
            <div className="flex">
              <label
                htmlFor={yellowID}
                className="bg-yellow-200 w-full h-8 block  hover:shadow-md  trasition-shadow duration-300 hover:cursor-pointer my-2"
              >
                <li value="yellow" aria-controls="option"></li>
              </label>
              <input
                type="checkbox"
                id={yellowID}
                value="yellow"
                className="color"
                name="colorNote"
                onClick={(e) => handleUpdateColorNote(e)}
                hidden
              />
            </div>
            <div className="flex">
              <label
                htmlFor={blueID}
                className="bg-blue-200 w-full h-8 block  hover:shadow-md  trasition-shadow duration-300 hover:cursor-pointer my-2"
              >
                <li value="blue" aria-controls="option"></li>
              </label>
              <input
                type="checkbox"
                id={blueID}
                name="colorNote"
                value="blue"
                className="color"
                onClick={(e) => handleUpdateColorNote(e)}
                hidden
              />
            </div>
            <div className="flex">
              <label
                htmlFor={violetID}
                className="bg-violet-200 w-full h-8 block  hover:shadow-md  trasition-shadow duration-300 hover:cursor-pointer my-2"
              >
                <li value="violet" aria-controls="option"></li>
              </label>
              <input
                type="checkbox"
                id={violetID}
                name="colorNote"
                value="violet"
                className="color"
                onClick={(e) => handleUpdateColorNote(e)}
                hidden
              />
            </div>
            <div className="flex">
              <label
                htmlFor={orangeID}
                className="bg-orange-200 w-full h-8 block  hover:shadow-md  trasition-shadow duration-300 hover:cursor-pointer my-2"
              >
                <li value="orange" aria-controls="option"></li>
              </label>
              <input
                type="checkbox"
                id={orangeID}
                name="colorNote"
                value="orange"
                className="color"
                onClick={(e) => handleUpdateColorNote(e)}
                hidden
              />
            </div>
          </ul>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setOpenEditor(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cerrar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NotesList;
