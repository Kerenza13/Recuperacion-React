import React from "react";
import { useTask } from "../context/TaskContext";

const TaskComponent = ({ task }) => {
  const { toggleTask } = useTask();

  return (
    <div className="p-4 mb-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className={`text-xl font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {task.title}
          </h3>
          <p className={`mt-2 text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
            {task.description}
          </p>
        </div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="w-6 h-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default TaskComponent;
