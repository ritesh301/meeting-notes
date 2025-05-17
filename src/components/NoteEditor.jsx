import { createNewNote, updateNote, getNote } from "../controllers/controllers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { setTitle, setNote, resetCurrent } from "../redux/notesSlice";
import useToast from "../hooks/useToast";
import NoteForm from "./NoteForm";

export default function NoteEditor() {
  const dispatch = useDispatch();
  const { notesId } = useParams();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const title = useSelector(state => state.notes.current.title);
  const note = useSelector(state => state.notes.current.note);

  useEffect(() => {
    if (notesId) {
      try {
        const noteData = getNote(notesId);
        dispatch(setTitle(noteData.title));
        dispatch(setNote(noteData.note));
      } catch (err) {
        showError(err.message);
        navigate("/", { replace: true });
      }
    } else {
      dispatch(resetCurrent());
    }
  }, [notesId, dispatch]);

  async function handleSubmit() {
    if (title.trim() === "" || note.trim() === "") {
      showError("Title and note cannot be empty");
      return;
    }

    try {
      if (notesId) {
        await updateNote(notesId, title, note);
        showSuccess(`Note "${title}" Updated`);
        navigate(`/notes/${notesId}`);
      } else {
        const newNote = await createNewNote(title, note);
        showSuccess(`New Note "${title}" Created`);
        dispatch(resetCurrent());
        navigate(`/notes/${newNote.id}`);
      }
    } catch (err) {
      showError(err.message);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <NoteForm
        title={title}
        setTitle={(val) => dispatch(setTitle(val))}
        note={note}
        setNote={(val) => dispatch(setNote(val))}
      />
      <div className="flex justify-end">
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
