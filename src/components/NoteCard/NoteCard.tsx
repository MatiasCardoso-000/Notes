import { CiTrash } from "react-icons/ci";
import { FaPencilAlt } from "react-icons/fa";
import { BsPinAngleFill } from "react-icons/bs";
import { useNotes } from "../../hooks/useNotes";
import { useState, type Dispatch, type SetStateAction } from "react";

interface NoteCardProps {
  title: string;
  content: string;
  id?: string;
  colorNote: string;
  setNoteId: Dispatch<SetStateAction<string>>;
  setOpenEditor: Dispatch<SetStateAction<boolean>>;
  openEditor: boolean;
}

const NoteCard = ({
  title,
  content,
  id,
  colorNote,
  setNoteId,
  setOpenEditor,
  openEditor,
}: NoteCardProps) => {
  const { deleteNote, setEditingNote } = useNotes();
  const [isPinned, setIsPinned] = useState<boolean>(false);

  const handlePinnedNote = () => {
    setIsPinned(!isPinned)
  }


  return (
    <>
      <div
        className={`relative shadow-md hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col border-l-4 border-transparent hover:border-blue-500 ${
          colorNote ? `bg-${colorNote}-200` : "yellow"
        }`}
      >
        <button onClick={handlePinnedNote}>
          <BsPinAngleFill
            className={`absolute top-2 right-2  ${isPinned ?" text-black" : "text-gray-400"} `}
            size={20}
          />
        </button>
        <h3 className="text-xl font-bold text-gray-800 truncate mb-2">
          {title}
        </h3>
        <p className="text-gray-600 flex-grow mb-4">{content}</p>
        <div className="flex gap-2 justify-end mt-auto transition-opacity duration-300">
          <button
            onClick={() => id && deleteNote(id)}
            className="p-2 rounded-full  text-red-500 transition-colors cursor-pointer"
          >
            <CiTrash size={20} />
          </button>
          <button
            onClick={() => {
              setOpenEditor(!openEditor);
              setNoteId(id as string);
              setEditingNote({
                title,
                content,
                id: id as string,
                colorNote: colorNote,
              });
            }}
            className="p-2 rounded-full   hover:text-shadow-zinc-900 transition-colors cursor-pointer"
          >
            <FaPencilAlt size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

export default NoteCard;
