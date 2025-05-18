export default function NoteForm({
  title,
  setTitle,
  note,
  setNote,
  readOnly = false,
}) {
  const handleTitleChange = (e) => {
    if (setTitle) {
      setTitle(e.target.value);
    }
  };

  const handleNoteChange = (e) => {
    if (setNote) {
      setNote(e.target.value);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex gap-10 items-center">
        Title:
        <input
          className=" p-2 px-5 w-[300px] rounded-2xl bg-purple-100 disabled:bg-gray-100"
          placeholder="Title"
          value={title || ""}
          onChange={handleTitleChange}
          disabled={readOnly}
          aria-label="Note title"
          maxLength={100}
          required
        />
      </div>
      <div>
        <textarea
          className="w-full border p-2 mt-3 rounded-2xl bg-purple-100 disabled:bg-gray-100"
          placeholder="Enter your notes here"
          value={note || ""}
          onChange={handleNoteChange}
          disabled={readOnly}
          rows={20}
          aria-label="Note content"
          maxLength={10000}
          required
        />
      </div>
    </div>
  );
}
