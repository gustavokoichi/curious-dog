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