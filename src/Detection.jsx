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

  const handleImageFile = (file) => {
    if (file.type.startsWith("image/")) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setTimeout(() => {
          const imageData = e.target.result;
          setUploadedImage(imageData);

          // Mock detection data - later replace with actual AI model call
          const mockDetectionData = {
            mainDisease: "Leaf Blast",
            confidence: 60,
            uploadedImage: imageData,
            breakdown: [
              { name: "Leaf Blast", value: 60, color: "#013328" },
              { name: "Sheath Blight", value: 30, color: "#8fa886" },
              { name: "Healthy", value: 10, color: "#dbe4cd" },
            ],
          };

          setIsLoading(false);
          navigate("/detection-result", { state: { detectionData: mockDetectionData } });
        }, 2000);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file");
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFile(e.target.files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleReset = (e) => {
    e.stopPropagation(); // Mencegah trigger klik pada area drop
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
                <p className="loading-text">Processing image...</p>
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