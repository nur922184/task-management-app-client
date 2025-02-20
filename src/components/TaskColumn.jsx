import React, { useState } from 'react';
import TaskItem from './TaskItem';


const TaskColumn = ({ title, tasks, addTask, updateTask, deleteTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask({
        title: newTaskTitle,
        description: '',
        category: title,
      });
      setNewTaskTitle('');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border-0">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleAddTask}
          className="mt-2 w-full bg-blue-500 text-white p-2 rounded"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskColumn;