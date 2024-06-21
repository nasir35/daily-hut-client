import { useContext } from "react";
import { ImageUploadContext } from "../contextProvider/ImageUploadProvider";

const useImageUpload = () => {
  const uploadContext = useContext(ImageUploadContext);
  return uploadContext;
};

export default useImageUpload;
