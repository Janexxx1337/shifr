import { createRouter, createWebHistory } from 'vue-router';
import Auth from '@/components/Auth.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Cabinet from '@/components/Cabinet.vue';

const routes = [
    { path: '/', component: Auth, name: 'auth' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/cabinet', component: Cabinet, name: 'cabinet' }
];


const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
