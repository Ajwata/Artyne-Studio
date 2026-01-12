// === Завантаження header та footer ===
document.addEventListener('DOMContentLoaded', function() {
  // Завантаження header
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    fetch('includes/header.html')
      .then(response => response.text())
      .then(data => {
        headerPlaceholder.innerHTML = data;
        // Після завантаження header ініціалізуємо навігацію
        if (typeof initNavigation === 'function') {
          initNavigation();
        }
      })
      .catch(error => console.error('Error loading header:', error));
  }

  // Завантаження footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    fetch('includes/footer.html')
      .then(response => response.text())
      .then(data => {
        footerPlaceholder.innerHTML = data;
      })
      .catch(error => console.error('Error loading footer:', error));
  }
});
