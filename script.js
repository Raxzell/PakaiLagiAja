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

// VARIABEL STATE FILTER
let currentCat = 'semua';

// FUNGSI RENDER KATALOG SUPER (Kategori + Search + Checkbox + Sorting)
function renderCatalog() {
  const grid = document.getElementById('catalog-grid');
  if(!grid) return; // Safeguard kalau lagi nggak di halaman katalog

  // 1. Ambil nilai dari Search Bar & Sort Dropdown
  const searchInput = document.getElementById('search-input');
  const searchVal = searchInput ? searchInput.value.toLowerCase() : '';
  const sortSelect = document.getElementById('sort-select');
  const sortVal = sortSelect ? sortSelect.value : 'terbaru';

  // 2. Ambil nilai dari Checkbox Status yang dicentang
  const statusCheckboxes = document.querySelectorAll('.filter-status');
  let activeStatuses = [];
  statusCheckboxes.forEach(cb => { if(cb.checked) activeStatuses.push(cb.value); });

  // 3. Ambil nilai dari Checkbox Jenis yang dicentang
  const typeCheckboxes = document.querySelectorAll('.filter-type');
  let activeTypes = [];
  typeCheckboxes.forEach(cb => { if(cb.checked) activeTypes.push(cb.value); });

  // 4. Proses Filtering Array
  let filtered = catalogItems.filter(item => {
    // Filter Kategori (Sidebar kiri)
    const matchCat = (currentCat === 'semua' || item.cat === currentCat);
    // Filter Pencarian (Ketik nama)
    const matchSearch = item.name.toLowerCase().includes(searchVal);
    // Filter Status (Tersedia/Dipinjam) - abaikan jika checkbox tidak ada di halaman ini
    const matchStatus = statusCheckboxes.length === 0 || activeStatuses.includes(item.status);
    // Filter Jenis (Pinjam/Tukar/Gratis)
    const matchType = typeCheckboxes.length === 0 || activeTypes.includes(item.type);

    return matchCat && matchSearch && matchStatus && matchType;
  });

  // 5. Proses Sorting Array
  if (sortVal === 'az') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortVal === 'za') {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }
  // Kalau 'terbaru', biarkan sesuai urutan asli array dummy

  // 6. Cetak ke HTML
  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 2rem; color: var(--text-muted);">Barang tidak ditemukan 😔<br>Coba ubah filter atau kata kunci pencarian.</div>`;
    return;
  }

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

// Fungsi ganti kategori dari sidebar
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
  // Animasi fitur di home
  document.querySelectorAll('.feature-card').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 300 + i * 80);
  });
  
  // Animasi statistik di dashboard
  if (document.querySelector('.stat-card')) animateStats();

  // Setup interaksi khusus halaman Katalog
  if (document.getElementById('catalog-grid')) {
    renderCatalog(); // Render pertama kali

    // Pasang alat pendengar (Event Listener) ke Search Bar
    document.getElementById('search-input').addEventListener('input', renderCatalog);
    
    // Pasang pendengar ke Dropdown Sorting
    document.getElementById('sort-select').addEventListener('change', renderCatalog);
    
    // Pasang pendengar ke semua Checkbox Status
    document.querySelectorAll('.filter-status').forEach(cb => {
      cb.addEventListener('change', renderCatalog);
    });
    
    // Pasang pendengar ke semua Checkbox Jenis
    document.querySelectorAll('.filter-type').forEach(cb => {
      cb.addEventListener('change', renderCatalog);
    });
  }
});

// script.js - Tambahin di paling bawah

// ── LOGIC UPLOAD FOTO (PREVIEW) DI MODAL TAMBAH BARANG ──
window.addEventListener('load', () => {
  // Ambil elemen-elemen yang dibutuhin
  const fileInput = document.getElementById('add-item-file-input');
  const uploadArea = document.getElementById('add-item-upload-area');
  const placeholderText = document.getElementById('add-item-placeholder');
  const previewImage = document.getElementById('add-item-preview');

  // Safety check: Pastikan elemennya ada di halaman ini
  if (!fileInput || !uploadArea || !previewImage) return;

  // 1. Pas kotak custom diklik, trigger input file asli
  uploadArea.addEventListener('click', () => {
    fileInput.click();
  });

  // 2. Pas user beres milih file (event 'change')
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0]; // Ambil file pertama

    // Pastikan file-nya ada dan tipenya gambar
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader(); // Pake API FileReader bawaan browser

      // Setup apa yang terjadi pas file beres dibaca
      reader.onload = (e) => {
        // Isi src gambar preview dengan hasil bacaan file
        previewImage.src = e.target.result;
        
        // Tampilkan gambar, sembunyiin tulisan placeholder
        previewImage.style.display = 'block';
        placeholderText.style.display = 'none';
        
        // Sesuaikan padding kotak upload biar pas sama gambar
        uploadArea.style.padding = '0.5rem';
      };

      // Mulai baca file sebagai Data URL
      reader.readAsDataURL(file);
    } else {
      // Kalau bukan gambar atau batal milih, reset tampilan
      previewImage.style.display = 'none';
      placeholderText.style.display = 'block';
      uploadArea.style.padding = '1.5rem';
    }
  });
});
