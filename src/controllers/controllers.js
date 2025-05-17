import { v4 as uuidv4 } from "uuid";

function createNewNote(title, note) {
  if (title.trim() === "" || note.trim() === "") {
    throw new Error("Title and note cannot be empty");
  }

  let prevNotes;
  try {
    const storedNotes = localStorage.getItem("notes");
    prevNotes = storedNotes ? JSON.parse(storedNotes) : [];

    if (!Array.isArray(prevNotes)) {
      throw new Error("Stored notes is not an array");
    }
  } catch (e) {
    console.error("Error parsing notes from storage:", e);
    // Reset to empty array if corrupted
    prevNotes = [];
  }

  const newNote = {
    id: uuidv4(),
    title,
    note,
    createdAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem("notes", JSON.stringify([...prevNotes, newNote]));
  } catch (e) {
    console.error("Error saving to localStorage:", e);
    throw new Error("Failed to save note. Storage may be full.");
  }

  return newNote;
}

function updateNote(id, newTitle, newNoteContent) {
  if (newTitle.trim() === "" || newNoteContent.trim() === "") {
    throw new Error("Title and note cannot be empty");
  }

  let notes;
  try {
    const storedNotes = localStorage.getItem("notes");
    notes = storedNotes ? JSON.parse(storedNotes) : [];

    if (!Array.isArray(notes)) {
      throw new Error("Stored notes is not an array");
    }
  } catch (e) {
    console.error("Error parsing notes from storage:", e);
    throw new Error("Failed to read existing notes");
  }

  const noteExists = notes.some((note) => note.id === id);
  if (!noteExists) {
    throw new Error("Note not found");
  }

  const updatedNotes = notes.map((note) => {
    if (note.id === id) {
      return {
        ...note,
        title: newTitle,
        note: newNoteContent,
        updatedAt: new Date().toISOString(),
      };
    }
    return note;
  });

  try {
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  } catch (e) {
    console.error("Error saving to localStorage:", e);
    throw new Error("Failed to update note. Storage may be full.");
  }

  return true;
}

function deleteNote(id) {
  let notes;
  try {
    const storedNotes = localStorage.getItem("notes");
    notes = storedNotes ? JSON.parse(storedNotes) : [];

    if (!Array.isArray(notes)) {
      throw new Error("Stored notes is not an array");
    }
  } catch (e) {
    console.error("Error parsing notes from storage:", e);
    throw new Error("Failed to read existing notes");
  }

  const note = notes.find((note) => note.id === id);
  if (!note) {
    throw new Error("Note not found");
  }

  const newNotes = notes.filter((note) => note.id !== id);

  try {
    localStorage.setItem("notes", JSON.stringify(newNotes));
  } catch (e) {
    console.error("Error saving to localStorage:", e);
    throw new Error("Failed to delete note");
  }

  return note;
}

function getNote(id) {
  let notes;
  try {
    const storedNotes = localStorage.getItem("notes");
    notes = storedNotes ? JSON.parse(storedNotes) : [];

    if (!Array.isArray(notes)) {
      throw new Error("Stored notes is not an array");
    }
  } catch (e) {
    console.error("Error parsing notes from storage:", e);
    throw new Error("Failed to read notes");
  }

  const note = notes.find((note) => note.id === id);
  if (!note) {
    throw new Error("Note not found");
  }

  return note;
}

function fetchNotes() {
  try {
    const storedNotes = localStorage.getItem("notes");
    const notes = storedNotes ? JSON.parse(storedNotes) : [];
    if (!Array.isArray(notes)) {
      throw new Error("Stored notes is not an array");
    }
    return notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (e) {
    console.error("Error fetching notes:", e);
    throw new Error("Failed to fetch notes");
  }
}

export { createNewNote, updateNote, deleteNote, fetchNotes, getNote };
