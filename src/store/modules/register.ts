import { defineStore } from 'pinia';
import { message } from 'ant-design-vue';
import { BASE_URL } from "@//Base";
import { useRouter } from 'vue-router';
export const useRegisterStore = defineStore({
    id: 'register',
    state: () => ({
        authToken: localStorage.getItem('auth_token') || null
    }),
    actions: {
        // Прошу передать router в качестве параметра в экшен
        async register(email: string, password: string, router: any) {
            try {
                const response = await fetch(`${BASE_URL}/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data && data.token) {
                        localStorage.setItem("auth_token", data.token);
                        this.authToken = data.token;
                        message.success('Успешная регистрация!');
                        await router.push({ name: 'cabinet' });  // Важно удостовериться, что имя роута совпадает
                    }
                } else if (response.status === 409) {
                    const data = await response.json();  // Чтение тела ответа
                    console.log('Server response', data); // Логирование ответа
                    message.error('Email уже зарегистрирован');
                }
                else {
                    message.error('Ошибка регистрации');
                }
            } catch (error) {
                console.error("Actual error: ", error);
                message.error('Ошибка сети');
            }

        }
    }
});

