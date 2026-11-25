(() => {
  const ids = ['chicken', 'rain', 'cat', 'cow', 'bell', 'thunder'];
  const items = ids.map(id => window.SOUND_ITEMS[id]).filter(Boolean);
  const grid = document.getElementById('imitate-grid');
  const scoreEl = document.getElementById('score');
  const feedback = document.getElementById('feedback');
  const feedbackFace = document.getElementById('feedback-face');
  const feedbackText = document.getElementById('feedback-text');
  const complete = document.getElementById('complete');
  const audioNodes = {};
  const finished = new Set();
  let currentAudio = null;
  let stopTimer = null;

  function showFeedback(kind, face, text) {
    feedback.className = 'feedback' + (kind ? ` ${kind}` : '');
    feedbackFace.textContent = face;
    feedbackText.textContent = text;
  }
  function updateScore() {
    scoreEl.textContent = `${finished.size} / ${items.length}`;
    if (finished.size === items.length) {
      complete.classList.add('show');
      showFeedback('good', '🏆', 'Luar biasa! Semua suara sudah dicoba. Terima kasih sudah belajar!');
      say('Hebat! Semua suara sudah ditirukan. Kamu luar biasa!');
    }
  }
  function say(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 0.92;
    utterance.pitch = 1.12;
    window.speechSynthesis.speak(utterance);
  }
  async function playSample(id) {
    const audio = audioNodes[id];
    const item = window.SOUND_ITEMS[id];
    if (!audio || !item) return;
    try {
      if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
      if (stopTimer) clearTimeout(stopTimer);
      currentAudio = audio;
      audio.currentTime = 0;
      await audio.play();
      if (item.maxSeconds) {
        stopTimer = setTimeout(() => {
          if (currentAudio === audio) { audio.pause(); audio.currentTime = 0; }
        }, item.maxSeconds * 1000);
      }
      showFeedback('', '👂', `Dengarkan baik-baik suara ${item.name.toLowerCase()}, lalu tirukan ya!`);
      return true;
    } catch (error) {
      showFeedback('bad', '🔇', 'Suara belum dapat diputar. Periksa koneksi internet, lalu coba lagi.');
      return false;
    }
  }

  items.forEach(item => {
    const audio = document.createElement('audio');
    audio.preload = 'none';
    audio.src = item.audio;
    audio.addEventListener('error', () => showFeedback('bad', '🔇', 'Salah satu audio tidak dapat dimuat. Periksa koneksi internet.'));
    audioNodes[item.id] = audio;

    const card = document.createElement('article');
    card.className = 'imitate-card';
    card.dataset.id = item.id;
    card.innerHTML = `
      <div class="illustration">${item.image}</div>
      <h3>${item.name}</h3>
      <p>${item.prompt}</p>
      <div class="imitate-actions">
        <button class="action secondary listen-btn" type="button">🔊 Dengar contoh</button>
        <button class="action primary imitate-btn" type="button" disabled>🗣️ Aku sudah menirukan</button>
      </div>
      <div class="done-label">✓ Sudah dicoba!</div>`;
    const imitateButton = card.querySelector('.imitate-btn');
    card.querySelector('.listen-btn').addEventListener('click', async () => {
      const played = await playSample(item.id);
      if (played) imitateButton.disabled = false;
    });
    imitateButton.addEventListener('click', () => {
      if (finished.has(item.id)) return;
      finished.add(item.id);
      card.classList.add('done');
      card.querySelector('.imitate-btn').disabled = true;
      card.querySelector('.imitate-btn').textContent = '✓ Selesai';
      showFeedback('good', '👏', `Terima kasih! Kamu sudah mencoba menirukan suara ${item.name.toLowerCase()}.`);
      say(`Bagus! Kamu sudah mencoba menirukan suara ${item.name}.`);
      updateScore();
    });
    grid.appendChild(card);
  });

  document.getElementById('reset-btn').addEventListener('click', () => {
    finished.clear();
    complete.classList.remove('show');
    Object.values(audioNodes).forEach(audio => { audio.pause(); audio.currentTime = 0; });
    currentAudio = null;
    if (stopTimer) clearTimeout(stopTimer);
    grid.querySelectorAll('.imitate-card').forEach(card => {
      card.classList.remove('done');
      const button = card.querySelector('.imitate-btn');
      button.disabled = true;
      button.textContent = '🗣️ Aku sudah menirukan';
    });
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    updateScore();
    showFeedback('', '🗣️', 'Ayo mulai lagi! Lihat gambar, dengar contoh, lalu tirukan suaranya.');
  });
})();
