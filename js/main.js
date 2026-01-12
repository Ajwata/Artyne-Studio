// === Ініціалізація навігації ===
function initNavigation() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.querySelector("nav");
  const overlay = document.querySelector(".overlay");

  if (!toggle || !nav || !overlay) return;

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
  const mqDesktop = window.matchMedia("(min-width:1200px)");
  let cleanup = () => {};

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
}

// Автоматична ініціалізація при завантаженні
document.addEventListener('DOMContentLoaded', function() {
  // Якщо header вже є на сторінці
  const header = document.querySelector('header');
  if (header) {
    initNavigation();
    
    // Ініціалізація sticky header одразу
    function updateHeaderOnScroll() {
      if (window.scrollY > 10) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
    
    // Додаємо слухача скролу
    window.addEventListener("scroll", updateHeaderOnScroll);
    
    // Викликаємо одразу, щоб перевірити поточну позицію
    updateHeaderOnScroll();
  }
});

// === Повтор видео ===
const video = document.querySelector(".bg-video video");
if (video) {
  video.addEventListener("ended", () => {
    video.currentTime = 0;
    video.play();
  });
}

// === Появление контента ===
const showContent = () => {
  const header = document.querySelector("header");
  document.body.classList.add("content-visible");
  if (header) header.classList.add("visible");
};

const isMobile =
  /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent) ||
  window.innerWidth <= 1199;

if (isMobile) {
  document.addEventListener("DOMContentLoaded", showContent);
} else {
  window.addEventListener("load", () => {
    setTimeout(showContent, 3000);
  });
}

// === Parallax ===
document.addEventListener("mousemove", (e) => {
  const layers = document.querySelectorAll(".layer");
  const x = (e.clientX - window.innerWidth / 2) / 50;
  const y = (e.clientY - window.innerHeight / 2) / 50;
  layers.forEach((layer) => {
    const speed = layer.dataset.speed;
    layer.style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0)`;
  });
});

// === Tabs ===
const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    tabContents.forEach((c) => c.classList.remove("active"));
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// === Popup ===
window.addEventListener("load", () => {
  const popup = document.querySelector(".popup-overlay");
  const openBtn = document.querySelector(".open-popup");
  const closeBtn = document.querySelector(".popup-close");

  if (!popup || !openBtn || !closeBtn) return;

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

// === Відправка заявки ===
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    
    // Honeypot захист: якщо поле "website" заповнене - це бот
    if (fd.get("website")) {
      console.warn("⚠️ Спам-бот заблоковано");
      showSuccessPopup("✅ Заявка відправлена", false);
      return; // не відправляємо
    }

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
      showSuccessPopup("✅ Ваша заявка успішно відправлена!");
    } catch (err) {
      console.error("❌ Помилка при відправці:", err);
      showSuccessPopup("❌ Помилка при відправці. Спробуйте пізніше.", true);
    }
  });
});

// === Popup повідомлення ===
function showSuccessPopup(message, isError = false) {
  const existing = document.querySelector(".success-popup");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.className = "success-popup";
  overlay.innerHTML = `
    <div class="popup-box ${isError ? "error" : ""}">
      <div class="popup-gradient"></div>
      <div class="popup-inner">
        <h2>${message}</h2>
        <p>${isError ? "Виникла помилка, спробуйте пізніше." : "Ми зв’яжемось із вами найближчим часом."}</p>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  setTimeout(() => overlay.classList.add("show"), 50);
  setTimeout(() => {
    overlay.classList.remove("show");
    setTimeout(() => {
      overlay.remove();
      if (!isError) location.reload();
    }, 400);
  }, 3000);
}

// === Телефон: автоформат + оператор + только цифры ===
(function () {
  function formatUaPhone(digits) {
    let v = digits.replace(/\D/g, "");
    if (v.startsWith("0")) v = "38" + v;
    if (!v.startsWith("380")) v = "380" + v;
    v = v.slice(0, 12);
    if (v.length <= 3) return "+" + v;
    let out = "+380";
    const rest = v.slice(3);
    if (rest.length > 0) out += " " + rest.slice(0, 2);
    if (rest.length > 2) out += " " + rest.slice(2, 5);
    if (rest.length > 5) out += " " + rest.slice(5, 7);
    if (rest.length > 7) out += " " + rest.slice(7, 9);
    return out;
  }

  function enforceDigits(input, opts = {}) {
    input.addEventListener("paste", (e) => {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData)
        .getData("text")
        .replace(/\D/g, "");
      document.execCommand("insertText", false, text);
    });

    input.addEventListener("beforeinput", (e) => {
      if (e.inputType === "insertText" && /\D/.test(e.data)) e.preventDefault();
    });

    input.addEventListener("input", () => {
      const rawDigits = input.value.replace(/\D/g, "");
      if (opts.type === "ua-phone") {
        input.value = formatUaPhone(rawDigits);
        const op = (d) => {
          if (d.startsWith("38050") || d.startsWith("38066") || d.startsWith("38095"))
            return { name: "Vodafone", color: "#e60000" };
          if (d.startsWith("38063") || d.startsWith("38073") || d.startsWith("38093"))
            return { name: "Lifecell", color: "#f0a500" };
          if (d.startsWith("38067") || d.startsWith("38068") || d.startsWith("38096") || d.startsWith("38097") || d.startsWith("38098"))
            return { name: "Kyivstar", color: "#007bff" };
          if (d.startsWith("38099"))
            return { name: "Jeans / Kyivstar", color: "#0099ff" };
          return null;
        };
        let label = input.nextElementSibling;
        if (!label || !label.classList.contains("operator-label")) {
          label = document.createElement("div");
          label.className = "operator-label";
          label.style.cssText =
            "font-size:13px;margin-top:4px;color:rgba(255,255,255,0.7);transition:.3s;";
          input.insertAdjacentElement("afterend", label);
        }
        const info = op(rawDigits);
        label.textContent = info ? `Оператор: ${info.name}` : "";
        if (info) label.style.color = info.color;
      } else input.value = rawDigits;
    });
  }

  document
    .querySelectorAll('input[type="tel"]')
    .forEach((el) => enforceDigits(el, { type: "ua-phone" }));
  document
    .querySelectorAll('input[name="budget"]')
    .forEach((el) => enforceDigits(el));
})();
