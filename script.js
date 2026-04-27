// ── MODAL ──
function openModal(id) {
  const modal = document.getElementById(id);
  if(modal) modal.classList.add('open');
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if(modal) modal.classList.remove('open');
}
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', function(e) {
    if (e.target === this) closeModal(this.id);
  });
});

// ── ROLE TOGGLE ──
function selectRole(btn) {
  btn.closest('.role-toggle').querySelectorAll('.role-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

// ── TABS ──
function switchTab(btn, tabId) {
  btn.closest('.dash-panel').querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  ['activity','notif','myitems'].forEach(id => {
    const el = document.getElementById('tab-' + id);
    if (el) el.style.display = id === tabId ? 'block' : 'none';
  });
}

// ── CATALOG DATA ──
const catalogItems = [
  { name: 'Kipas Angin COSMOS', cat: 'elektronik', icon: '🌀', bg: '#E1F5EE', status: 'Tersedia', owner: 'Andi N.', type: 'Pinjam', desc: 'Kondisi baik, fungsi normal. 1 tahun pakai.' },
  { name: 'Rice Cooker 1L', cat: 'dapur', icon: '🍳', bg: '#FAEEDA', status: 'Dipinjam', owner: 'Nadia A.', type: 'Pinjam', desc: 'Masih bagus, sudah dicuci bersih.' },
  { name: 'Buku Kalkulus Ed.9', cat: 'buku', icon: '📚', bg: '#E6F1FB', status: 'Tersedia', owner: 'Dimas K.', type: 'Tukar', desc: 'Lengkap, cover sedikit lecet.' },
  { name: 'Setrika Philips', cat: 'elektronik', icon: '🪣', bg: '#E1F5EE', status: 'Tersedia', owner: 'Sari W.', type: 'Pinjam', desc: 'Normal, bersih, bawaan kabel masih bagus.' },
  { name: 'Jaket Kulit M', cat: 'pakaian', icon: '🧥', bg: '#FAECE7', status: 'Tersedia', owner: 'Budi P.', type: 'Gratis', desc: 'Ukuran M, kondisi sangat baik, jarang dipakai.' },
  { name: 'Lampu Belajar LED', cat: 'elektronik', icon: '💡', bg: '#FAEEDA', status: 'Tersedia', owner: 'Rina M.', type: 'Pinjam', desc: 'Hemat energi, 3 level kecerahan.' },
  { name: 'Buku Fisika Dasar', cat: 'buku', icon: '🔭', bg: '#E6F1FB', status: 'Tersedia', owner: 'Hendra S.', type: 'Tukar', desc: 'Edisi terbaru, catatan ringan di beberapa halaman.' },
  { name: 'Kursi Lipat', cat: 'perabot', icon: '🪑', bg: '#F1EFE8', status: 'Tersedia', owner: 'Dewi L.', type: 'Pinjam', desc: 'Kuat, anti karat, cocok untuk acara.' },
  { name: 'Charger Laptop 65W', cat: 'elektronik', icon: '💻', bg: '#E1F5EE', status: 'Tersedia', owner: 'Andi N.', type: 'Pinjam', desc: 'Universal type C, baru 2 bulan.' },
  { name: 'Wajan 28cm', cat: 'dapur', icon: '🥘', bg: '#FAEEDA', status: 'Tersedia', owner: 'Tia R.', type: 'Gratis', desc: 'Anti lengket masih bagus, ukuran 28cm.' },
  { name: 'Kemeja Formal L', cat: 'pakaian', icon: '👔', bg: '#FAECE7', status: 'Tersedia', owner: 'Agus M.', type: 'Gratis', desc: 'Ukuran L, warna putih, sudah dicuci.' },
  { name: 'Laptop Stand', cat: 'elektronik', icon: '🖥️', bg: '#E1F5EE', status: 'Dipinjam', owner: 'Yuni K.', type: 'Pinjam', desc: 'Aluminium, adjustable, cocok semua laptop.' },
];

let currentCat = 'semua';

function renderCatalog() {
  const grid = document.getElementById('catalog-grid');
  if(!grid) return; // Safeguard if not on catalog page

  const filtered = currentCat === 'semua' ? catalogItems : catalogItems.filter(i => i.cat === currentCat);
  grid.innerHTML = filtered.map((item, i) => `
    <div class="catalog-item" onclick="openItemDetail(${catalogItems.indexOf(item)})" style="animation-delay:${i*0.04}s">
      <div class="catalog-item-img" style="background:${item.bg}">${item.icon}</div>
      <div class="catalog-item-body">
        <div class="catalog-item-name">${item.name}</div>
        <div class="catalog-item-owner">oleh ${item.owner}</div>
        <div class="catalog-item-footer">
          <span class="status-text">
            <span class="status-dot ${item.status === 'Tersedia' ? 'status-available' : 'status-borrowed'}"></span>
            ${item.status}
          </span>
          <span class="tag ${item.type === 'Gratis' ? 'tag-green' : item.type === 'Tukar' ? 'tag-blue' : 'tag-gray'}" style="font-size:10px;">${item.type}</span>
        </div>
      </div>
    </div>
  `).join('');
  setTimeout(() => grid.querySelectorAll('.catalog-item').forEach(el => el.classList.add('visible')), 50);
}

function filterCat(btn, cat) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentCat = cat;
  renderCatalog();
}

function openItemDetail(idx) {
  const item = catalogItems[idx];
  const imgEl = document.getElementById('detail-img');
  const nameEl = document.getElementById('detail-name');
  const catEl = document.getElementById('detail-cat');
  const descEl = document.getElementById('detail-desc');

  if(imgEl && nameEl && descEl) {
    imgEl.style.background = item.bg;
    imgEl.textContent = item.icon;
    nameEl.textContent = item.name;
    descEl.textContent = item.desc;
    if(catEl) {
       catEl.textContent = item.cat.charAt(0).toUpperCase() + item.cat.slice(1);
    }
    openModal('item-detail-modal');
  }
}

// ── ANIMATE STATS ──
function animateStats() {
  document.querySelectorAll('.stat-card, .feature-card').forEach((el, i) => {
    el.style.animationDelay = i * 0.07 + 's';
    el.classList.add('visible');
  });
}

// ── INIT ──
window.addEventListener('load', () => {
  document.querySelectorAll('.feature-card').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 300 + i * 80);
  });
  if (document.getElementById('catalog-grid')) renderCatalog();
  if (document.querySelector('.stat-card')) animateStats();
});