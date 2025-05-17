import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createNewNote, updateNote, getNote } from "../controllers/controllers";
import NoteForm from "./NoteForm";
import useToast from "../hooks/useToast.jsx";

export default function NoteEditor() {
  const { notesId } = useParams();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (notesId) {
      setLoading(true);
      try {
        const noteData = getNote(notesId);
        setTitle(noteData.title);
        setNote(noteData.note);
      } catch (err) {
        showError(err.message);
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    }
  }, [notesId, navigate, showError]);

  async function handleSubmit() {
    try {
      if (title.trim() === "" || note.trim() === "") {
        showError("Title and note cannot be empty");
        return;
      }

      if (notesId) {
        await updateNote(notesId, title, note);
        showSuccess(`Note "${title}" Updated`);
        navigate(`/notes/${notesId}`);
      } else {
        const newNote = await createNewNote(title, note);
        showSuccess(`New Note "${title}" Created`);
        setTitle("");
        setNote("");
        navigate(`/notes/${newNote.id}`);
      }
    } catch (err) {
      showError(err.message);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <NoteForm
        title={title}
        setTitle={setTitle}
        note={note}
        setNote={setNote}
      />
      <div className="flex justify-end ">
        <button
          className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition"
          onClick={handleSubmit}
          aria-label={notesId ? "Update note" : "Create note"}
        >
          {notesId ? "Update Note" : "Create Note"}
        </button>
      </div>
    </div>
  );
}
