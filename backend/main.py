from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from ultralytics import YOLO
from PIL import Image
import io
import os
app = FastAPI()

# Konfigurasi CORS agar React bisa menembak API ini
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Saat production, ganti dengan URL React-mu (misal: http://localhost:5173)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model YOLO11
try:
    # Get the directory of main.py
    current_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(current_dir, "best.pt")
    model = YOLO(model_path)
except Exception as e:
    print(f"Error loading model: {e}")

# Palet warna untuk breakdown di frontend
COLORS = ["#013328", "#8fa886", "#dbe4cd", "#e6a15c", "#c25c5c"]

@app.post("/api/detect")
async def detect_disease(file: UploadFile = File(...)):
    # Validasi file gambar
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File yang diunggah harus berupa gambar")

    try:
        # Membaca gambar dari request
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

        # Melakukan prediksi dengan model YOLO11
        results = model.predict(image)
        result = results[0]

        main_disease = "Healthy / Undetected"
        top_conf = 0.0
        breakdown_dict = {}

        # Logika jika YOLO digunakan untuk Object Detection (Bbox)
        if hasattr(result, 'boxes') and result.boxes is not None and len(result.boxes) > 0:
            for box in result.boxes:
                cls_id = int(box.cls[0])
                conf = float(box.conf[0]) * 100
                cls_name = result.names[cls_id]

                # Tentukan penyakit utama berdasarkan confidence tertinggi
                if conf > top_conf:
                    top_conf = conf
                    main_disease = cls_name

                # Kumpulkan data untuk breakdown
                if cls_name in breakdown_dict:
                    if conf > breakdown_dict[cls_name]:
                        breakdown_dict[cls_name] = conf
                else:
                    breakdown_dict[cls_name] = conf

        # Logika jika YOLO digunakan untuk Image Classification (YOLO11-cls)
        elif hasattr(result, 'probs') and result.probs is not None:
            top1_idx = result.probs.top1
            main_disease = result.names[top1_idx]
            top_conf = float(result.probs.top1conf) * 100

            for i, prob in enumerate(result.probs.data):
                breakdown_dict[result.names[i]] = float(prob) * 100

        # Memformat breakdown sesuai yang diminta React
        breakdown_list = []
        for i, (name, value) in enumerate(breakdown_dict.items()):
            breakdown_list.append({
                "name": name,
                "value": round(value, 2),
                "color": COLORS[i % len(COLORS)]
            })

        # Urutkan breakdown dari persentase terbesar
        breakdown_list = sorted(breakdown_list, key=lambda x: x['value'], reverse=True)

        return {
            "mainDisease": main_disease,
            "confidence": round(top_conf, 2),
            "breakdown": breakdown_list
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Terjadi kesalahan saat memproses gambar: {str(e)}")

# ==========================================
# FULLSTACK CONFIGURATION: SERVE REACT APP
# ==========================================
# Locate the 'dist' directory. Since main.py is in backend/, dist/ is in the parent directory.
dist_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "dist")

if os.path.isdir(dist_path):
    # Mount 'assets' directory specifically if it exists to serve static assets directly
    assets_path = os.path.join(dist_path, "assets")
    if os.path.isdir(assets_path):
        app.mount("/assets", StaticFiles(directory=assets_path), name="assets")

    # Catch-all route to serve the SPA
    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str):
        # Ignore API endpoints
        if full_path.startswith("api/"):
            raise HTTPException(status_code=404, detail="API route not found")
        
        # If the requested file exists (e.g. images, favicon.ico), serve it directly
        target_path = os.path.join(dist_path, full_path)
        if full_path and os.path.isfile(target_path):
            return FileResponse(target_path)
        
        # Otherwise, fallback to index.html for client-side routing (React Router)
        index_path = os.path.join(dist_path, "index.html")
        if os.path.isfile(index_path):
            return FileResponse(index_path)
            
        raise HTTPException(status_code=404, detail="Frontend build not found.")