import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({ value, onChange, placeholder }) => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // Text formatting
      [{ color: [] }, { background: [] }], // Text color and background
      [{ header: [1, 2, 3, false] }], // Headers
      ["blockquote", "code-block"], // Block elements
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      ["link", "image"], // Links and images
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
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "link",
    "image",
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
