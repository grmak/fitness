@echo off
chcp 65001 >nul
title Studio Gest - Dev Server

cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
    echo [ERRO] Node.js nao encontrado. Instale em https://nodejs.org/
    pause
    exit /b 1
)

if not exist "node_modules\" (
    echo Instalando dependencias...
    call npm install
    if errorlevel 1 (
        echo [ERRO] Falha ao instalar dependencias.
        pause
        exit /b 1
    )
)

echo Iniciando servidor de desenvolvimento...
echo Acesse: http://localhost:5173
echo Pressione Ctrl+C para encerrar.
echo.

call npm run dev

if errorlevel 1 (
    echo.
    echo [ERRO] O servidor nao iniciou corretamente.
    pause
    exit /b 1
)

pause
