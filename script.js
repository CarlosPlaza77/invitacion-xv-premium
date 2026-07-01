const DATA = window.INVITACION || {};
const EVENT_DATE = new Date(DATA.eventDate || '2026-10-23T17:00:00');

const intro = document.getElementById('intro');
const openInvite = document.getElementById('openInvite');
const music = document.getElementById('music');
const musicToggle = document.getElementById('musicToggle');
const musicSource = document.getElementById('musicSource');
const site = document.querySelector('.site');

function setText(selector, value){
  document.querySelectorAll(selector).forEach(el => { if(value) el.textContent = value; });
}

function hydrateContent(){
  setText('[data-field="firstName"]', DATA.firstName);
  setText('[data-field="firstNameFooter"]', DATA.firstName);
  setText('[data-field="fullName"]', DATA.fullName);
  setText('[data-field="displayDate"]', DATA.displayDate);
  setText('[data-field="longDate"]', DATA.longDate);
  setText('[data-field="message"]', DATA.message);
  setText('[data-field="parents"]', DATA.parents);
  setText('[data-field="churchName"]', DATA.churchName);
  setText('[data-field="churchTime"]', DATA.churchTime);
  setText('[data-field="venueName"]', DATA.venueName);
  setText('[data-field="venueTime"]', DATA.venueTime);
  setText('[data-field="dressCode"]', DATA.dressCode);
  setText('[data-field="dressNote"]', DATA.dressNote);
  setText('[data-field="rsvpLimit"]', DATA.rsvpLimit);

  if(DATA.churchMap) document.getElementById('churchMap').href = DATA.churchMap;
  if(DATA.venueMap) document.getElementById('venueMap').href = DATA.venueMap;
  if(DATA.music){ musicSource.src = DATA.music; music.load(); }
  if(DATA.heroImage){ document.documentElement.style.setProperty('--hero-image', `url('${DATA.heroImage}')`); }

  const whatsapp = document.getElementById('whatsappBtn');
  if(DATA.whatsappNumber){
    const msg = encodeURIComponent(DATA.whatsappMessage || 'Hola, confirmo mi asistencia.');
    whatsapp.href = `https://wa.me/${DATA.whatsappNumber}?text=${msg}`;
  }

  const carousel = document.getElementById('galleryCarousel');
  if(Array.isArray(DATA.gallery) && DATA.gallery.length){
    carousel.innerHTML = DATA.gallery.map((src, i) => `
      <figure class="photo-card" style="background-image:url('${src}')" role="img" aria-label="Fotografía ${i+1}"></figure>`).join('');
  }
}

hydrateContent();

openInvite.addEventListener('click', async () => {
  intro.classList.add('hide');
  site.classList.add('visible');
  setTimeout(() => intro.remove(), 900);
  try {
    await music.play();
    musicToggle.classList.add('playing');
  } catch (error) {
    musicToggle.classList.remove('playing');
  }
  launchConfetti();
});

musicToggle.addEventListener('click', async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.classList.add('playing');
    } catch (error) {}
  } else {
    music.pause();
    musicToggle.classList.remove('playing');
  }
});

function updateCountdown(){
  const now = new Date();
  const diff = Math.max(EVENT_DATE - now, 0);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  [['days',days],['hours',hours],['minutes',minutes],['seconds',seconds]].forEach(([id,val])=>{
    const el = document.getElementById(id);
    const next = String(val).padStart(2,'0');
    if(el.textContent !== next){ el.textContent = next; el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick'); }
  });
}
setInterval(updateCountdown, 1000);
updateCountdown();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('show'); } });
}, { threshold: .16 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function launchConfetti(){
  const colors = ['#e9b7c7','#c9a15b','#fff2b8','#ffffff'];
  for(let i=0;i<80;i++){
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left=Math.random()*100+'vw';
    piece.style.background=colors[Math.floor(Math.random()*colors.length)];
    piece.style.animationDuration=(2.4+Math.random()*2.2)+'s';
    piece.style.transform=`rotate(${Math.random()*360}deg)`;
    document.body.appendChild(piece);
    setTimeout(()=>piece.remove(),5000);
  }
}
