<template>
  <div>
    <a-form @submit.prevent="register">
      <a-form-item label="Email">
        <a-input v-model:value="email" placeholder="Email" />
      </a-form-item>
      <a-form-item label="Password">
        <a-input-password v-model:value="password" placeholder="Password" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">Register</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { useRegisterStore } from '@/store/modules/register';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const store = useRegisterStore();
    const router = useRouter();  // Получаем инстанс роутера внутри setup

    const register = () => {
      store.register(email.value, password.value, router);  // Передаём router в экшен
    };

    return {
      email,
      password,
      register,
    };
  },
};

</script>
