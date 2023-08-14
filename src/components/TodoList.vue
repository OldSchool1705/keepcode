<template>
  <div>
    <TodoItem v-for="todo in paginatedTodos" :key="todo.id" :todo="todo" />
    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import TodoItem from './TodoItem.vue'
import { useStore } from '../stores/index'

const store = useStore()

const currentPage = ref(1)
const todosPerPage = 5

onMounted(async () => {
  await store.fetchTodos()
  store.todos.sort((a, b) => a.id - b.id);
});

const paginatedTodos = computed(() => {
  const startIndex = (currentPage.value - 1) * todosPerPage
  const endIndex = startIndex + todosPerPage
  return store.todos.slice(startIndex, endIndex)
});

const totalPages = computed(() => Math.ceil(store.todos.length / todosPerPage));

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>
