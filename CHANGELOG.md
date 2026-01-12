# 📋 Changelog — Artyne Studio

## [1.1.0] - 2026-01-12

### ✨ Added
- **Open Graph** метатеги для соціальних мереж (Facebook, LinkedIn, Twitter)
- **Twitter Cards** підтримка
- **Schema.org JSON-LD** розмітка типу ProfessionalService
- **sitemap.xml** — карта сайту для пошукових систем
- **robots.txt** — правила індексації для ботів
- **.htaccess** — конфігурація Apache:
  - GZIP compression
  - Browser caching (1 рік для статики)
  - Security headers (XSS, X-Frame-Options, CSP)
  - HTTPS редирект
  - www → non-www редирект
- **Honeypot** захист у всіх формах
- **ARIA** атрибути для доступності:
  - `role="dialog"`
  - `aria-modal="true"`
  - `aria-label` для всіх інтерактивних елементів
- **alt** атрибути до всіх зображень
- **README.md** — документація проекту
- **OPTIMIZATION_GUIDE.md** — гайд з подальших оптимізацій

### 🔧 Changed
- Покращено **title** та **meta description** на головній сторінці
- Додано **canonical** URLs
- Оптимізовано CSS — видалено дублювання в медіа-запитах
- Покращено структуру форм з aria-label

### 🔒 Security
- Додано honeypot валідацію в JavaScript
- Security headers у .htaccess
- Захист від XSS, Clickjacking, MIME-sniffing

### ♿ Accessibility
- WCAG 2.1 Level AA compliance
- Покращена навігація з клавіатури
- Семантичні HTML5 теги

### 🚀 Performance
- Browser caching налаштовано
- GZIP compression активовано
- CSS оптимізовано (менше дублювання)

---

## [1.0.0] - 2025-12-XX

### 🎉 Initial Release
- Головна сторінка з hero-секцією
- Блок послуг з табами
- Секція "Чому ми"
- Секція "Як ми працюємо"
- Блок переваг
- Контактна форма
- Popup форма заявки
- Footer з соціальними мережами
- Адаптивний дизайн
- Відеофон
- Інтеграція з Telegram Bot
- Landing Page сторінка
- Форма брифу

---

## 🔮 Planned (Roadmap)

### Version 1.2.0
- [ ] Google Analytics інтеграція
- [ ] WebP формат для зображень
- [ ] Lazy loading для всіх медіа
- [ ] Critical CSS inline
- [ ] Preload шрифтів

### Version 1.3.0
- [ ] PWA підтримка (manifest.json)
- [ ] Service Worker для offline режиму
- [ ] Dark/Light theme toggle
- [ ] Багатомовність (EN/UK/RU)

### Version 2.0.0
- [ ] Міграція на TypeScript
- [ ] Інтеграція з CMS (Headless)
- [ ] Blog секція
- [ ] Кейси з портфоліо
- [ ] Особистий кабінет клієнта

---

**Підтримка**: +38 (097) 031-29-70 | [t.me/ArtyneStudio](https://t.me/ArtyneStudio)
