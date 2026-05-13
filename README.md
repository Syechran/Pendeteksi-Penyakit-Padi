# 🌾 Rice Disease Detection Web App

Aplikasi web pendeteksi penyakit daun padi berbasis kecerdasan buatan (AI). Proyek ini menggunakan **React** untuk antarmuka pengguna yang responsif dan **FastAPI** sebagai backend untuk menjalankan *inference* model Deep Learning menggunakan arsitektur **YOLO11**.

## ✨ Fitur Utama
* **Drag & Drop Upload:** Antarmuka yang ramah pengguna untuk mengunggah gambar daun padi.
* **Real-time AI Inference:** Proses deteksi gambar yang cepat dan akurat menggunakan model YOLO11 (`best.pt`).
* **Visualisasi Data:** Menampilkan hasil prediksi menggunakan *Pie Chart* interaktif berserta tingkat kepercayaan (*confidence rate*).
* **Disease Management:** Memberikan saran penanganan pertanian secara dinamis berdasarkan penyakit yang terdeteksi.

## 🛠️ Tech Stack
* **Frontend:** React, React Router Dom, Recharts (untuk visualisasi data), CSS murni.
* **Backend:** FastAPI, Uvicorn, Python-multipart.
* **Machine Learning:** Ultralytics (YOLO11), Pillow (PIL).

## 🚀 Cara Menjalankan Aplikasi di Komputer Lokal

Karena aplikasi ini terdiri dari Frontend dan Backend, kamu perlu membuka **dua terminal terpisah** untuk menjalankannya.

### 1. Menjalankan Backend (FastAPI)
Pastikan kamu sudah menginstal Python di komputermu. Buka terminal baru dan masuk ke folder backend.

```bash
# Masuk ke direktori backend (sesuaikan nama foldernya jika berbeda)
cd backend

# (Opsional tapi disarankan) Buat dan aktifkan virtual environment
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

# Instal semua library yang dibutuhkan
pip install fastapi uvicorn python-multipart ultralytics pillow

# Jalankan server
uvicorn main:app --reload

### 2. Menjalankan Frontend (React)
Buka terminal **kedua**, masuk ke folder frontend, dan jalankan perintah berikut. Ini akan membuka aplikasi di browser kamu (biasanya di `http://localhost:5173/`).

```bash
# Masuk ke direktori frontend
cd my-app

# (Opsional) Instal dependensi jika belum
npm install

# Jalankan aplikasi
npm run dev
```