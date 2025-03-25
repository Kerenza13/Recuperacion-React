import React from "react";

const TaskComponent = ({ task }) => {
  return (
    <div key={task.id}>
      <h3>{task.name}</h3>
      <p>{task.description}</p>
    </div>
  );
};

export default TaskComponent;
