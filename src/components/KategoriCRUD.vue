<template>
  <div class="kategori-page">
    <h2 class="title">Manajemen Kategori</h2>

    <form @submit.prevent="handleSubmit" class="form">
      <input v-model="form.nama" placeholder="Nama kategori" required class="input" />

      <select v-model="form.tipe" required class="input">
        <option disabled value="">Pilih tipe kategori</option>
        <option value="pemasukan">Pemasukan</option>
        <option value="pengeluaran">Pengeluaran</option>
      </select>

      <div class="form-buttons">
        <button type="submit" class="btn primary">
          <i :class="editMode ? 'fas fa-save' : 'fas fa-plus'"></i>
          {{ editMode ? 'Update' : 'Tambah' }}
        </button>
        <button v-if="editMode" @click="cancelEdit" type="button" class="btn danger">Batal</button>
      </div>
    </form>

    <ul class="list">
      <li v-for="item in kategoris" :key="item.id" class="list-item">
        <span
          >{{ item.nama }} — <em>{{ item.tipe }}</em></span
        >
        <div class="actions">
          <button @click="startEdit(item)" class="btn edit"><i class="fas fa-edit"></i>Edit</button>
          <button @click="deleteKategori(item.id)" class="btn delete">
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
import { toRaw } from 'vue'

defineOptions({
  nama: 'KategoriPage',
})

const kategoris = ref([])
const form = ref({ nama: '', tipe: '' })
const editMode = ref(false)
const editId = ref(null)

const fetchKategoris = async () => {
  try {
    const res = await api.get('/kategori')
    kategoris.value = res.data
  } catch {
    alert('Gagal load data kategori')
  }
}

const handleSubmit = async () => {
  try {
    const payload = toRaw(form.value)

    if (editMode.value) {
      await api.put(`/kategori/${editId.value}`, payload)
      alert('Berhasil update kategori')
    } else {
      await api.post('/kategori', payload)
      alert('Berhasil tambah kategori')
    }
    form.value.nama = ''
    form.value.tipe = ''
    editMode.value = false
    editId.value = null
    fetchKategoris()
  } catch (error) {
    console.error('Error simpan kategori:', error)
    if (error.response) {
      // Jika error dari server (HTTP error)
      console.error('Response data:', error.response.data)
      alert(
        'Gagal menyimpan kategori: ' +
          (error.response.data.message || JSON.stringify(error.response.data)),
      )
    } else if (error.request) {
      // Jika request dibuat tapi tidak ada respon
      alert('Tidak ada respon dari server')
    } else {
      // Error lain
      alert('Error: ' + error.message)
    }
  }
}

const startEdit = (item) => {
  editMode.value = true
  editId.value = item.id
  form.value.nama = item.nama
  form.value.tipe = item.tipe
}

const cancelEdit = () => {
  editMode.value = false
  editId.value = null
  form.value.nama = ''
  form.value.tipe = ''
}

const deleteKategori = async (id) => {
  if (confirm('Yakin ingin hapus kategori?')) {
    try {
      await api.delete(`/kategori/${id}`)
      fetchKategoris()
    } catch {
      alert('Gagal hapus kategori')
    }
  }
}

onMounted(() => {
  fetchKategoris()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.kategori-page {
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
