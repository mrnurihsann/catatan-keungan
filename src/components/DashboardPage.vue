<template>
  <div class="dashboard">
    <h1 class="title">Ringkasan Dashboard</h1>

    <div class="grid-fixed">
      <!-- Kolom 1: Hari dan Tanggal -->
      <div class="card">
        <h3>Hari Ini</h3>
        <p class="tanggal">{{ hariIni }}</p>
      </div>

      <!-- Kolom 2: Kategori -->
      <div class="card">
        <h3>Kategori</h3>
        <ul>
          <li v-for="item in kategori" :key="item.id">{{ item.nama }}</li>
        </ul>
      </div>

      <!-- Kolom 3: Pengeluaran -->
      <div class="card">
        <h3>Pengeluaran</h3>
        <table class="table-pengeluaran">
          <thead>
            <tr>
              <th>Jumlah</th>
              <th>Catatan</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in pengeluaran" :key="item.id">
              <!-- <td>{{ item.username }}</td> -->
              <td>Rp{{ item.jumlah.toLocaleString() }}</td>
              <td>{{ item.catatan || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Kolom 4: Total Pengeluaran -->
      <div class="card total-card">
        <h3>Total Pengeluaran</h3>
        <p class="total">Rp{{ totalPengeluaran.toLocaleString() }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '../api/index.js'

const kategori = ref([])
const pemasukan = ref([])
const pengeluaran = ref([])
const target = ref([])

const totalPengeluaran = computed(() => {
  return pengeluaran.value.reduce((acc, item) => acc + item.jumlah, 0)
})

const hariIni = new Date().toLocaleDateString('id-ID', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

const fetchData = async () => {
  try {
    const [katRes, masukRes, keluarRes, targetRes] = await Promise.all([
      api.get('/kategori'),
      api.get('/pemasukan'),
      api.get('/pengeluaran'),
      api.get('/target'),
    ])
    kategori.value = katRes.data
    pemasukan.value = masukRes.data
    pengeluaran.value = keluarRes.data
    target.value = targetRes.data
  } catch (err) {
    console.error('Gagal mengambil data:', err)
    alert('Gagal mengambil data dashboard.')
  }
}

onMounted(fetchData)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.title {
  margin-left: 10px;
  padding: 1rem;
}

.dashboard {
  margin-left: 300px;
  padding: 1rem;
  position: relative;
  z-index: 1;
}

.grid-fixed {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Tetap 4 kolom */
  gap: 1rem;
}

@media (max-width: 768px) {
  .dashboard {
    margin-left: 0;
  }

  .grid-fixed {
    grid-template-columns: 1fr;
  }
}

.card {
  background: #ffffff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.card h3 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  color: #1f2937;
}

.card ul {
  list-style: none;
  padding: 0;
}

.card li {
  padding: 0.25rem 0;
  border-bottom: 1px solid #f3f4f6;
  font-size: 0.95rem;
}

.total-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.total {
  font-size: 1.5rem;
  color: #10b981;
  font-weight: bold;
}

.tanggal {
  font-size: 1rem;
  color: #374151;
}

.table-pengeluaran {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.table-pengeluaran th,
.table-pengeluaran td {
  border-bottom: 1px solid #e5e7eb;
  padding: 0.5rem;
  text-align: left;
}

.table-pengeluaran th {
  background-color: #f9fafb;
  color: #374151;
}

.table-pengeluaran td {
  color: #4b5563;
}
</style>
