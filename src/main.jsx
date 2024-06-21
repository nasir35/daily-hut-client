import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.jsx";
import AuthProvider from "./contextProvider/AuthProvider.jsx";
import CartProvider from "./contextProvider/CartProvider.jsx";
import ToastProvider from "./contextProvider/ToastProvider.jsx";
import ImageUploadProvider from "./contextProvider/ImageUploadProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ImageUploadProvider>
        <CartProvider>
          <ToastProvider>
            <RouterProvider router={router} />
          </ToastProvider>
        </CartProvider>
      </ImageUploadProvider>
    </AuthProvider>
  </React.StrictMode>
);
