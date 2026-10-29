import { useTheme } from "./ThemeContext";

export default function NoteItem({ note, onDelete }) {
  const { dark } = useTheme();

  return (
    <li style={{
      padding: "12px",
      margin: "10px 0",
      background: dark ? "#333" : "#f1f1f1",
      color: dark ? "white" : "black",
      display: "flex",
      justifyContent: "space-between",
      borderRadius: "6px"
    }}>
      {note.text}
      <button onClick={() => onDelete(note.id)}>Delete</button>
    </li>
  );
}