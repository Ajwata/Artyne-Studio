# ⚡ ШВИДКИЙ СТАРТ

## 🚀 За 5 хвилин запустіть сайт!

### 1️⃣ GitHub Pages (2 хв)

```bash
# У папці проекту:
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/artyne-studio.git
git push -u origin main
```

Потім на GitHub:
- **Settings → Pages → Source → GitHub Actions**

**Готово!** Сайт буде на: `https://YOUR-USERNAME.github.io/artyne-studio/`

---

### 2️⃣ Telegram Бот (3 хв) 🤖

**✅ Бот вже створено:** [@artyne_studio_bot](https://t.me/artyne_studio_bot)

1. **Отримайте Chat ID:**
   - [@userinfobot](https://t.me/userinfobot) → `/start`

2. **Налаштуйте Worker:**
   - [workers.cloudflare.com](https://workers.cloudflare.com) → Create Service
   - Код готовий в `telegram-bot/QUICK_SETUP.md` ⚡
   - Вставте Chat ID → Save and Deploy

3. **Оновіть сайт:**
   - `js/main.js` → замініть Worker URL
   - `git push`

**Готово!** Заявки будуть приходити в Telegram! 🎉

👉 **Детально:** [telegram-bot/QUICK_SETUP.md](telegram-bot/QUICK_SETUP.md)

---

## 📖 Детальні інструкції

- 📘 [GitHub Pages Setup](GITHUB_PAGES_SETUP.md)
- 🤖 [Telegram Bot Setup](telegram-bot/setup-telegram-bot.md)
- 🚀 [Launch Checklist](LAUNCH_CHECKLIST.md)

---

## ✅ Перевірка

1. Відкрийте ваш сайт
2. Заповніть форму
3. Відправте
4. Перевірте Telegram ✉️

---

## ❗ Проблеми?

**Сайт не працює:**
- Зачекайте 5 хвилин після push
- Перевірте GitHub Actions (вкладка Actions)

**Форма не відправляється:**
- Перевірте Worker URL в `js/main.js`
- Подивіться логи на Cloudflare Workers

**Заявки не приходять:**
- Перевірте TOKEN та Chat ID в Worker
- Напишіть боту `/start`
- Подивіться консоль браузера (F12)

---

**Успіхів! 🚀**
