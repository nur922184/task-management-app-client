import React, { useState } from 'react';
import { DndContext, useDroppable } from '@dnd-kit/core';
import TaskItem from './TaskItem';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const TaskColumn = ({ title, tasks, addTask, updateTask, deleteTask, onDragEnd }) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const { setNodeRef } = useDroppable({ id: title });

    const handleAddTask = async () => {
        if (!newTaskTitle.trim()) return;

        setLoading(true); // Start loading
        const newTask = {
            title: newTaskTitle,
            description: '',
            category: title,
            email: user.email,
        };

        try {
            await addTask(newTask);
            setNewTaskTitle('');
            toast.success('Task added successfully! 🎉');
            navigate('/dashboard/lists');
        } catch (error) {
            toast.error('Failed to add task. Please try again. 😞');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div ref={setNodeRef} className="bg-white p-4 rounded-lg shadow-md border-0 min-h-[200px]">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <DndContext onDragEnd={onDragEnd}>
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
            </DndContext>
            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Add a new task"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                    disabled={loading}
                />
                <button
                    onClick={handleAddTask}
                    className={`mt-2 w-full p-2 rounded flex items-center justify-center ${
                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"
                    }`}
                    disabled={loading}
                >
                    {loading ? (
                        <span className="loader border-t-2 border-white border-solid rounded-full w-5 h-5 animate-spin"></span>
                    ) : (
                        'Add Task'
                    )}
                </button>
            </div>
        </div>
    );
};

export default TaskColumn;
