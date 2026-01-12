#!/bin/bash

# Кольори
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo ""
echo "╔════════════════════════════════════════════════╗"
echo "║   Artyne Studio - GitHub Pages Deploy Tool    ║"
echo "╚════════════════════════════════════════════════╝"
echo ""

# Перевірка Git
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git не встановлено!${NC}"
    echo "   Завантажте: https://git-scm.com/downloads"
    exit 1
fi

echo -e "${GREEN}✅ Git встановлено${NC}"
echo ""

# Запит даних
read -p "Введіть ваш GitHub username: " GITHUB_USERNAME
read -p "Введіть назву репозиторію (artyne-studio): " REPO_NAME
REPO_NAME=${REPO_NAME:-artyne-studio}

echo ""
echo -e "${BLUE}📦 Репозиторій:${NC} https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo ""

read -p "Продовжити? (y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

echo ""
echo -e "${YELLOW}🔄 Ініціалізація Git...${NC}"
git init

echo -e "${YELLOW}📝 Додавання файлів...${NC}"
git add .

echo -e "${YELLOW}💾 Створення коміту...${NC}"
git commit -m "Initial commit - Artyne Studio website"

echo -e "${YELLOW}🔗 Підключення до GitHub...${NC}"
git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

echo -e "${YELLOW}🌿 Перейменування гілки на main...${NC}"
git branch -M main

echo -e "${YELLOW}🚀 Відправка файлів на GitHub...${NC}"
git push -u origin main

echo ""
echo "╔════════════════════════════════════════════════╗"
echo "║             ✅ ГОТОВО!                        ║"
echo "╚════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}🌐 Ваш сайт буде доступний за адресою:${NC}"
echo "   https://$GITHUB_USERNAME.github.io/$REPO_NAME/"
echo ""
echo -e "${BLUE}📋 Наступні кроки:${NC}"
echo "   1. Зайдіть на https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo "   2. Settings → Pages → Source → GitHub Actions"
echo "   3. Зачекайте 2-3 хвилини"
echo "   4. Відкрийте ваш сайт!"
echo ""
echo -e "${YELLOW}🤖 Налаштування Telegram бота:${NC}"
echo "   Прочитайте файл: telegram-bot/setup-telegram-bot.md"
echo ""
