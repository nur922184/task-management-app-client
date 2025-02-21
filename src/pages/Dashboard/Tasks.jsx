import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskColumn from '../../components/TaskColumn';
import useAuth from '../../hooks/useAuth';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const { user } = useAuth();

    const email = user?.email;

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

    const addTask = async (task) => {
        try {
            const response = await axios.post('https://task-management-backend-ochre.vercel.app/tasks', task);
            const newTask = response.data;
            setTasks((prevTasks) => [...prevTasks, newTask]);
            return newTask;
        } catch (error) {
            console.error('Error adding task:', error);
            throw error;
        }
    };

    const updateTask = async (id, updatedTask) => {
        try {
            await axios.put(`https://task-management-backend-ochre.vercel.app/tasks/${id}`, updatedTask);
            setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
    
            toast.success("Task updated successfully! ✅", {
                position: "top-right",
                autoClose: 3000,
            });
        } catch (error) {
            toast.error("Failed to update task. Please try again! ❌", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };
    const deleteTask = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`https://task-management-backend-ochre.vercel.app/tasks/${id}`);
                    setTasks(tasks.filter((task) => task._id !== id));
    
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your task has been deleted.",
                        icon: "success",
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong. Please try again.",
                        icon: "error",
                    });
                }
            }
        });
    };

    const onDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = tasks.findIndex((task) => task._id === active.id);
        const newIndex = tasks.findIndex((task) => task._id === over.id);
        const newTasks = arrayMove(tasks, oldIndex, newIndex);
        setTasks(newTasks);
    };

    return (
        <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd}>
            <SortableContext items={tasks.map((task) => task._id)}>
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
            </SortableContext>
        </DndContext>
    );
};

export default Tasks;
