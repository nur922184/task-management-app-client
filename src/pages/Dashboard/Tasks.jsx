import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskColumn from '../../components/TaskColumn';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get('http://localhost:5000/tasks');
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async (task) => {
    const response = await axios.post('http://localhost:5000/tasks', task);
    setTasks([...tasks, response.data]);
  };

  // Update a task
  const updateTask = async (id, updatedTask) => {
    await axios.put(`http://localhost:5000/tasks/${id}`, updatedTask);
    setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
  };

  // Delete a task
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Task Management System</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TaskColumn
          title="To-Do"
          tasks={tasks.filter((task) => task.category === 'To-Do')}
          addTask={addTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
        <TaskColumn
          title="In Progress"
          tasks={tasks.filter((task) => task.category === 'In Progress')}
          addTask={addTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
        <TaskColumn
          title="Done"
          tasks={tasks.filter((task) => task.category === 'Done')}
          addTask={addTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
};


export default Tasks;