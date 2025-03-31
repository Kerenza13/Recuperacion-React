import React, { createContext, useContext, useState, useEffect } from "react";

// Contexto de Tareas
const TaskContext = createContext();
export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const API_URL = import.meta.env.VITE_URL_API;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${API_URL}`);
        if (!response.ok) throw new Error("Error fetching tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, [API_URL]);

  const addTask = async (title, description) => {
    if (tasks.some((task) => task.title === title)) {
      return "Error: La tarea ya existe";
    }
    const newId =
      tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    const newTask = {
      id: newId,
      title,
      description,
      completed: false,
    };

    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) throw new Error("Error al guardar la tarea");
      const savedTask = await response.json();
      setTasks([...tasks, savedTask]);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
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
