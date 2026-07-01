const EVENT_DATE = new Date('2026-09-14T17:00:00');

const intro = document.getElementById('intro');
const openInvite = document.getElementById('openInvite');
const music = document.getElementById('music');
const musicToggle = document.getElementById('musicToggle');
const site = document.querySelector('.site');

openInvite.addEventListener('click', async () => {
  intro.style.opacity = '0';
  intro.style.pointerEvents = 'none';
  site.classList.add('visible');
  setTimeout(() => intro.remove(), 800);
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
  document.getElementById('days').textContent = String(days).padStart(2,'0');
  document.getElementById('hours').textContent = String(hours).padStart(2,'0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2,'0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2,'0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){ entry.target.classList.add('show'); }
  });
}, { threshold: .18 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function launchConfetti(){
  const colors = ['#e9b7c7','#c9a15b','#fff2b8','#ffffff'];
  for(let i=0;i<70;i++){
    const piece = document.createElement('span');
    piece.style.position='fixed';
    piece.style.left=Math.random()*100+'vw';
    piece.style.top='-20px';
    piece.style.width='8px';
    piece.style.height='14px';
    piece.style.background=colors[Math.floor(Math.random()*colors.length)];
    piece.style.zIndex='1000';
    piece.style.opacity='.9';
    piece.style.borderRadius='3px';
    piece.style.transform=`rotate(${Math.random()*360}deg)`;
    piece.style.transition=`transform ${2+Math.random()*2}s linear, top ${2+Math.random()*2}s ease-in`;
    document.body.appendChild(piece);
    requestAnimationFrame(()=>{
      piece.style.top='105vh';
      piece.style.transform=`translateX(${(Math.random()-.5)*180}px) rotate(${Math.random()*720}deg)`;
    });
    setTimeout(()=>piece.remove(),4200);
  }
}
