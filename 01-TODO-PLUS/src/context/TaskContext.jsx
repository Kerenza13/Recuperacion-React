import React, { createContext, useContext, useState } from "react";

// Contexto de Tareas
const TaskContext = createContext();
export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (name, description) => {
    if (tasks.some((task) => task.name === name)) {
      return "Error: La tarea ya existe";
    }
    const newTask = {
      id: Date.now(),
      name,
      description,
      checked: false,
    };
    setTasks([...tasks, newTask]);
    return null;
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
