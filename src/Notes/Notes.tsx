import React, { useState, useEffect } from "react";
import "./Notes.css";
import noteIcon from "../images/notes/notes.png";
import noteEdit from "../images/notes/edit.png";
import noteDelete from "../images/notes/delete.png";
enum sizes {
  small = "small",
  medium = "medium",
}
interface Props {
  size?: keyof typeof sizes;
  color?: keyof typeof Colors;
}
enum Colors {
  basic = "linear-gradient(135deg, #cf9aff, #95c0ff)",
  black = "linear-gradient(135deg, #63746f, #1e1c27)",
  white = "linear-gradient(135deg, #c4d8d3, #716f79)",
}
export const Notes: React.FC<Props> = ({
  size = "medium",
  color = "basic",
}) => {
  const [notes, setNotes] = useState<string[]>([]);

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  const createNote = () => {
    setNotes((prevNotes) => [...prevNotes, ""]);
  };
  const deleteNote = (index: number) => {
    setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
  };
  const updateNote = (index: number, value: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note, i) => (i === index ? value : note))
    );
  };

  return (
    <div
      className="notes_container"
      style={{
        width: size === "small" ? "300px" : "400px",
        height: size === "small" ? "400px" : "600px",
        background: Colors[color] || Colors.basic,
      }}
    >
      <h1>
        <img src={noteIcon} alt="Notes Icon" />
        Notes
      </h1>
      <button
        onClick={createNote}
        style={{
          background:
            color === "black"
              ? "linear-gradient(#c4d8d3, #716f79)"
              : color === "white"
                ? "linear-gradient(#63746f, #1e1c27)"
                : "linear-gradient(#9418fd, #571094)",
        }}
      >
        <img src={noteEdit} alt="Create Note Icon" />
        Create Note
      </button>

      <div className="note_container">
        {notes.map((note, index) => (
          <div
            key={index}
            className="input_box"
            contentEditable
            suppressContentEditableWarning
            onChange={(e) =>
              updateNote(index, e.currentTarget.textContent || "")
            }
          >
            {note}
            <img
              src={noteDelete}
              alt="Delete Note"
              onClick={() => deleteNote(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
