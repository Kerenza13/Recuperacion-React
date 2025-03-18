import React, { useState } from "react";
import { useTask } from "../context/TaskContext";

const TaskPage = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useTask();
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.description) {
      const errorMessage = addTask(formData.name, formData.description);
      if (errorMessage) {
        setError(errorMessage);
      } else {
        setError("");
        setFormData({ name: "", description: "" });
      }
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.checked).length;

  return (
    <div>
      <header>
        <h1>TODO PLUS</h1>
      </header>
      <div>
        <h2>Crear Tarea</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descripción"
            required
          />
          <button type="submit">Guardar</button>
        </form>
      </div>
      <div>
        <h2>Lista de Tareas</h2>
        {tasks.map((task) => (
          <div key={task.id}>
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <button onClick={() => toggleTask(task.id)}>
              {task.checked ? "Desmarcar" : "Marcar como hecha"}
            </button>
            <button onClick={() => deleteTask(task.id)}>Borrar</button>
          </div>
        ))}
        <h3>
          Progreso: {completedTasks}/{totalTasks}
        </h3>
      </div>
    </div>
  );
};

export default TaskPage;
