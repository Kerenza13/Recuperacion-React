import React from "react";
import { Link } from "react-router-dom";
import TaskComponent from "../components/TaskComponent";
import { useTask } from "../context/TaskContext";

const HomePage = () => {
  const { tasks } = useTask(); 
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Task List</h1>
        <Link 
          to="/create" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Create Task
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Counter</h2>
        <p className="text-gray-600">
          Completed: <span className="font-medium">{completedTasks}</span> / Total: <span className="font-medium">{totalTasks}</span>
        </p>
      </div>
      <div className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskComponent key={task.id} task={task} />)
        ) : (
          <p className="text-center text-gray-500 py-8">No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
