@echo off
title Backend - Rice Disease Detection
echo ===================================================
echo   MENYALAKAN BACKEND PYTHON                        
echo ===================================================

if not exist "venv" (
    echo [1/2] Membuat virtual environment baru...
    python -m venv venv
    echo [2/2] Menginstall library Backend ^(Mohon tunggu^)...
    venv\Scripts\python.exe -m pip install fastapi uvicorn python-multipart ultralytics pillow
) else (
    echo [OK] Virtual Environment Backend siap.
)

echo ---------------------------------------------------
echo   Backend berjalan di http://127.0.0.1:8000        
echo ---------------------------------------------------
venv\Scripts\uvicorn.exe main:app --reload