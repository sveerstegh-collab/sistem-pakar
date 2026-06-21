import osDatabase from '../data/osDatabase';

/**
 * Forward-chaining rule-based inference engine.
 * Each rule adds/subtracts confidence points to OS candidates
 * based on facts (user answers).
 */

const rules = [
  // ===== RAM RULES =====
  (facts, scores) => {
    if (facts.ram === '2') {
      scores['lubuntu'] += 30;
      scores['xubuntu'] += 25;
      scores['chromeos-flex'] += 28;
      scores['linux-mint'] += 5;
    }
    if (facts.ram === '4') {
      scores['linux-mint'] += 20;
      scores['xubuntu'] += 20;
      scores['lubuntu'] += 18;
      scores['chromeos-flex'] += 18;
      scores['zorin-os'] += 15;
      scores['windows-10'] += 10;
      scores['ubuntu'] += 10;
    }
    if (facts.ram === '8') {
      scores['windows-10'] += 22;
      scores['windows-11'] += 20;
      scores['ubuntu'] += 22;
      scores['pop-os'] += 20;
      scores['fedora'] += 20;
      scores['linux-mint'] += 18;
      scores['zorin-os'] += 18;
    }
    if (facts.ram === '16') {
      scores['windows-11'] += 25;
      scores['windows-10'] += 20;
      scores['ubuntu'] += 22;
      scores['pop-os'] += 22;
      scores['fedora'] += 22;
    }
  },

  // ===== STORAGE RULES =====
  (facts, scores) => {
    if (facts.storage === 'hdd') {
      scores['lubuntu'] += 15;
      scores['xubuntu'] += 15;
      scores['chromeos-flex'] += 15;
      scores['linux-mint'] += 10;
      scores['windows-11'] -= 10;
      scores['windows-10'] -= 5;
    }
    if (facts.storage === 'ssd') {
      scores['windows-11'] += 10;
      scores['windows-10'] += 10;
      scores['ubuntu'] += 8;
      scores['pop-os'] += 8;
      scores['fedora'] += 8;
    }
  },

  // ===== PROCESSOR RULES =====
  (facts, scores) => {
    if (facts.processor === 'lama') {
      scores['lubuntu'] += 20;
      scores['xubuntu'] += 18;
      scores['chromeos-flex'] += 20;
      scores['windows-11'] -= 15;
      scores['windows-10'] -= 5;
    }
    if (facts.processor === 'menengah') {
      scores['linux-mint'] += 10;
      scores['ubuntu'] += 10;
      scores['windows-10'] += 12;
      scores['zorin-os'] += 10;
    }
    if (facts.processor === 'baru') {
      scores['windows-11'] += 15;
      scores['windows-10'] += 12;
      scores['ubuntu'] += 12;
      scores['pop-os'] += 12;
      scores['fedora'] += 12;
    }
  },

  // ===== KEBUTUHAN RULES =====
  (facts, scores) => {
    if (facts.kebutuhan === 'office') {
      scores['chromeos-flex'] += 15;
      scores['linux-mint'] += 12;
      scores['zorin-os'] += 12;
      scores['windows-10'] += 12;
      scores['lubuntu'] += 10;
    }
    if (facts.kebutuhan === 'coding') {
      scores['ubuntu'] += 20;
      scores['fedora'] += 18;
      scores['pop-os'] += 18;
      scores['linux-mint'] += 10;
      scores['windows-11'] += 8;
      scores['windows-10'] += 8;
    }
    if (facts.kebutuhan === 'desain') {
      scores['windows-11'] += 18;
      scores['windows-10'] += 16;
      scores['pop-os'] += 10;
      scores['ubuntu'] += 8;
    }
    if (facts.kebutuhan === 'gaming') {
      scores['windows-11'] += 22;
      scores['windows-10'] += 20;
      scores['pop-os'] += 12;
    }
  },

  // ===== JURUSAN RULES =====
  (facts, scores) => {
    if (facts.jurusan === 'it') {
      scores['ubuntu'] += 15;
      scores['fedora'] += 15;
      scores['pop-os'] += 12;
      scores['linux-mint'] += 8;
    }
    if (facts.jurusan === 'desain') {
      scores['windows-11'] += 12;
      scores['windows-10'] += 10;
      scores['pop-os'] += 8;
    }
    if (facts.jurusan === 'teknik') {
      scores['ubuntu'] += 10;
      scores['windows-10'] += 10;
      scores['windows-11'] += 8;
    }
    if (facts.jurusan === 'bisnis') {
      scores['windows-10'] += 12;
      scores['windows-11'] += 12;
      scores['zorin-os'] += 8;
      scores['chromeos-flex'] += 8;
    }
    if (facts.jurusan === 'umum') {
      scores['linux-mint'] += 8;
      scores['zorin-os'] += 8;
      scores['windows-10'] += 8;
    }
  },

  // ===== KEMAMPUAN RULES =====
  (facts, scores) => {
    if (facts.kemampuan === 'pemula') {
      scores['zorin-os'] += 15;
      scores['linux-mint'] += 12;
      scores['chromeos-flex'] += 15;
      scores['windows-10'] += 12;
      scores['windows-11'] += 10;
      scores['ubuntu'] -= 5;
      scores['fedora'] -= 10;
    }
    if (facts.kemampuan === 'terbiasa') {
      scores['ubuntu'] += 15;
      scores['linux-mint'] += 12;
      scores['pop-os'] += 12;
      scores['fedora'] += 10;
    }
    if (facts.kemampuan === 'expert') {
      scores['fedora'] += 18;
      scores['ubuntu'] += 15;
      scores['pop-os'] += 15;
    }
  },

  // ===== PRIORITAS RULES =====
  (facts, scores) => {
    if (facts.prioritas === 'ringan') {
      scores['lubuntu'] += 18;
      scores['xubuntu'] += 15;
      scores['chromeos-flex'] += 18;
      scores['linux-mint'] += 10;
      scores['windows-11'] -= 8;
    }
    if (facts.prioritas === 'mudah') {
      scores['zorin-os'] += 15;
      scores['windows-10'] += 15;
      scores['windows-11'] += 12;
      scores['linux-mint'] += 12;
      scores['chromeos-flex'] += 10;
    }
    if (facts.prioritas === 'aman') {
      scores['ubuntu'] += 12;
      scores['fedora'] += 12;
      scores['chromeos-flex'] += 12;
      scores['linux-mint'] += 10;
    }
    if (facts.prioritas === 'kompatibel') {
      scores['windows-11'] += 18;
      scores['windows-10'] += 18;
      scores['zorin-os'] += 8;
    }
  },

  // ===== LISENSI RULES =====
  (facts, scores) => {
    if (facts.lisensi === 'gratis') {
      scores['ubuntu'] += 15;
      scores['linux-mint'] += 15;
      scores['lubuntu'] += 15;
      scores['xubuntu'] += 15;
      scores['chromeos-flex'] += 15;
      scores['fedora'] += 15;
      scores['pop-os'] += 15;
      scores['zorin-os'] += 12;
      scores['windows-11'] -= 15;
      scores['windows-10'] -= 12;
    }
    if (facts.lisensi === 'berbayar') {
      scores['windows-11'] += 10;
      scores['windows-10'] += 10;
    }
    if (facts.lisensi === 'punya-lisensi') {
      scores['windows-11'] += 18;
      scores['windows-10'] += 15;
    }
  },
];

/**
 * Generate alasan (reasons) for why this OS was recommended
 */
function generateAlasan(osId, facts) {
  const alasan = [];

  const ramVal = parseInt(facts.ram);

  if (osId === 'lubuntu' || osId === 'xubuntu') {
    alasan.push(`Sangat ringan dan optimal untuk laptop dengan RAM ${facts.ram} GB.`);
    if (facts.storage === 'hdd') alasan.push('Performa tetap baik meskipun menggunakan HDD.');
    if (facts.processor === 'lama') alasan.push('Cocok untuk processor generasi lama.');
    if (facts.lisensi === 'gratis') alasan.push('Sepenuhnya gratis dan legal tanpa perlu lisensi.');
  }

  if (osId === 'chromeos-flex') {
    alasan.push('Sangat ringan, boot cepat, ideal untuk tugas kuliah dasar dan browsing.');
    if (ramVal <= 4) alasan.push(`Optimal untuk laptop RAM ${facts.ram} GB.`);
    if (facts.kemampuan === 'pemula') alasan.push('Mudah digunakan tanpa perlu pengetahuan teknis.');
    if (facts.lisensi === 'gratis') alasan.push('Gratis dari Google, tidak perlu lisensi.');
  }

  if (osId === 'linux-mint') {
    alasan.push('Tampilan mirip Windows sehingga mudah beradaptasi.');
    if (facts.kemampuan === 'pemula') alasan.push('Ramah untuk pengguna pemula Linux.');
    if (facts.lisensi === 'gratis') alasan.push('Gratis dan legal.');
  }

  if (osId === 'zorin-os') {
    alasan.push('Didesain khusus untuk pengguna yang bermigrasi dari Windows.');
    if (facts.kemampuan === 'pemula') alasan.push('Antarmuka sangat intuitif untuk pemula.');
  }

  if (osId === 'ubuntu') {
    alasan.push('Distribusi Linux paling populer dengan komunitas dan dokumentasi terlengkap.');
    if (facts.kebutuhan === 'coding' || facts.jurusan === 'it') {
      alasan.push('Sangat cocok untuk programming dan development.');
    }
    if (facts.lisensi === 'gratis') alasan.push('Gratis dan open-source.');
  }

  if (osId === 'fedora') {
    alasan.push('Software terbaru (cutting-edge), didukung Red Hat.');
    if (facts.kemampuan === 'expert') alasan.push('Cocok untuk pengguna berpengalaman yang menginginkan teknologi terbaru.');
    if (facts.kebutuhan === 'coding') alasan.push('Environment development yang excellent.');
  }

  if (osId === 'pop-os') {
    alasan.push('Dioptimalkan untuk produktivitas dengan tiling window manager.');
    if (facts.kebutuhan === 'coding') alasan.push('Sangat cocok untuk workflow developer.');
    if (facts.kebutuhan === 'gaming') alasan.push('Dukungan gaming Linux terbaik dengan driver NVIDIA bawaan.');
  }

  if (osId === 'windows-11') {
    alasan.push('OS terbaru Microsoft dengan fitur dan keamanan terkini.');
    if (ramVal >= 8) alasan.push(`RAM ${facts.ram} GB cukup untuk menjalankan Windows 11 dengan lancar.`);
    if (facts.storage === 'ssd') alasan.push('Performa optimal dengan SSD.');
    if (facts.lisensi === 'punya-lisensi') alasan.push('Anda sudah memiliki lisensi Windows.');
    if (facts.kebutuhan === 'desain') alasan.push('Kompatibilitas terbaik dengan software desain seperti Adobe Suite.');
    if (facts.kebutuhan === 'gaming') alasan.push('Platform gaming terbaik dengan DirectX 12 Ultimate.');
  }

  if (osId === 'windows-10') {
    alasan.push('OS Windows yang stabil dan mature dengan kompatibilitas software terbaik.');
    if (ramVal >= 4 && ramVal < 8) alasan.push(`Cukup ringan untuk RAM ${facts.ram} GB.`);
    if (facts.lisensi === 'punya-lisensi') alasan.push('Anda sudah memiliki lisensi Windows.');
    if (facts.prioritas === 'kompatibel') alasan.push('Kompatibilitas software paling luas.');
  }

  if (alasan.length === 0) {
    alasan.push('Berdasarkan kombinasi spesifikasi dan kebutuhan Anda, OS ini merupakan pilihan yang seimbang.');
  }

  return alasan;
}

/**
 * Run inference engine
 * @param {Object} facts - user answers { ram, storage, processor, kebutuhan, jurusan, kemampuan, prioritas, lisensi }
 * @returns {Array} sorted results [{ os, score, confidence, alasan }]
 */
export function runInference(facts) {
  // Init scores for all OS
  const scores = {};
  Object.keys(osDatabase).forEach(id => { scores[id] = 0; });

  // Fire all rules (forward chaining)
  rules.forEach(rule => rule(facts, scores));

  // Normalize to confidence percentages
  const maxPossible = Math.max(...Object.values(scores), 1);
  const results = Object.entries(scores)
    .map(([id, score]) => ({
      os: osDatabase[id],
      score,
      confidence: Math.max(0, Math.min(100, Math.round((score / maxPossible) * 100))),
      alasan: generateAlasan(id, facts),
    }))
    .filter(r => r.confidence > 10)
    .sort((a, b) => b.confidence - a.confidence);

  return results;
}
