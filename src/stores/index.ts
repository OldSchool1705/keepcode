import { defineStore } from 'pinia'

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const useStore = defineStore({
  id: 'todos',
  state: () => ({
    todos: [] as Todo[],
  }),
  actions: {
    async fetchTodos() {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      this.todos = data;
    },
    async addTodo(todo: Todo) {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const newTodo = await response.json();
      this.todos.unshift(newTodo);
    },
    async editTodo(updatedTodo: Todo) {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedTodo),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
      }
    },
    async deleteTodo(id: number) {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
          this.todos.splice(index, 1);
        }
      }
    },
  },
});
