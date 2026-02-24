import './style.css';

const LAST_VISIT = new Date(import.meta.env.VITE_LAST_VISIT);
const NEXT_VISIT = new Date(import.meta.env.VITE_NEXT_VISIT);
const DESTINATION = import.meta.env.VITE_DESTINATION ?? 'Korkeasaari';

function daysBetween(a, b) {
  return Math.floor((b.getTime() - a.getTime()) / 86_400_000);
}

function formatDate(d) {
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function createStars() {
  const container = document.getElementById('stars');
  for (let i = 0; i < 40; i++) {
    const star = document.createElement('div');
    star.className = 'absolute rounded-full bg-white animate-twinkle';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    const size = `${1 + Math.random() * 2}px`;
    star.style.width = size;
    star.style.height = size;
    container.appendChild(star);
  }
}

function update() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const since = daysBetween(LAST_VISIT, today);
  const until = daysBetween(today, NEXT_VISIT);
  const total = daysBetween(LAST_VISIT, NEXT_VISIT);
  const pct = Math.min(100, Math.max(0, (since / total) * 100));

  document.getElementById('destination').textContent = DESTINATION;
  document.getElementById('days-since').textContent = since;
  document.getElementById('days-until').textContent = Math.max(0, until);
  document.getElementById('last-date').textContent = formatDate(LAST_VISIT);
  document.getElementById('next-date').textContent = formatDate(NEXT_VISIT);
  document.getElementById('progress-start').textContent = formatDate(LAST_VISIT);
  document.getElementById('progress-end').textContent = formatDate(NEXT_VISIT);
  document.getElementById('progress-fill').style.width = `${pct.toFixed(1)}%`;
  document.getElementById('progress-percent').textContent =
    `${pct.toFixed(1)}% of the wait complete`;
}

createStars();
update();
setInterval(update, 60_000);
