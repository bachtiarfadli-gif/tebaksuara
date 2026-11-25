// Data suara dan ilustrasi untuk semua tahap permainan.
// Audio dimainkan langsung dari Wikimedia Commons; koneksi internet diperlukan.
window.SOUND_ITEMS = {
  chicken: {
    id: 'chicken', name: 'Ayam', clue: 'Kukuruyuk!', prompt: 'Tirukan suara ayam: kukuruyuk!',
    audio: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Medium_rooster_crowing.ogg',
    credit: '<a href="https://commons.wikimedia.org/wiki/File:Medium_rooster_crowing.ogg" target="_blank" rel="noopener">Medium rooster crowing</a> (domain publik)',
    image: `<svg viewBox="0 0 200 150" role="img" aria-label="Ilustrasi ayam lucu"><ellipse cx="101" cy="129" rx="62" ry="8" fill="#e9eef5"/><path d="M51 87 Q25 65 32 48 Q55 48 69 68" fill="#f4a62a" stroke="#d98219" stroke-width="3"/><ellipse cx="101" cy="91" rx="48" ry="35" fill="#fffdf5" stroke="#e7cfa0" stroke-width="3"/><path d="M121 64 Q142 40 139 24 Q158 28 153 49 Q169 39 174 56 Q164 75 143 77" fill="#fffdf5" stroke="#e7cfa0" stroke-width="3"/><circle cx="139" cy="42" r="23" fill="#fffdf5" stroke="#e7cfa0" stroke-width="3"/><path d="M129 19 Q123 3 136 8 Q146 10 143 20 Q154 4 163 14 Q167 24 151 29" fill="#ee5d5d" stroke="#ce4545" stroke-width="2"/><path d="M160 43 L183 51 L160 59 Z" fill="#f5a623" stroke="#d98219" stroke-width="2"/><circle cx="146" cy="39" r="3.8" fill="#26364b"/><path d="M138 61 Q147 69 155 60" fill="none" stroke="#e96a68" stroke-width="4" stroke-linecap="round"/><path d="M90 122 L88 137 M113 122 L116 137" stroke="#e49a20" stroke-width="4" stroke-linecap="round"/><path d="M79 137 L96 137 M107 137 L124 137" stroke="#e49a20" stroke-width="4" stroke-linecap="round"/><path d="M79 85 Q91 71 108 86 Q95 105 79 85" fill="#f3d47c"/></svg>`
  },
  rain: {
    id: 'rain', name: 'Hujan', clue: 'Tik... tik... tik...', prompt: 'Tirukan bunyi hujan: tik tik tik!',
    audio: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Rain.ogg',
    credit: '<a href="https://commons.wikimedia.org/wiki/File:Rain.ogg" target="_blank" rel="noopener">Rain.ogg</a> (domain publik)',
    image: `<svg viewBox="0 0 200 150" role="img" aria-label="Ilustrasi hujan dan awan"><ellipse cx="100" cy="132" rx="62" ry="7" fill="#e9eef5"/><path d="M43 75 Q32 73 32 60 Q32 45 49 43 Q54 19 79 20 Q99 20 108 39 Q132 29 145 48 Q165 49 165 66 Q165 81 148 83 L48 83 Q43 80 43 75Z" fill="#b8ddf6" stroke="#78b6e6" stroke-width="3"/><path d="M54 86 L45 105 M88 87 L79 108 M123 87 L114 108 M153 86 L144 105" stroke="#4f9ce0" stroke-width="7" stroke-linecap="round"/><path d="M45 110 Q38 117 45 122 Q52 117 45 110 M79 114 Q72 121 79 126 Q86 121 79 114 M114 112 Q107 119 114 124 Q121 119 114 112 M145 110 Q138 117 145 122 Q152 117 145 110" fill="#8cc8f2"/><circle cx="73" cy="54" r="3" fill="#4b86b7"/><circle cx="87" cy="54" r="3" fill="#4b86b7"/><path d="M76 64 Q81 70 87 64" fill="none" stroke="#4b86b7" stroke-width="2.5" stroke-linecap="round"/><path d="M28 27 Q19 20 26 12 M171 25 Q181 19 176 10" stroke="#f2c15b" stroke-width="4" stroke-linecap="round"/></svg>`
  },
  cat: {
    id: 'cat', name: 'Kucing', clue: 'Meong... meong...', prompt: 'Tirukan suara kucing: meong meong!',
    audio: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Meow.ogg',
    credit: '<a href="https://commons.wikimedia.org/wiki/File:Meow.ogg" target="_blank" rel="noopener">Meow.ogg</a> oleh Dan Crosby (CC BY-SA 3.0)',
    image: `<svg viewBox="0 0 200 150" role="img" aria-label="Ilustrasi kucing lucu"><ellipse cx="100" cy="132" rx="59" ry="7" fill="#e9eef5"/><path d="M130 105 Q174 120 166 86 Q163 72 151 79" fill="none" stroke="#d99164" stroke-width="12" stroke-linecap="round"/><path d="M55 67 L54 24 L88 48 Q100 43 112 48 L146 24 L145 68" fill="#e8a777" stroke="#c98255" stroke-width="3" stroke-linejoin="round"/><path d="M65 57 L64 36 L83 51 M136 57 L136 36 L117 51" fill="#f7c0bf"/><ellipse cx="100" cy="88" rx="50" ry="43" fill="#efb486" stroke="#c98255" stroke-width="3"/><path d="M80 82 Q88 72 94 82 M107 82 Q114 72 121 82" fill="none" stroke="#384354" stroke-width="4" stroke-linecap="round"/><path d="M96 95 Q101 101 106 95 Q101 91 96 95" fill="#e77e85"/><path d="M101 100 Q96 108 89 102 M101 100 Q107 108 114 102" fill="none" stroke="#9c6655" stroke-width="2.5" stroke-linecap="round"/><path d="M69 94 L40 89 M69 101 L40 104 M132 94 L160 89 M132 101 L160 104" stroke="#8f6758" stroke-width="2" stroke-linecap="round"/><path d="M88 113 Q100 120 113 113" fill="none" stroke="#d38b66" stroke-width="3" stroke-linecap="round"/></svg>`
  },
  cow: {
    id: 'cow', name: 'Sapi', clue: 'Mooo... mooo...', prompt: 'Tirukan suara sapi: mooo!',
    audio: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Mudchute_cow_1.ogg',
    credit: '<a href="https://commons.wikimedia.org/wiki/File:Mudchute_cow_1.ogg" target="_blank" rel="noopener">Mudchute cow 1.ogg</a> oleh Secretlondon (CC BY-SA 3.0)',
    image: `<svg viewBox="0 0 200 150" role="img" aria-label="Ilustrasi sapi lucu"><ellipse cx="100" cy="132" rx="65" ry="7" fill="#e9eef5"/><path d="M62 76 Q35 62 30 41 Q53 39 70 57 M138 76 Q165 62 170 41 Q147 39 130 57" fill="#fff" stroke="#a9b6c7" stroke-width="3"/><path d="M47 77 Q45 35 100 33 Q155 35 153 77 L145 111 Q100 133 55 111Z" fill="#fff" stroke="#a9b6c7" stroke-width="3"/><path d="M61 54 Q81 40 91 57 L83 73 L59 72Z M119 87 Q138 75 146 91 L137 105 L119 104Z" fill="#374151"/><ellipse cx="100" cy="99" rx="33" ry="24" fill="#f4a8a8" stroke="#d78484" stroke-width="2"/><circle cx="87" cy="98" r="3" fill="#9f5d61"/><circle cx="113" cy="98" r="3" fill="#9f5d61"/><circle cx="82" cy="75" r="4" fill="#26364b"/><circle cx="119" cy="75" r="4" fill="#26364b"/><path d="M92 112 Q100 118 108 112" fill="none" stroke="#a75f65" stroke-width="2.5" stroke-linecap="round"/><path d="M73 113 L68 132 M127 113 L132 132" stroke="#a9b6c7" stroke-width="7" stroke-linecap="round"/><path d="M66 132 L81 132 M119 132 L134 132" stroke="#34445c" stroke-width="4" stroke-linecap="round"/></svg>`
  },
  bell: {
    id: 'bell', name: 'Lonceng', clue: 'Kring... kring...', prompt: 'Tirukan bunyi lonceng: kring kring!',
    audio: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Old_school_bell_4.ogg',
    credit: '<a href="https://commons.wikimedia.org/wiki/File:Old_school_bell_4.ogg" target="_blank" rel="noopener">Old school bell 4.ogg</a> oleh ezwa (domain publik)',
    image: `<svg viewBox="0 0 200 150" role="img" aria-label="Ilustrasi lonceng"><ellipse cx="100" cy="132" rx="53" ry="7" fill="#e9eef5"/><path d="M100 24 Q100 12 111 12 Q122 12 122 24" fill="none" stroke="#d69b27" stroke-width="7" stroke-linecap="round"/><path d="M60 101 Q69 87 69 66 Q69 34 100 31 Q131 34 131 66 Q131 87 140 101 Q144 110 132 112 L68 112 Q56 110 60 101Z" fill="#ffd45c" stroke="#d69b27" stroke-width="4"/><path d="M83 112 Q85 130 100 130 Q115 130 117 112" fill="#e9ad35" stroke="#d69b27" stroke-width="3"/><circle cx="100" cy="115" r="8" fill="#bd8421"/><path d="M47 51 L35 44 M153 51 L165 44 M45 79 L29 79 M155 79 L171 79" stroke="#f2bd4c" stroke-width="4" stroke-linecap="round"/><path d="M89 52 Q100 43 111 52" fill="none" stroke="#fff0b2" stroke-width="4" stroke-linecap="round"/></svg>`
  },
  thunder: {
    id: 'thunder', name: 'Petir', clue: 'Duuur... menggelegar!', prompt: 'Tirukan bunyi petir: duuur!',
    audio: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Thunder.ogg',
    maxSeconds: 6,
    credit: '<a href="https://commons.wikimedia.org/wiki/File:Thunder.ogg" target="_blank" rel="noopener">Thunder.ogg</a> oleh Bidgee (CC BY 3.0)',
    image: `<svg viewBox="0 0 200 150" role="img" aria-label="Ilustrasi awan dan petir"><ellipse cx="100" cy="133" rx="61" ry="7" fill="#e9eef5"/><path d="M39 80 Q27 78 27 64 Q27 48 45 46 Q51 20 79 22 Q100 22 109 42 Q136 31 151 52 Q171 53 171 72 Q171 86 153 88 L48 88 Q40 86 39 80Z" fill="#9eb6d2" stroke="#718eaf" stroke-width="3"/><path d="M108 83 L83 115 L103 115 L91 142 L132 101 L111 101 L124 83Z" fill="#ffd34e" stroke="#e5a928" stroke-width="3" stroke-linejoin="round"/><path d="M52 96 L46 109 M154 96 L148 109" stroke="#59a8e5" stroke-width="5" stroke-linecap="round"/><path d="M26 27 L17 22 M172 27 L181 22" stroke="#f2c15b" stroke-width="4" stroke-linecap="round"/></svg>`
  }
};
