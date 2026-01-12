// === CANVAS ANIMATION - GEOMETRIC SHAPES ===
const lightCanvas = document.getElementById('lightGrid');
const cloudCanvas = document.getElementById('particleCloud');

if (lightCanvas && cloudCanvas) {
  const lctx = lightCanvas.getContext('2d');
  const cctx = cloudCanvas.getContext('2d');

  function resize() {
    lightCanvas.width = window.innerWidth;
    lightCanvas.height = window.innerHeight;
    cloudCanvas.width = window.innerWidth;
    cloudCanvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // === ROTATING HEXAGONS ===
  const hexagons = [];
  const hexCount = 15;

  for (let i = 0; i < hexCount; i++) {
    hexagons.push({
      x: Math.random() * lightCanvas.width,
      y: Math.random() * lightCanvas.height,
      size: Math.random() * 40 + 20,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.3 + 0.1
    });
  }

  function drawHexagon(ctx, x, y, size, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const hx = size * Math.cos(angle);
      const hy = size * Math.sin(angle);
      if (i === 0) ctx.moveTo(hx, hy);
      else ctx.lineTo(hx, hy);
    }
    ctx.closePath();
    ctx.restore();
  }

  function animateHexagons() {
    lctx.clearRect(0, 0, lightCanvas.width, lightCanvas.height);

    hexagons.forEach(hex => {
      hex.x += hex.dx;
      hex.y += hex.dy;
      hex.rotation += hex.rotationSpeed;

      if (hex.x < -50) hex.x = lightCanvas.width + 50;
      if (hex.x > lightCanvas.width + 50) hex.x = -50;
      if (hex.y < -50) hex.y = lightCanvas.height + 50;
      if (hex.y > lightCanvas.height + 50) hex.y = -50;

      // Draw hexagon stroke
      drawHexagon(lctx, hex.x, hex.y, hex.size, hex.rotation);
      lctx.strokeStyle = `rgba(0, 119, 255, ${hex.opacity})`;
      lctx.lineWidth = 2;
      lctx.stroke();
    });

    requestAnimationFrame(animateHexagons);
  }
  animateHexagons();

  // === FLOATING TRIANGLES ===
  const triangles = [];
  const triangleCount = 25;

  for (let i = 0; i < triangleCount; i++) {
    triangles.push({
      x: Math.random() * cloudCanvas.width,
      y: Math.random() * cloudCanvas.height,
      size: Math.random() * 15 + 10,
      dx: (Math.random() - 0.5) * 1.2,
      dy: (Math.random() - 0.5) * 1.2,
      opacity: Math.random() * 0.4 + 0.2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03
    });
  }

  function drawTriangle(ctx, x, y, size, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(-size * 0.866, size * 0.5);
    ctx.lineTo(size * 0.866, size * 0.5);
    ctx.closePath();
    ctx.restore();
  }

  function animateTriangles() {
    cctx.clearRect(0, 0, cloudCanvas.width, cloudCanvas.height);

    triangles.forEach(tri => {
      tri.x += tri.dx;
      tri.y += tri.dy;
      tri.rotation += tri.rotationSpeed;

      if (tri.x < -30) tri.x = cloudCanvas.width + 30;
      if (tri.x > cloudCanvas.width + 30) tri.x = -30;
      if (tri.y < -30) tri.y = cloudCanvas.height + 30;
      if (tri.y > cloudCanvas.height + 30) tri.y = -30;

      // Draw triangle with gradient
      const gradient = cctx.createLinearGradient(tri.x - tri.size, tri.y - tri.size, tri.x + tri.size, tri.y + tri.size);
      gradient.addColorStop(0, `rgba(183, 0, 61, ${tri.opacity})`);
      gradient.addColorStop(1, `rgba(0, 119, 255, ${tri.opacity * 0.5})`);

      drawTriangle(cctx, tri.x, tri.y, tri.size, tri.rotation);
      cctx.fillStyle = gradient;
      cctx.fill();
    });

    requestAnimationFrame(animateTriangles);
  }
  animateTriangles();
}

// === CTA BUTTONS - SCROLL TO FORM ===
document.querySelectorAll('.cta-button').forEach(btn => {
  btn.addEventListener('click', () => {
    const form = document.getElementById('corporateForm');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

// === CORPORATE FORM SUBMISSION ===
const corporateForm = document.getElementById('corporateForm');
if (corporateForm) {
  corporateForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fd = new FormData(corporateForm);
    
    if (fd.get('website')) {
      console.warn('⚠️ Спам-бот заблоковано');
      return;
    }

    const submitBtn = corporateForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Відправляємо...</span>';
    submitBtn.disabled = true;

    const name = fd.get('name');
    const phone = fd.get('phone');
    const message = fd.get('message') || 'не вказано';

    const text = `
🆕 Нова заявка з Corporate Page!

👤 Ім'я: ${name}
📞 Телефон: ${phone}
💬 Повідомлення: ${message}

📄 Сторінка: Корпоративний сайт
🌐 URL: ${window.location.href}
`;

    try {
      const response = await fetch('https://telegrambot.shonraprince.workers.dev/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      if (response.ok) {
        submitBtn.innerHTML = '<span>✓ Відправлено!</span>';
        submitBtn.style.background = 'linear-gradient(90deg, #00d084, #0077ff)';
        corporateForm.reset();
        
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      } else {
        throw new Error('Помилка відправки');
      }
    } catch (error) {
      console.error('Помилка:', error);
      submitBtn.innerHTML = '<span>❌ Помилка</span>';
      submitBtn.style.background = 'linear-gradient(90deg, #ff4444, #cc0000)';
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
    }
  });
}

// === BACK TO TOP BUTTON ===
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
