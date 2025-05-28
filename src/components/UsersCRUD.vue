<template>
  <div class="wrapper">
    <div class="container">
      <h2>Users</h2>

      <!-- Form Tambah / Edit -->
      <form @submit.prevent="handleSubmit">
        <input v-model="form.username" placeholder="Username" required />
        <input v-model="form.role" placeholder="Role" required />
        <input
          v-model="form.password"
          type="password"
          placeholder="Password"
          :required="!editMode"
        />
        <div class="button-group">
          <button type="submit" class="submit-btn">
            <i :class="editMode ? 'fas fa-save' : 'fas fa-plus'"></i>
            {{ editMode ? 'Update' : 'Tambah' }}
          </button>
          <button v-if="editMode" @click="cancelEdit" type="button" class="cancel-btn">
            Batal
          </button>
        </div>
      </form>

      <!-- Daftar Users -->
      <div class="user-list">
        <div v-for="item in users" :key="item.id" class="user-card">
          <div class="user-info">
            <strong>{{ item.username }}</strong> — <em>{{ item.role }}</em>
          </div>
          <div class="user-actions">
            <button @click="startEdit(item)" class="edit-btn">
              <i class="fas fa-edit"></i> Edit
            </button>
            <button @click="deleteUser(item.id)" class="delete-btn">
              <i class="fas fa-trash"></i> Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/index.js'

const users = ref([])
const form = ref({ username: '', role: '', password: '' })
const editMode = ref(false)
const editId = ref(null)

const fetchUsers = async () => {
  try {
    const res = await api.get('/users')
    users.value = res.data
  } catch {
    alert('Gagal mengambil data users')
  }
}

const handleSubmit = async () => {
  try {
    const payload = {
      username: form.value.username,
      role: form.value.role,
    }
    if (form.value.password) payload.password = form.value.password

    if (editMode.value) {
      await api.put(`/users/${editId.value}`, payload)
      alert('Berhasil update user')
    } else {
      await api.post('/users', payload)
      alert('Berhasil tambah user')
    }

    form.value = { username: '', role: '', password: '' }
    editMode.value = false
    editId.value = null
    fetchUsers()
  } catch {
    alert('Gagal menyimpan user')
  }
}

const deleteUser = async (id) => {
  if (confirm('Yakin ingin menghapus user ini?')) {
    try {
      await api.delete(`/users/${id}`)
      fetchUsers()
    } catch {
      alert('Gagal menghapus user')
    }
  }
}

const startEdit = (user) => {
  form.value = { username: user.username, role: user.role, password: '' }
  editId.value = user.id
  editMode.value = true
}

const cancelEdit = () => {
  form.value = { username: '', role: '', password: '' }
  editMode.value = false
  editId.value = null
}

onMounted(fetchUsers)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
}

.wrapper {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.container {
  width: 100%;
  max-width: 800px;
  background: #fff;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

h2 {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: #2d3436;
}

/* Form */
form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
}

input:focus {
  border-color: #0984e3;
  outline: none;
}

.button-group {
  grid-column: span 3;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

button {
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  color: white;
}

button:hover {
  opacity: 0.9;
}

.cancel-btn {
  background-color: #b2bec3;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-card {
  background-color: #f1f2f6;
  border-radius: 8px;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.user-info {
  font-size: 16px;
  min-width: 200px;
  flex: 1;
}

.user-actions {
  display: flex;
  gap: 10px;
}

.submit-btn {
  background-color: #00b894;
  color: white;
}

.edit-btn {
  background-color: #0984e3;
}

.delete-btn {
  background-color: #d63031;
}

/* Responsive */
@media (max-width: 600px) {
  .button-group {
    grid-column: span 1;
    flex-direction: column;
  }

  .user-actions {
    width: 100%;
    flex-direction: column;
  }

  button {
    width: 100%;
  }
}
</style>
