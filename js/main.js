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
  const mqDesktop = window.matchMedia("(min-width: 1200px)");
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
        const href = link.getAttribute("href") || "";
        if (href === "#" || href === "") e.preventDefault();

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
      // используем и click, и touchstart для iPhone
      ["click", "touchstart"].forEach((eventName) => {
        trigger.addEventListener(
          eventName,
          (e) => {
            if (window.innerWidth < 1200) {
              e.preventDefault();
              e.stopPropagation();
              const submenu = trigger.nextElementSibling;
              if (!submenu) return;

              const isOpen = submenu.classList.contains("open");

              // Если уже открыто — закрываем
              if (isOpen) {
                submenu.classList.remove("open");
                trigger.classList.remove("active");
                return;
              }

              // Закрываем остальные
              document
                .querySelectorAll(".submenu.open, .submenu-grid-wide.open")
                .forEach((s) => s.classList.remove("open"));
              document
                .querySelectorAll(".has-submenu.active")
                .forEach((a) => a.classList.remove("active"));

              // Открываем текущее
              submenu.classList.add("open");
              trigger.classList.add("active");
            }
          },
          { passive: false } // важно для iOS — иначе preventDefault не сработает
        );
      });
    });

    // Клик вне меню — закрывает всё
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

// === Прозрачность шапки при скролле ===
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
});

// === Повтор видео (если отключено autoplay loop) ===
const video = document.querySelector(".bg-video video");
if (video) {
  video.addEventListener("ended", () => {
    video.currentTime = 0;
    video.play();
  });
}

// === Задержка появления контента (4 секунды) ===
window.addEventListener("load", () => {
  setTimeout(() => {
    document.body.classList.add("content-visible");
    const header = document.querySelector("header");
    if (header) header.classList.add("visible");
  }, 4000);
});
