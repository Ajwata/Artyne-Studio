@echo off
chcp 65001 >nul
echo.
echo ╔════════════════════════════════════════════════╗
echo ║   Artyne Studio - GitHub Pages Deploy Tool    ║
echo ╚════════════════════════════════════════════════╝
echo.

:: Перевірка Git
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git не встановлено!
    echo    Завантажте: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo ✅ Git встановлено
echo.

:: Запит даних
set /p GITHUB_USERNAME="Введіть ваш GitHub username: "
set /p REPO_NAME="Введіть назву репозиторію (artyne-studio): "

if "%REPO_NAME%"=="" set REPO_NAME=artyne-studio

echo.
echo 📦 Репозиторій: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
echo.

choice /C YN /M "Продовжити"
if errorlevel 2 exit /b

echo.
echo 🔄 Ініціалізація Git...
git init

echo 📝 Додавання файлів...
git add .

echo 💾 Створення коміту...
git commit -m "Initial commit - Artyne Studio website"

echo 🔗 Підключення до GitHub...
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git

echo 🌿 Перейменування гілки на main...
git branch -M main

echo 🚀 Відправка файлів на GitHub...
git push -u origin main

echo.
echo ╔════════════════════════════════════════════════╗
echo ║             ✅ ГОТОВО!                        ║
echo ╚════════════════════════════════════════════════╝
echo.
echo 🌐 Ваш сайт буде доступний за адресою:
echo    https://%GITHUB_USERNAME%.github.io/%REPO_NAME%/
echo.
echo 📋 Наступні кроки:
echo    1. Зайдіть на https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
echo    2. Settings → Pages → Source → GitHub Actions
echo    3. Зачекайте 2-3 хвилини
echo    4. Відкрийте ваш сайт!
echo.
echo 🤖 Налаштування Telegram бота:
echo    Прочитайте файл: telegram-bot/setup-telegram-bot.md
echo.
pause
