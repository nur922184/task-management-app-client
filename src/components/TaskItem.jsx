import React, { useState } from 'react';

const TaskItem = ({ task, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = () => {
    updateTask(task._id, editedTask);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-200 p-2 rounded-lg shadow-sm">
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
            className="w-full p-1 border rounded"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
            className="w-full p-1 border rounded"
          />
          <button
            onClick={handleSave}
            className="bg-green-500 text-white p-1 rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <h3 className="font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <p> Date: {new Date(task.timestamp).toLocaleString()} </p>
          <div className="flex space-x-2 mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white p-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTask(task._id)}
              className="bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;