import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Form from './components/Form.vue'
import TaskPage from './components/TaskPage.vue'
import { createRouter,createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

const routes = [
    {   
        name: 'Form',
        path: '/',
        component: Form
    },
    {
        name: 'TaskPage',
        path: '/TaskPage/:id',
        component: TaskPage,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)
    app.use(router)
    app.mount('#app')
    app.use(autoAnimatePlugin)

