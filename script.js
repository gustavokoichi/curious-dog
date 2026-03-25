function getDeviceInput() {
  if (window.matchMedia('(pointer: fine)').matches) return 'mouse';
  if (window.matchMedia('(pointer: coarse)').matches) return 'touch';
  return 'keyboard';
}

function hasTouchscreen() {
  return window.matchMedia('(any-pointer: coarse)').matches;
}

document.addEventListener('DOMContentLoaded', () => {
  const input = getDeviceInput();

  if (input === 'touch') {
    document.getElementById('btn').textContent = 'Tap for a curiosity ✦';
  } else {
    document.getElementById('btn').textContent = 'Click for a curiosity ✦';
  }
});

async function getFacts() {
  const btn = document.getElementById('btn');
  const text = document.getElementById('responseBody');

  btn.disabled = true;
  btn.textContent = 'Loading...';
  text.classList.add('loading');

  try {
    const res = await fetch('https://dogapi.dog/api/v2/facts?limit=1');
    const data = await res.json();
    text.textContent = data.data[0].attributes.body;
  } catch {
    text.textContent = 'Error fetching. Try again!';
  } finally {
    text.classList.remove('loading');
    btn.disabled = false;
    btn.textContent = 'New curiosity ✦';
  }
}