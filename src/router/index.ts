import { createRouter, createWebHistory } from 'vue-router'
import ListView from '@/views/ListView.vue'
import DetailsView from '@/views/DetailsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ListView
  },
  {
    path: '/detalhes/:id',
    name: 'detalhes',
    component: DetailsView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router