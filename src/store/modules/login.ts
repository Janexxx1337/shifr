import { defineStore } from 'pinia';
import { message } from 'ant-design-vue';
import { BASE_URL } from "@//Base";
import router from "@/router";

export const useLoginStore = defineStore({
    id: 'login',
    state: () => ({
        authToken: localStorage.getItem('auth_token') || null,
    }),
    actions: {
        async login(email: string, password: string) {
            try {
                const response = await fetch(`${BASE_URL}/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data && data.token) {
                        localStorage.setItem("auth_token", data.token);
                        this.authToken = data.token;
                        message.success('Успешный вход!');
                        await router.push({name: 'cabinet'})
                    }
                } else {
                    message.error('Ошибка входа');
                }
            } catch (error) {
                message.error('Ошибка сети');
            }
        }
    }
});
