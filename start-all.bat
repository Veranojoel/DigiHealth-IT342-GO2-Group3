@echo off
echo ========================================
echo   DigiHealth - Quick Start Script
echo ========================================
echo.

REM Check if backend is running
echo [1/4] Checking if backend is running...
curl -s http://localhost:8080/api/health > nul 2>&1
if %errorlevel% equ 0 (
    echo     ✓ Backend is already running
) else (
    echo     ✗ Backend is not running
    echo     Starting backend in new window...
    start "DigiHealth Backend" cmd /k "cd /d "%~dp0backend" && mvn spring-boot:run"
    echo     ⏳ Waiting for backend to start (30 seconds)...
    timeout /t 30 /nobreak > nul
)
echo.

REM Check if frontend is running
echo [2/4] Checking if frontend is running...
curl -s http://localhost:3000 > nul 2>&1
if %errorlevel% equ 0 (
    echo     ✓ Frontend is already running
) else (
    echo     ✗ Frontend is not running
    echo     Starting frontend in new window...
    start "DigiHealth Frontend" cmd /k "cd /d "%~dp0web" && start-app.bat"
)
echo.

REM Open browser
echo [3/4] Opening application in browser...
timeout /t 5 /nobreak > nul
start http://localhost:3000
echo     ✓ Browser opened
echo.

REM Display status
echo [4/4] DigiHealth Status
echo ========================================
echo   Backend:  http://localhost:8080
echo   Frontend: http://localhost:3000
echo   Health:   http://localhost:8080/api/health
echo ========================================
echo.
echo ✅ DigiHealth is running!
echo.
echo Press any key to exit this window (servers will keep running)...
pause > nul
