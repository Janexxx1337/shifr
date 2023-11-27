<template>
  <div class="chat-wrapper">
    <a-card class="search-container">
      <UsersSearch/>
    </a-card>
    <a-card class="chat-container" title="Чат">
      <a-list
          class="message-list"
          :dataSource="messages"
          item-layout="horizontal"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta
                :title="`Сообщение от ${item.id}`"
                :description="item.text"
            />
          </a-list-item>
        </template>
      </a-list>
      <a-input
          v-model:value="newMessage"
          placeholder="Введите сообщение..."
          @keyup.enter="sendMessage"
          class="message-input"
      >
        <template #addonAfter>
          <a-button type="primary" @click="sendMessage">Отправить</a-button>
        </template>
      </a-input>
    </a-card>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import UsersSearch from "../components/UsersSearch.vue";

export default {
  components: {UsersSearch},
  setup() {
    const messages = ref<{ id: number; text: string }[]>([]);
    const newMessage = ref('');
    let ws: WebSocket | null = null;

    onMounted(() => {
      ws = new WebSocket('ws://localhost:8080/ws');

      ws.onmessage = (event: MessageEvent) => {
        messages.value.push({ id: Date.now(), text: event.data });
      };

      ws.onclose = () => {
        console.log("WebSocket соединение закрыто");
      };

      ws.onerror = (event) => {
        console.error("Ошибка WebSocket:", event);
      };
    });

    onUnmounted(() => {
      if (ws) {
        ws.close();
      }
    });

    const sendMessage = () => {
      if (ws && ws.readyState === WebSocket.OPEN && newMessage.value.trim() !== '') {
        ws.send(newMessage.value);
        newMessage.value = '';
      } else if (!ws || ws.readyState !== WebSocket.OPEN) {
        console.error("WebSocket не подключен");
      }
    };

    return { messages, newMessage, sendMessage };
  }
};
</script>


<style scoped>
.chat-container {
  max-height: 400px;
}

.message-list {
  height: 300px;
  overflow-y: auto;
}
</style>
