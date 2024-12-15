import { create } from "zustand";
import { persist } from "zustand/middleware";
import generateUUID from "../utils/uuid";
const useTodoStore = create(
  persist(
    (set) => ({
      todos: [],
      addTodo: (task) =>
        set((state) => ({
          todos: [
            ...state.todos,
            { id: generateUUID(), task, completed: false }, // Add `completed` field
          ],
        })),
      editTodo: (id, updatedTask) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, task: updatedTask } : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
    }),
    { name: "todo-storage" }
  )
);

export { useTodoStore };
