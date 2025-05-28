<template>
  <div class="dashboard-container">
    <Sidebar />
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'

defineOptions({
  name: 'DashboardPage',
})
</script>

<style scoped>
.dashboard-container {
  display: flex;
}
.content {
  flex: 1;
  padding: 2rem;
  background: #f5f7fa;
  min-height: 100vh;
}
</style>
