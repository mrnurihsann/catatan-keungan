<template>
  <div class="container">
    <div class="card">
      <h2 class="title">Welcome Back</h2>

      <!-- Google Login -->
      <button @click="loginWithGoogle" class="google-login-btn">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          class="google-icon"
        />
        <span>Login dengan Google</span>
      </button>

      <form @submit.prevent="submitLogin" class="form">
        <div class="form-group">
          <label>Username</label>
          <input v-model="username" type="username" required />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input v-model="password" type="password" required />
        </div>

        <div v-if="error" class="error-message">{{ error }}</div>

        <button type="submit" class="submit-btn">Login</button>
      </form>

      <p class="register-text">
        Belum punya akun?
        <router-link to="/register" class="register-link">Daftar sekarang</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../api/index.js'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'LoginPage',
})

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')

const submitLogin = async () => {
  error.value = ''
  try {
    // GET semua users
    const response = await api.get('/users')
    const users = response.data

    // cari user yang cocok username & password
    const user = users.find((u) => u.username === username.value && u.password === password.value)

    if (user) {
      // Login berhasil, simpan data (bisa token kalau ada, atau user data)
      localStorage.setItem('user', JSON.stringify(user))
      router.push('/dashboard/dashboardpage')
    } else {
      error.value = 'Username atau password salah.'
    }
  } catch (err) {
    console.error(err)
    error.value = 'Terjadi kesalahan saat login.'
  }
}
</script>

<style stoped>
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
  color: #16274d; /* indigo-700 */
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
  border: 1px solid #d1d5db; /* gray-300 */
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-weight: 500;
  color: #4b5563; /* gray-700 */
  font-size: 0.875rem;
}

.google-login-btn:hover {
  background-color: #f3f4f6; /* gray-100 */
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
  color: #4b5563; /* gray-600 */
}

.form-group input {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db; /* gray-300 */
  border-radius: 0.375rem;
  outline: none;
  transition: box-shadow 0.2s ease;
}

.form-group input:focus {
  box-shadow: 0 0 0 2px #818cf8; /* indigo-400 */
  border-color: #818cf8;
}

.error-message {
  color: #ef4444; /* red-500 */
  font-size: 0.875rem;
  text-align: center;
}

.submit-btn {
  width: 100%;
  background-color: #0e2947; /* indigo-600 */
  color: white;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgb(5, 24, 65);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-btn:hover {
  background-color: #101e42; /* indigo-700 */
}

.register-text {
  text-align: center;
  font-size: 0.875rem;
  color: #4b5563; /* gray-600 */
  margin-top: 1rem;
}

.register-link {
  color: #09142b; /* indigo-600 */
  font-weight: 500;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}
</style>
