import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '@/views/Dashboard.vue'
import KategoriCRUD from '@/components/KategoriCRUD.vue'
import PemasukanCRUD from '@/components/PemasukanCRUD.vue'
import PengeluaranCRUD from '@/components/PengeluaranCRUD.vue'
import TargetCRUD from '@/components/TargetCRUD.vue'
import UsersCRUD from '@/components/UsersCRUD.vue'
import DashboardPage from '@/components/DashboardPage.vue'
// import DashboardPage from '@/components/DashboardPage.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/', redirect: '/login' },
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      { path: 'dashboardpage', component: DashboardPage },
      { path: 'kategori', component: KategoriCRUD },
      { path: 'pemasukan', component: PemasukanCRUD },
      { path: 'pengeluaran', component: PengeluaranCRUD },
      { path: 'target', component: TargetCRUD },
      { path: 'users', component: UsersCRUD },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
