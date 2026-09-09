document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro');
  const openInvite = document.getElementById('openInvite');
  const site = document.querySelector('.site');
  const music = document.getElementById('music');
  const musicToggle = document.getElementById('musicToggle');

  if (openInvite && intro && site) {
    openInvite.addEventListener('click', () => {
      intro.style.display = 'none';
      site.classList.add('visible');
      if (music) {
        music.play().then(() => musicToggle?.classList.add('playing')).catch(() => {});
      }
    });
  }

  if (musicToggle && music) {
    musicToggle.addEventListener('click', () => {
      if (music.paused) {
        music.play().then(() => musicToggle.classList.add('playing')).catch(() => {});
      } else {
        music.pause();
        musicToggle.classList.remove('playing');
      }
    });
  }

  // Evento: 23 de octubre de 2026, 8:00 PM (hora local del dispositivo)
  const eventDate = new Date(2026, 9, 23, 20, 0, 0);

  const pad = n => String(Math.max(0, n)).padStart(2, '0');

  function updateCountdown() {
    const diff = eventDate.getTime() - Date.now();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Animaciones de aparición
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));
});
