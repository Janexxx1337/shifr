<template>
  <a-input-search
      placeholder="Поиск пользователей..."
      @search="onSearch"
      enterButton
  />
  <a-list
      :dataSource="searchResults"
      renderItem="item in searchResults"
  >
    <a-list-item>{{ item }}</a-list-item>
  </a-list>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {
    const searchResults = ref([]);

    const onSearch = async (query: string | number | boolean) => {
      if (query.trim() !== '') {
        try {
          const response = await fetch(`http://localhost:8081/search?q=${encodeURIComponent(query)}`);
          if (!response.ok) {
            throw new Error(`Ошибка запроса: ${response.statusText}`);
          }
          const data = await response.json();
          searchResults.value = data;
        } catch (error) {
          console.error('Ошибка при поиске:', error);
        }
      }
    };

    return { searchResults, onSearch };
  }
};
</script>

