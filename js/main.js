// === Меню ===
const toggle = document.getElementById("menu-toggle");
const nav = document.querySelector("nav");
const overlay = document.querySelector(".overlay");

// === Бургер ===
toggle.addEventListener("click", () => {
  const isActive = nav.classList.toggle("active");
  toggle.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("menu-open", isActive);
});

// === Клик по overlay — закрывает меню ===
overlay.addEventListener("click", closeMenu);

// === Клик вне меню — закрывает меню в мобилке ===
document.addEventListener("click", (e) => {
  if (
    window.innerWidth <= 1199 &&
    !e.target.closest("nav") &&
    !e.target.closest("#menu-toggle")
  ) {
    closeMenu();
  }
});

function closeMenu() {
  nav.classList.remove("active");
  toggle.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("menu-open");
}

// === Контроллер подменю ===
(function () {
  const mqDesktop = window.matchMedia("(min-width:1200px)");
  let cleanup = () => {};

  // === Десктоп ===
  function setupDesktop() {
    const items = Array.from(document.querySelectorAll("nav ul li"));
    let activeMenu = null;

    function open(sub) {
      if (activeMenu && activeMenu !== sub) activeMenu.classList.remove("active");
      sub.classList.add("active");
      activeMenu = sub;
    }

    function closeAll() {
      if (activeMenu) activeMenu.classList.remove("active");
      activeMenu = null;
    }

    items.forEach((li) => {
      const link = li.querySelector(".has-submenu");
      const sub = li.querySelector(".submenu-grid-wide, .submenu");
      if (!sub || !link) return;

      li.addEventListener("mouseenter", () => open(sub));

      link.addEventListener("click", (e) => {
        e.preventDefault();
        if (sub.classList.contains("active")) {
          sub.classList.remove("active");
          activeMenu = null;
        } else {
          open(sub);
        }
      });
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest("nav")) closeAll();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeAll();
    });

    cleanup = () => {
      document
        .querySelectorAll(".submenu-grid-wide.active, .submenu.active")
        .forEach((s) => s.classList.remove("active"));
    };
  }

  // === Мобильная версия ===
  function setupMobile() {
    const submenuTriggers = document.querySelectorAll(".has-submenu");

    submenuTriggers.forEach((trigger) => {
      const submenu = trigger.nextElementSibling;
      if (!submenu) return;

      const toggleMenu = (e) => {
        if (window.innerWidth >= 1200) return;
        e.preventDefault();
        e.stopPropagation();

        const isOpen = submenu.classList.contains("open");

        document
          .querySelectorAll(".submenu.open, .submenu-grid-wide.open")
          .forEach((s) => s.classList.remove("open"));
        document
          .querySelectorAll(".has-submenu.active")
          .forEach((a) => a.classList.remove("active"));

        if (!isOpen) {
          submenu.classList.add("open");
          trigger.classList.add("active");
        }
      };

      trigger.addEventListener("touchend", toggleMenu);
      trigger.addEventListener("click", toggleMenu);
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest("nav") && !e.target.closest("#menu-toggle")) {
        document
          .querySelectorAll(".submenu.open, .submenu-grid-wide.open")
          .forEach((s) => s.classList.remove("open"));
        document
          .querySelectorAll(".has-submenu.active")
          .forEach((a) => a.classList.remove("active"));
      }
    });

    cleanup = () => {
      document
        .querySelectorAll(".submenu, .submenu-grid-wide")
        .forEach((s) => s.classList.remove("open"));
      document
        .querySelectorAll(".has-submenu.active")
        .forEach((a) => a.classList.remove("active"));
    };
  }

  function apply() {
    cleanup();
    if (mqDesktop.matches) setupDesktop();
    else setupMobile();
  }

  mqDesktop.addEventListener("change", apply);
  apply();
})();



// === Повтор видео (если отключено autoplay loop) ===
const video = document.querySelector(".bg-video video");
if (video) {
  video.addEventListener("ended", () => {
    video.currentTime = 0;
    video.play();
  });
}

// === Появление контента: мгновенно на мобильных, с эффектом на десктопе ===
const showContent = () => {
  const header = document.querySelector("header");
  document.body.classList.add("content-visible");
  if (header) header.classList.add("visible");
};

const isMobile =
  /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent) ||
  window.innerWidth <= 1199;

// Для мобильных — сразу после загрузки DOM
if (isMobile) {
  document.addEventListener("DOMContentLoaded", showContent);
} else {
  // Для десктопа — ждём всё (видео, шрифты и т.д.)
  window.addEventListener("load", () => {
    setTimeout(showContent, 500);
  });
}



// === Depth motion parallax ===
document.addEventListener("mousemove", (e) => {
  const layers = document.querySelectorAll(".layer");
  const x = (e.clientX - window.innerWidth / 2) / 50;
  const y = (e.clientY - window.innerHeight / 2) / 50;
  layers.forEach((layer) => {
    const speed = layer.dataset.speed;
    layer.style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0)`;
  });
});


const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    tabContents.forEach(c => c.classList.remove('active'));
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});


window.addEventListener("load", () => {
  const popup = document.querySelector(".popup-overlay");
  const openBtn = document.querySelector(".open-popup");
  const closeBtn = document.querySelector(".popup-close");

  if (!popup || !openBtn || !closeBtn) return; // защита от ошибок

  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    popup.classList.remove("active");
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.classList.remove("active");
  });
});



// === Эффект рыбьего глаза при скролле === //
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (!header) return;
  
  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});







// === Відправка заявки (Ім'я, Телефон, Бюджет, Коментар) ===
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fd = new FormData(form);

    const name = fd.get("name")?.trim() || "-";
    const phone = fd.get("phone")?.trim() || "-";
    const budget = fd.get("budget")?.trim() || "-";
    const comment =
      fd.get("message")?.trim() ||
      fd.get("comment")?.trim() ||
      fd.get("comments")?.trim() ||
      "-";

    const data = {
      name,
      contacts: phone,
      budget,
      comments: comment,
      form_source: form.id || "Artyne Studio форма",
    };

    try {
      const response = await fetch("https://telegrambot.shonraprince.workers.dev/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Network response error");

      console.log("✅ Заявка відправлена:", data);
      form.reset();

      const popup = form.closest(".popup-overlay");
      if (popup) popup.classList.remove("active");

      alert("✅ Ваша заявка успішно відправлена!");
    } catch (err) {
      console.error("❌ Помилка при відправці:", err);
      alert("Помилка при відправці. Спробуйте пізніше.");
    }
  });
});





