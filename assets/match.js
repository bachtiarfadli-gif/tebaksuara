(() => {
  const stage = Number(window.MATCH_STAGE || 1);
  const nextPage = stage === 1 ? 'level2.html' : 'level3.html';
  const ids = stage === 1 ? ['chicken', 'rain', 'cat'] : ['cow', 'bell', 'thunder'];
  const allItems = window.SOUND_ITEMS || {};
  const items = ids.map(id => allItems[id]).filter(Boolean);
  const letters = ['A', 'B', 'C'];
  const tray = document.getElementById('sound-tray');
  const grid = document.getElementById('target-grid');
  const scoreEl = document.getElementById('score');
  const feedback = document.getElementById('feedback');
  const feedbackFace = document.getElementById('feedback-face');
  const feedbackText = document.getElementById('feedback-text');
  const complete = document.getElementById('complete');
  const nextButton = document.getElementById('next-btn');
  const audioNodes = {};
  let score = 0;
  let drag = null;
  let ghost = null;
  let suppressClick = false;
  let selectedSound = null;
  let currentAudio = null;
  let stopTimer = null;

  items.forEach(item => {
    const audio = document.createElement('audio');
    audio.preload = 'none';
    audio.src = item.audio;
    audioNodes[item.id] = audio;
    document.body.appendChild(audio);
    audio.addEventListener('error', () => {
      showFeedback('bad', '🔇', 'Suara belum dapat dimuat. Periksa koneksi internet, lalu coba lagi.');
    });
  });

  function say(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 0.92;
    utterance.pitch = 1.12;
    window.speechSynthesis.speak(utterance);
  }

  function showFeedback(kind, face, text) {
    feedback.className = 'feedback' + (kind ? ` ${kind}` : '');
    feedbackFace.textContent = face;
    feedbackText.textContent = text;
  }

  async function playSound(id) {
    const item = allItems[id];
    const audio = audioNodes[id];
    if (!audio || !item) return;
    try {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      if (stopTimer) clearTimeout(stopTimer);
      currentAudio = audio;
      audio.currentTime = 0;
      await audio.play();
      document.querySelectorAll('.sound-tile').forEach(tile => tile.classList.toggle('playing', tile.dataset.sound === id));
      if (item.maxSeconds) {
        stopTimer = setTimeout(() => {
          if (currentAudio === audio) { audio.pause(); audio.currentTime = 0; }
          document.querySelectorAll('.sound-tile').forEach(tile => tile.classList.remove('playing'));
        }, item.maxSeconds * 1000);
      }
      audio.onended = () => {
        document.querySelectorAll('.sound-tile').forEach(tile => tile.classList.remove('playing'));
      };
    } catch (error) {
      showFeedback('bad', '🔇', 'Suara belum dapat diputar. Periksa koneksi internet, lalu coba lagi.');
    }
  }

  function updateScore() { scoreEl.textContent = `${score} / 3`; }

  function renderTiles() {
    const shuffled = items.slice();
    do {
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
    } while (shuffled.every((item, index) => item.id === items[index].id));

    tray.innerHTML = '';
    shuffled.forEach((item, index) => {
      const tile = document.createElement('button');
      tile.type = 'button';
      tile.className = 'sound-tile';
      tile.dataset.sound = item.id;
      tile.setAttribute('aria-label', `Suara ${letters[index]}. Klik untuk mendengar atau tarik ke gambar yang cocok.`);
      tile.innerHTML = `<span class="speaker" aria-hidden="true">🔊</span><span class="label"><strong>Suara ${letters[index]}</strong><small>Klik dengar • tarik</small></span>`;
      tile.addEventListener('click', () => {
        if (suppressClick || tile.classList.contains('used')) return;
        selectedSound = item.id;
        document.querySelectorAll('.sound-tile').forEach(node => node.classList.toggle('selected', node === tile));
        showFeedback('', '👆', `Dengarkan suara ${letters[index]}, lalu tarik ke gambar yang cocok. Kamu juga bisa mengetuk kotaknya.`);
        playSound(item.id);
      });
      tile.addEventListener('pointerdown', event => {
        if (event.button !== 0 || tile.classList.contains('used')) return;
        drag = { id: tile.dataset.sound, tile, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, moved: false };
      });
      tray.appendChild(tile);
    });
  }

  function renderTargets() {
    grid.innerHTML = '';
    items.forEach(item => {
      const card = document.createElement('article');
      card.className = 'target-card';
      card.dataset.target = item.id;
      card.innerHTML = `
        <button class="drop-zone" type="button" data-drop="${item.id}" aria-label="Kotak jawaban untuk gambar ${item.name}"><span class="drop-icon">⬇️</span><span>Taruh suara di sini</span></button>
        <div class="illustration" aria-hidden="true">${item.image}</div>
        <div class="target-name">${item.name}</div>
        <div class="target-hint">${item.clue}</div>`;
      grid.appendChild(card);
    });
  }

  function answer(soundId, targetId) {
    const tile = [...document.querySelectorAll('.sound-tile')].find(node => node.dataset.sound === soundId);
    const card = [...document.querySelectorAll('.target-card')].find(node => node.dataset.target === targetId);
    const zone = card && card.querySelector('.drop-zone');
    const item = allItems[soundId];
    if (!tile || !card || !zone || !item || tile.classList.contains('used') || card.classList.contains('correct')) return;

    if (soundId === targetId) {
      tile.classList.add('used');
      tile.classList.remove('selected');
      card.classList.remove('wrong');
      card.classList.add('correct');
      zone.classList.add('done');
      zone.innerHTML = '<span class="drop-icon">✅</span><span>Benar! Hebat!</span>';
      selectedSound = null;
      score += 1;
      updateScore();
      showFeedback('good', '🎉', `Hebat! Itu suara ${item.name.toLowerCase()}. Jawaban kamu benar!`);
      say(`Hebat! Benar. Itu suara ${item.name}.`);
      if (score === 3) {
        complete.classList.add('show');
        showFeedback('good', '🏆', 'Luar biasa! Semua suara berhasil dicocokkan.');
        say('Luar biasa! Semua jawaban benar. Kamu hebat!');
        nextButton.focus();
      }
    } else {
      card.classList.remove('wrong');
      void card.offsetWidth;
      card.classList.add('wrong');
      showFeedback('bad', '🙂', 'Belum tepat. Tidak apa-apa, coba dengarkan lagi dan pilih gambar yang lain.');
      say('Belum tepat. Ayo coba lagi.');
      window.setTimeout(() => card.classList.remove('wrong'), 450);
    }
  }

  function makeGhost(tile, x, y) {
    ghost = tile.cloneNode(true);
    ghost.classList.remove('used', 'playing', 'selected');
    ghost.classList.add('ghost');
    ghost.style.left = `${x}px`;
    ghost.style.top = `${y}px`;
    document.body.appendChild(ghost);
  }

  function moveGhost(x, y) {
    if (!ghost) return;
    ghost.style.left = `${x}px`;
    ghost.style.top = `${y}px`;
    document.querySelectorAll('.drop-zone').forEach(zone => {
      const rect = zone.getBoundingClientRect();
      zone.classList.toggle('over', x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom);
    });
  }

  function clearDrag() {
    if (ghost) ghost.remove();
    ghost = null;
    document.querySelectorAll('.drop-zone').forEach(zone => zone.classList.remove('over'));
  }

  window.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    const distance = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY);
    if (!drag.moved && distance > 9) {
      drag.moved = true;
      makeGhost(drag.tile, event.clientX, event.clientY);
    }
    if (drag.moved) {
      event.preventDefault();
      moveGhost(event.clientX, event.clientY);
    }
  }, { passive: false });

  window.addEventListener('pointerup', event => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    const activeDrag = drag;
    drag = null;
    if (activeDrag.moved) {
      suppressClick = true;
      const hit = document.elementFromPoint(event.clientX, event.clientY);
      const zone = hit && hit.closest('.drop-zone');
      clearDrag();
      if (zone) answer(activeDrag.id, zone.dataset.drop);
      else showFeedback('', '👆', 'Tarik tombol suara sampai ke kotak di atas gambar.');
      window.setTimeout(() => { suppressClick = false; }, 350);
    }
  });

  window.addEventListener('pointercancel', () => { drag = null; clearDrag(); });

  grid.addEventListener('click', event => {
    const zone = event.target.closest('.drop-zone');
    if (zone && selectedSound) answer(selectedSound, zone.dataset.drop);
  });

  document.getElementById('instruction-btn').addEventListener('click', () => {
    say('Ayo tebak suara! Klik tombol suara untuk mendengarkan. Setelah itu, tarik tombol suara ke kotak di atas gambar yang cocok. Kamu juga bisa mengetuk tombol suara lalu mengetuk kotak jawaban.');
  });

  document.getElementById('reset-btn').addEventListener('click', () => {
    score = 0;
    selectedSound = null;
    updateScore();
    complete.classList.remove('show');
    document.querySelectorAll('.sound-tile').forEach(tile => tile.classList.remove('used', 'playing', 'selected'));
    document.querySelectorAll('.target-card').forEach(card => card.classList.remove('correct', 'wrong'));
    document.querySelectorAll('.drop-zone').forEach(zone => {
      zone.classList.remove('done', 'over');
      zone.innerHTML = '<span class="drop-icon">⬇️</span><span>Taruh suara di sini</span>';
    });
    Object.values(audioNodes).forEach(audio => { audio.pause(); audio.currentTime = 0; });
    currentAudio = null;
    if (stopTimer) clearTimeout(stopTimer);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    renderTiles();
    showFeedback('', '💡', 'Permainan dimulai lagi. Dengarkan suara, lalu cocokkan dengan gambar yang benar.');
  });

  renderTargets();
  renderTiles();
})();
