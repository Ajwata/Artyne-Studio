// === DIGITAL PARTICLE CLOUD (хаотичное движение) ===
const cloud = document.getElementById("particleCloud");
const cctx = cloud.getContext("2d");

function resizeCloud() {
  cloud.width = window.innerWidth;
  cloud.height = window.innerHeight;
}
window.addEventListener("resize", resizeCloud);
resizeCloud();

const particles = [];
const count = 180;

for (let i = 0; i < count; i++) {
  particles.push({
    x: Math.random() * cloud.width,
    y: Math.random() * cloud.height,
    size: Math.random() * 2.2 + 0.6,
    alpha: Math.random() * 0.5 + 0.4,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
  });
}

function animateCloud() {
  cctx.clearRect(0, 0, cloud.width, cloud.height);

  // тонкое неоновое свечение между близкими частицами
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const alpha = 1 - dist / 100;
        cctx.strokeStyle = `rgba(255,255,255,${alpha * 0.25})`;
        cctx.lineWidth = 0.6;
        cctx.beginPath();
        cctx.moveTo(particles[i].x, particles[i].y);
        cctx.lineTo(particles[j].x, particles[j].y);
        cctx.stroke();
      }
    }
  }

  // движение частиц
  for (let p of particles) {
    p.x += p.vx * 0.6;
    p.y += p.vy * 0.6;

    // плавный разворот на краях
    if (p.x < 0 || p.x > cloud.width) p.vx *= -1;
    if (p.y < 0 || p.y > cloud.height) p.vy *= -1;

    // частицы
    cctx.beginPath();
    cctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    cctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
    cctx.fill();
  }

  requestAnimationFrame(animateCloud);
}
animateCloud();

// === CTA BUTTONS - SCROLL TO FORM ===
document.querySelectorAll('.cta-button').forEach(btn => {
  btn.addEventListener('click', () => {
    const form = document.getElementById('landingForm');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Фокус на перше поле через 500мс після скролу
      setTimeout(() => {
        const firstInput = form.querySelector('input[name="name"]');
        if (firstInput) firstInput.focus();
      }, 500);
    }
  });
});

// === SMOOTH SCROLL FOR ANCHOR LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// === LANDING FORM SUBMISSION ===
const landingForm = document.getElementById('landingForm');
if (landingForm) {
  landingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fd = new FormData(landingForm);
    
    // Honeypot перевірка
    if (fd.get('website')) {
      console.warn('⚠️ Спам-бот заблоковано');
      return;
    }

    const submitBtn = landingForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Відправляємо...</span>';
    submitBtn.disabled = true;

    const name = fd.get('name');
    const phone = fd.get('phone');
    const message = fd.get('message') || 'не вказано';

    const text = `
🆕 Нова заявка з Landing Page!

👤 Ім'я: ${name}
📞 Телефон: ${phone}
💬 Повідомлення: ${message}

📄 Сторінка: Landing Page
🌐 URL: ${window.location.href}
`;

    try {
      // ЗАМІНІТЬ URL на ваш Cloudflare Worker URL
      const response = await fetch('https://telegrambot.shonraprince.workers.dev/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      if (response.ok) {
        submitBtn.innerHTML = '<span>✓ Відправлено!</span>';
        submitBtn.style.background = 'linear-gradient(90deg, #00d084, #0077ff)';
        landingForm.reset();
        
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      } else {
        throw new Error('Помилка відправки');
      }
    } catch (err) {
      console.error('❌ Помилка:', err);
      submitBtn.innerHTML = '<span>❌ Помилка. Спробуйте ще раз</span>';
      submitBtn.disabled = false;
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
      }, 3000);
    }
  });
}

// === BACK TO TOP BUTTON ===
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
  // Показати кнопку після прокрутки 300px
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  // Клік — скрол вгору
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}







