import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const API_URL = import.meta.env.VITE_URL_API;

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}`);
      if (!response.ok) throw new Error("Error al obtener las tareas");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.checked).length;

return (
    <div>
      <h1>Lista de Tareas</h1>
      <Link to="/create">Crear Tarea</Link>
      <div>
        <h2>Contador</h2>
        <p>
          Completadas: {completedTasks} / Total: {totalTasks}
        </p>
      </div>
      <div>
        {tasks.map((task) => (
          <div key={task.id}>
            <h3>{task.name}</h3>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
