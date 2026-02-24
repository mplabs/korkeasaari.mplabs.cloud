import './style.css';

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

function update(config) {
  const lastVisit = new Date(config.lastVisit);
  const nextVisit = new Date(config.nextVisit);
  const destination = config.destination ?? 'Korkeasaari';

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const since = daysBetween(lastVisit, today);
  const until = daysBetween(today, nextVisit);
  const total = daysBetween(lastVisit, nextVisit);
  const pct = Math.min(100, Math.max(0, (since / total) * 100));

  document.getElementById('destination').textContent = destination;
  document.getElementById('days-since').textContent = since;
  document.getElementById('days-until').textContent = Math.max(0, until);
  document.getElementById('last-date').textContent = formatDate(lastVisit);
  document.getElementById('next-date').textContent = formatDate(nextVisit);
  document.getElementById('progress-start').textContent = formatDate(lastVisit);
  document.getElementById('progress-end').textContent = formatDate(nextVisit);
  document.getElementById('progress-fill').style.width = `${pct.toFixed(1)}%`;
  document.getElementById('progress-percent').textContent =
    `${pct.toFixed(1)}% of the wait complete`;
}

async function loadConfig() {
  try {
    const res = await fetch('./config.json');
    if (res.ok) return await res.json();
  } catch { /* fall through to defaults */ }

  return {
    lastVisit: import.meta.env.VITE_LAST_VISIT,
    nextVisit: import.meta.env.VITE_NEXT_VISIT,
    destination: import.meta.env.VITE_DESTINATION,
  };
}

async function init() {
  createStars();
  const config = await loadConfig();
  update(config);
  setInterval(() => update(config), 60_000);
}

init();
