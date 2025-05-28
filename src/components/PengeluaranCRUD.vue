<template>
  <div class="pengeluaran-page">
    <h2 class="title">Manajemen Pengeluaran</h2>

    <form @submit.prevent="handleSubmit" class="form">
      <select v-model="form.userId" required class="input">
        <option disabled value="">Pilih User</option>
        <option v-for="u in users" :key="u.id" :value="u.id">{{ u.username }}</option>
      </select>

      <select v-model="form.kategoriId" required class="input">
        <option disabled value="">Pilih Kategori</option>
        <option v-for="k in kategoris" :key="k.id" :value="k.id">{{ k.nama }}</option>
      </select>

      <input
        v-model.number="form.jumlah"
        type="number"
        placeholder="Jumlah"
        required
        min="0"
        class="input"
      />

      <input v-model="form.tanggal" type="date" required class="input" />

      <input v-model="form.catatan" type="text" placeholder="Catatan" class="input" />

      <div class="form-buttons">
        <button type="submit" class="btn primary">
          <i :class="editMode ? 'fas fa-save' : 'fas fa-plus'"></i>
          {{ editMode ? 'Update' : 'Tambah' }}
        </button>
        <button v-if="editMode" @click="cancelEdit" type="button" class="btn danger">Batal</button>
      </div>
    </form>

    <ul class="list">
      <li v-for="item in pengeluarans" :key="item.id" class="list-item">
        <div>
          <strong>{{ getUserName(item.userId) }}</strong> -
          <em>{{ getKategoriName(item.kategoriId) }}</em> - Rp{{ item.jumlah.toLocaleString() }} -
          {{ item.tanggal }} <br />
          <small>{{ item.catatan }}</small>
        </div>
        <div class="actions">
          <button @click="startEdit(item)" class="btn edit"><i class="fas fa-edit"></i>Edit</button>
          <button @click="deletePengeluaran(item.id)" class="btn delete">
            <i class="fas fa-trash"></i>Hapus
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/index.js'

const pengeluarans = ref([])
const users = ref([])
const kategoris = ref([])

const form = ref({
  userId: '',
  kategoriId: '',
  jumlah: null,
  tanggal: '',
  catatan: '',
})

const editMode = ref(false)
const editId = ref(null)

// Load semua data: pengeluaran, users, kategoris
const fetchData = async () => {
  try {
    const [resPengeluaran, resUsers, resKategori] = await Promise.all([
      api.get('/pengeluaran'),
      api.get('/users'),
      api.get('/kategori'),
    ])
    pengeluarans.value = resPengeluaran.data
    users.value = resUsers.data
    kategoris.value = resKategori.data
  } catch (error) {
    console.log(error)
    alert('Gagal load data')
  }
}

const handleSubmit = async () => {
  try {
    if (editMode.value) {
      await api.put(`/pengeluaran/${editId.value}`, form.value)
      alert('Berhasil update pengeluaran')
    } else {
      await api.post('/pengeluaran', form.value)
      alert('Berhasil tambah pengeluaran')
    }
    resetForm()
    fetchData()
  } catch {
    alert('Gagal menyimpan pengeluaran')
  }
}

const startEdit = (item) => {
  editMode.value = true
  editId.value = item.id
  form.value = {
    userId: item.userId,
    kategoriId: item.kategoriId,
    jumlah: item.jumlah,
    tanggal: item.tanggal,
    catatan: item.catatan || '',
  }
}

const cancelEdit = () => {
  resetForm()
}

const resetForm = () => {
  editMode.value = false
  editId.value = null
  form.value = {
    userId: '',
    kategoriId: '',
    jumlah: null,
    tanggal: '',
    catatan: '',
  }
}

const deletePengeluaran = async (id) => {
  if (confirm('Yakin ingin hapus pengeluaran?')) {
    try {
      await api.delete(`/pengeluaran/${id}`)
      fetchData()
    } catch {
      alert('Gagal hapus pengeluaran')
    }
  }
}

const getUserName = (id) => {
  const user = users.value.find((u) => u.id === id)
  return user ? user.username : 'Tidak ditemukan'
}

const getKategoriName = (id) => {
  const kategori = kategoris.value.find((k) => k.id === id)
  return kategori ? kategori.nama : 'Tidak ditemukan'
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.pengeluaran-page {
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

.input {
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 1rem;
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
