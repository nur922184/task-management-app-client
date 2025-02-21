import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { MdDelete, MdEditNote } from "react-icons/md";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

const TaskList = () => {
    const { user } = useAuth();
    const email = user?.email;
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(null);

    useEffect(() => {
        if (!email) return;
        axios.get(`https://task-management-backend-ochre.vercel.app/tasks/${email}`)
            .then(response => setTasks(response.data))
            .catch(error => console.error("Error fetching tasks:", error));
    }, [email]);

    // const deleteTask = async (id) => {
    //     await axios.delete(`https://task-management-backend-ochre.vercel.app/tasks/${id}`);
    //     setTasks(tasks.filter(task => task._id !== id));
    // };

    const openEditModal = (task) => {
        console.log("Editing Task:", task); // এখানে টাস্ক ডাটা দেখুন
        setEditedTask(task);
        setIsEditing(true);
    };
    // const handleSave = async () => {
    //     if (!editedTask) return;
    //     await axios.put(`https://task-management-backend-ochre.vercel.app/tasks/${editedTask._id}`, editedTask);
    //     setTasks(tasks.map(task => task._id === editedTask._id ? editedTask : task));
    //     setIsEditing(false);
    //     setEditedTask(null);
    // };

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over) return;

        const taskId = active.id;
        const newCategory = over.id;

        setTasks(tasks.map(task => 
            task._id === taskId ? { ...task, category: newCategory } : task
        ));

        // **Update category in the backend**
        await axios.put(`https://task-management-backend-ochre.vercel.app/tasks/${taskId}`, { category: newCategory });
    };

    const categorizedTasks = {
        "To-Do": [],
        "In Progress": [],
        "Done": [],
    };

    tasks.forEach(task => {
        if (categorizedTasks[task.category]) {
            categorizedTasks[task.category].push(task);
        }
    });

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(categorizedTasks).map(([category, tasks]) => (
                        <CategoryColumn key={category} category={category}>
                            {tasks.map(task => (
                                <DraggableTask key={task._id} task={task}  openEditModal={openEditModal} />
                            ))}
                        </CategoryColumn>
                    ))}
                </div>
            </div>

            {/* Edit Modal */}
            {isEditing && editedTask && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-lg font-bold mb-2">Edit Task</h2>
                        <input
                            type="text"
                            value={editedTask.title}
                            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Task Title"
                        />
                        <textarea
                            value={editedTask.description}
                            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Task Description"
                        />
                        <div className="flex justify-end space-x-2">
                            <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white p-2 rounded">
                                Cancel
                            </button>
                            <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DndContext>
    );
};

const CategoryColumn = ({ category, children }) => {
    const { setNodeRef } = useDroppable({ id: category });

    return (
        <div ref={setNodeRef} className="bg-white shadow-md p-4 rounded-lg min-h-[200px]">
            <h2 className="text-xl font-bold mb-2">{category}</h2>
            {children.length > 0 ? children : <p className="text-gray-500">No tasks available</p>}
        </div>
    );
};

const DraggableTask = ({ task, deleteTask, openEditModal }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task._id });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={{
                transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : "none",
            }}
            className="border-b bg-slate-300 mb-1 p-2 rounded-lg py-2 cursor-grab"
        >
            <p className="font-semibold">{task.title}</p>
            <p className="text-sm text-gray-500">{task.description || "No Description"}</p>
            <p className="text-xs text-gray-400">{new Date(task.timestamp).toLocaleString()}</p>
            {/* <div className="flex space-x-2 justify-end mt-2">
                <button onClick={() => openEditModal(task)} className="text-green-700 p-1 rounded">
                    <MdEditNote size={20} />
                </button>
                <button onClick={() => deleteTask(task._id)} className="text-red-500 rounded">
                    <MdDelete size={20} />
                </button>
            </div> */}
        </div>
    );
};

export default TaskList;
