<template>
  <div>
    <a-form @submit.prevent="login">
      <a-form-item label="Email">
        <a-input v-model:value="email" placeholder="Email" />
      </a-form-item>
      <a-form-item label="Password">
        <a-input-password v-model:value="password" placeholder="Password" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">Вход</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useLoginStore } from '@/store/modules/login';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const store = useLoginStore();

    const login = () => {
      store.login(email.value, password.value);
    };

    return {
      email,
      password,
      login,
    };
  },
};
</script>
