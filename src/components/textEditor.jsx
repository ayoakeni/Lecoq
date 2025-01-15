import React, { useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { debounce } from "lodash";

const TextEditor = ({ value, onChange, placeholder }) => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ header: [1, 2, 3, false] }],
      ["link", "image"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "header",
    "link",
    "image",
    "blockquote",
    "code-block",
    "list",
    "bullet",
  ];

  // Debounced change handler to minimize updates
  const debouncedChange = useCallback(debounce(onChange, 300), [onChange]);

  return (
    <ReactQuill
      value={value}
      onChange={debouncedChange}
      placeholder={placeholder || "Write here..."}
      modules={modules}
      formats={formats}
    />
  );
};

export default React.memo(TextEditor);