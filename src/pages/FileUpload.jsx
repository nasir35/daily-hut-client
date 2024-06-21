import React, { useState, useRef, useEffect } from "react";

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const handleFiles = (newFiles) => {
    setFiles([...files, ...Array.from(newFiles)]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handlePaste = (e) => {
    const items = e.clipboardData.items;
    const filesArray = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === "file" && items[i].type.startsWith("image/")) {
        filesArray.push(items[i].getAsFile());
      }
    }
    handleFiles(filesArray);
  };

  useEffect(() => {
    const handlePasteEvent = (e) => {
      if (document.activeElement === dropZoneRef.current) {
        handlePaste(e);
      }
    };
    document.addEventListener("paste", handlePasteEvent);
    return () => {
      document.removeEventListener("paste", handlePasteEvent);
    };
  }, []);

  return (
    <div
      ref={dropZoneRef}
      tabIndex="0"
      className={`border-2 border-dashed rounded-lg p-6 w-full max-w-lg mx-auto mt-10 text-center ${
        isDragging ? "border-blue-400" : "border-gray-400"
      } focus:outline-none focus:ring-2 focus:ring-blue-400`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="fileElem"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
        ref={fileInputRef}
      />
      <label
        htmlFor="fileElem"
        className="cursor-pointer p-6 border-2 border-gray-300 rounded-lg inline-block"
        onClick={() => fileInputRef.current.click()}
      >
        Click to browse or drag & drop images here
      </label>
      <div className="mt-4 flex flex-wrap gap-4 justify-center">
        {files.map((file, index) => (
          <img
            key={index}
            src={URL.createObjectURL(file)}
            alt={`preview-${index}`}
            className="w-24 h-24 object-cover rounded"
          />
        ))}
      </div>
      <input
        type="file"
        className="absolute bottom-2 right-2 opacity-0"
        onChange={(e) => handleFiles(e.target.files)}
        ref={fileInputRef}
      />
    </div>
  );
};

export default FileUpload;
