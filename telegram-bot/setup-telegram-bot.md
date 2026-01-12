# 🤖 Налаштування Telegram Бота для отримання заявок

## Крок 1: Створення Telegram бота ✅ ГОТОВО!

**Ваш бот вже створено!** 🎉

- 🤖 **Бот:** [@artyne_studio_bot](https://t.me/artyne_studio_bot)
- 🔑 **TOKEN:** `8201047778:AAHhZ6vBueklKoIm8SKiTVPlpy3ZWzCxFfo`

⚠️ **ВАЖЛИВО:** Тримайте токен у секреті! Не публікуйте його у відкритому доступі.

---

## Крок 2: Отримання вашого Chat ID

### Варіант 1: Через бота (ШВИДКО)
1. Знайдіть бота **@userinfobot** в Telegram
2. Напишіть йому `/start`
3. Він надішле ваш **Chat ID** (число, наприклад: `123456789`)

### Варіант 2: Через API вашого бота
1. Напишіть вашому боту [@artyne_studio_bot](https://t.me/artyne_studio_bot) — `/start`
2. Відкрийте в браузері:
   ```
   https://api.telegram.org/bot8201047778:AAHhZ6vBueklKoIm8SKiTVPlpy3ZWzCxFfo/getUpdates
   ```
3. Знайдіть поле `"chat":{"id":123456789}` — це ваш Chat ID
4. **Скопіюйте це число!**

---

## Крок 3: Налаштування Cloudflare Worker

### 3.1 Створення Worker
1. Зайдіть на [workers.cloudflare.com](https://workers.cloudflare.com)
2. Зареєструйтесь (безкоштовно)
3. Натисніть **"Create a Service"**
4. Введіть ім'я (наприклад: `artyne-telegram-bot`)
5. Натисніть **"Create service"**

### 3.2 Налаштування коду
1. Натисніть **"Quick edit"**
2. Скопіюйте код з файлу `cloudflare-worker.js`
3. Замініть:
   - `YOUR_BOT_TOKEN` на токен з BotFather
   - `YOUR_CHAT_ID` на ваш Chat ID
4. Натисніть **"Save and Deploy"**

### 3.3 Отримання URL Worker
1. Після деплою ви побачите URL виду:
   ```
   https://artyne-telegram-bot.your-username.workers.dev
   ```
2. **Збережіть цей URL!**

---

## Крок 4: Оновлення коду сайту

Відкрийте файл `js/main.js` і знайдіть:

```javascript
const response = await fetch("https://telegrambot.shonraprince.workers.dev/", {
```

Замініть URL на ваш Worker URL:

```javascript
const response = await fetch("https://artyne-telegram-bot.YOUR-USERNAME.workers.dev/", {
```

---

## Крок 5: Тестування

1. Відкрийте сайт
2. Заповніть форму
3. Натисніть "Відправити"
4. Перевірте Telegram — має прийти повідомлення! 🎉

---

## 🔧 Додаткові налаштування (опціонально)

### Додавання кнопок у повідомлення

У функції `sendToTelegram` додайте:

```javascript
body: JSON.stringify({
  chat_id: TELEGRAM_CHAT_ID,
  text: message,
  parse_mode: 'HTML',
  reply_markup: {
    inline_keyboard: [
      [
        { text: '✅ Прийнято', callback_data: 'accepted' },
        { text: '❌ Відхилити', callback_data: 'declined' }
      ],
      [
        { text: '📞 Зателефонувати', url: 'tel:+380970312970' }
      ]
    ]
  }
})
```

### Налаштування повідомлень в групу

Якщо хочете отримувати заявки в групу Telegram:

1. Додайте бота до групи
2. Зробіть його адміністратором
3. Отримайте Group Chat ID (він буде виглядати як `-123456789`)
4. Використовуйте цей ID замість особистого Chat ID

---

## 📊 Моніторинг

### Перевірка логів Cloudflare Worker

1. Зайдіть у ваш Worker на Cloudflare
2. Вкладка **"Logs"** → **"Begin log stream"**
3. Відправте тестову заявку
4. Подивіться логи в реальному часі

---

## ❗ Troubleshooting

### Заявки не приходять

1. **Перевірте Worker URL** — він має бути правильним у `main.js`
2. **Перевірте токен бота** — він має бути активним
3. **Перевірте Chat ID** — має бути правильним
4. **Подивіться логи** на Cloudflare Workers
5. **Перевірте CORS** — має бути налаштований правильно

### Помилка 403 Forbidden

Ваш Chat ID неправильний або бот заблокований. Напишіть боту `/start`.

### Помилка 401 Unauthorized

Токен бота неправильний. Перевірте його в @BotFather.

---

## 🔒 Безпека

### Захист від спаму

Worker вже має honeypot захист в коді сайту. Додатково можна:

1. Додати rate limiting в Worker:

```javascript
// На початку handleRequest
const clientIP = request.headers.get('CF-Connecting-IP');
// Перевірити кількість запитів з цього IP
```

2. Додати Google reCAPTCHA на сайт

---

## 💰 Вартість

- **Telegram Bot** — безкоштовно
- **Cloudflare Worker** — безкоштовно до 100,000 запитів/день

Цього більш ніж достатньо для отримання заявок! 🎉

---

## 📞 Підтримка

Якщо виникли проблеми:
- Telegram: [@ArtyneStudio](https://t.me/ArtyneStudio)
- Телефон: +38 (097) 031-29-70
