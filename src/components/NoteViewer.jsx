import { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import NoteForm from "./NoteForm";
import useToast from "../hooks/useToast.jsx";
import { getNote } from "../controllers/controllers";

export default function NoteViewer() {
  const { notesId } = useParams();
  const navigate = useNavigate();
  const { showError } = useToast();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!notesId) {
      navigate("/", { replace: true });
      return;
    }
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
  }, [notesId, navigate, showError]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col justify-between items-center">
        <NoteForm
          title={title}
          setTitle={setTitle}
          note={note}
          setNote={setNote}
          readOnly
        />
        <NavLink
          className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition"
          to="update"
          aria-label="Update note"
        >
          Update Note
        </NavLink>
      </div>
    </div>
  );
}
