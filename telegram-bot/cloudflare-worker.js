/**
 * Cloudflare Worker для відправки заявок з сайту в Telegram
 * 
 * Інструкція:
 * 1. Створіть бота через @BotFather в Telegram
 * 2. Отримайте TOKEN бота
 * 3. Отримайте ваш CHAT_ID (напишіть боту /start і зайдіть на https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates)
 * 4. Створіть Worker на Cloudflare Workers (workers.cloudflare.com)
 * 5. Вставте цей код та налаштуйте змінні оточення
 */

// === НАЛАШТУВАННЯ ===
// ⚠️ ВАЖЛИВО: Не коміттьте цей файл з реальними токенами в публічний репозиторій!
// Використовуйте Environment Variables на Cloudflare Workers
const TELEGRAM_BOT_TOKEN = '8201047778:AAHhZ6vBueklKoIm8SKiTVPlpy3ZWzCxFfo';
const TELEGRAM_CHAT_ID = '8287036498'; // ✅ Ваш Chat ID вже тут!

// === CORS Headers ===
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Обробка OPTIONS запиту (CORS preflight)
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Тільки POST запити
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405,
      headers: corsHeaders 
    });
  }

  try {
    const data = await request.json();
    
    // Формуємо повідомлення для Telegram
    const message = formatMessage(data);
    
    // Відправляємо в Telegram
    const telegramResponse = await sendToTelegram(message);
    
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

function formatMessage(data) {
  const { name, contacts, budget, comments, form_source } = data;
  
  return `
🔔 <b>Нова заявка з сайту!</b>

👤 <b>Ім'я:</b> ${name || 'Не вказано'}
📞 <b>Контакт:</b> ${contacts || 'Не вказано'}
💰 <b>Бюджет:</b> ${budget || 'Не вказано'}
📝 <b>Коментар:</b> ${comments || 'Не вказано'}

📍 <b>Джерело:</b> ${form_source || 'Сайт'}
⏰ <b>Час:</b> ${new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' })}
  `.trim();
}

async function sendToTelegram(message) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  return await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    })
  });
}
