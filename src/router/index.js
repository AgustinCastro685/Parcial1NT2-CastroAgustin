import { createWebHistory, createRouter } from 'vue-router'

import Formulario from '../components/Formulario.vue'
import Gastos from '../components/Gastos.vue'
import MultipleChoice from '../components/MultipleChoice.vue'



const routes = [
    { path: '/', name: 'Home', component: Formulario },
    { path: '/formulario', name: 'Formulario', component: Formulario },
    { path: '/gastos', name: 'Gastos', component: Gastos },
    { path: '/multiplechoice', name: 'MultipleChoice', component: MultipleChoice }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router