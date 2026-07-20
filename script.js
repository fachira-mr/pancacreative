/* ===== CURSOR ===== */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let cx = 0, cy = 0, rx = 0, ry = 0;
if (cursor && ring) {
  document.addEventListener('mousemove', e => {
    cx = e.clientX; cy = e.clientY;
    cursor.style.transform = `translate(${cx - 6}px, ${cy - 6}px)`;
  });
  function animateRing() {
    rx += (cx - rx) * 0.12;
    ry += (cy - ry) * 0.12;
    ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();
}

/* ===== NAV SCROLL ===== */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});
function showPage(page) {
  console.log('showPage dipanggil:', page);
  console.trace();
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  if (page === 'home') {
    document.getElementById('page-home').classList.add('active');
  } else if (page === 'contact') {
    document.getElementById('page-contact').classList.add('active');
  } else if (page === 'service') {
    document.getElementById('page-service').classList.add('active');
  }

  // ← tambah ini
  console.log('page-home display:', getComputedStyle(document.getElementById('page-home')).display);

  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(observeReveal, 100);
}

function scrollToSection(id) {
  showPage('home');
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function scrollOnly(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function goToOffice() {
  showPage('contact');
  setTimeout(() => {
    scrollOnly('office');
  }, 300);
}

/* ===== COUNTER ANIMATION ===== */
function animateCounters() {
  document.querySelectorAll('[data-target]').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current) + (el.getAttribute('data-target') === '98' ? '%' : '+');
    }, 16);
  });
}
setTimeout(animateCounters, 1200);

/* ===== SCROLL REVEAL ===== */
function observeReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => { el.classList.remove('visible'); obs.observe(el); });
}
observeReveal();

/* ===== PORTFOLIO ===== */
/*
  GANTI DI SINI AJA kalau mau update foto portfolio.
  - "images" = daftar path foto brand ini. 4 foto pertama otomatis jadi preview
    di kartu utama, semuanya muncul pas diklik (lightbox).
  - Taruh file fotonya di folder images/<nama-brand>/ lalu sesuaikan
    path-nya, atau ganti path ke lokasi lain sesuai struktur foldermu.
  - Minimal 4 foto per brand biar preview 2x2 penuh. Kalau kurang dari 4,
    slot yang kosong otomatis nampilin fallback warna brand.
  - "span2: true" bikin kartu itu lebih besar (2 kolom) di grid utama,
    kayak layout bento yang sekarang.
*/
const portfolioData = {
  algaestore: {
    name: 'Algaestore',
    ig: 'https://instagram.com/algaestore_id',
    cat: 'brand,sosmed',
    bgClass: 'bg-1',
    icon: '🛍️',
    span2: true,
    images: [
      'images/algaestore/algaestore1.png',
      'images/algaestore/algaestore2.png',
      'images/algaestore/algaestore3.png',
      'images/algaestore/algaestore4.png',
      'images/algaestore/algaestore5.png',
      'images/algaestore/algaestore6.png',
    ]
  },
  exora: {
    name: 'Exora',
    ig: 'https://instagram.com/exora_globaltrade',
    cat: 'ads',
    bgClass: 'bg-2',
    icon: '📱',
    span2: false,
    images: [
      'images/exora/exora1.png',
      'images/exora/exora2.png',
      'images/exora/exora3.png',
      'images/exora/exora4.png',
      'images/exora/exora5.png',
      'images/exora/exora6.png',
    ]
  },
  ploso: {
    name: 'Ploso Store',
    ig: 'https://instagram.com/ploso_store',
    cat: 'sosmed',
    bgClass: 'bg-3',
    icon: '✨',
    span2: false,
    images: [
      'images/ploso/ploso1.png',
      'images/ploso/ploso2.png',
      'images/ploso/ploso3.png',
      'images/ploso/ploso4.png',
      'images/ploso/ploso5.png',
      'images/ploso/ploso6.png',
    ]
  },
  strategist: {
    name: 'The Strategist Global Advisory',
    ig: 'https://instagram.com/thestrategist.adv',
    cat: 'campaign,ads',
    bgClass: 'bg-4',
    icon: '🚀',
    span2: true,
    images: [
      'images/ploso/ploso1.png',
      'images/ploso/ploso2.png',
      'images/ploso/ploso3.png',
      'images/ploso/ploso4.png',
      'images/ploso/ploso5.png',
      'images/ploso/ploso6.png',
    ]
  }
};

function renderPortfolioGrid() {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;

  grid.innerHTML = Object.keys(portfolioData).map(key => {
    const d = portfolioData[key];
    const previewSlots = 4;
    const thumbs = Array.from({ length: previewSlots }).map((_, i) => {
      const src = d.images[i];
      if (!src) {
        return `<div class="thumb ${d.bgClass}"><div class="thumb-fallback" style="display:flex;">${d.icon}</div></div>`;
      }
      return `
        <div class="thumb ${d.bgClass}">
          <img src="${src}" alt="${d.name} - hasil karya ${i + 1}" loading="lazy"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
          <div class="thumb-fallback">${d.icon}</div>
        </div>`;
    }).join('');

    return `
      <div class="portfolio-item${d.span2 ? ' span-2' : ''}" data-cat="${d.cat}" onclick="openPortfolioLightbox('${key}')">
        <div class="portfolio-preview">${thumbs}</div>
        <div class="portfolio-badge">${d.name}</div>
        <div class="portfolio-overlay">
          <div class="port-title">${d.name}</div>
          <div class="port-view">Lihat semua karya →</div>
        </div>
      </div>`;
  }).join('');
}
renderPortfolioGrid();

function openPortfolioLightbox(key) {
  const d = portfolioData[key];
  if (!d) return;

  document.getElementById('pl-title').textContent = d.name;
  document.getElementById('pl-ig-link').href = d.ig;

  document.getElementById('pl-grid').innerHTML = d.images.map((src, i) => `
    <div class="pl-thumb ${d.bgClass}">
      <img src="${src}" alt="${d.name} - karya ${i + 1}" loading="lazy"
           onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
      <div class="thumb-fallback">${d.icon}</div>
    </div>
  `).join('');

  document.getElementById('portfolio-lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePortfolioLightbox() {
  document.getElementById('portfolio-lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePortfolioLightbox();
});

/* ===== SERVICE DETAIL ===== */
const serviceData = {
  sosmed: {
    tag: '// social media management',
    title: 'SOCIAL MEDIA\nMANAGEMENT',
    desc: 'Kami kelola semua platform sosial media kamu secara profesional — dari perencanaan konten, desain grafis, copywriting, hingga community management. Kamu fokus bisnis, kami urus digitalnya.',
    features: [
      { icon: '📅', title: 'Content Planning & Kalender', text: 'Perencanaan konten strategis 30 hari ke depan. Setiap post punya tujuan yang jelas — awareness, engagement, atau conversion.' },
      { icon: '🎨', title: 'Desain Grafis & Video', text: 'Visual yang estetik dan sesuai brand guideline. Konten statis, carousel, Reels, dan TikTok video — semua kami produksi.' },
      { icon: '✍️', title: 'Copywriting', text: 'Caption yang menarik, bio yang optimal, dan hashtag yang tepat sasaran untuk jangkauan organik yang lebih luas.' },
      { icon: '💬', title: 'Community Management', text: 'Balas komentar, DM, dan interaksi dengan followers secara profesional dan tepat waktu — membangun loyalitas komunitas.' },
      { icon: '📊', title: 'Analytics & Reporting', text: 'Laporan bulanan lengkap: reach, impressions, engagement rate, follower growth, dan insight untuk optimasi ke depan.' },
      { icon: '🔥', title: 'Trend Monitoring', text: 'Kami pantau tren terkini dan viral konten untuk memastikan brand kamu selalu relevan dan up-to-date.' },
    ],
    pricing: [
      { name: 'Starter', price: '2.5', per: '/bulan', features: ['2 platform (IG + FB)', '12 konten/bulan', 'Basic desain grafis', 'Monthly report', 'Response komentar'] },
      { name: 'Growth', price: '5', per: '/bulan', featured: true, features: ['3 platform (IG + FB + TikTok)', '20 konten/bulan', 'Premium desain + video', 'Bi-weekly report', 'Full community management', 'Content strategy'] },
      { name: 'Premium', price: '10', per: '/bulan', features: ['4 platform + YouTube', '30 konten/bulan', 'Full video production', 'Weekly report', 'Dedicated account manager', 'Influencer coordination'] },
    ]
  },
  brand: {
    tag: '// brand & olshop management',
    title: 'BRAND & OLSHOP\nMANAGEMENT',
    desc: 'Bangun identitas brand yang kuat dari nol, atau perbarui yang sudah ada. Kami juga kelola dan optimasi toko online kamu di berbagai marketplace agar tampil profesional dan siap bersaing.',
    features: [
      { icon: '🎨', title: 'Brand Identity Design', text: 'Logo, color palette, typography, dan brand guideline yang kohesif. Identitas visual yang memorable dan profesional.' },
      { icon: '🛍️', title: 'Marketplace Optimization', text: 'Setup dan optimasi toko di Shopee, Tokopedia, Lazada — foto produk, deskripsi, pricing strategy, dan SEO marketplace.' },
      { icon: '📸', title: 'Product Photography', text: 'Foto produk yang menarik dan converting. Studio lighting, lifestyle shot, hingga video pendek produk.' },
      { icon: '🌐', title: 'Website / Landing Page', text: 'Website brand atau landing page yang fast, mobile-friendly, dan dioptimasi untuk conversion.' },
      { icon: '📦', title: 'Packaging Design', text: 'Desain packaging yang memperkuat brand experience dan meningkatkan repeat order.' },
      { icon: '⭐', title: 'Review & Reputasi', text: 'Strategi membangun review positif, handling review negatif, dan manajemen reputasi brand secara keseluruhan.' },
    ],
    pricing: [
      { name: 'Brand Starter', price: '3', per: '/bulan', features: ['Brand audit', 'Logo + color palette', '1 marketplace setup', 'Basic product photos (10 foto)', 'Brand guideline document'] },
      { name: 'Brand Growth', price: '7', per: '/bulan', featured: true, features: ['Full brand identity', '2 marketplace + website', 'Product photos (25 foto)', 'Marketplace management', 'Monthly performance review', 'Packaging design'] },
      { name: 'Brand Premium', price: '15', per: '/bulan', features: ['Complete brand overhaul', 'All marketplace + custom website', 'Unlimited product photos', 'Full management + CS support', 'Dedicated brand strategist', 'Quarterly brand review'] },
    ]
  },
  ads: {
    tag: '// ads setup & management',
    title: 'ADS SETUP',
    desc: 'Iklan yang tidak disetup dengan benar adalah uang yang dibakar. Kami riset, setup, dan optimasi campaign iklan kamu di Meta, Google, dan TikTok Ads agar setiap rupiah bekerja keras.',
    features: [
      { icon: '🔬', title: 'Audience Research', text: 'Riset mendalam target audience — demographics, interests, behaviors, dan lookalike audience untuk targeting yang presisi.' },
      { icon: '🎯', title: 'Campaign Structure', text: 'Struktur campaign yang benar: awareness, consideration, conversion, dan retargeting funnel yang terintegrasi.' },
      { icon: '🖼️', title: 'Ad Creative Production', text: 'Desain banner, video ads, dan copywriting yang proven convert. A/B testing creative untuk temukan yang terbaik.' },
      { icon: '⚙️', title: 'Pixel & Tracking Setup', text: 'Meta Pixel, Google Tag, dan conversion tracking yang akurat. Data yang benar = keputusan yang tepat.' },
      { icon: '🔄', title: 'Continuous Optimization', text: 'Monitoring harian, optimasi mingguan. Matikan yang tidak perform, scale yang winning. ROAS terus naik.' },
      { icon: '📋', title: 'Reporting Transparan', text: 'Laporan lengkap: spend, reach, clicks, leads, dan revenue yang dihasilkan. Tidak ada yang disembunyikan.' },
    ],
    pricing: [
      { name: 'Ads Starter', price: '2', per: '/bulan', features: ['1 platform (Meta/Google/TikTok)', 'Campaign setup', 'Basic creative production', 'Weekly optimization', 'Monthly report'] },
      { name: 'Ads Growth', price: '4.5', per: '/bulan', featured: true, features: ['2 platform', 'Full funnel campaign', 'Creative production + A/B test', 'Pixel/tracking setup', 'Daily monitoring', 'Bi-weekly report'] },
      { name: 'Ads Full', price: '8', per: '/bulan', features: ['Semua platform', 'Advanced funnel strategy', 'Full creative production', 'Advanced tracking & analytics', 'Dedicated ads specialist', 'Real-time dashboard'] },
    ]
  },
  campaign: {
    tag: '// campaign running',
    title: 'CAMPAIGN\nRUNNING',
    desc: 'Dari perencanaan strategis hingga eksekusi penuh — launching produk baru, Harbolnas, Ramadan promo, atau campaign khusus lainnya. Kami orkestrasi semua channel untuk hasil yang maksimal dan terukur.',
    features: [
      { icon: '🗺️', title: 'Campaign Strategy', text: 'Perencanaan campaign menyeluruh: timeline, KPI, channel mix, budget allocation, dan creative direction yang aligned dengan tujuan bisnis.' },
      { icon: '🤝', title: 'KOL & Influencer Management', text: 'Seleksi, negosiasi, dan koordinasi KOL/influencer yang tepat untuk audiensmu — dari nano hingga macro influencer.' },
      { icon: '📣', title: 'Multi-Channel Execution', text: 'Sinkronisasi campaign di sosmed, ads, email, marketplace, dan website. Semua bergerak bersamaan untuk impact maksimal.' },
      { icon: '🎬', title: 'Campaign Creative', text: 'Produksi materi campaign: key visual, video hero, banner ads, copy, dan semua aset yang dibutuhkan.' },
      { icon: '📡', title: 'Real-Time Monitoring', text: 'Pemantauan live selama campaign berlangsung. Respon cepat terhadap perubahan performa untuk hasil optimal.' },
      { icon: '📊', title: 'Post-Campaign Analysis', text: 'Laporan komprehensif pasca campaign: apa yang berhasil, apa yang tidak, dan rekomendasi untuk campaign berikutnya.' },
    ],
    pricing: [
      { name: 'Campaign Basic', price: 'Mulai 5', per: '/campaign', features: ['1 campaign (1–2 minggu)', 'Strategi & perencanaan', 'Creative production', 'Single channel execution', 'Campaign report'] },
      { name: 'Campaign Pro', price: 'Mulai 15', per: '/campaign', featured: true, features: ['Full campaign (2–4 minggu)', 'Comprehensive strategy', 'Full creative suite', 'Multi-channel execution', '2–5 KOL coordination', 'Real-time monitoring + report'] },
      { name: 'Campaign Enterprise', price: 'Custom', per: '', features: ['Campaign skala besar', 'Dedicated campaign team', 'Unlimited creative production', 'All channel + KOL macro', '24/7 monitoring', 'Dedicated campaign manager'] },
    ]
  }
};

function showServiceDetail(serviceKey) {
  const data = serviceData[serviceKey];
  document.getElementById('detail-tag').textContent = data.tag;
  document.getElementById('detail-title').innerHTML = data.title.replace('\n', '<br>');
  document.getElementById('detail-desc').textContent = data.desc;

  // Features
  const featEl = document.getElementById('detail-features');
  featEl.innerHTML = data.features.map(f => `
    <div class="detail-feature">
      <span class="df-icon">${f.icon}</span>
      <div class="df-title">${f.title}</div>
      <p class="df-text">${f.text}</p>
    </div>
  `).join('');

  showPage('service');

  // ← tambah di sini, paling bawah
  const btnBack = document.getElementById('btn-back');
  btnBack.replaceWith(btnBack.cloneNode(true)); // buang event listener lama
  document.getElementById('btn-back').addEventListener('click', function(e) {
    e.stopPropagation();
    scrollToSection('services');
    console.log('btn-back diklik!');
    showPage('home');
  }); 
}

  // toggle menu
  function toggleMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  }

  function closeMenu() {
    document.getElementById('hamburger').classList.remove('open');
    document.querySelector('.nav-links').classList.remove('open');
  }

  /* ===== FORM SUBMIT ===== */
  function submitForm() {
    const name = document.getElementById('f-name').value;
    const wa = document.getElementById('f-wa').value;
    const email = document.getElementById('f-email').value;
    const brand = document.getElementById('f-brand').value;
    const service = document.getElementById('f-service').value;
    const budget = document.getElementById('f-budget').value;
    const msg = document.getElementById('f-msg').value;

    if (!name || !wa) {
      alert('Nama dan nomor WhatsApp wajib diisi!');
      return;
    }

    const text = `Halo Panca Agency! Saya ingin konsultasi.

  *Nama:* ${name}
  *WhatsApp:* ${wa}
  *Email:* ${email || '-'}
  *Brand:* ${brand || '-'}
  *Layanan:* ${service || '-'}
  *Budget:* ${budget || '-'}
  *Pesan:* ${msg || '-'}`;

    // Tampilkan success screen
    document.getElementById('form-content').style.display = 'none';
    document.getElementById('form-success').classList.add('show');

    // Countdown lalu buka WA
    let count = 3;
    const interval = setInterval(() => {
      count--;
      document.getElementById('countdown-number').textContent = count;
      if (count === 0) {
        clearInterval(interval);
        window.open(`https://wa.me/6289601176069?text=${encodeURIComponent(text)}`, '_blank');
        document.getElementById('form-success').classList.remove('show');
        document.getElementById('form-content').style.display = 'block';
        
        // ← tambah ini
        document.getElementById('f-name').value = '';
        document.getElementById('f-wa').value = '';
        document.getElementById('f-email').value = '';
        document.getElementById('f-brand').value = '';
        document.getElementById('f-service').value = '';
        document.getElementById('f-budget').value = '';
        document.getElementById('f-msg').value = '';
      }
    }, 1000);
  }