from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
import io

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
    model = YOLO("best.pt")
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