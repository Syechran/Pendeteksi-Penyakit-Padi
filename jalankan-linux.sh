#!/bin/bash

echo "==================================================="
echo "   MEMERIKSA DAN MENYALAKAN APLIKASI PADI (AI)     "
echo "==================================================="

# 1. Cek & Setup Otomatis Backend
if [ ! -d "backend/venv" ]; then
    echo "[1/3] Membuat venv baru..."
    python3 -m venv backend/venv
    echo "[2/3] Menginstall library Backend (Mohon tunggu)..."
    source backend/venv/bin/activate
    pip install fastapi uvicorn python-multipart ultralytics pillow
else
    echo "[✓] Virtual Environment Backend siap."
fi

# 2. Cek & Setup Otomatis Frontend
if [ ! -d "node_modules" ]; then
    echo "[3/3] Menginstall dependensi Frontend..."
    npm install
else
    echo "[✓] Dependensi Frontend siap."
fi

echo "---------------------------------------------------"
echo "   MENYALAKAN SERVER (FRONTEND & BACKEND)          "
echo "---------------------------------------------------"

# Jalankan Backend di latar belakang (background process)
cd backend && source venv/bin/activate && uvicorn main:app --reload &

# Kembali ke root dan jalankan Frontend
cd ..
npm run dev