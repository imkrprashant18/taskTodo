import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTodoStore = create(
  persist(
    (set) => ({
      todos: [],
      addTodo: (task) =>
        set((state) => ({ todos: [...state.todos, { id: Date.now(), task }] })),
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
    }),
    { name: "todo-storage" }
  )
);

export { useTodoStore };
