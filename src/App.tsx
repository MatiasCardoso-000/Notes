import { useState } from "react";
import NotesList from "./components/NotesList/NotesList";
import { useNotes } from "./hooks/useNotes";

const App = () => {
  const { addNotes } = useNotes();
  const [colorNote, setColorNote] = useState("")


  const handleColorNote = (e: React.MouseEvent<HTMLInputElement> ) => {
    const colorValue = e.currentTarget.value
    
    setColorNote(colorValue)
  }


  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    addNotes({ title, content, id: crypto.randomUUID(),colorNote });
    e.currentTarget.reset();
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <header className="bg-white shadow-md">
          <div className="container mx-auto p-4">
            <h1 className="text-center text-4xl font-bold text-blue-600">
              Notes App
            </h1>
          </div>
        </header>
        <div className="container mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8 items-start">
          {/* Columna para el formulario de agregar notas */}
          <aside className="w-full md:w-1/3 lg:w-1/4 md:sticky md:top-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Agregar Nota</h2>
              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Título de la nota..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <textarea
                  name="content"
                  className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Contenido de la nota..."
                />
                <div>
                  <p>Pick a color</p>
                </div>
                 <ul>
                  <div className="flex">
                    <label htmlFor="yellow"  className="bg-yellow-200 w-full h-8 block  hover:shadow-md  trasition-shadow duration-300 hover:cursor-pointer my-2">
                      <li
                        value="yellow"
                       
                        aria-controls="option"
                      ></li>
                    </label>
                    <input type="checkbox" id="yellow" value='yellow' onClick={(e)=>handleColorNote(e)} hidden/>
                  </div>
                 <div className="flex">
                    <label htmlFor="blue"  className="bg-blue-200 w-full h-8 block  hover:shadow-md  trasition-shadow duration-300 hover:cursor-pointer my-2">
                      <li
                        value="blue"
                       
                        aria-controls="option"
                      ></li>
                    </label>
                    <input type="checkbox" id="blue" value='blue' onClick={(e)=>handleColorNote(e)} hidden/>
                  </div>
                <div className="flex">
                    <label htmlFor="violet"  className="bg-violet-200 w-full h-8 block  hover:shadow-md  trasition-shadow duration-300 hover:cursor-pointer my-2">
                      <li
                        value="violet"
                       
                        aria-controls="option"
                      ></li>
                    </label>
                    <input type="checkbox" id="violet" value='violet' onClick={(e)=>handleColorNote(e)} hidden />
                  </div>
                 <div className="flex">
                    <label htmlFor="orange"  className="bg-orange-200 w-full h-8 block  hover:shadow-md  trasition-shadow duration-300 hover:cursor-pointer my-2">
                      <li
                        value="orange"
                       
                        aria-controls="option"
                      ></li>
                    </label>
                    <input type="checkbox" id="orange" value='orange' onClick={(e)=>handleColorNote(e)} hidden/>
                  </div>
                </ul>

                <button className="w-full bg-blue-600 px-6 py-3 rounded-lg text-white font-semibold hover:bg-blue-700 cursor-pointer transition">
                  Guardar Nota
                </button>
              </form>
            </div>
          </aside>
          <main className="w-full md:wr-2/3 lg:w-3/4">
            <NotesList/>
          </main>
        </div>
      </div>
    </>
  );
};

export default App;
