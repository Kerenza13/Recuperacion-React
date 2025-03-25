import React from "react";
import { Link } from "react-router-dom";
import TaskComponent from "../components/TaskComponent";
import { useTask } from "../context/TaskContext";

const HomePage = () => {
  const { tasks } = useTask(); 
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.checked).length;

  return (
    <div>
      <h1>Task List</h1>
      <Link to="/create">Create Task</Link>
      <div>
        <h2>Counter</h2>
        <p>
          Completed: {completedTasks} / Total: {totalTasks}
        </p>
      </div>
      <div>
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskComponent key={task.id} task={task} />)
        ) : (
          <p>No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
