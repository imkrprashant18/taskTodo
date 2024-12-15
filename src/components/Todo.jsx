import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { useTodoStore } from "../store/todo-store";
import { Modal } from "antd";

const Todo = () => {
  const { todos, addTodo, editTodo, deleteTodo, toggleTodo } = useTodoStore();
  const [task, setTask] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalAction, setModalAction] = useState("");

  const handleAddTodo = () => {
    if (task.trim()) {
      addTodo(task);
      setTask("");
    }
  };

  const handleEdit = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    setEditingTodo(todo);
    setTask(todo.task);
    setModalAction("edit");
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    setEditingTodo(todo);
    setModalAction("delete");
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    if (modalAction === "edit") {
      editTodo(editingTodo.id, task);
    } else if (modalAction === "delete") {
      deleteTodo(editingTodo.id);
    }
    setIsModalVisible(false);
    setEditingTodo(null);
    setTask("");
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingTodo(null);
    setTask("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">To-Do App</h1>
      <Input
        placeholder="Add a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="mb-4 w-full border-gray-300 focus:ring-blue-500"
      />
      <Button
        label="Add Task"
        onClick={handleAddTodo}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white"
      />
      <ul className="mt-6 space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center justify-between p-2 border rounded-md ${
              todo.completed ? "bg-green-100" : ""
            }`} // Add class for completed task
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)} // Toggle the todo completion
                className="mr-2"
              />
              <span
                className={todo.completed ? "line-through text-gray-500" : ""}
              >
                {todo.task}
              </span>
            </div>
            <div className="space-x-2">
              <Button
                label="Edit"
                onClick={() => handleEdit(todo.id)}
                className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white"
              />
              <Button
                label="Delete"
                onClick={() => handleDelete(todo.id)}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white"
              />
            </div>
          </li>
        ))}
      </ul>

      <Modal
        title={modalAction === "edit" ? "Edit Task" : "Delete Task"}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Confirm"
        cancelText="Cancel"
      >
        {modalAction === "edit" ? (
          <Input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Edit your task"
            className="w-full"
          />
        ) : (
          <p>Are you sure you want to delete this task?</p>
        )}
      </Modal>
    </div>
  );
};

export default Todo;
