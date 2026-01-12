# 🤖 ШВИДКЕ НАЛАШТУВАННЯ TELEGRAM БОТА

## ✅ Крок 1: Бот створено!

Ваш бот: **[@artyne_studio_bot](https://t.me/artyne_studio_bot)** 🎉

---

## 📋 Крок 2: Отримайте ваш Chat ID (30 секунд)

### Спосіб А (найпростіший):
1. Відкрийте [@userinfobot](https://t.me/userinfobot)
2. Напишіть `/start`
3. Скопіюйте **Id:** (наприклад: `123456789`)

### Спосіб Б (через ваш бот):
1. Напишіть [@artyne_studio_bot](https://t.me/artyne_studio_bot) — `/start`
2. Відкрийте в браузері:
   ```
   https://api.telegram.org/bot8201047778:AAHhZ6vBueklKoIm8SKiTVPlpy3ZWzCxFfo/getUpdates
   ```
3. Знайдіть: `"chat":{"id":123456789}` ← це ваш Chat ID

---

## 🔧 Крок 3: Налаштуйте Cloudflare Worker (3 хвилини)

### 3.1 Створіть Worker
1. Зайдіть: [workers.cloudflare.com](https://workers.cloudflare.com)
2. Sign Up (безкоштовно)
3. **Create a Service**
4. Назва: `artyne-telegram-bot`
5. **Create service**

### 3.2 Вставте код
1. Натисніть **Quick edit**
2. **Видаліть** весь код що там є
3. **Скопіюйте** код нижче:

```javascript
// Cloudflare Worker для Telegram
const TELEGRAM_BOT_TOKEN = '8201047778:AAHhZ6vBueklKoIm8SKiTVPlpy3ZWzCxFfo';
const TELEGRAM_CHAT_ID = '8287036498'; // ✅ Ваш Chat ID вже тут!

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405,
      headers: corsHeaders 
    });
  }

  try {
    const data = await request.json();
    
    // Honeypot захист
    if (data.website) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const message = `
🔔 <b>Нова заявка з сайту!</b>

👤 <b>Ім'я:</b> ${data.name || 'Не вказано'}
📞 <b>Контакт:</b> ${data.contacts || 'Не вказано'}
💰 <b>Бюджет:</b> ${data.budget || 'Не вказано'}
📝 <b>Коментар:</b> ${data.comments || 'Не вказано'}

📍 <b>Джерело:</b> ${data.form_source || 'Сайт'}
⏰ <b>Час:</b> ${new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' })}
    `.trim();
    
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML'
        })
      }
    );
    
    if (telegramResponse.ok) {
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Заявка успішно відправлена' 
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } else {
      throw new Error('Telegram API error');
    }
    
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Помилка відправки' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}
```

4. **ЗАМІНІТЬ** `YOUR_CHAT_ID` на ваш Chat ID з кроку 2
5. **Save and Deploy**
6. **Скопіюйте URL** worker (виглядає як `https://artyne-telegram-bot.ваш-username.workers.dev`)

---

## 🌐 Крок 4: Оновіть сайт (1 хвилина)

1. Відкрийте файл `js/main.js`
2. Знайдіть рядок (близько 250):
   ```javascript
   const response = await fetch("https://telegrambot.shonraprince.workers.dev/", {
   ```
3. Замініть URL на ваш Worker URL:
   ```javascript
   const response = await fetch("https://artyne-telegram-bot.ВАШ-USERNAME.workers.dev/", {
   ```
4. Збережіть файл

---

## 🚀 Крок 5: Завантажте на GitHub

```bash
git add .
git commit -m "Add Telegram bot integration"
git push
```

Або просто запустіть: `deploy-to-github.bat`

---

## ✅ Крок 6: ТЕСТ!

1. Відкрийте ваш сайт
2. Заповніть форму
3. Відправте
4. **Перевірте Telegram** — має прийти повідомлення! 🎉

---

## ❗ Якщо не працює

### Заявки не приходять?

1. **Перевірте Chat ID:**
   - Він має бути ЧИСЛО (без лапок)
   - Приклад: `123456789` ✅
   - НЕ: `"123456789"` ❌

2. **Перевірте Worker URL:**
   - Відкрийте `js/main.js`
   - URL має закінчуватись на `.workers.dev/`
   - Має бути БЕЗ `https://` у деяких місцях? НІ, має бути З `https://`

3. **Напишіть боту:**
   - Обов'язково напишіть [@artyne_studio_bot](https://t.me/artyne_studio_bot) `/start`
   - Інакше він не зможе надіслати повідомлення

4. **Подивіться логи:**
   - Cloudflare Workers → ваш worker → Logs → Begin log stream
   - Відправте тестову форму
   - Подивіться що в логах

---

## 🔒 Безпека

**⚠️ ВАЖЛИВО:**

Після налаштування, якщо ви будете пушити код на GitHub:

1. **НЕ** публікуйте токен у відкритому репозиторії
2. Використовуйте **Environment Variables** на Cloudflare:
   - Workers → ваш worker → Settings → Variables
   - Додайте: `TELEGRAM_BOT_TOKEN` та `TELEGRAM_CHAT_ID`
   - У коді змініть на: `env.TELEGRAM_BOT_TOKEN`

Або зробіть репозиторій **Private** на GitHub.

---

## 🎉 Готово!

Тепер ви отримуватимете всі заявки з сайту прямо в Telegram!

**Ваш бот:** [@artyne_studio_bot](https://t.me/artyne_studio_bot)

---

## 📞 Підтримка

Виникли проблеми? Напишіть в [@ArtyneStudio](https://t.me/ArtyneStudio)
