import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({ value, onChange, placeholder }) => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // Text formatting
      [{ color: [] }, { background: [] }], // Text color and background
      [{ header: [1, 2, 3, false] }], // Headers
      ["link", "image"], // Links and images
      ["blockquote", "code-block"], // Block elements
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      ["clean"], // Remove formatting
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

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      placeholder={placeholder || "Write here..."}
      modules={modules}
      formats={formats}
    />
  );
};

export default TextEditor;
