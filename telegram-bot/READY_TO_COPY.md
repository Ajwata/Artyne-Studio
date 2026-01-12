# 🎉 ВСЕ ГОТОВО! Просто скопіюйте цей код

## ✅ Ваші дані:
- **Бот:** [@artyne_studio_bot](https://t.me/artyne_studio_bot)
- **Token:** `8201047778:AAHhZ6vBueklKoIm8SKiTVPlpy3ZWzCxFfo`
- **Chat ID:** `8287036498`

---

## 📋 Код для Cloudflare Worker

**Просто скопіюйте весь код нижче та вставте в Worker:**

```javascript
// Cloudflare Worker для Artyne Studio
const TELEGRAM_BOT_TOKEN = '8201047778:AAHhZ6vBueklKoIm8SKiTVPlpy3ZWzCxFfo';
const TELEGRAM_CHAT_ID = '8287036498';

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
    
    // Honeypot захист від спаму
    if (data.website) {
      console.log('🤖 Бот заблоковано');
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Форматування повідомлення
    const message = `
🔔 <b>Нова заявка з сайту!</b>

👤 <b>Ім'я:</b> ${data.name || 'Не вказано'}
📞 <b>Контакт:</b> ${data.contacts || 'Не вказано'}
💰 <b>Бюджет:</b> ${data.budget || 'Не вказано'}
📝 <b>Коментар:</b> ${data.comments || 'Не вказано'}

📍 <b>Джерело:</b> ${data.form_source || 'Сайт'}
⏰ <b>Час:</b> ${new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' })}
    `.trim();
    
    // Відправка в Telegram
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
      console.log('✅ Заявка відправлена в Telegram');
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Заявка успішно відправлена' 
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } else {
      const error = await telegramResponse.text();
      console.error('❌ Telegram API помилка:', error);
      throw new Error('Telegram API error');
    }
    
  } catch (error) {
    console.error('❌ Помилка:', error);
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

---

## 🚀 Інструкція:

1. Зайдіть: [workers.cloudflare.com](https://workers.cloudflare.com)
2. **Create a Service** → назва: `artyne-telegram-bot`
3. **Quick edit** → видаліть весь код
4. **Скопіюйте код вище** (весь блок)
5. **Вставте** в Worker
6. **Save and Deploy**
7. **Скопіюйте URL** (буде виглядати як `https://artyne-telegram-bot.username.workers.dev`)

---

## ✅ Готово!

Тепер оновіть `js/main.js` — замініть URL на ваш Worker URL і запуште на GitHub!

---

**Все вже налаштовано — нічого міняти не треба!** 🎉
