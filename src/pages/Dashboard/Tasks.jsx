import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskColumn from '../../components/TaskColumn';
import useAuth from '../../hooks/useAuth';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const { user } = useAuth()

    // Fetch tasks from the backend
    const email = user?.email; // Replace with dynamic email as needed

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`https://task-management-backend-ochre.vercel.app/tasks/${email}`);
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, [email]);

    // Add a new task
    const addTask = async (task) => {
        try {
            const response = await axios.post('https://task-management-backend-ochre.vercel.app/tasks', task);

            const newTask = response.data; // API থেকে রিটার্ন হওয়া টাস্ক

            setTasks((prevTasks) => [...prevTasks, newTask]); // ✅ সরাসরি UI তে যোগ করো
            return newTask; // ✅ নতুন টাস্ক `TaskColumn` এ পাঠাবে
        } catch (error) {
            console.error('Error adding task:', error);
            throw error;
        }
    };

    // Update a task
    const updateTask = async (id, updatedTask) => {
        await axios.put(`https://task-management-backend-ochre.vercel.app/tasks/${id}`, updatedTask);
        setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
    };

    // Delete a task
    const deleteTask = async (id) => {
        await axios.delete(`https://task-management-backend-ochre.vercel.app/tasks/${id}`);
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