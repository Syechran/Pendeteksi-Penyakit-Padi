import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Detection.css";
import landscapeImage from "./images/landscape.jpg";

function Detection() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraPermissionDenied, setCameraPermissionDenied] = useState(false);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();

  // ✅ FIX: Attach stream setelah video element ter-render
  useEffect(() => {
    if (cameraActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch((err) => {
        console.error("Error playing video:", err);
      });
    }
  }, [cameraActive]);

  const startCamera = async () => {
    try {
      setCameraPermissionDenied(false);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      // ✅ FIX: Set state dulu, baru attach di useEffect
      setCameraActive(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraPermissionDenied(true);
      alert("Unable to access camera. Please check permissions.");
    }
  };

  // ✅ FIX: Tunggu video siap sebelum capture
  const capturePhoto = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    if (video.readyState < 2) {
      await new Promise((resolve) => {
        video.oncanplay = resolve;
      });
    }

    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      if (blob) {
        handleImageFile(blob);
        stopCamera();
      }
    }, "image/jpeg");
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

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
    stopCamera();
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

  const handleImageFile = async (file) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file");
      return;
    }

    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageData = e.target.result;
      setUploadedImage(imageData);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:8000/api/detect", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const detectionData = {
          mainDisease: data.mainDisease,
          confidence: data.confidence,
          uploadedImage: imageData,
          breakdown: data.breakdown,
        };

        setIsLoading(false);
        navigate("/detection-result", { state: { detectionData: detectionData } });
      } catch (error) {
        console.error("Error during AI detection:", error);
        alert("Gagal menghubungi server deteksi AI. Pastikan backend sudah berjalan.");
        setIsLoading(false);
      }
    };
    reader.readAsDataURL(file);
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
    e.stopPropagation();
    setUploadedImage(null);
    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCameraReset = () => {
    stopCamera();
  };

  return (
    <div className="detection-wrapper">
      <img
        src={landscapeImage}
        alt="background"
        className="detection-background-img"
      />

      <div className="detection-main-container">
        <div className="detection-card-outer">
          <div className="back-link" onClick={handleBack}>
            Back
          </div>

          {uploadedImage || isLoading ? (
            <div className={`upload-card ${uploadedImage ? "has-image" : ""} ${isLoading ? "loading" : ""}`}>
              {isLoading ? (
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
          ) : cameraActive ? (
            <div className="camera-container">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="camera-video"
              />
              <canvas ref={canvasRef} style={{ display: "none" }} />
              <div className="camera-controls">
                <button className="camera-btn capture-btn" onClick={capturePhoto}>
                  📸 Capture
                </button>
                <button className="camera-btn cancel-btn" onClick={handleCameraReset}>
                  ✕ Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="upload-options-container">
              <div
                className={`upload-option-card ${isDragActive ? "drag-active" : ""}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={handleBrowseClick}
              >
                <div className="upload-icon">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="4" width="20" height="16" rx="3" fill="#013328"/>
                    <path d="M3 18L8.5 11.5L13 16L16.5 12L21 17.5V18.5C21 19.3284 20.3284 20 19.5 20H4.5C3.67157 20 3 19.3284 3 18.5V18Z" fill="white"/>
                    <circle cx="16" cy="9" r="1.5" fill="white"/>
                  </svg>
                </div>
                <div className="upload-text-group">
                  <p className="upload-title">Drop your image here, or browse</p>
                  <p className="upload-subtitle">Better image quality, better the analysis</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  style={{ display: "none" }}
                />
              </div>

              <div className="upload-option-card camera-option-card" onClick={startCamera}>
                <div className="upload-icon">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="5" width="18" height="14" rx="2" fill="#013328"/>
                    <circle cx="12" cy="12" r="4" fill="white"/>
                  </svg>
                </div>
                <div className="upload-text-group">
                  <p className="upload-title">Open your camera</p>
                  <p className="upload-subtitle">Better image quality, better the analysis</p>
                </div>
              </div>

              {cameraPermissionDenied && (
                <div className="camera-error" style={{ gridColumn: "1 / -1" }}>
                  ⚠️ Camera permission denied. Please enable camera access in your browser settings.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Detection;