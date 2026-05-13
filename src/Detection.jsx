import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Detection.css";
import landscapeImage from "./images/landscape.jpg";

function Detection() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleImageFile(files[0]);
    }
  };

  // --- BAGIAN YANG DIUPDATE ---
  const handleImageFile = async (file) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file");
      return;
    }

    setIsLoading(true);

    // 1. Baca file sebagai URL lokal untuk preview langsung
    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageData = e.target.result;
      setUploadedImage(imageData);

      // 2. Siapkan file untuk dikirim ke backend
      const formData = new FormData();
      formData.append("file", file); // Key 'file' harus sama dengan parameter UploadFile di FastAPI

      try {
        // 3. Panggil API FastAPI
        const response = await fetch("http://localhost:8000/api/detect", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // 4. Gabungkan hasil deteksi AI dengan gambar lokal
        const detectionData = {
          mainDisease: data.mainDisease,
          confidence: data.confidence,
          uploadedImage: imageData, 
          breakdown: data.breakdown,
        };

        setIsLoading(false);
        // Lempar data ke halaman hasil
        navigate("/detection-result", { state: { detectionData: detectionData } });

      } catch (error) {
        console.error("Error during AI detection:", error);
        alert("Gagal menghubungi server deteksi AI. Pastikan backend sudah berjalan.");
        setIsLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };
  // -----------------------------

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFile(e.target.files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleReset = (e) => {
    e.stopPropagation(); 
    setUploadedImage(null);
    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="detection-wrapper">
      <img
        src={landscapeImage}
        alt="background"
        className="detection-background-img"
      />
      
      <div className="detection-main-container">
        {/* Outer Solid White Card */}
        <div className="detection-card-outer">
          
          <div className="back-link" onClick={handleBack}>
            Back
          </div>

          {/* Inner Dashed Card for Upload */}
          <div
            className={`upload-card ${uploadedImage ? "has-image" : ""} ${
              isDragActive ? "drag-active" : ""
            } ${isLoading ? "loading" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={!uploadedImage && !isLoading ? handleBrowseClick : undefined}
          >
            {!uploadedImage && !isLoading ? (
              <>
                <div className="upload-icon">
                  <svg 
                    width="80" 
                    height="80" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="3" fill="#013328"/>
                    <path d="M3 18L8.5 11.5L13 16L16.5 12L21 17.5V18.5C21 19.3284 20.3284 20 19.5 20H4.5C3.67157 20 3 19.3284 3 18.5V18Z" fill="white"/>
                    <circle cx="16" cy="9" r="1.5" fill="white"/>
                  </svg>
                </div>
                <div className="upload-text-group">
                  <p className="upload-title">Drop your image here, or browse</p>
                  <p className="upload-subtitle">
                    Better image quality, better the analysis
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  style={{ display: "none" }}
                />
              </>
            ) : isLoading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <p className="loading-text">Processing image with AI...</p>
              </div>
            ) : (
              <>
                <div className="preview-container">
                  <img
                    src={uploadedImage}
                    alt="uploaded preview"
                    className="preview-image"
                  />
                </div>
                <button className="reset-btn" onClick={handleReset}>
                  ✕ Change Image
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detection;