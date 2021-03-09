import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'
import Asters from '../views/asters.vue'
import Aster from '../views/aster.vue'
import { dynamicPropsId } from '../helpers/dynamicProps'


const routes = [
  {
    path : '/',
    name: 'Home',
    component: Home
  },
  {
    path : '/asters',
    name: 'Asters',
    component: Asters
  },
  {
    path : '/aster/:id',
    name: 'Aster',
    props: dynamicPropsId,
    component: Aster
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router