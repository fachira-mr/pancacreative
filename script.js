/* ===== CURSOR ===== */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let cx = 0, cy = 0, rx = 0, ry = 0;
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

/* ===== PORTFOLIO FILTER ===== */
function filterPortfolio(btn, cat) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.portfolio-item').forEach(item => {
    const cats = (item.getAttribute('data-cat') || '').split(',');
    const show = cat === 'all' || cats.includes(cat);
    item.style.opacity = show ? '1' : '0.25';
    item.style.transform = show ? 'scale(1)' : 'scale(0.97)';
    item.style.transition = 'opacity 0.3s, transform 0.3s';
  });
}

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

  // Pricing
  const priceEl = document.getElementById('detail-pricing');
  priceEl.innerHTML = data.pricing.map(p => `
    <div class="price-tier ${p.featured ? 'featured' : ''}">
      ${p.featured ? '<div class="price-badge">Most Popular</div>' : ''}
      <div class="price-name">${p.name}</div>
      <ul class="price-features">
        ${p.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
      <button class="btn-primary" style="margin-top:1.5rem;width:100%;text-align:center" onclick="showPage('contact')">
        ${p.price === 'Custom' ? 'Hubungi Kami' : 'Pilih Paket Ini'}
      </button>
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

/* ===== FORM SUBMIT ===== */
async function submitForm() {

  const name = document.getElementById('f-name').value.trim();
  const wa = document.getElementById('f-wa').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const brand = document.getElementById('f-brand').value.trim();
  const service = document.getElementById('f-service').value.trim();
  const budget = document.getElementById('f-budget').value.trim();
  const msg = document.getElementById('f-msg').value.trim();

  if (!name || !wa) {  // sesuaikan field mana yg wajib
    alert('Mohon isi Nama dan WhatsApp ya!');
    return;
  }

  const btn = document.querySelector('.form-submit');
  btn.disabled = true;
  btn.textContent = 'Mengirim...';

  try {
    await fetch("https://script.google.com/macros/s/AKfycbz__Kzu_wq0amYAJgdLTIiPTTNxNiMCTiWBfqLhuJ2wDIRGAx_Mwt5fwNWVKhzwZNOk/exec", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({ name, wa, email, brand, service, budget, msg })
    });

    // Tampilkan success
    document.getElementById('form-content').style.display = 'none';
    document.getElementById('form-success').classList.add('show');

    // Countdown 3 detik lalu balik ke form
    let count = 5;
    const countdownEl = document.getElementById('countdown-number');
    countdownEl.textContent = count;

    const interval = setInterval(() => {
        count--;
        countdownEl.textContent = count;
        if (count === 0) {
            clearInterval(interval);
            // Reset form
            document.getElementById('f-name').value = '';
            document.getElementById('f-wa').value = '';
            document.getElementById('f-email').value = '';
            document.getElementById('f-brand').value = '';
            document.getElementById('f-service').value = '';
            document.getElementById('f-budget').value = '';
            document.getElementById('f-msg').value = '';
            btn.disabled = false;
            btn.textContent = 'Kirim Pesan Sekarang';
            // Balik ke form
            document.getElementById('form-success').classList.remove('show');
            document.getElementById('form-content').style.display = '';
        }
    }, 1000);

  } catch (err) {
    console.error("Gagal kirim:", err);
    alert('Gagal mengirim pesan. Coba lagi ya, atau hubungi kami langsung via WhatsApp!');
    btn.disabled = false;
    btn.textContent = 'Kirim Pesan Sekarang';
  }
}