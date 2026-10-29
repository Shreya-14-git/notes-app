import { useState, useEffect } from "react";
import { ThemeProvider, useTheme } from "./ThemeContext";
import NoteItem from "./NoteItem";
import ThemeToggle from "./ThemeToggle";

function NotesApp() {
  const { dark } = useTheme();

  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("notes")) || [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    document.title = `Notes (${notes.length})`;
  }, [notes]);

  const addNote = () => {
    if (!input.trim()) return;

    setNotes(prev => [
      ...prev,
      { id: Date.now(), text: input.trim() }
    ]);

    setInput("");
  };

  const deleteNote = id => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  return (
    <div style={{
      minHeight: "100vh",
      padding: "30px",
      background: dark ? "#181818" : "#ffffff",
      color: dark ? "#ffffff" : "#181818",
      fontFamily: "Arial"
    }}>
      <h1>My Notes</h1>

      <ThemeToggle />

      <div style={{ marginTop: "20px" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addNote()}
          placeholder="Write a note..."
        />

        <button onClick={addNote}>Add Note</button>
      </div>

      <p>Total Notes: {notes.length}</p>

      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {notes.map(note => (
            <NoteItem
              key={note.id}
              note={note}
              onDelete={deleteNote}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NotesApp />
    </ThemeProvider>
  );
}