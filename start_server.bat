@echo off
title 3D Anatomy Atelier - Local Web Server
echo ============================================================
echo   Starting 3D Anatomy Atelier - Video Animation Server
echo ============================================================
echo.
echo Local server starting at: http://localhost:8080
echo Opening your web browser...
echo.
start "" "http://localhost:8080"
python -m http.server 8080
if %errorlevel% neq 0 (
    echo Python server failed, trying npx serve...
    npx -y serve . -p 8080
)
pause
