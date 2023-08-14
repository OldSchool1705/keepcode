<template>
  <div class="addTasks">
    <input class="addTasks-addInput" type="text" v-model="title" />
    <button class="addTasks-btn_addTodo" @click="addTodo">Add</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '../stores/index'

const store = useStore()
const title = ref('')

const addTodo = () => {
  const todo = { title: title.value, completed: false }
  store.addTodo(todo)
  title.value = ''
}
</script>

<style lang="scss" scoped>
.addTasks {
  margin: 40px 0;
  &-addInput {
    display: block;
    width: 100%;
    max-width: 600px;
    height: 40px;
    border-radius: 15px;
    font-size: 20px;
    margin-bottom: 20px;
  }
  &-btn_addTodo {
    width: 100%;
    max-width: 600px;
    height: 40px;
    border-radius: 15px;
    background: aquamarine;
  }
}

</style>
