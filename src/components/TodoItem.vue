<template>
  <div class="todoForm">
<div class="todoForm-boxEdit">
  <span class="todoForm-title" v-if="!editing">{{ editedTodo.title }}</span>
  <input class="todoForm-editInput" v-else type="text" v-model="editedTodo.title" />
</div>
<div class="todoForm-boxBtn">
  <button class="todoForm-editTodo" v-if="!editing" @click="editTodo">Edit</button>
  <button class="todoForm-editTodo"  v-else @click="saveEditedTodo">Save</button>
  <button class="todoForm-deleteTodo" @click="deleteTodo">Delete</button>
</div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { useStore } from '../stores/index'

const props = defineProps(['todo'])
const store = useStore()

const editedTodo = ref({ ...props.todo })
const editing = ref(false)

const editTodo = () => {
  editing.value = true
}

const saveEditedTodo = () => {
  store.editTodo(editedTodo.value)
  editing.value = false
}

const deleteTodo = () => {
  store.deleteTodo(props.todo.id)
}
</script>

<style lang="scss" scoped>
.todoForm {
  display: flex;
  justify-content: space-between;
  &-title {
    display: block;
    width: 90%;
    font-size: 18px;
    line-height: 22px;
    color: #fff;
  }
  &-boxEdit {
    width: 100%;
  }
  &-editTodo {
    width: 100%;
    max-width: 100px;
    height: 40px;
    background: aqua;
    border-radius: 10px;
    margin-bottom: 5px;
}
  &-deleteTodo {
    width: 100%;
    max-width: 100px;
    height: 40px;
    background: red;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  &-editInput {
    width: 100%;
    max-width: 90%;
    height: 40px;
    border-radius: 15px;
    font-size: 20px;
    margin-bottom: 20px;
  }
  }
</style>
