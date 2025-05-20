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
      <div className="flex flex-col md:flex-row md:items-center gap-3 text-black  tracking-wide ">
        <p className="font-semibold tracking-wide">Title:</p>
        <input
          className=" p-2 px-5 outline-none tracking-wide text-gray-900 rounded-2xl bg-purple-100 disabled:bg-gray-100"
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
          className="w-full px-4 text-gray-900 border-[#00d3bb]  outline-none p-2 mt-3 rounded-2xl bg-purple-100 disabled:bg-gray-100"
          placeholder="Enter your notes here"
          value={note || ""}
          onChange={handleNoteChange}
          disabled={readOnly}
          rows={10}
          aria-label="Note content"
          maxLength={10000}
          required
        />
      </div>
    </div>
  );
}
