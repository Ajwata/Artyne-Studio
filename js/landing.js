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






