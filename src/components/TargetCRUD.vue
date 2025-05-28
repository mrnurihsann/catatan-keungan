<template>
  <div class="target-page">
    <h2 class="title">Manajemen Target</h2>

    <form @submit.prevent="handleSubmit" class="form">
      <input v-model="form.nama" placeholder="Nama Target" required class="input" />
      <input
        v-model="form.targetNominal"
        type="number"
        placeholder="Jumlah Target"
        required
        class="input"
      />
      <input v-model="form.userId" type="number" placeholder="UserId" required class="input" />

      <label class="checkbox-label">
        <input v-model="form.tercapai" type="checkbox" />
        Tercapai
      </label>

      <div class="form-buttons">
        <button type="submit" class="btn primary">
          <i :class="editMode ? 'fas fa-save' : 'fas fa-plus'"></i>
          {{ editMode ? 'Update' : 'Tambah' }}
        </button>
        <button v-if="editMode" type="button" @click="cancelEdit" class="btn danger">Batal</button>
      </div>
    </form>

    <div class="target-list" v-if="targets.length">
      <div class="target-card" v-for="item in targets" :key="item.id">
        <div class="target-details">
          <p><strong>Nama:</strong> {{ item.nama }}</p>
          <p><strong>Jumlah:</strong> Rp{{ Number(item.targetNominal).toLocaleString() }}</p>
          <p><strong>User ID:</strong> {{ item.userId }}</p>
          <p>
            <strong>Status:</strong>
            <span :class="item.tercapai ? 'badge-yes' : 'badge-no'">
              {{ item.tercapai ? 'Tercapai' : 'Belum Tercapai' }}
            </span>
          </p>
        </div>
        <div class="action-buttons">
          <button @click="startEdit(item)" class="btn edit"><i class="fas fa-edit"></i></button>
          <button @click="deleteTarget(item.id)" class="btn delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/index.js'

const targets = ref([])
const form = ref({ nama: '', targetNominal: 0, userId: '', tercapai: false })
const editMode = ref(false)
const editId = ref(null)

const fetchTargets = async () => {
  try {
    const res = await api.get('/target')
    targets.value = res.data
  } catch {
    alert('Gagal mengambil data target')
  }
}

const handleSubmit = async () => {
  try {
    if (editMode.value) {
      await api.put(`/target/${editId.value}`, form.value)
      alert('Berhasil update target')
    } else {
      await api.post('/target', form.value)
      alert('Berhasil tambah target')
    }
    resetForm()
    fetchTargets()
  } catch {
    alert('Gagal menyimpan target')
  }
}

const startEdit = (item) => {
  form.value = {
    nama: item.nama,
    targetNominal: item.targetNominal,
    userId: item.userId,
    tercapai: item.tercapai,
  }
  editId.value = item.id
  editMode.value = true
}

const cancelEdit = () => {
  resetForm()
}

const resetForm = () => {
  form.value = { nama: '', targetNominal: 0, userId: '', tercapai: false }
  editMode.value = false
  editId.value = null
}

const deleteTarget = async (id) => {
  if (confirm('Yakin ingin menghapus target ini?')) {
    try {
      await api.delete(`/target/${id}`)
      fetchTargets()
    } catch {
      alert('Gagal menghapus target')
    }
  }
}

onMounted(fetchTargets)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
}

.target-page {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 1.8rem;
  text-align: center;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.input {
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
}

.form-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: flex-end;
}

.btn {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  font-size: 0.95rem;
}

.btn.primary {
  background-color: #6366f1;
  color: white;
}

.btn.danger {
  background-color: #ef4444;
  color: white;
}

.btn.edit {
  background-color: #f59e0b;
  color: white;
}

.btn.delete {
  background-color: #e11d48;
  color: white;
}

.target-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.target-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  background-color: #f9fafb;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}

.target-details p {
  margin: 4px 0;
  font-size: 0.95rem;
}

.badge-yes {
  background-color: #10b981;
  color: white;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  font-size: 0.85rem;
}

.badge-no {
  background-color: #ef4444;
  color: white;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  font-size: 0.85rem;
}

.action-buttons {
  display: flex;
  gap: 10px;
}
</style>
