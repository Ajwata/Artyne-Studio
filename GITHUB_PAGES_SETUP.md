# 🚀 Запуск сайту на GitHub Pages

## Крок 1: Підготовка репозиторію

### 1.1 Створення репозиторію на GitHub

1. Зайдіть на [github.com](https://github.com)
2. Натисніть **"New repository"** (зелена кнопка)
3. Введіть назву репозиторію: `artyne-studio` (або будь-яку іншу)
4. Виберіть **Public** (для безкоштовного GitHub Pages)
5. **НЕ** додавайте README, .gitignore або ліцензію (у нас вже є)
6. Натисніть **"Create repository"**

---

## Крок 2: Завантаження файлів

### Варіант А: Через Git (рекомендовано)

#### 2.1 Ініціалізація Git
Відкрийте термінал у папці проекту:

```bash
cd d:\Artyne-Studio-main\Artyne-Studio-main
git init
git add .
git commit -m "Initial commit - Artyne Studio website"
```

#### 2.2 Підключення до GitHub
Замініть `YOUR-USERNAME` на ваш GitHub username:

```bash
git remote add origin https://github.com/YOUR-USERNAME/artyne-studio.git
git branch -M main
git push -u origin main
```

### Варіант Б: Через веб-інтерфейс GitHub

1. Відкрийте ваш новий репозиторій на GitHub
2. Натисніть **"uploading an existing file"**
3. Перетягніть всі файли з папки `Artyne-Studio-main`
4. Натисніть **"Commit changes"**

---

## Крок 3: Налаштування GitHub Pages

### 3.1 Активація GitHub Pages

1. Відкрийте ваш репозиторій на GitHub
2. Перейдіть у **Settings** (шестерінка вгорі)
3. У лівому меню натисніть **"Pages"**
4. У розділі **"Source"** виберіть:
   - **Deploy from a branch**
   - Branch: **main** (або **master**)
   - Folder: **/ (root)**
5. Натисніть **"Save"**

### 3.2 Активація GitHub Actions (автодеплой)

1. У **Settings → Pages** виберіть:
   - Source: **GitHub Actions**
2. Файл `.github/workflows/deploy.yml` вже створений — він автоматично задеплоїть сайт

---

## Крок 4: Отримання URL сайту

Через 2-3 хвилини ваш сайт буде доступний за адресою:

```
https://YOUR-USERNAME.github.io/artyne-studio/
```

Приклад:
- Username: `johnsmith`
- Репозиторій: `artyne-studio`
- URL: `https://johnsmith.github.io/artyne-studio/`

---

## Крок 5: Налаштування власного домену (опціонально)

### 5.1 Якщо у вас є домен (наприклад, artynestudio.com)

1. У налаштуваннях **GitHub Pages** знайдіть **"Custom domain"**
2. Введіть ваш домен: `artynestudio.com`
3. Натисніть **"Save"**

### 5.2 Налаштування DNS у реєстратора домену

Додайте такі DNS записи:

```
Тип: A
Name: @
Value: 185.199.108.153

Тип: A
Name: @
Value: 185.199.109.153

Тип: A
Name: @
Value: 185.199.110.153

Тип: A
Name: @
Value: 185.199.111.153

Тип: CNAME
Name: www
Value: YOUR-USERNAME.github.io
```

### 5.3 HTTPS

GitHub автоматично створить безкоштовний SSL сертифікат від Let's Encrypt через 15-30 хвилин.

---

## Крок 6: Оновлення посилань на сайті

### 6.1 Якщо використовуєте поддомен GitHub Pages

Відкрийте файли і замініть URL:

**index.html:**
```html
<!-- Було -->
<meta property="og:url" content="https://artynestudio.com/">

<!-- Стало -->
<meta property="og:url" content="https://YOUR-USERNAME.github.io/artyne-studio/">
```

**sitemap.xml:**
```xml
<!-- Замініть всі URL на ваш GitHub Pages URL -->
<loc>https://YOUR-USERNAME.github.io/artyne-studio/</loc>
```

**Schema.org у index.html:**
```json
"url": "https://YOUR-USERNAME.github.io/artyne-studio/",
```

### 6.2 Якщо використовуєте власний домен

Залишіть як є (`artynestudio.com`), все працюватиме!

---

## Крок 7: Перевірка

### 7.1 Перевірте, чи сайт працює

Відкрийте в браузері ваш GitHub Pages URL.

### 7.2 Перевірте форми

1. Заповніть форму на сайті
2. Натисніть "Відправити"
3. Має прийти повідомлення в Telegram (якщо налаштовано)

### 7.3 Перевірте SEO

- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- Введіть ваш URL і перевірте швидкість

---

## 🔄 Як оновлювати сайт

### Через Git:

```bash
# 1. Внесіть зміни в файли
# 2. Збережіть їх
# 3. Виконайте команди:

git add .
git commit -m "Оновлення сайту"
git push
```

Через 1-2 хвилини зміни з'являться на сайті автоматично!

### Через веб-інтерфейс:

1. Зайдіть у репозиторій на GitHub
2. Відкрийте файл, який хочете змінити
3. Натисніть кнопку "Edit" (олівець)
4. Внесіть зміни
5. Натисніть **"Commit changes"**

---

## 📊 Моніторинг

### GitHub Actions

1. У репозиторії відкрийте вкладку **"Actions"**
2. Тут ви побачите всі деплойменти
3. Зелена галочка ✅ — деплой успішний
4. Червоний хрестик ❌ — є помилки

### Трафік

1. У репозиторії: **Insights → Traffic**
2. Тут ви побачите статистику відвідувачів

---

## ❗ Troubleshooting

### Сайт не відкривається (404)

1. Перевірте, чи активовано GitHub Pages у налаштуваннях
2. Перевірте, чи існує файл `index.html` у корені репозиторію
3. Зачекайте 5-10 хвилин після першого деплою

### CSS/JS не завантажуються

Якщо ваш репозиторій не в корені (наприклад, `/artyne-studio/`), додайте:

```html
<base href="/artyne-studio/">
```

У `<head>` секції `index.html`.

### Зображення не показуються

Перевірте шляхи до зображень — вони мають бути відносними:

```html
<!-- Правильно -->
<img src="src/logo.png" alt="Logo">

<!-- Неправильно -->
<img src="/src/logo.png" alt="Logo">
```

---

## 🎉 Готово!

Ваш сайт тепер працює на GitHub Pages!

**URL сайту:** `https://YOUR-USERNAME.github.io/artyne-studio/`

### Що далі?

1. ✅ [Налаштуйте Telegram бота](telegram-bot/setup-telegram-bot.md)
2. ✅ [Додайте Google Analytics](OPTIMIZATION_GUIDE.md)
3. ✅ [Зареєструйте сайт у Google Search Console](LAUNCH_CHECKLIST.md)

---

## 📞 Підтримка

- Telegram: [@ArtyneStudio](https://t.me/ArtyneStudio)
- GitHub Issues: створіть issue у вашому репозиторії
