<template>
  <div class="container">
    <div class="card">
      <h2 class="title">Buat Akun</h2>

      <!-- Google Register -->
      <button @click="registerWithGoogle" class="google-login-btn">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          class="google-icon"
        />
        <span>Daftar dengan Google</span>
      </button>

      <form @submit.prevent="submitRegister" class="form">
        <div class="form-group">
          <label>Username</label>
          <input v-model="username" type="text" required />
        </div>
        <div class="form-group">
          <label>Role</label>
          <input v-model="role" type="role" required />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input v-model="password" type="password" required />
        </div>

        <div v-if="error" class="error-message">{{ error }}</div>

        <button type="submit" class="submit-btn">Daftar</button>
      </form>

      <p class="register-text">
        Sudah punya akun?
        <router-link to="/login" class="register-link">Login di sini</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../api/index.js'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'RegisterPage',
})

const router = useRouter()
const username = ref('')
const role = ref('')
const password = ref('')
const error = ref('')

const submitRegister = async () => {
  error.value = ''
  try {
    const response = await api.post('/users', {
      username: username.value,
      role: role.value,
      password: password.value,
    })
    localStorage.setItem('token', response.data.token)
    router.push('/dashboard')
  } catch (err) {
    console.log(err)
    error.value = err.response?.data?.message || 'Registrasi gagal, coba lagi.'
  }
}

const registerWithGoogle = () => {
  window.location.href = 'http://localhost:3000/auth/google' // Ganti dengan URL backend Google auth kamu
}
</script>

<!-- Copy style dari login.vue -->
<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom right, #c3dafe, #ffffff);
  padding: 1rem;
}

.card {
  background-color: white;
  padding: 2rem;
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(10, 38, 75, 0.849);
  width: 100%;
  max-width: 400px;
  transition: all 0.3s ease;
}

.title {
  font-size: 2rem;
  font-weight: 800;
  text-align: center;
  color: #16274d;
  margin-bottom: 1.5rem;
}

.google-login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-weight: 500;
  color: #4b5563;
  font-size: 0.875rem;
}

.google-login-btn:hover {
  background-color: #f3f4f6;
}

.google-icon {
  width: 20px;
  height: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 500;
  color: #4b5563;
}

.form-group input {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  outline: none;
  transition: box-shadow 0.2s ease;
}

.form-group input:focus {
  box-shadow: 0 0 0 2px #818cf8;
  border-color: #818cf8;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  text-align: center;
}

.submit-btn {
  width: 100%;
  background-color: #0e2947;
  color: white;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgb(5, 24, 65);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-btn:hover {
  background-color: #101e42;
}

.register-text {
  text-align: center;
  font-size: 0.875rem;
  color: #4b5563;
  margin-top: 1rem;
}

.register-link {
  color: #09142b;
  font-weight: 500;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}
</style>
