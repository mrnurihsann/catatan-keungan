<template>
  <div class="pemasukan-page">
    <h2 class="title">Manajemen Pemasukan</h2>

    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-group" :class="{ error: errors.nama }">
        <label>Nama Pemasukan</label>
        <input v-model="form.nama" placeholder="Contoh: Gaji bulan Mei" class="input" />
        <small v-if="errors.nama">{{ errors.nama }}</small>
      </div>

      <div class="form-group" :class="{ error: errors.jumlah }">
        <label>Jumlah (Rp)</label>
        <input
          v-model.number="form.jumlah"
          type="number"
          min="0"
          class="input"
          placeholder="150000"
        />
        <small v-if="errors.jumlah">{{ errors.jumlah }}</small>
      </div>

      <div class="form-group" :class="{ error: errors.tanggal }">
        <label>Tanggal</label>
        <input v-model="form.tanggal" type="date" class="input" />
        <small v-if="errors.tanggal">{{ errors.tanggal }}</small>
      </div>

      <div class="form-group">
        <label>Catatan</label>
        <input v-model="form.catatan" class="input" placeholder="(opsional)" />
      </div>

      <div class="form-group" :class="{ error: errors.kategoriId }">
        <label>Kategori</label>
        <select v-model="form.kategoriId" class="input">
          <option disabled value="">-- Pilih Kategori --</option>
          <option v-for="k in kategoris" :key="k.id" :value="k.id">{{ k.nama }}</option>
        </select>
        <small v-if="errors.kategoriId">{{ errors.kategoriId }}</small>
      </div>

      <div class="form-group" :class="{ error: errors.userId }">
        <label>User</label>
        <select v-model="form.userId" class="input">
          <option disabled value="">-- Pilih User --</option>
          <option v-for="u in users" :key="u.id" :value="u.id">{{ u.username }}</option>
        </select>
        <small v-if="errors.userId">{{ errors.userId }}</small>
      </div>

      <div class="form-buttons">
        <button type="submit" class="btn primary">
          <i :class="editMode ? 'fas fa-save' : 'fas fa-plus'"></i>
          {{ editMode ? 'Update' : 'Tambah' }}
        </button>
        <button v-if="editMode" @click="cancelEdit" type="button" class="btn danger">Batal</button>
      </div>
    </form>

    <ul class="list">
      <li v-for="item in pemasukans" :key="item.id" class="list-item">
        <div>
          <strong>{{ item.catatan }}</strong
          ><br />
          Jumlah: Rp {{ item.jumlah.toLocaleString() }}<br />
          Tanggal: {{ item.tanggal }}<br />
          Kategori: {{ getKategorinama(item.kategoriId) }}<br />
          User: {{ getUsernama(item.userId) }}
        </div>
        <div class="actions">
          <button @click="startEdit(item)">Edit</button>
          <button @click="deletePemasukan(item.id)">Hapus</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/index.js'

defineOptions({
  nama: 'PemasukanPage',
})

const pemasukans = ref([])
const kategoris = ref([])
const users = ref([])

const form = ref({
  id: null,
  nama: '',
  jumlah: 0,
  tanggal: '',
  catatan: '',
  kategoriId: '',
  userId: '',
})

const editMode = ref(false)
const errors = ref({})

const fetchPemasukan = async () => {
  try {
    const res = await api.get('/pemasukan')
    pemasukans.value = res.data
  } catch (err) {
    console.error(err)
    alert('Gagal memuat data pemasukan')
  }
}

const fetchKategoris = async () => {
  try {
    const res = await api.get('/kategori')
    kategoris.value = res.data
  } catch (err) {
    console.error(err)
    alert('Gagal memuat data kategori')
  }
}

const fetchUsers = async () => {
  try {
    const res = await api.get('/users')
    users.value = res.data
  } catch (err) {
    console.error(err)
    alert('Gagal memuat data user')
  }
}

onMounted(() => {
  fetchPemasukan()
  fetchKategoris()
  fetchUsers()
})

// Helpers
const getKategorinama = (id) => {
  const kategori = kategoris.value.find((k) => k.id === id)
  return kategori ? kategori.nama : 'Tidak ditemukan'
}

const getUsernama = (id) => {
  const user = users.value.find((u) => u.id === id)
  return user ? user.username : 'Tidak ditemukan'
}

// Reset form
const resetForm = () => {
  form.value = {
    id: null,
    nama: '',
    jumlah: 0,
    tanggal: '',
    catatan: '',
    kategoriId: '',
    userId: '',
  }
  editMode.value = false
  errors.value = {}
}

// Validasi
const validateForm = () => {
  errors.value = {}
  if (!form.value.nama) errors.value.nama = 'Nama wajib diisi'
  if (!form.value.jumlah || form.value.jumlah <= 0)
    errors.value.jumlah = 'Jumlah harus lebih dari 0'
  if (!form.value.tanggal) errors.value.tanggal = 'Tanggal wajib diisi'
  if (!form.value.kategoriId) errors.value.kategoriId = 'Pilih kategori'
  if (!form.value.userId) errors.value.userId = 'Pilih user'
  return Object.keys(errors.value).length === 0
}

// Submit
const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    if (editMode.value) {
      await api.put(`/pemasukan/${form.value.id}`, form.value)
    } else {
      await api.post('/pemasukan', form.value)
    }
    await fetchPemasukan()
    resetForm()
  } catch (err) {
    console.error(err)
    alert('Gagal menyimpan data')
  }
}

// Edit dan Batal
const startEdit = (item) => {
  form.value = { ...item }
  editMode.value = true
}

const cancelEdit = () => {
  resetForm()
}

// Delete
const deletePemasukan = async (id) => {
  if (confirm('Yakin ingin menghapus data ini?')) {
    try {
      await api.delete(`/pemasukan/${id}`)
      await fetchPemasukan()
    } catch (err) {
      console.error(err)
      alert('Gagal menghapus data')
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.pemasukan-page {
  max-width: 700px;
  margin: 2rem auto;
  background: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #1f2937;
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}
.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 500;
  margin-bottom: 0.3rem;
  color: #374151;
}

.form-group small {
  color: #dc2626;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.form-group.error input,
.form-group.error select {
  border-color: #dc2626;
  background-color: #fef2f2;
}

.input {
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 1rem;
}

select.input {
  color: #111;
  background-color: white;
}

select.input option {
  background-color: #f9fafb; /* abu-abu sangat muda */
  color: #111; /* hitam agak gelap */
}

select.input option[disabled] {
  color: #9ca3af; /* abu-abu */
}

.form-buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.btn.primary {
  background-color: #2563eb;
  color: white;
}

.btn.danger {
  background-color: #e11d48;
  color: white;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-item {
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn.edit {
  background-color: #facc15;
  color: #1f2937;
}

.btn.delete {
  background-color: #ef4444;
  color: white;
}
</style>
