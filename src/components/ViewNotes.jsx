import { useState } from "react";
import { NavLink } from "react-router-dom";
import useNotes from "../hooks/useNotes";
import useToast from "../hooks/useToast.jsx";
import { deleteNote, createNewNote } from "../controllers/controllers";

export default function ViewNotes() {
  const { notes, setNotes, loading, error, refreshNotes } = useNotes();
  const { showUndo, showError } = useToast();

  const handleDelete = async (id) => {
    try {
      const deletedNote = await deleteNote(id);
      await refreshNotes(); // Refresh notes list after deletion

      showUndo(`Note "${deletedNote.title}" deleted`, async () => {
        try {
          const restoredNote = createNewNote(
            deletedNote.title,
            deletedNote.note
          );
          await refreshNotes(); // Refresh notes list after restoration
        } catch (err) {
          showError(`Failed to restore note: ${err.message}`);
        }
      });
    } catch (err) {
      showError(`Failed to delete note: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4">
        <div className="text-red-500">Error: {error}</div>
        <button
          onClick={refreshNotes}
          className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition"
        >
          Retry Loading Notes
        </button>
      </div>
    );
  }

  if (notes.length === 0) {
    return <div className="text-gray-500">No Notes</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="flex flex-col gap-2 border-2 rounded-lg p-4"
        >
          <p className="font-medium">{note.title}</p>
          <div className="flex gap-3">
            <NavLink
              to={`/notes/${note.id}`}
              className="bg-purple-600 text-white p-1 px-3 rounded-lg hover:bg-purple-700 transition"
              aria-label={`View note ${note.title}`}
            >
              View
            </NavLink>
            <NavLink
              to={`/notes/${note.id}/update`}
              className="bg-purple-600 text-white p-1 px-3 rounded-lg hover:bg-purple-700 transition"
              aria-label={`Update note ${note.title}`}
            >
              Update
            </NavLink>
            <button
              onClick={() => handleDelete(note.id)}
              className="bg-red-500 text-white p-1 px-3 rounded-lg hover:bg-red-600 transition"
              aria-label={`Delete note ${note.title}`}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
