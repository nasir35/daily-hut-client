import { useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imageCompression from "browser-image-compression";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTimes } from "@fortawesome/free-solid-svg-icons";
import useImageUpload from "../../hooks/useImageUpload";
const UploadImage = ({ numberOfImages }) => {
  const { images, setImages, imagePreviews, setImagePreviews } =
    useImageUpload();
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const validateAndCompressImage = async (file) => {
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/webp",
    ];
    if (!validTypes.includes(file.type)) {
      toast.error(
        "Invalid file type. Only jpg, png, svg, and webp are allowed."
      );
      return null;
    }

    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error("Error compressing the image:", error);
      return null;
    }
  };

  const handleFiles = async (newFiles) => {
    const allFiles = [...images, ...Array.from(newFiles)];
    if (allFiles.length > numberOfImages) {
      toast.error(`You can only upload up to ${numberOfImages} images.`);
      return;
    }

    const validatedImages = await Promise.all(
      Array.from(newFiles).map(validateAndCompressImage)
    );
    const validImages = validatedImages.filter((img) => img !== null);

    setImages((prevImages) => [...prevImages, ...validImages]);
    setImagePreviews((prevPreviews) => [
      ...prevPreviews,
      ...validImages.map((image) => URL.createObjectURL(image)),
    ]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  //following commented code is for pasting image to upload but it is not as functional as i want. Will surely update it later.

  // const handlePaste = (e) => {
  //   console.log("pasted");
  //   const items = e.clipboardData.items;
  //   const filesArray = [];
  //   for (let i = 0; i < items.length; i++) {
  //     if (items[i].kind === "file" && items[i].type.startsWith("image/")) {
  //       filesArray.push(items[i].getAsFile());
  //     }
  //   }
  //   handleFiles(filesArray);
  // };

  // useEffect(() => {
  //   const handlePasteEvent = (e) => {
  //     if (document.activeElement === dropZoneRef.current) {
  //       handlePaste(e);
  //     }
  //   };
  //   document.addEventListener("paste", handlePasteEvent);
  //   return () => {
  //     document.removeEventListener("paste", handlePasteEvent);
  //   };
  // }, []);

  return (
    <div>
      <div
        className={`flex flex-col items-center justify-center border-2 min-h-44 border-dashed p-4 rounded-lg ${
          isDragging ? "border-blue-500" : "border-gray-300"
        }`}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        ref={dropZoneRef}
        tabIndex="0"
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)}
          ref={fileInputRef}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="mb-2 text-blue-500 hover:underline"
        >
          <FontAwesomeIcon icon={faImage} /> Upload Images
        </button>
        <p className="text-sm text-gray-500">
          Drag & drop images here, or click to select images
        </p>
      </div>
      <div className="grid grid-cols-5 gap-2 mt-2">
        {imagePreviews.map((preview, index) => (
          <div key={index} className="relative">
            <img
              src={preview}
              alt={`Preview ${index}`}
              className="w-full aspect-auto object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadImage;
