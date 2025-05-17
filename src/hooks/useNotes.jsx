import { useState, useEffect } from "react";
import { fetchNotes } from "../controllers/controllers";

export default function useNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        setLoading(true);
        const storedNotes = await fetchNotes();
        setNotes(storedNotes);
      } catch (err) {
        setError(err.message);
        console.error("Error loading notes:", err);
      } finally {
        setLoading(false);
      }
    }
    loadNotes();
  }, []);

  const refreshNotes = async () => {
    try {
      setLoading(true);
      const storedNotes = await fetchNotes();
      setNotes(storedNotes);
      setError(null);
      return storedNotes;
    } catch (err) {
      setError(err.message);
      console.error("Error refreshing notes:", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { notes, setNotes, loading, error, refreshNotes };
}
