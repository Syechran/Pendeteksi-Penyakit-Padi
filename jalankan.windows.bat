@echo off
title Running Rice Disease Detection App

echo ===================================================
echo   MEMERIKSA DAN MENYALAKAN APLIKASI PADI (AI)      
echo ===================================================

:: 1. Cek & Setup Otomatis Backend Python
if not exist "backend\venv" (
    echo [1/3] Virtual environment tidak ditemukan. Membuat venv baru...
    python -m venv backend\venv
    echo [2/3] Menginstall library Backend (Mohon tunggu, ini agak lama)...
    call backend\venv\Scripts\activate
    pip install fastapi uvicorn python-multipart ultralytics pillow
) else (
    echo [✓] Virtual Environment Backend siap.
)

:: 2. Cek & Setup Otomatis Frontend NodeJS
if not exist "node_modules" (
    echo [3/3] Folder node_modules tidak ditemukan. Menginstall dependensi Frontend...
    call npm install
) else (
    echo [✓] Dependensi Frontend siap.
)

echo ---------------------------------------------------
echo   MENYALAKAN SERVER (FRONTEND & BACKEND)           
echo ---------------------------------------------------

:: Jalankan Backend di jendela terminal baru secara otomatis
start cmd /k "cd backend && venv\Scripts\activate && uvicorn main:app --reload"

:: Jalankan Frontend di jendela terminal aktif saat ini
npm run dev