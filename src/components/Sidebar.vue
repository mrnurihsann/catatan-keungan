<template>
  <div>
    <!-- Overlay for mobile -->
    <div class="overlay" :class="{ show: showSidebar }" @click="closeSidebar"></div>

    <!-- Mobile Toggle Button -->
    <button class="toggle-btn" @click="toggleSidebar">
      <i class="fas" :class="showSidebar ? 'fa-times' : 'fa-bars'"></i>
    </button>

    <!-- Sidebar -->
    <aside class="sidebar glass-effect" :class="{ open: showSidebar }">
      <!-- Logo Section -->
      <div class="logo-section">
        <div class="logo-container">
          <div class="logo-icon">📊</div>
          <h1 class="logo-text">Dashboard</h1>
        </div>
        <div class="brand-subtitle">Financial Manager</div>
      </div>

      <!-- Navigation -->
      <nav class="navigation">
        <div class="nav-section">
          <h3 class="nav-title">MAIN MENU</h3>
          <ul class="nav-list">
            <li class="nav-item">
              <router-link to="/dashboard/dashboardpage" class="nav-link">
                <span class="nav-icon">📊</span>
                <span class="nav-text">Dashboard</span>
                <span class="nav-indicator"></span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/dashboard/kategori" class="nav-link">
                <span class="nav-icon">📁</span>
                <span class="nav-text">Kategori</span>
                <span class="nav-indicator"></span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/dashboard/pemasukan" class="nav-link">
                <span class="nav-icon">💰</span>
                <span class="nav-text">Pemasukan</span>
                <span class="nav-indicator"></span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/dashboard/pengeluaran" class="nav-link">
                <span class="nav-icon">🧾</span>
                <span class="nav-text">Pengeluaran</span>
                <span class="nav-indicator"></span>
              </router-link>
            </li>
          </ul>
        </div>

        <div class="nav-section">
          <h3 class="nav-title">MANAGEMENT</h3>
          <ul class="nav-list">
            <li class="nav-item">
              <router-link to="/dashboard/target" class="nav-link">
                <span class="nav-icon">🎯</span>
                <span class="nav-text">Target</span>
                <span class="nav-indicator"></span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/dashboard/users" class="nav-link">
                <span class="nav-icon">👥</span>
                <span class="nav-text">Users</span>
                <span class="nav-indicator"></span>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Sidebar Footer -->
      <div class="sidebar-footer">
        <div class="user-profile">
          <div class="user-avatar">👤</div>
          <div class="user-info">
            <div class="user-name">Admin User</div>
            <div class="user-role">Dashboard Manager</div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineOptions({ name: 'ResponsiveSidebar' })

const showSidebar = ref(false)

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

const closeSidebar = () => {
  showSidebar.value = false
}

// Close sidebar on escape key
const handleKeydown = (e) => {
  if (e.key === 'Escape' && showSidebar.value) {
    closeSidebar()
  }
}

// Handle window resize
const handleResize = () => {
  if (window.innerWidth > 1024 && showSidebar.value) {
    showSidebar.value = false
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* Import Poppins font */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

/* CSS Variables for consistent theming */
:root {
  --sidebar-width: 280px;
  --sidebar-width-collapsed: 80px;
  --sidebar-bg-primary: #1e3a8a;
  --sidebar-bg-secondary: #1e40af;
  --sidebar-text-primary: #ffffff;
  --sidebar-text-secondary: #e2e8f0;
  --sidebar-text-muted: #94a3b8;
  --sidebar-accent: #3b82f6;
  --sidebar-accent-hover: #2563eb;
  --sidebar-border: #3730a3;
  --sidebar-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --transition-fast: 0.2s ease-out;
  --transition-smooth: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Apply Poppins font to all elements */
* {
  font-family: 'Poppins', sans-serif;
}

/* Overlay for mobile */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 99;
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-smooth);
}

.overlay.show {
  opacity: 1;
  visibility: visible;
}

/* Toggle Button */
.toggle-btn {
  position: fixed;
  top: 1.25rem;
  left: 1.25rem;
  z-index: 200;
  background: var(--sidebar-bg-primary);
  color: var(--sidebar-text-primary);
  border: 1px solid var(--sidebar-border);
  padding: 12px 14px;
  border-radius: 12px;
  cursor: pointer;
  display: none;
  transition: all var(--transition-fast);
  box-shadow: var(--sidebar-shadow);
  font-family: 'Poppins', sans-serif;
}

.toggle-btn:hover {
  background: var(--sidebar-bg-secondary);
  transform: translateY(-1px);
}

.toggle-btn i {
  font-size: 18px;
}

/* Main Sidebar */
.sidebar {
  width: var(--sidebar-width);
  background: linear-gradient(
    145deg,
    var(--sidebar-bg-primary) 0%,
    var(--sidebar-bg-secondary) 100%
  );
  color: var(--sidebar-text-primary);
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--sidebar-border);
  box-shadow: var(--sidebar-shadow);
  transition: transform var(--transition-smooth);
  font-family: 'Poppins', sans-serif;
}

.glass-effect {
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

/* Logo Section */
.logo-section {
  padding: 2rem 1.5rem 1.5rem;
  border-bottom: 1px solid var(--sidebar-border);
  text-align: center;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.logo-icon {
  font-size: 2rem;
  filter: drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3));
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #60a5fa, #06b6d4);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  font-family: 'Poppins', sans-serif;
}

.brand-subtitle {
  font-size: 0.75rem;
  color: var(--sidebar-text-muted);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: 'Poppins', sans-serif;
}

/* Navigation */
.navigation {
  flex: 1;
  padding: 1.5rem 0;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--sidebar-border) transparent;
}

.navigation::-webkit-scrollbar {
  width: 4px;
}

.navigation::-webkit-scrollbar-track {
  background: transparent;
}

.navigation::-webkit-scrollbar-thumb {
  background: var(--sidebar-border);
  border-radius: 4px;
}

.nav-section {
  margin-bottom: 2rem;
}

.nav-title {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--sidebar-text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 1rem 1.5rem;
  padding-left: 0.5rem;
  font-family: 'Poppins', sans-serif;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: 0.25rem;
  padding: 0 1rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1rem;
  color: var(--sidebar-text-secondary);
  text-decoration: none;
  border-radius: 12px;
  position: relative;
  transition: all var(--transition-fast);
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--sidebar-accent), var(--sidebar-accent-hover));
  opacity: 0;
  transition: opacity var(--transition-fast);
  z-index: -1;
}

.nav-link:hover {
  color: var(--sidebar-text-primary);
  transform: translateX(4px);
}

.nav-link:hover::before {
  opacity: 0.2;
}

.nav-link.router-link-exact-active {
  color: var(--sidebar-text-primary);
  background: linear-gradient(135deg, var(--sidebar-accent), var(--sidebar-accent-hover));
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
}

.nav-link.router-link-exact-active .nav-indicator {
  opacity: 1;
  transform: scaleX(1);
}

.nav-icon {
  font-size: 1.25rem;
  width: 24px;
  text-align: center;
  flex-shrink: 0;
}

.nav-text {
  flex: 1;
  font-size: 0.9rem;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
}

.nav-indicator {
  position: absolute;
  right: 1rem;
  width: 4px;
  height: 4px;
  background: var(--sidebar-text-primary);
  border-radius: 50%;
  opacity: 0;
  transform: scaleX(0);
  transition: all var(--transition-fast);
}

/* Sidebar Footer */
.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid var(--sidebar-border);
  margin-top: auto;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--sidebar-accent), var(--sidebar-accent-hover));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--sidebar-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'Poppins', sans-serif;
}

.user-role {
  font-size: 0.7rem;
  color: var(--sidebar-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'Poppins', sans-serif;
}

/* Responsive Design */

/* Large Desktop (1440px+) */
@media (min-width: 1440px) {
  .sidebar {
    width: 320px;
  }

  .logo-text {
    font-size: 1.75rem;
  }

  .nav-text {
    font-size: 1rem;
  }
}

/* Desktop (1024px - 1439px) */
@media (min-width: 1024px) and (max-width: 1439px) {
  .sidebar {
    width: var(--sidebar-width);
  }
}

/* Tablet (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .sidebar {
    width: 260px;
    transform: translateX(-100%);
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .toggle-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

/* Mobile Large (480px - 767px) */
@media (min-width: 480px) and (max-width: 767px) {
  .sidebar {
    width: 280px;
    transform: translateX(-100%);
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .toggle-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

/* Mobile Small (320px - 479px) */
@media (max-width: 479px) {
  .sidebar {
    width: 100vw;
    transform: translateX(-100%);
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .toggle-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    top: 1rem;
    left: 1rem;
  }

  .logo-section {
    padding: 1.5rem 1rem 1rem;
  }

  .logo-text {
    font-size: 1.25rem;
  }

  .navigation {
    padding: 1rem 0;
  }

  .nav-title {
    margin-left: 1rem;
  }

  .nav-item {
    padding: 0 0.75rem;
  }

  .sidebar-footer {
    padding: 1rem;
  }
}

/* Hover states for desktop only */
@media (hover: hover) {
  .nav-link:hover .nav-icon {
    transform: scale(1.1);
  }

  .user-profile:hover {
    background: rgba(255, 255, 255, 0.15);
  }
}

/* Focus states for accessibility */
.nav-link:focus {
  outline: 2px solid var(--sidebar-accent);
  outline-offset: 2px;
}

.toggle-btn:focus {
  outline: 2px solid var(--sidebar-accent);
  outline-offset: 2px;
}

/* Animation for smooth entrance */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.nav-item {
  animation: slideIn 0.3s ease-out forwards;
}

.nav-item:nth-child(1) {
  animation-delay: 0.1s;
}
.nav-item:nth-child(2) {
  animation-delay: 0.15s;
}
.nav-item:nth-child(3) {
  animation-delay: 0.2s;
}
.nav-item:nth-child(4) {
  animation-delay: 0.25s;
}
.nav-item:nth-child(5) {
  animation-delay: 0.3s;
}

/* Print styles */
@media print {
  .sidebar {
    display: none;
  }
  .nav-item:nth-child(4) {
    animation-delay: 0.25s;
  }
  .nav-item:nth-child(5) {
    animation-delay: 0.3s;
  }

  /* Print styles */
  @media print {
    .sidebar {
      display: none;
    }
  }
}
</style>
