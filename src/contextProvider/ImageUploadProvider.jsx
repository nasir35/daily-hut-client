import axios from "axios";
import { createContext, useState } from "react";

export const ImageUploadContext = createContext(null);

const ImageUploadProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const token = localStorage.getItem("token");

  const getImageURLs = async () => {
    const imageFormData = new FormData();
    images.forEach((image) => {
      imageFormData.append("files", image);
    });

    const imageUploadResponse = await axios.post(
      `https://daily-hut-backend.vercel.app/api/v1/uploads/product-images`,
      imageFormData,
      {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (imageUploadResponse.status !== 200) {
      throw new Error("Failed to upload images.");
    }
    if (imageUploadResponse.status === 200) {
      setImagePreviews([]);
      setImages([]);
    }
    let uploadedImageUrls = imageUploadResponse.data.data;
    uploadedImageUrls = uploadedImageUrls.map((d) => d.secure_url);
    return uploadedImageUrls;
  };
  const imageInfo = {
    images,
    setImages,
    imagePreviews,
    setImagePreviews,
    getImageURLs,
  };

  return (
    <ImageUploadContext.Provider value={imageInfo}>
      {children}
    </ImageUploadContext.Provider>
  );
};

export default ImageUploadProvider;
