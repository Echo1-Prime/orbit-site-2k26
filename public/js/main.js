// Echo-1 Labs — Orbit Site 2K26
// Minimal JS — progressive enhancement only

// Mobile nav toggle (if needed)
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav__mobile-toggle');
  const links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
    });
  }
});
