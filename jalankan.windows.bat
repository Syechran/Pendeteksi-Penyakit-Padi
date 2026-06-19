@echo off
title Jalankan Rice Disease Detection App
echo ===================================================
echo   MEMERIKSA DAN MENYALAKAN APLIKASI PADI (AI)      
echo ===================================================

:: Setup node_modules jika belum ada
if not exist "node_modules" (
    echo [1/2] Folder node_modules tidak ditemukan. Menginstall dependensi Frontend...
    call npm install
) else (
    echo [OK] Dependensi Frontend siap.
)

echo ---------------------------------------------------
echo   MENYALAKAN SERVER (FRONTEND dan BACKEND)         
echo ---------------------------------------------------

:: Nyalakan backend di jendela baru
start "Backend Server" cmd /k "cd backend && jalankan_windows.bat"

:: Nyalakan frontend di jendela ini
echo [OK] Menyalakan Frontend...
npm run dev